
import React from 'react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import { Heart, Users, Target, Shield, Lightbulb, BookOpen } from 'lucide-react';

const Sobre = () => {
  const valores = [
    {
      icon: Heart,
      title: 'Acolhimento',
      description: 'Criamos um ambiente seguro e acolhedor onde cada mulher se sinta valorizada e respeitada.'
    },
    {
      icon: Users,
      title: 'Comunidade',
      description: 'Promovemos conexões genuínas entre mulheres que compartilham objetivos similares de crescimento.'
    },
    {
      icon: Target,
      title: 'Empoderamento',
      description: 'Oferecemos ferramentas e conhecimento para que cada mulher alcance seus objetivos pessoais e profissionais.'
    },
    {
      icon: Shield,
      title: 'Segurança',
      description: 'Garantimos um espaço livre de julgamentos, onde vulnerabilidades podem ser compartilhadas com confiança.'
    }
  ];

  const recursos = [
    {
      icon: Lightbulb,
      title: 'Empreendedorismo',
      description: 'Guias completos para transformar ideias em negócios prósperos, com estratégias práticas e cases de sucesso.'
    },
    {
      icon: Target,
      title: 'Plano de Carreira',
      description: 'Ferramentas para construir uma trajetória profissional sólida, definindo metas e desenvolvendo habilidades.'
    },
    {
      icon: Heart,
      title: 'Saúde e Bem-estar',
      description: 'Conteúdos sobre saúde física e mental, mindfulness e práticas para uma vida equilibrada.'
    },
    {
      icon: BookOpen,
      title: 'Mapa Interativo',
      description: 'Descubra oportunidades, eventos e recursos na sua região através de nossa plataforma interativa.'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 to-pink-50">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-rose-500 to-pink-500 bg-clip-text text-transparent mb-6">
            Sobre o Novo Olhar
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            Uma plataforma dedicada ao desenvolvimento integral da mulher moderna, 
            oferecendo suporte, conhecimento e ferramentas para uma vida plena e próspera.
          </p>
        </div>
      </section>

      {/* Missão Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Nossa Missão</h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              Acreditamos que cada mulher possui um potencial único e merece ter acesso às ferramentas 
              necessárias para desenvolver-se pessoal e profissionalmente. Nossa missão é criar um 
              ecossistema de apoio onde mulheres possam crescer, conectar-se e prosperar juntas.
            </p>
          </div>
          
          <div className="bg-gradient-to-r from-rose-100 to-pink-100 rounded-2xl p-8 text-center">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              "Transformando vidas através do acolhimento e desenvolvimento pessoal"
            </h3>
            <p className="text-gray-700 text-lg">
              Mais que uma plataforma, somos uma comunidade que acredita no poder da sororidade 
              e no crescimento coletivo.
            </p>
          </div>
        </div>
      </section>

      {/* Valores Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Nossos Valores</h2>
            <p className="text-lg text-gray-600">
              Os princípios que norteiam tudo o que fazemos
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {valores.map((valor, index) => {
              const Icon = valor.icon;
              return (
                <div
                  key={valor.title}
                  className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="bg-gradient-to-br from-rose-400 to-pink-400 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{valor.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{valor.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Recursos Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">O que Oferecemos</h2>
            <p className="text-lg text-gray-600">
              Recursos completos para seu desenvolvimento pessoal e profissional
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {recursos.map((recurso, index) => {
              const Icon = recurso.icon;
              return (
                <div
                  key={recurso.title}
                  className="flex items-start space-x-4 p-6 rounded-xl hover:bg-gray-50 transition-colors duration-300"
                >
                  <div className="bg-gradient-to-br from-rose-400 to-pink-400 w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{recurso.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{recurso.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Comunidade Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-rose-200 to-pink-200 rounded-2xl p-8 md:p-12 text-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">
              Faça Parte da Nossa Comunidade
            </h2>
            <p className="text-lg text-gray-700 mb-8 leading-relaxed">
              Junte-se a milhares de mulheres que já estão transformando suas vidas através do 
              Novo Olhar. Aqui você encontrará não apenas conteúdo de qualidade, mas também 
              uma rede de apoio genuína e inspiradora.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/empreendedorismo"
                className="bg-white text-rose-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200"
              >
                Começar Agora
              </a>
              <a
                href="/fale-conosco"
                className="border-2 border-gray-800 text-gray-800 px-8 py-3 rounded-lg font-semibold hover:bg-gray-800 hover:text-white transition-all duration-200"
              >
                Entre em Contato
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Sobre;
