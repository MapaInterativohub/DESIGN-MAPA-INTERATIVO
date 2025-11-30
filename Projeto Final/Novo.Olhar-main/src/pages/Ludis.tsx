import React, { useState } from 'react';
import Navigation from '../components/Navigation';
import MemoryGame from '../components/MemoryGame';
import QuizGame from '../components/QuizGame';
import WordGame from '../components/WordGame';
import { Gamepad2, Zap, Sparkles, Trophy, Smile, Star, Check } from 'lucide-react';

const Ludis = () => {
  const [completedHabits, setCompletedHabits] = useState<Set<number>>(new Set());

  const ludisAreas = [
    {
      title: 'Jogos e Diversão',
      icon: Gamepad2,
      color: 'from-blue-500 to-purple-500',
      content: 'Explore o mundo dos jogos e atividades lúdicas que estimulam a criatividade e proporcionam momentos de alegria e descontração.',
      tips: [
        'Dedique tempo para jogos que estimulem o raciocínio',
        'Pratique atividades que desenvolvam habilidades motoras',
        'Participe de jogos em grupo para socializar',
        'Experimente diferentes tipos de entretenimento digital'
      ]
    },
    {
      title: 'Criatividade e Arte',
      icon: Sparkles,
      color: 'from-pink-500 to-rose-500',
      content: 'Desenvolva sua expressão artística através de atividades criativas que nutrem a imaginação e promovem o bem-estar emocional.',
      tips: [
        'Experimente diferentes formas de arte e expressão',
        'Dedique tempo para atividades manuais e criativas',
        'Participe de workshops e oficinas artísticas',
        'Compartilhe suas criações com outros'
      ]
    },
    {
      title: 'Aprendizado Lúdico',
      icon: Zap,
      color: 'from-yellow-500 to-orange-500',
      content: 'Transforme o aprendizado em uma experiência divertida e engajante, descobrindo novas habilidades através de métodos interativos.',
      tips: [
        'Use jogos educativos para aprender novos conceitos',
        'Participe de quiz e desafios intelectuais',
        'Explore plataformas de aprendizado gamificado',
        'Ensine outros o que você aprendeu de forma divertida'
      ]
    },
    {
      title: 'Conquistas e Metas',
      icon: Trophy,
      color: 'from-green-500 to-teal-500',
      content: 'Estabeleça objetivos pessoais e celebre suas conquistas, criando um sistema de recompensas que motive seu crescimento contínuo.',
      tips: [
        'Defina metas pequenas e alcançáveis',
        'Celebre cada conquista, por menor que seja',
        'Mantenha um registro de seu progresso',
        'Compartilhe suas vitórias com amigos e família'
      ]
    }
  ];

  const ludisHabits = [
    'Reservar 30 minutos diários para atividades lúdicas',
    'Experimentar um novo jogo ou hobby semanalmente',
    'Participar de atividades em grupo regularmente',
    'Manter um diário de experiências divertidas',
    'Desafiar-se com quebra-cabeças e jogos mentais',
    'Celebrar pequenas conquistas diárias'
  ];

  const toggleHabit = (index: number) => {
    const newCompletedHabits = new Set(completedHabits);
    if (newCompletedHabits.has(index)) {
      newCompletedHabits.delete(index);
    } else {
      newCompletedHabits.add(index);
    }
    setCompletedHabits(newCompletedHabits);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 mb-6">
              <Gamepad2 className="h-10 w-10 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Ludis - Diversão e Aprendizado
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Descubra o poder transformador dos jogos e atividades lúdicas. 
              Desenvolva habilidades, estimule a criatividade e encontre alegria no aprendizado.
            </p>
          </div>
        </div>
      </section>

      {/* Games Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Jogos Interativos
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
            <MemoryGame />
            <QuizGame />
            <WordGame />
          </div>
        </div>
      </section>

      {/* Ludis Areas Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Dimensões do Universo Ludis
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {ludisAreas.map((area, index) => {
              const Icon = area.icon;
              return (
                <div
                  key={area.title}
                  className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="flex items-center mb-6">
                    <div className={`w-16 h-16 bg-gradient-to-br ${area.color} rounded-lg flex items-center justify-center mr-4`}>
                      <Icon className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">
                      {area.title}
                    </h3>
                  </div>
                  
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {area.content}
                  </p>
                  
                  <div className="space-y-3">
                    <h4 className="font-semibold text-gray-900">Atividades Recomendadas:</h4>
                    <ul className="space-y-2">
                      {area.tips.map((tip, tipIndex) => (
                        <li key={tipIndex} className="flex items-start text-gray-700">
                          <div className="w-2 h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                          <span>{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Habits Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-purple-500 to-pink-500">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <Star className="h-12 w-12 text-white mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-white mb-4">
              Hábitos Lúdicos Diários
            </h2>
            <p className="text-purple-100 text-lg max-w-2xl mx-auto">
              Incorpore diversão e aprendizado na sua rotina com estas práticas envolventes
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {ludisHabits.map((habit, index) => (
              <button
                key={habit}
                onClick={() => toggleHabit(index)}
                className={`
                  relative p-4 rounded-lg transition-all duration-200 text-left
                  ${completedHabits.has(index) 
                    ? 'bg-white/20 backdrop-blur-sm border-2 border-white/50' 
                    : 'bg-white/10 backdrop-blur-sm hover:bg-white/20'
                  }
                `}
              >
                <div className="flex items-start space-x-3">
                  <div className={`
                    flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center mt-0.5
                    ${completedHabits.has(index) 
                      ? 'bg-white border-white' 
                      : 'border-white/50 hover:border-white'
                    }
                  `}>
                    {completedHabits.has(index) && (
                      <Check className="h-4 w-4 text-purple-500" />
                    )}
                  </div>
                  <span className={`
                    font-medium
                    ${completedHabits.has(index) 
                      ? 'text-white line-through opacity-75' 
                      : 'text-white'
                    }
                  `}>
                    {habit}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto space-y-12">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              O Poder dos Jogos no Desenvolvimento Pessoal
            </h3>
            <div className="prose prose-lg max-w-none text-gray-600">
              <p className="mb-4">
                O universo lúdico vai muito além do entretenimento. Jogos e atividades divertidas 
                são ferramentas poderosas para o desenvolvimento de habilidades cognitivas, sociais 
                e emocionais. Eles estimulam a criatividade, melhoram a concentração e promovem 
                o bem-estar mental.
              </p>
              <p className="mb-4">
                Através de experiências lúdicas, desenvolvemos resiliência, aprendemos a lidar com 
                desafios de forma positiva e cultivamos uma mentalidade de crescimento. Os jogos 
                nos ensinam que errar faz parte do processo de aprendizado e que persistência 
                leva ao sucesso.
              </p>
              <p>
                Integrar elementos lúdicos na vida cotidiana torna as tarefas mais prazerosas e 
                eficazes. Gamificar objetivos pessoais e profissionais pode aumentar significativamente 
                a motivação e o engajamento.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              Criatividade e Expressão Artística
            </h3>
            <div className="prose prose-lg max-w-none text-gray-600">
              <p className="mb-4">
                A expressão criativa é fundamental para o bem-estar emocional e o desenvolvimento 
                pessoal. Atividades artísticas como desenho, música, escrita criativa e artesanato 
                oferecem uma forma única de comunicação e autoexpressão.
              </p>
              <p className="mb-4">
                Não é necessário ser um artista profissional para desfrutar dos benefícios da 
                criatividade. O importante é permitir-se experimentar, explorar e se divertir 
                com o processo criativo, sem julgamentos ou expectativas de perfeição.
              </p>
              <p>
                Reserve momentos regulares para atividades criativas em sua rotina. Esses momentos 
                de pausa criativa podem reduzir o estresse, aumentar a autoestima e proporcionar 
                uma sensação profunda de realização pessoal.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Ludis;
