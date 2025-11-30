
import React, { useState } from 'react';
import { CheckCircle, XCircle, RotateCcw, TrendingUp, Star, Brain } from 'lucide-react';

const QuizGame = () => {
  const questions = [
    {
      question: "Qual é a característica mais importante de uma mentalidade de crescimento?",
      options: ["Evitar desafios", "Acreditar que habilidades podem ser desenvolvidas", "Buscar sempre estar certo", "Competir com outros"],
      correct: 1,
      category: "Mindset",
      explanation: "A mentalidade de crescimento acredita que talentos e habilidades podem ser desenvolvidos através de esforço e prática."
    },
    {
      question: "O que é mais eficaz para desenvolver uma nova habilidade?",
      options: ["Prática esporádica", "Prática deliberada e consistente", "Apenas teoria", "Observar outros"],
      correct: 1,
      category: "Desenvolvimento",
      explanation: "A prática deliberada e consistente é fundamental para o desenvolvimento de qualquer habilidade."
    },
    {
      question: "Como lidar melhor com feedback negativo?",
      options: ["Ignorar completamente", "Ficar na defensiva", "Ver como oportunidade de crescimento", "Criticar quem deu o feedback"],
      correct: 2,
      category: "Crescimento",
      explanation: "Feedback negativo é uma oportunidade valiosa para identificar áreas de melhoria e crescer profissionalmente."
    },
    {
      question: "Qual estratégia é mais eficaz para estabelecer metas?",
      options: ["Metas vagas e gerais", "Metas SMART (específicas, mensuráveis, alcançáveis)", "Muitas metas ao mesmo tempo", "Metas apenas de longo prazo"],
      correct: 1,
      category: "Planejamento",
      explanation: "Metas SMART são mais eficazes porque fornecem clareza e direção específica para o progresso."
    },
    {
      question: "O que caracteriza uma comunicação assertiva?",
      options: ["Ser sempre passivo", "Expressar ideias com clareza e respeito", "Ser agressivo quando necessário", "Evitar conflitos sempre"],
      correct: 1,
      category: "Comunicação",
      explanation: "Comunicação assertiva equilibra a expressão clara das próprias ideias com respeito pelas opiniões dos outros."
    }
  ];

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [streak, setStreak] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);
  const [userAnswers, setUserAnswers] = useState<boolean[]>([]);

  const handleAnswer = (answerIndex: number) => {
    if (isAnswered) return;
    
    setSelectedAnswer(answerIndex);
    setIsAnswered(true);
    setShowExplanation(true);
    
    const isCorrect = answerIndex === questions[currentQuestion].correct;
    setUserAnswers([...userAnswers, isCorrect]);
    
    if (isCorrect) {
      setScore(score + (10 + streak * 2));
      setStreak(streak + 1);
    } else {
      setStreak(0);
    }
    
    setTimeout(() => {
      if (currentQuestion + 1 < questions.length) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
        setIsAnswered(false);
        setShowExplanation(false);
      } else {
        setShowResult(true);
      }
    }, 3000);
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowResult(false);
    setSelectedAnswer(null);
    setIsAnswered(false);
    setStreak(0);
    setShowExplanation(false);
    setUserAnswers([]);
  };

  const getPerformanceMessage = () => {
    const correct = userAnswers.filter(Boolean).length;
    const percentage = (correct / questions.length) * 100;
    
    if (percentage >= 80) return { message: "Excelente! Você tem uma mentalidade de crescimento muito desenvolvida!", emoji: "🏆" };
    if (percentage >= 60) return { message: "Muito bom! Continue desenvolvendo suas habilidades!", emoji: "👏" };
    return { message: "Continue praticando! Cada erro é uma oportunidade de aprendizado!", emoji: "💪" };
  };

  if (showResult) {
    const performance = getPerformanceMessage();
    const correct = userAnswers.filter(Boolean).length;
    
    return (
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="text-center">
          <Brain className="h-12 w-12 text-purple-500 mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Quiz de Crescimento Completo!</h3>
          <div className="text-6xl mb-4">{performance.emoji}</div>
          <p className="text-lg text-gray-700 mb-4">{performance.message}</p>
          
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-4 mb-6">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-purple-600">{correct}/{questions.length}</div>
                <div className="text-sm text-gray-600">Acertos</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-green-600">{score}</div>
                <div className="text-sm text-gray-600">Pontos</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-yellow-600">{Math.round((correct / questions.length) * 100)}%</div>
                <div className="text-sm text-gray-600">Precisão</div>
              </div>
            </div>
          </div>
          
          <button
            onClick={resetQuiz}
            className="flex items-center space-x-2 bg-purple-500 text-white px-6 py-3 rounded-lg hover:bg-purple-600 transition-colors mx-auto"
          >
            <RotateCcw className="h-5 w-5" />
            <span>Novo Desafio</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-xl font-bold text-gray-900">Quiz de Crescimento Pessoal</h3>
          <p className="text-sm text-gray-600">Teste seus conhecimentos sobre desenvolvimento</p>
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
              <span className="text-sm font-bold text-gray-700">{streak}</span>
            </div>
            <span className="text-xs text-gray-500">Sequência</span>
          </div>
        </div>
      </div>

      <div className="mb-4 p-3 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium text-blue-800">
            {questions[currentQuestion].category}
          </span>
          <span className="text-sm text-blue-600">
            Questão {currentQuestion + 1} de {questions.length}
          </span>
        </div>
      </div>
      
      <div className="mb-6">
        <h4 className="text-lg font-semibold text-gray-800 mb-4">
          {questions[currentQuestion].question}
        </h4>
        
        <div className="space-y-3">
          {questions[currentQuestion].options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswer(index)}
              disabled={isAnswered}
              className={`
                w-full text-left p-4 rounded-lg border transition-all duration-200 flex items-center justify-between
                ${isAnswered
                  ? index === questions[currentQuestion].correct
                    ? 'bg-green-100 border-green-300 text-green-800'
                    : index === selectedAnswer
                    ? 'bg-red-100 border-red-300 text-red-800'
                    : 'bg-gray-100 border-gray-300 text-gray-600'
                  : 'bg-gray-50 border-gray-200 hover:bg-purple-50 hover:border-purple-300 transform hover:scale-102'
                }
              `}
            >
              <span>{option}</span>
              {isAnswered && (
                <span>
                  {index === questions[currentQuestion].correct ? (
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  ) : index === selectedAnswer ? (
                    <XCircle className="h-5 w-5 text-red-600" />
                  ) : null}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {showExplanation && (
        <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <h5 className="font-semibold text-blue-800 mb-2">💡 Explicação:</h5>
          <p className="text-blue-700">{questions[currentQuestion].explanation}</p>
        </div>
      )}
      
      <div className="flex justify-center">
        <div className="flex space-x-2">
          {questions.map((_, index) => (
            <div
              key={index}
              className={`w-3 h-3 rounded-full transition-all duration-200 ${
                index < currentQuestion 
                  ? userAnswers[index] 
                    ? 'bg-green-500' 
                    : 'bg-red-500'
                  : index === currentQuestion 
                    ? 'bg-purple-500' 
                    : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuizGame;
