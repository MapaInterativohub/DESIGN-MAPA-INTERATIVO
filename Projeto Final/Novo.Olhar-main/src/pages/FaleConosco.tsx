
import React, { useState } from 'react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import { Mail, Phone, MapPin, Send, User, MessageSquare } from 'lucide-react';

const FaleConosco = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    urgent: false
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Mensagem enviada com sucesso! Entraremos em contato em breve.');
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: '',
      urgent: false
    });
  };

  const contactInfo = [
    {
      icon: Mail,
      title: 'E-mail',
      info: 'contato@novoolhar.com.br',
      description: 'Resposta em até 24 horas'
    },
    {
      icon: Phone,
      title: 'Telefone',
      info: '(11) 1234-5678',
      description: 'Segunda a Sexta: 8h às 18h'
    },
    {
      icon: MapPin,
      title: 'Endereço',
      info: 'Rua da Esperança, 123 - São Paulo/SP',
      description: 'CEP: 01234-567'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 to-pink-50">
      <Navigation />
      
      <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-rose-500 to-pink-500 bg-clip-text text-transparent mb-6">
              Fale Conosco
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Sua voz é importante para nós. Entre em contato e compartilhe suas dúvidas, 
              sugestões ou necessite de apoio. Estamos aqui para escutar e ajudar.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            
            {/* Formulário */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <div className="flex items-center mb-6">
                <MessageSquare className="h-6 w-6 text-rose-500 mr-3" />
                <h2 className="text-2xl font-bold text-gray-900">Envie sua Mensagem</h2>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Nome Completo
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      E-mail
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                      Telefone (opcional)
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                    Assunto
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                    required
                  >
                    <option value="">Selecione um assunto</option>
                    <option value="ajuda">Pedido de Ajuda</option>
                    <option value="duvida">Dúvida</option>
                    <option value="sugestao">Sugestão</option>
                    <option value="elogio">Elogio</option>
                    <option value="reclamacao">Reclamação</option>
                    <option value="outro">Outro</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Mensagem
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={5}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                    placeholder="Conte-nos como podemos ajudar..."
                    required
                  ></textarea>
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="urgent"
                    name="urgent"
                    checked={formData.urgent}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-rose-600 focus:ring-rose-500 border-gray-300 rounded"
                  />
                  <label htmlFor="urgent" className="ml-2 block text-sm text-gray-700">
                    Esta é uma situação urgente
                  </label>
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-rose-500 to-pink-500 text-white py-3 px-6 rounded-lg font-semibold hover:from-rose-600 hover:to-pink-600 transition-all duration-200 flex items-center justify-center"
                >
                  <Send className="h-5 w-5 mr-2" />
                  Enviar Mensagem
                </button>
              </form>
            </div>

            {/* Informações de Contato */}
            <div className="space-y-8">
              <div className="bg-white rounded-xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Informações de Contato</h2>
                <div className="space-y-6">
                  {contactInfo.map((item, index) => {
                    const Icon = item.icon;
                    return (
                      <div key={index} className="flex items-start">
                        <div className="bg-gradient-to-br from-rose-400 to-pink-400 rounded-lg p-3 mr-4">
                          <Icon className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">{item.title}</h3>
                          <p className="text-rose-600 font-medium">{item.info}</p>
                          <p className="text-sm text-gray-600">{item.description}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Horários */}
              <div className="bg-white rounded-xl shadow-lg p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Horários de Atendimento</h3>
                <div className="space-y-2 text-gray-600">
                  <p><span className="font-medium">Segunda a Sexta:</span> 8h às 18h</p>
                  <p><span className="font-medium">Sábado:</span> 9h às 14h</p>
                  <p><span className="font-medium">Domingo:</span> Fechado</p>
                  <p className="text-rose-600 text-sm mt-4">
                    * Para emergências, ligue 180 (24h)
                  </p>
                </div>
              </div>

              {/* Compromisso */}
              <div className="bg-gradient-to-br from-rose-100 to-pink-100 rounded-xl p-8 border border-rose-200">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Nosso Compromisso</h3>
                <p className="text-gray-700">
                  Garantimos total sigilo e confidencialidade em todas as comunicações. 
                  Sua privacidade e segurança são nossas prioridades.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>

      <Footer />
    </div>
  );
};

export default FaleConosco;
