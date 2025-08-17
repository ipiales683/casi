import React, { useState, useEffect } from 'react';
import Card from '../components/Card';
import { PuzzleIcon, TrophyIcon } from '../components/icons/InterfaceIcons';
import { useCredits } from '../context/CreditContext';
import { useTokens } from '../context/TokenContext';
import TicTacToe from '../components/games/TicTacToe';
import { Page, PublicRoute } from '../types';
import { motion, AnimatePresence } from 'framer-motion';

const triviaQuestions = [
    { question: '¿Qué es un "habeas corpus"?', options: ['Un recurso para proteger la libertad personal', 'Un tipo de contrato', 'Un impuesto judicial'], answer: 0 },
    { question: 'En derecho penal, ¿qué significa "in fraganti"?', options: ['Después del hecho', 'En el momento de cometer el delito', 'Con premeditación'], answer: 1 },
    { question: '¿Cuál es la norma suprema en el ordenamiento jurídico ecuatoriano?', options: ['El Código Civil', 'La Constitución', 'Los tratados internacionales'], answer: 1 },
];

const TriviaGame = ({ canPlay, onGameEnd, onNavigate }) => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
    const [showResult, setShowResult] = useState(false);
    const { addCredits } = useCredits();
    const { useToken, addTokens } = useTokens();

    const currentQuestion = triviaQuestions[currentQuestionIndex];
    const isCorrect = selectedAnswer === currentQuestion.answer;

    const handleAnswer = (index: number) => {
        if (showResult || !canPlay) return;
        if (!useToken(1)) {
            alert("¡No tienes suficientes fichas para jugar!");
            return;
        }

        setSelectedAnswer(index);
        setShowResult(true);
        if (index === currentQuestion.answer) {
            addCredits(10);
            addTokens(2);
            onGameEnd(true);
        } else {
            onGameEnd(false);
        }
    };

    const handleNext = () => {
        setShowResult(false);
        setSelectedAnswer(null);
        setCurrentQuestionIndex((i) => (i + 1) % triviaQuestions.length);
    };
    
    const getButtonClass = (index: number) => {
        if (!showResult) return "bg-[var(--background)] hover:bg-opacity-80";
        if (index === currentQuestion.answer) return "bg-green-500/80 text-white";
        if (index === selectedAnswer && !isCorrect) return "bg-red-500/80 text-white";
        return "bg-[var(--background)] opacity-60";
    };

    return (
        <Card>
            <div className="text-center relative">
                <h2 className="text-2xl font-bold mb-2">Trivia Legal</h2>
                <p className="text-sm text-[var(--muted-foreground)] mb-6">Cuesta 1 ficha. Acierta y gana 2 fichas + 10 créditos.</p>
                <div className="bg-[var(--background)] p-6 rounded-lg">
                    <p className="font-semibold text-lg min-h-[56px]">{currentQuestion.question}</p>
                </div>
                <div className="grid grid-cols-1 gap-3 mt-6">
                    {currentQuestion.options.map((option, index) => (
                        <button key={index} onClick={() => handleAnswer(index)} disabled={showResult || !canPlay} className={`w-full p-4 rounded-lg text-left transition-all ${getButtonClass(index)} disabled:cursor-not-allowed`}>
                            {option}
                        </button>
                    ))}
                </div>
                 {showResult && (
                    <div className="mt-4 text-center">
                        <p className={`font-bold ${isCorrect ? 'text-green-500' : 'text-red-500'}`}>
                            {isCorrect ? '¡Correcto! +2 fichas, +10 créditos' : 'Incorrecto'}
                        </p>
                        <button onClick={handleNext} className="mt-2 px-6 py-2 bg-[var(--primary)] text-[var(--primary-foreground)] rounded-md">
                            Siguiente Pregunta
                        </button>
                    </div>
                )}
                 {!canPlay && (
                    <div className="absolute inset-0 bg-black/70 backdrop-blur-sm flex flex-col items-center justify-center rounded-xl text-center p-4">
                         <p className="text-xl font-bold text-white mb-2">¡Gracias por probar!</p>
                         <p className="text-sm text-gray-300 mb-4">Regístrate para seguir jugando y ganar recompensas.</p>
                         <button onClick={() => onNavigate('register')} className="px-6 py-2 bg-[var(--primary)] text-[var(--primary-foreground)] rounded-md">Registrarse Gratis</button>
                    </div>
                )}
            </div>
        </Card>
    );
};

const Achievement = ({ icon, title, description, unlocked }) => (
    <div className={`p-3 flex items-center gap-3 rounded-lg ${unlocked ? 'bg-[var(--accent-color)]/20 border border-[var(--accent-color)]/30' : 'bg-[var(--background)]'}`}>
        <div className={`p-2 rounded-full ${unlocked ? 'bg-[var(--accent-color)] text-black' : 'bg-gray-200 dark:bg-gray-700 text-gray-400'}`}>
            {React.cloneElement(icon, { className: "h-5 w-5" })}
        </div>
        <div>
            <p className={`font-semibold ${unlocked ? 'text-[var(--accent-color)]' : ''}`}>{title}</p>
            <p className="text-xs text-[var(--muted-foreground)]">{description}</p>
        </div>
    </div>
);


