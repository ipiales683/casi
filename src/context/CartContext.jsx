import React, { createContext, useState, useContext, useEffect } from 'react';
import { toast } from 'react-hot-toast';

// Crear el contexto
const CartContext = createContext();

// Hook personalizado para usar el contexto
export const useCart = () => useContext(CartContext);

// Proveedor del contexto
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);
  const [coupon, setCoupon] = useState(null);
  const [shipping, setShipping] = useState({
    method: 'standard',
    cost: 0,
    address: null
  });

  // Cargar carrito desde localStorage al inicializar
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (error) {
        console.error('Error al cargar carrito:', error);
        localStorage.removeItem('cart');
      }
    }
  }, []);

  // Guardar carrito en localStorage cuando cambie
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  // Agregar producto al carrito
  const addToCart = (product, quantity = 1) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      
      if (existingItem) {
        // Si el producto ya existe, aumentar cantidad
        const updatedCart = prevCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
        
        toast.success(`Cantidad actualizada: ${product.name}`);
        return updatedCart;
      } else {
        // Si es un producto nuevo, agregarlo
        const newItem = {
          ...product,
          quantity,
          addedAt: new Date().toISOString()
        };
        
        toast.success(`${product.name} agregado al carrito`);
        return [...prevCart, newItem];
      }
    });
  };

  // Remover producto del carrito
  const removeFromCart = (productId) => {
    setCart(prevCart => {
      const product = prevCart.find(item => item.id === productId);
      const updatedCart = prevCart.filter(item => item.id !== productId);
      
      if (product) {
        toast.success(`${product.name} removido del carrito`);
      }
      
      return updatedCart;
    });
  };

  // Actualizar cantidad de un producto
  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }

    setCart(prevCart =>
      prevCart.map(item =>
        item.id === productId
          ? { ...item, quantity }
          : item
      )
    );
  };

  // Limpiar carrito
  const clearCart = () => {
    setCart([]);
    setCoupon(null);
    setShipping({
      method: 'standard',
      cost: 0,
      address: null
    });
    toast.success('Carrito limpiado');
  };

  // Aplicar cupón
  const applyCoupon = (couponCode) => {
    setLoading(true);
    
    // Simular validación de cupón
    setTimeout(() => {
      const validCoupons = {
        'WELCOME10': { discount: 10, type: 'percentage' },
        'SAVE20': { discount: 20, type: 'percentage' },
        'FREESHIP': { discount: 0, type: 'shipping', freeShipping: true }
      };

      if (validCoupons[couponCode]) {
        setCoupon({
          code: couponCode,
          ...validCoupons[couponCode]
        });
        toast.success(`Cupón ${couponCode} aplicado`);
      } else {
        toast.error('Cupón inválido');
      }
      setLoading(false);
    }, 1000);
  };

  // Remover cupón
  const removeCoupon = () => {
    setCoupon(null);
    toast.success('Cupón removido');
  };

  // Actualizar método de envío
  const updateShipping = (method, cost = 0, address = null) => {
    setShipping({ method, cost, address });
  };

  // Calcular subtotal
  const getSubtotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  // Calcular descuento del cupón
  const getDiscount = () => {
    if (!coupon) return 0;
    
    if (coupon.type === 'percentage') {
      return (getSubtotal() * coupon.discount) / 100;
    }
    
    return coupon.discount;
  };

  // Calcular costo de envío
  const getShippingCost = () => {
    if (coupon?.freeShipping) return 0;
    return shipping.cost;
  };

  // Calcular total
  const getTotal = () => {
    const subtotal = getSubtotal();
    const discount = getDiscount();
    const shippingCost = getShippingCost();
    
    return subtotal - discount + shippingCost;
  };

  // Obtener número total de items
  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  // Verificar si el carrito está vacío
  const isEmpty = () => cart.length === 0;

  // Obtener productos por categoría
  const getProductsByCategory = (category) => {
    return cart.filter(item => item.category === category);
  };

  // Obtener productos digitales
  const getDigitalProducts = () => {
    return cart.filter(item => item.type === 'digital');
  };

  // Obtener productos físicos
  const getPhysicalProducts = () => {
    return cart.filter(item => item.type === 'physical');
  };

  // Obtener servicios
  const getServices = () => {
    return cart.filter(item => item.type === 'service');
  };

  // Verificar si un producto está en el carrito
  const isInCart = (productId) => {
    return cart.some(item => item.id === productId);
  };

  // Obtener cantidad de un producto específico
  const getProductQuantity = (productId) => {
    const item = cart.find(item => item.id === productId);
    return item ? item.quantity : 0;
  };

  // Mover producto a lista de deseos (simulado)
  const moveToWishlist = (productId) => {
    const product = cart.find(item => item.id === productId);
    if (product) {
      removeFromCart(productId);
      // Aquí se podría agregar a la lista de deseos
      toast.success(`${product.name} movido a lista de deseos`);
    }
  };

  // Calcular ahorro total
  const getTotalSavings = () => {
    const originalPrice = cart.reduce((total, item) => {
      const originalPrice = item.originalPrice || item.price;
      return total + (originalPrice * item.quantity);
    }, 0);
    
    return originalPrice - getSubtotal();
  };

  // Valores a proporcionar en el contexto
  const value = {
    cart,
    loading,
    coupon,
    shipping,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    applyCoupon,
    removeCoupon,
    updateShipping,
    getSubtotal,
    getDiscount,
    getShippingCost,
    getTotal,
    getTotalItems,
    isEmpty,
    getProductsByCategory,
    getDigitalProducts,
    getPhysicalProducts,
    getServices,
    isInCart,
    getProductQuantity,
    moveToWishlist,
    getTotalSavings
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};
