import React, { createContext, useState, useContext, ReactNode } from 'react';

interface CreditContextType {
    credits: number;
    addCredits: (amount: number) => void;
    deductCredits: (amount: number) => boolean; // Returns true if successful
}

const CreditContext = createContext<CreditContextType | undefined>(undefined);

export const CreditProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [credits, setCredits] = useState(1000); // Initial credits

    const addCredits = (amount: number) => {
        setCredits(prev => prev + amount);
    };

    const deductCredits = (amount: number): boolean => {
        if (credits >= amount) {
            setCredits(prev => prev - amount);
            return true;
        }
        return false;
    };

    const value = { credits, addCredits, deductCredits };

    return (
        <CreditContext.Provider value={value}>
            {children}
        </CreditContext.Provider>
    );
};

export const useCredits = (): CreditContextType => {
    const context = useContext(CreditContext);
    if (context === undefined) {
        throw new Error('useCredits must be used within a CreditProvider');
    }
    return context;
};
