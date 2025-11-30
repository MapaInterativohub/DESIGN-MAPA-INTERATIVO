
import React, { useState, useEffect } from 'react';
import { Shuffle, RotateCcw, TrendingUp, Star } from 'lucide-react';

const MemoryGame = () => {
  const [cards, setCards] = useState<{ id: number; value: string; category: string; isFlipped: boolean; isMatched: boolean }[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [score, setScore] = useState(0);
  const [moves, setMoves] = useState(0);
  const [level, setLevel] = useState(1);
  const [streak, setStreak] = useState(0);

  const growthCategories = {
    'Habilidades': ['💼', '🎯', '📊', '🚀'],
    'Mindset': ['🧠', '💡', '⚡', '🌟'],
    'Comunicação': ['🗣️', '👥', '🤝', '📢'],
    'Liderança': ['👑', '🏆', '🎖️', '🔥']
  };

  const initializeGame = () => {
    const categories = Object.keys(growthCategories);
    const selectedCategory = categories[Math.floor(Math.random() * categories.length)];
    const categoryCards = growthCategories[selectedCategory as keyof typeof growthCategories];
    
    const shuffledCards = [...categoryCards, ...categoryCards]
      .sort(() => Math.random() - 0.5)
      .map((value, index) => ({
        id: index,
        value,
        category: selectedCategory,
        isFlipped: false,
        isMatched: false,
      }));
    setCards(shuffledCards);
    setFlippedCards([]);
    setMoves(0);
  };

  useEffect(() => {
    initializeGame();
  }, [level]);

  useEffect(() => {
    if (flippedCards.length === 2) {
      const [first, second] = flippedCards;
      setMoves(moves + 1);
      
      if (cards[first].value === cards[second].value) {
        setCards(prev => prev.map(card => 
          card.id === first || card.id === second 
            ? { ...card, isMatched: true }
            : card
        ));
        const points = Math.max(10 - Math.floor(moves / 2), 5) + (streak * 2);
        setScore(score + points);
        setStreak(streak + 1);
        setFlippedCards([]);
      } else {
        setStreak(0);
        setTimeout(() => {
          setCards(prev => prev.map(card => 
            card.id === first || card.id === second 
              ? { ...card, isFlipped: false }
              : card
          ));
          setFlippedCards([]);
        }, 1000);
      }
    }
  }, [flippedCards, cards, moves, score, streak]);

  const handleCardClick = (id: number) => {
    if (flippedCards.length === 2 || cards[id].isFlipped || cards[id].isMatched) return;
    
    setCards(prev => prev.map(card => 
      card.id === id ? { ...card, isFlipped: true } : card
    ));
    setFlippedCards(prev => [...prev, id]);
  };

  const isGameComplete = cards.length > 0 && cards.every(card => card.isMatched);

  const nextLevel = () => {
    setLevel(level + 1);
    setScore(score + 50); // Bonus por completar nível
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-xl font-bold text-gray-900">Memória do Crescimento</h3>
          <p className="text-sm text-gray-600">Desenvolva memória e foco</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="text-center">
            <div className="flex items-center space-x-1">
              <Star className="h-4 w-4 text-yellow-500" />
              <span className="text-sm font-bold text-gray-700">{score}</span>
            </div>
            <span className="text-xs text-gray-500">Pontos</span>
          </div>
          <div className="text-center">
            <div className="flex items-center space-x-1">
              <TrendingUp className="h-4 w-4 text-green-500" />
              <span className="text-sm font-bold text-gray-700">{level}</span>
            </div>
            <span className="text-xs text-gray-500">Nível</span>
          </div>
          <button
            onClick={initializeGame}
            className="flex items-center space-x-2 bg-purple-500 text-white px-3 py-1 rounded-lg hover:bg-purple-600 transition-colors"
          >
            <RotateCcw className="h-4 w-4" />
            <span>Novo</span>
          </button>
        </div>
      </div>

      {cards.length > 0 && (
        <div className="mb-4 p-3 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg">
          <h4 className="font-semibold text-purple-800">Categoria: {cards[0].category}</h4>
          <div className="flex justify-between text-sm text-purple-600 mt-1">
            <span>Jogadas: {moves}</span>
            <span>Sequência: {streak}x</span>
          </div>
        </div>
      )}
      
      {isGameComplete && (
        <div className="bg-green-100 border border-green-300 text-green-800 px-4 py-3 rounded-lg mb-4 text-center">
          <div className="flex items-center justify-center space-x-2 mb-2">
            <Star className="h-5 w-5 text-yellow-500" />
            <span className="font-bold">Parabéns! Nível {level} Completo!</span>
            <Star className="h-5 w-5 text-yellow-500" />
          </div>
          <p className="mb-3">Você desenvolveu foco e memória em {moves} jogadas!</p>
          <button
            onClick={nextLevel}
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
          >
            Próximo Nível
          </button>
        </div>
      )}
      
      <div className="grid grid-cols-4 gap-3">
        {cards.map((card) => (
          <button
            key={card.id}
            onClick={() => handleCardClick(card.id)}
            className={`
              aspect-square rounded-lg text-2xl font-bold transition-all duration-300 transform hover:scale-105
              ${card.isFlipped || card.isMatched
                ? 'bg-white border-2 border-purple-300 shadow-md'
                : 'bg-gradient-to-br from-purple-400 to-pink-400 hover:from-purple-500 hover:to-pink-500'
              }
            `}
          >
            {card.isFlipped || card.isMatched ? card.value : '?'}
          </button>
        ))}
      </div>
    </div>
  );
};

export default MemoryGame;
