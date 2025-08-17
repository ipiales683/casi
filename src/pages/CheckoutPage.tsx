import React, { useState, useEffect } from 'react';
import Card from '../components/Card';
import { Page, PublicRoute } from '../types';
import { Purchase, Plan, Product, Service, Course, CatalogItem } from '../types';
import { CreditCardIcon, PayPalIcon, CheckCircleIcon, WhatsAppIcon, ShoppingCartIcon, UploadCloudIcon } from '../components/icons/InterfaceIcons';
import { useCart } from '../context/CartContext';
import { useCredits } from '../context/CreditContext';

const USER_PURCHASES_KEY = 'user_purchases';

const TransferModal = ({onClose, onConfirm}) => (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <Card className="w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Pago por Transferencia</h2>
            <p className="text-sm text-[var(--muted-foreground)] mb-4">Por favor, realice la transferencia a la siguiente cuenta y suba el comprobante de pago.</p>
            <div className="p-3 bg-[var(--background)] rounded-md text-sm">
                <p><strong>Banco:</strong> Banco Pichincha</p>
                <p><strong>Cuenta Corriente:</strong> 220XXXXXXX</p>
                <p><strong>A nombre de:</strong> Wilson A. Ipiales</p>
            </div>
            <button className="w-full mt-4 flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium rounded-lg border-2 border-dashed border-[var(--border)] hover:bg-[var(--background)]">
                <UploadCloudIcon className="h-5 w-5"/> Subir Comprobante
            </button>
            <div className="flex justify-end gap-3 pt-6">
                <button onClick={onClose} className="px-4 py-2 rounded-md text-sm font-medium bg-gray-200 hover:bg-gray-300 dark:bg-gray-600 dark:hover:bg-gray-500">Cancelar</button>
                <button onClick={onConfirm} className="px-4 py-2 rounded-md text-sm font-medium text-[var(--primary-foreground)] bg-[var(--primary)] hover:opacity-90">Confirmar Pago</button>
            </div>
        </Card>
    </div>
);


interface CheckoutPageProps {
  onNavigate: (page: Page | PublicRoute | string, payload?: any) => void;
  navigationPayload?: { item: CatalogItem, itemType: 'service' | 'product' | 'course' | 'plan' | 'consulta' | 'ebook' };
  clearNavigationPayload: () => void;
}

