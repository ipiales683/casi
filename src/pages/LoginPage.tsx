import React, { useState } from 'react';
import { NexusProIcon, GoogleIcon, AppleIcon, FacebookIcon, XIcon } from '../components/icons/InterfaceIcons';

interface LoginPageProps {
    onLogin: (email?: string) => void;
    onNavigate: (page: string) => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin, onNavigate }) => {
    const [email, setEmail] = useState('demo@cliente.com');
    const [password, setPassword] = useState('password');

    return (
        <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-md p-8 space-y-8 bg-[var(--card)] backdrop-blur-sm border border-[var(--border)] rounded-2xl shadow-2xl">
                <div className="text-center">
                    <div className="flex justify-center items-center mb-4">
                        <NexusProIcon className="h-12 w-auto text-[var(--accent-color)]" />
                        <h1 className="text-3xl font-black ml-3 tracking-tighter font-serif">Portal de Cliente</h1>
                    </div>
                    <p className="text-[var(--muted-foreground)]">Acceda a su portal legal seguro.</p>
                     <p className="text-xs text-[var(--muted-foreground)] mt-2">Prueba con <code className="bg-[var(--background)] p-1 rounded">admin@demo.com</code> para el rol de Admin.</p>
                </div>
                <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); onLogin(email); }}>
                    <div>
                        <label htmlFor="email" className="text-sm font-medium text-[var(--foreground)]">
                            Email
                        </label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            autoComplete="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="mt-1 block w-full px-4 py-3 rounded-md bg-[var(--background)] border-[var(--border)] placeholder-[var(--muted-foreground)] focus:outline-none focus:ring-2 transition focus:border-[var(--accent-color)] focus:ring-[var(--accent-color)]"
                            placeholder="tu@email.com"
                        />
                    </div>
                    <div>
                        <label htmlFor="password"className="text-sm font-medium text-[var(--foreground)]">
                            Contraseña
                        </label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            autoComplete="current-password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                             className="mt-1 block w-full px-4 py-3 rounded-md bg-[var(--background)] border-[var(--border)] placeholder-[var(--muted-foreground)] focus:outline-none focus:ring-2 transition focus:border-[var(--accent-color)] focus:ring-[var(--accent-color)]"
                            placeholder="••••••••"
                        />
                         <div className="flex items-center justify-end mt-2">
                             <a href="#" className="text-sm text-[var(--accent-color)] hover:opacity-80">¿Olvidaste tu contraseña?</a>
                        </div>
                    </div>
                    <div>
                        <button
                            type="submit"
                            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium bg-[var(--primary)] text-[var(--primary-foreground)] transition-transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-gray-800 focus:ring-[var(--primary)]"
                        >
                            Iniciar Sesión
                        </button>
                    </div>
                </form>
                <div className="relative my-6">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-[var(--border)]" />
                    </div>
                    <div className="relative flex justify-center text-sm">
                        <span className="px-2 bg-[var(--card)] text-[var(--muted-foreground)]">O continuar con</span>
                    </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                     <button
                        onClick={() => onLogin()}
                        className="w-full flex items-center justify-center py-3 px-4 border border-[var(--border)] rounded-md shadow-sm text-sm font-medium bg-[var(--background)] hover:bg-opacity-80 transition"
                    >
                       <GoogleIcon className="h-5 w-5 mr-2" /> Google
                    </button>
                     <button
                        onClick={() => onLogin()}
                        className="w-full flex items-center justify-center py-3 px-4 border border-[var(--border)] rounded-md shadow-sm text-sm font-medium bg-[var(--background)] hover:bg-opacity-80 transition"
                    >
                       <AppleIcon className="h-5 w-5 mr-2" /> Apple
                    </button>
                     <button
                        onClick={() => onLogin()}
                        className="w-full flex items-center justify-center py-3 px-4 border border-[var(--border)] rounded-md shadow-sm text-sm font-medium bg-[var(--background)] hover:bg-opacity-80 transition"
                    >
                       <FacebookIcon className="h-5 w-5 mr-2 text-blue-600" /> Facebook
                    </button>
                     <button
                        onClick={() => onLogin()}
                        className="w-full flex items-center justify-center py-3 px-4 border border-[var(--border)] rounded-md shadow-sm text-sm font-medium bg-[var(--background)] hover:bg-opacity-80 transition"
                    >
                       <XIcon className="h-5 w-5 mr-2" /> X (Twitter)
                    </button>
                </div>
                 <p className="text-center text-sm text-[var(--muted-foreground)]">
                    ¿No tienes cuenta? <a href="#register" onClick={(e) => { e.preventDefault(); onNavigate('register');}} className="font-medium text-[var(--accent-color)] hover:opacity-80">Regístrate ahora</a>
                </p>
            </div>
        </div>
    );
};

export default LoginPage;