interface GamesPageProps {
    isLoggedIn: boolean;
    onNavigate: (page: Page | PublicRoute) => void;
}

const GamesPage: React.FC<GamesPageProps> = ({ isLoggedIn, onNavigate }) => {
    const { tokens, addTokens } = useTokens();
    
    // Stats would normally be fetched from a backend, using localStorage for this demo
    const [triviaWins, setTriviaWins] = useState(() => parseInt(localStorage.getItem('trivia_wins') || '0'));
    const [ticTacToeWins, setTicTacToeWins] = useState(() => parseInt(localStorage.getItem('tictactoe_wins') || '0'));
    
    const [hasVisitorPlayedTrivia, setHasVisitorPlayedTrivia] = useState(sessionStorage.getItem('visitor_played_trivia') === 'true');
    const [hasVisitorPlayedTicTacToe, setHasVisitorPlayedTicTacToe] = useState(sessionStorage.getItem('visitor_played_tictactoe') === 'true');

    useEffect(() => { localStorage.setItem('trivia_wins', triviaWins.toString()); }, [triviaWins]);
    useEffect(() => { localStorage.setItem('tictactoe_wins', ticTacToeWins.toString()); }, [ticTacToeWins]);

    const achievements = [
        { id: 'trivia_1', title: 'Primer Acierto', description: 'Gana tu primera partida de Trivia.', unlocked: triviaWins >= 1, icon: <TrophyIcon /> },
        { id: 'ttt_1', title: 'Estratega Novato', description: 'Gana tu primera partida de Tres en Raya.', unlocked: ticTacToeWins >= 1, icon: <TrophyIcon /> },
        { id: 'trivia_5', title: 'Sabio Legal', description: 'Gana 5 partidas de Trivia.', unlocked: triviaWins >= 5, icon: <TrophyIcon /> },
        { id: 'ttt_5', title: 'Maestro del Gato', description: 'Gana 5 partidas de Tres en Raya.', unlocked: ticTacToeWins >= 5, icon: <TrophyIcon /> },
    ];

    const canPlayTrivia = isLoggedIn || !hasVisitorPlayedTrivia;
    const canPlayTicTacToe = isLoggedIn || !hasVisitorPlayedTicTacToe;

    const handleTriviaEnd = (didWin: boolean) => {
        if (didWin) setTriviaWins(w => w + 1);
        if (!isLoggedIn) {
            setHasVisitorPlayedTrivia(true);
            sessionStorage.setItem('visitor_played_trivia', 'true');
        }
    };
    
    const handleTicTacToeEnd = (result) => {
        if (result === 'win') setTicTacToeWins(w => w + 1);
        if (!isLoggedIn) {
            setHasVisitorPlayedTicTacToe(true);
            sessionStorage.setItem('visitor_played_tictactoe', 'true');
        }
    }

    return (
        <div className="space-y-6">
            <header className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold flex items-center">
                        <PuzzleIcon className="h-8 w-8 mr-3 text-[var(--accent-color)]"/> Centro de Entretenimiento
                    </h1>
                    <p className="mt-1 text-[var(--muted-foreground)]">Gana créditos y aprende con nuestros juegos interactivos.</p>
                </div>
                {isLoggedIn && (
                    <Card className="!p-3 text-center">
                        <p className="text-sm font-semibold">Tus Fichas</p>
                        <p className="text-3xl font-bold text-[var(--accent-color)]">{tokens}</p>
                    </Card>
                )}
            </header>
            
            {isLoggedIn && tokens < 1 && (
                <Card className="text-center">
                    <p className="font-semibold">¡Te quedaste sin fichas!</p>
                    <button onClick={() => addTokens(5)} className="mt-2 px-4 py-2 bg-[var(--primary)] text-[var(--primary-foreground)] rounded-md">
                        Recargar 5 Fichas (Simulación)
                    </button>
                </Card>
            )}

             <Card>
                <h2 className="text-xl font-bold mb-4 flex items-center gap-2"><TrophyIcon className="h-5 w-5"/> Logros</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {achievements.map(ach => <Achievement key={ach.id} {...ach} />)}
                </div>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <TriviaGame canPlay={canPlayTrivia} onGameEnd={handleTriviaEnd} onNavigate={onNavigate} />
                 <TicTacToe canPlay={canPlayTicTacToe} onGameEnd={handleTicTacToeEnd} onNavigate={onNavigate} />
            </div>
            
        </div>
    );
};

export default GamesPage;