
import React, { useState, useEffect } from 'react';
import { Lightbulb, RotateCcw, TrendingUp, Star, Target } from 'lucide-react';

const WordGame = () => {
  const words = [
    { word: 'RESILIENCIA', hint: 'Capacidade de se recuperar de adversidades', category: 'Mindset', points: 15 },
    { word: 'INOVACAO', hint: 'Introdução de algo novo e útil', category: 'Criatividade', points: 12 },
    { word: 'LIDERANCA', hint: 'Habilidade de influenciar e guiar outros', category: 'Liderança', points: 13 },
    { word: 'EMPATIA', hint: 'Capacidade de se colocar no lugar do outro', category: 'Soft Skills', points: 10 },
    { word: 'ADAPTABILIDADE', hint: 'Flexibilidade para se ajustar a mudanças', category: 'Competência', points: 18 },
    { word: 'NETWORKING', hint: 'Construção de rede de relacionamentos profissionais', category: 'Carreira', points: 14 },
    { word: 'PRODUTIVIDADE', hint: 'Eficiência na realização de tarefas', category: 'Performance', points: 16 }
  ];

  const [currentWord, setCurrentWord] = useState(0);
  const [guessedLetters, setGuessedLetters] = useState<string[]>([]);
  const [wrongGuesses, setWrongGuesses] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [gameStatus, setGameStatus] = useState<'playing' | 'won' | 'lost'>('playing');
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [wordsCompleted, setWordsCompleted] = useState(0);

  const maxWrongGuesses = 6;
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

  const currentWordData = words[currentWord];
  const wordProgress = currentWordData.word
    .split('')
    .map(letter => guessedLetters.includes(letter) ? letter : '_')
    .join(' ');

  useEffect(() => {
    const isWordComplete = currentWordData.word
      .split('')
      .every(letter => guessedLetters.includes(letter));
    
    if (isWordComplete) {
      setGameStatus('won');
      const bonusPoints = Math.max(currentWordData.points - wrongGuesses * 2, 5);
      setScore(score + bonusPoints);
      setWordsCompleted(wordsCompleted + 1);
    } else if (wrongGuesses >= maxWrongGuesses) {
      setGameStatus('lost');
    }
  }, [guessedLetters, wrongGuesses, currentWordData.word, currentWordData.points, score, wordsCompleted]);

  const handleLetterGuess = (letter: string) => {
    if (guessedLetters.includes(letter) || gameStatus !== 'playing') return;
    
    setGuessedLetters([...guessedLetters, letter]);
    
    if (!currentWordData.word.includes(letter)) {
      setWrongGuesses(wrongGuesses + 1);
    }
  };

  const nextWord = () => {
    if (currentWord + 1 < words.length) {
      setCurrentWord(currentWord + 1);
      setGuessedLetters([]);
      setWrongGuesses(0);
      setShowHint(false);
      setGameStatus('playing');
      
      // Level up a cada 3 palavras
      if ((wordsCompleted + 1) % 3 === 0) {
        setLevel(level + 1);
        setScore(score + 25); // Bonus de nível
      }
    }
  };

  const resetGame = () => {
    setCurrentWord(0);
    setGuessedLetters([]);
    setWrongGuesses(0);
    setShowHint(false);
    setGameStatus('playing');
    setScore(0);
    setLevel(1);
    setWordsCompleted(0);
  };

  const getHealthColor = () => {
    const health = ((maxWrongGuesses - wrongGuesses) / maxWrongGuesses) * 100;
    if (health > 66) return 'bg-green-500';
    if (health > 33) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-xl font-bold text-gray-900">Palavras do Crescimento</h3>
          <p className="text-sm text-gray-600">Desenvolva vocabulário profissional</p>
        </div>
        <div className="flex space-x-4">
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
            onClick={() => setShowHint(!showHint)}
            className="flex items-center space-x-2 bg-yellow-500 text-white px-3 py-1 rounded-lg hover:bg-yellow-600 transition-colors"
          >
            <Lightbulb className="h-4 w-4" />
            <span>Dica</span>
          </button>
          <button
            onClick={resetGame}
            className="flex items-center space-x-2 bg-purple-500 text-white px-3 py-1 rounded-lg hover:bg-purple-600 transition-colors"
          >
            <RotateCcw className="h-4 w-4" />
            <span>Novo</span>
          </button>
        </div>
      </div>

      {/* Barra de Vida */}
      <div className="mb-4">
        <div className="flex justify-between text-sm text-gray-600 mb-1">
          <span>Energia</span>
          <span>{maxWrongGuesses - wrongGuesses}/{maxWrongGuesses}</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className={`h-2 rounded-full transition-all duration-300 ${getHealthColor()}`}
            style={{ width: `${((maxWrongGuesses - wrongGuesses) / maxWrongGuesses) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Informações da Palavra */}
      <div className="mb-4 p-3 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
        <div className="flex justify-between items-center">
          <div>
            <span className="text-sm font-medium text-blue-800">
              {currentWordData.category}
            </span>
            <div className="text-xs text-blue-600">
              Palavra {currentWord + 1} de {words.length} • {currentWordData.points} pts
            </div>
          </div>
          <Target className="h-5 w-5 text-blue-500" />
        </div>
      </div>

      {showHint && (
        <div className="bg-yellow-100 border border-yellow-300 text-yellow-800 px-4 py-3 rounded-lg mb-4">
          <div className="flex items-center space-x-2">
            <Lightbulb className="h-5 w-5" />
            <span className="font-medium">Dica:</span>
            <span>{currentWordData.hint}</span>
          </div>
        </div>
      )}

      <div className="text-center mb-6">
        <div className="text-3xl font-mono font-bold text-gray-800 mb-4 tracking-wider bg-gray-50 p-4 rounded-lg">
          {wordProgress}
        </div>
      </div>

      {gameStatus === 'won' && (
        <div className="bg-green-100 border border-green-300 text-green-800 px-4 py-3 rounded-lg mb-4 text-center">
          <div className="flex items-center justify-center space-x-2 mb-2">
            <Star className="h-5 w-5 text-yellow-500" />
            <span className="font-bold">Excelente! +{Math.max(currentWordData.points - wrongGuesses * 2, 5)} pontos!</span>
          </div>
          <p className="mb-3">Você dominou o conceito de "{currentWordData.word}"!</p>
          {currentWord + 1 < words.length ? (
            <button
              onClick={nextWord}
              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
            >
              Próxima Palavra
            </button>
          ) : (
            <div>
              <p className="font-bold mb-2">🎉 Parabéns! Você completou todos os desafios!</p>
              <button
                onClick={resetGame}
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
              >
                Jogar Novamente
              </button>
            </div>
          )}
        </div>
      )}

      {gameStatus === 'lost' && (
        <div className="bg-red-100 border border-red-300 text-red-800 px-4 py-3 rounded-lg mb-4 text-center">
          <p className="font-bold mb-2">Não desista! A palavra era: {currentWordData.word}</p>
          <p className="text-sm mb-3">"{currentWordData.hint}"</p>
          <button
            onClick={nextWord}
            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors mr-2"
          >
            Tentar Próxima
          </button>
        </div>
      )}

      <div className="grid grid-cols-6 sm:grid-cols-9 gap-2">
        {alphabet.map(letter => (
          <button
            key={letter}
            onClick={() => handleLetterGuess(letter)}
            disabled={guessedLetters.includes(letter) || gameStatus !== 'playing'}
            className={`
              aspect-square rounded-lg font-bold transition-all duration-200 transform hover:scale-105
              ${guessedLetters.includes(letter)
                ? currentWordData.word.includes(letter)
                  ? 'bg-green-500 text-white shadow-lg'
                  : 'bg-red-500 text-white'
                : gameStatus === 'playing'
                  ? 'bg-gray-200 hover:bg-purple-200 text-gray-800'
                  : 'bg-gray-100 text-gray-400'
              }
              ${gameStatus !== 'playing' ? 'opacity-50 cursor-not-allowed' : ''}
            `}
          >
            {letter}
          </button>
        ))}
      </div>
    </div>
  );
};

export default WordGame;
