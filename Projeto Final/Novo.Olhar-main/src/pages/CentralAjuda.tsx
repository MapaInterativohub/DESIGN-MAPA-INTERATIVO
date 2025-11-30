
import React from 'react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import { Phone, Mail, MessageCircle, HelpCircle, Clock, User } from 'lucide-react';

const CentralAjuda = () => {
  const helpOptions = [
    {
      title: 'Atendimento Telefônico',
      description: 'Fale conosco através do nosso número dedicado para apoio',
      icon: Phone,
      contact: '0800-123-4567',
      hours: '24 horas por dia, 7 dias por semana'
    },
    {
      title: 'Chat Online',
      description: 'Converse com nossas especialistas em tempo real',
      icon: MessageCircle,
      contact: 'Disponível no site',
      hours: 'Segunda a Sexta: 8h às 18h'
    },
    {
      title: 'E-mail de Apoio',
      description: 'Envie sua dúvida ou relato por e-mail',
      icon: Mail,
      contact: 'ajuda@novoolhar.com.br',
      hours: 'Resposta em até 24 horas'
    }
  ];

  const faqItems = [
    {
      question: 'Como posso denunciar uma situação de violência?',
      answer: 'Você pode ligar para o 180 (Central de Atendimento à Mulher), para o 190 (Polícia Militar) ou procurar uma Delegacia da Mulher mais próxima.'
    },
    {
      question: 'O atendimento é gratuito e confidencial?',
      answer: 'Sim, todos os nossos serviços são completamente gratuitos e mantemos total sigilo sobre suas informações pessoais.'
    },
    {
      question: 'Posso receber ajuda mesmo sem documentos?',
      answer: 'Sim, oferecemos apoio independentemente da sua situação documental. Também podemos ajudar na regularização de documentos.'
    },
    {
      question: 'Vocês oferecem abrigo temporário?',
      answer: 'Trabalhamos em parceria com casas de acolhimento e podemos direcionar para locais seguros quando necessário.'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 to-pink-50">
      <Navigation />
      
      <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-rose-500 to-pink-500 bg-clip-text text-transparent mb-6">
              Central de Ajuda
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Estamos aqui para oferecer todo o suporte que você precisa. 
              Escolha a forma de contato que mais se adapta à sua situação.
            </p>
          </div>

          {/* Opções de Contato */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {helpOptions.map((option, index) => {
              const Icon = option.icon;
              return (
                <div key={index} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
                  <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-rose-400 to-pink-400 rounded-lg mb-4 mx-auto">
                    <Icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2 text-center">{option.title}</h3>
                  <p className="text-gray-600 mb-4 text-center">{option.description}</p>
                  <div className="space-y-2">
                    <p className="text-rose-600 font-medium text-center">{option.contact}</p>
                    <p className="text-sm text-gray-500 text-center flex items-center justify-center">
                      <Clock className="h-4 w-4 mr-1" />
                      {option.hours}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Emergência */}
          <div className="bg-rose-100 border border-rose-200 rounded-xl p-6 mb-16">
            <div className="flex items-center mb-4">
              <div className="bg-rose-500 rounded-full p-2 mr-3">
                <Phone className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-rose-800">Emergência</h3>
            </div>
            <p className="text-rose-700 mb-4">
              Se você está em perigo imediato, não hesite em buscar ajuda:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white rounded-lg p-4">
                <p className="font-semibold text-rose-800">Central de Atendimento à Mulher</p>
                <p className="text-2xl font-bold text-rose-600">180</p>
                <p className="text-sm text-gray-600">Gratuito e sigiloso</p>
              </div>
              <div className="bg-white rounded-lg p-4">
                <p className="font-semibold text-rose-800">Polícia Militar</p>
                <p className="text-2xl font-bold text-rose-600">190</p>
                <p className="text-sm text-gray-600">Emergências</p>
              </div>
            </div>
          </div>

          {/* FAQ */}
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Perguntas Frequentes</h2>
            <div className="space-y-6">
              {faqItems.map((item, index) => (
                <div key={index} className="bg-white rounded-xl shadow-md p-6">
                  <div className="flex items-start">
                    <HelpCircle className="h-6 w-6 text-rose-500 mr-3 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.question}</h3>
                      <p className="text-gray-600">{item.answer}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

      <Footer />
    </div>
  );
};

export default CentralAjuda;