const CheckoutPage: React.FC<CheckoutPageProps> = ({ onNavigate, navigationPayload, clearNavigationPayload }) => {
    const { cart, cartTotal, addToCart, clearCart } = useCart();
    const { credits, deductCredits } = useCredits();

    const [step, setStep] = useState(1);
    const [paymentMethod, setPaymentMethod] = useState<'Card' | 'PayPal' | 'Transfer' | null>(null);
    const [isTransferModalOpen, setIsTransferModalOpen] = useState(false);
    const [creditsToUse, setCreditsToUse] = useState(0);
    
    // Effect to add item from navigation payload to cart
    useEffect(() => {
        if (navigationPayload?.item) {
            addToCart(navigationPayload.item, navigationPayload.itemType);
            clearNavigationPayload();
        }
    }, [navigationPayload, addToCart, clearNavigationPayload]);
    
    const creditValue = 0.01; // 1 credit = $0.01
    const maxCreditsForOrder = Math.min(credits, Math.floor(cartTotal / creditValue));
    const discount = Math.min(creditsToUse * creditValue, cartTotal);
    const finalTotal = cartTotal - discount;

    const handlePayment = (method: 'Card' | 'PayPal' | 'Transfer') => {
        if (cart.length === 0) return;

        if (method === 'Transfer') {
            setIsTransferModalOpen(true);
            return;
        }

        processOrder(method);
    };
    
    const processOrder = (method: 'Card' | 'PayPal' | 'Transfer') => {
        setPaymentMethod(method);
        
        // 1. Deduct credits if used
        if (creditsToUse > 0) {
            deductCredits(creditsToUse);
        }

        // 2. Create Purchase Records
        const newPurchases: Purchase[] = cart.map(cartItem => ({
            id: `purchase_${cartItem.id}_${Date.now()}`,
            itemId: cartItem.id,
            itemType: cartItem.type,
            itemName: cartItem.name,
            amount: cartItem.price * cartItem.quantity,
            purchaseDate: new Date().toISOString(),
            paymentMethod: method,
        }));
        
        // 3. Save to localStorage
        const allPurchases: Purchase[] = JSON.parse(localStorage.getItem(USER_PURCHASES_KEY) || '[]');
        localStorage.setItem(USER_PURCHASES_KEY, JSON.stringify([...newPurchases, ...allPurchases]));

        const purchasedItems = [...cart];
        
        // 4. Clear cart and move to confirmation
        clearCart();
        setStep(2);

        // 5. Redirect after a delay
        setTimeout(() => {
            const hasService = purchasedItems.some(item => item.type === 'service' || item.type === 'consulta');
            if (hasService) {
                const serviceItem = purchasedItems.find(item => item.type === 'service' || item.type === 'consulta');
                onNavigate('calendar', { preselectedService: serviceItem?.id, fromCheckout: true });
            } else {
                onNavigate('dashboard');
            }
        }, 3000);
    }
    
    if (cart.length === 0 && step === 1) {
        return (
            <div className="text-center py-20 max-w-7xl mx-auto px-4">
                <ShoppingCartIcon className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h1 className="text-2xl font-bold">Tu carrito está vacío.</h1>
                <button onClick={() => onNavigate('catalogo')} className="mt-6 px-4 py-2 bg-[var(--primary)] text-[var(--primary-foreground)] rounded-md">
                    Explorar Catálogo
                </button>
            </div>
        );
    }
    
     if (step === 2) {
        return (
            <div className="max-w-md mx-auto py-20 text-center">
                <CheckCircleIcon className="h-24 w-24 text-green-500 mx-auto mb-4 animate-pulse" />
                <h1 className="text-3xl font-bold font-serif">¡Pago Exitoso!</h1>
                <p className="text-[var(--muted-foreground)] mt-2">
                    Tu pago fue procesado correctamente.
                </p>
                <p className="mt-4">
                    Serás redirigido en unos segundos...
                </p>
            </div>
        )
    }

    return (
        <div className="max-w-4xl mx-auto py-12 px-4">
            {isTransferModalOpen && <TransferModal onClose={() => setIsTransferModalOpen(false)} onConfirm={() => { setIsTransferModalOpen(false); processOrder('Transfer'); }} />}
            <h1 className="text-3xl font-bold font-serif text-center mb-8">Finalizar Compra</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                    <Card className="mb-6">
                        <h2 className="text-xl font-bold mb-4">Usar Créditos</h2>
                        <p className="text-sm text-[var(--muted-foreground)]">Tienes <span className="font-bold text-[var(--accent-color)]">{credits.toLocaleString()}</span> créditos disponibles.</p>
                        <div className="mt-2">
                           <input type="range" min="0" max={maxCreditsForOrder} value={creditsToUse} onChange={e => setCreditsToUse(Number(e.target.value))} className="w-full" />
                           <div className="flex justify-between text-xs">
                               <span>0</span>
                               <span>{maxCreditsForOrder.toLocaleString()}</span>
                           </div>
                        </div>
                        <p className="text-sm text-center mt-2">Aplicando {creditsToUse.toLocaleString()} créditos para un descuento de <span className="font-bold">${discount.toFixed(2)}</span>.</p>
                    </Card>
                    <Card>
                        <h2 className="text-xl font-bold mb-4">Resumen del Pedido</h2>
                        <div className="space-y-3 max-h-80 overflow-y-auto pr-2">
                            {cart.map(item => (
                                 <div key={item.id} className="p-3 bg-[var(--background)] rounded-lg flex justify-between items-center">
                                    <div>
                                        <p className="font-semibold">{item.name}</p>
                                        <p className="text-sm text-[var(--muted-foreground)]">{item.quantity} x ${item.price.toFixed(2)}</p>
                                    </div>
                                    <p className="font-semibold">${(item.quantity * item.price).toFixed(2)}</p>
                                </div>
                            ))}
                        </div>
                        <div className="mt-4 pt-4 border-t border-[var(--border)] space-y-2">
                            <div className="flex justify-between"><span>Subtotal:</span><span>${cartTotal.toFixed(2)}</span></div>
                            <div className="flex justify-between text-green-500"><span>Descuento por créditos:</span><span>-${discount.toFixed(2)}</span></div>
                            <div className="flex justify-between text-xl font-bold"><span>Total a Pagar:</span><span>${finalTotal.toFixed(2)}</span></div>
                        </div>
                    </Card>
                </div>
                <Card>
                    <h2 className="text-xl font-bold mb-4">Seleccionar Método de Pago</h2>
                    <div className="space-y-4">
                        <p className="text-sm text-[var(--muted-foreground)]">Este es un proceso de pago simulado.</p>
                        <button onClick={() => handlePayment('Card')} className="w-full flex items-center justify-center gap-2 p-4 text-lg rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition">
                            <CreditCardIcon className="h-6 w-6"/> Pagar con Tarjeta
                        </button>
                         <button onClick={() => handlePayment('PayPal')} className="w-full flex items-center justify-center gap-2 p-4 text-lg rounded-lg bg-yellow-400 text-black font-semibold hover:bg-yellow-500 transition">
                            <PayPalIcon className="h-6 w-6"/> Pagar con PayPal
                        </button>
                         <button onClick={() => handlePayment('Transfer')} className="w-full flex items-center justify-center gap-2 p-4 text-lg rounded-lg bg-green-500 text-white font-semibold hover:bg-green-600 transition">
                            <WhatsAppIcon className="h-6 w-6"/> Depósito/Transferencia
                        </button>
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default CheckoutPage;
