import React from 'react';
import { Link } from 'react-router-dom';
import Navigation from '../components/Navigation';
import ImageCarousel from '../components/ImageCarousel';
import ThemeCard from '../components/ThemeCard';
import Footer from '../components/Footer';
import { Briefcase, TrendingUp, Gamepad2, Map ,MapPin} from 'lucide-react';

const Index = () => {
  const themes = [
    {
      title: 'Empreendedorismo',
      description: 'Descubra como transformar suas ideias em negócios de sucesso. Aprenda estratégias, ferramentas e metodologias para empreender.',
      icon: Briefcase,
      link: '/empreendedorismo',
      color: 'from-rose-400 to-pink-400'
    },
    {
      title: 'Plano de Carreira',
      description: 'Desenvolva um plano estratégico para sua carreira profissional. Defina metas, habilidades e passos para alcançar seus objetivos.',
      icon: TrendingUp,
      link: '/plano-carreira',
      color: 'from-emerald-400 to-teal-400'
    },
    {
      title: 'Encontre Apoio',
      description: 'Descubra lugares e pessoas prontas para acolher você. Encontre escuta, orientação e força para recomeçar com segurança e esperança.',
      icon: MapPin,
      link: '/encontre-apoio',
      color: 'from-purple-400 to-pink-400'
    },
    {
      title: 'Mapa Interativo',
      description: 'Explore oportunidades, eventos e recursos na sua região. Conecte-se com a comunidade e descubra novos caminhos.',
      icon: Map,
      link: '/mapa-interativo',
      color: 'from-purple-300 to-pink-300'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 to-pink-50">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-rose-500 to-pink-500 bg-clip-text text-transparent mb-6 animate-fade-in">
              Bem-vinda ao Novo Olhar
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed animate-fade-in">
              Sua plataforma completa para desenvolvimento pessoal e profissional. 
              Explore recursos que irão transformar sua vida com um novo olhar.
            </p>
          </div>
          
          <ImageCarousel />
        </div>
      </section>

      {/* Themes Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Explore Nossos Temas
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Cada área foi cuidadosamente desenvolvida para oferecer o melhor conteúdo 
              e ferramentas para seu crescimento.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {themes.map((theme, index) => (
              <div
                key={theme.title}
                className="animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <ThemeCard {...theme} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-rose-100 to-pink-100">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
            Comece sua jornada hoje mesmo
          </h2>
          <p className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
            Junte-se a milhares de pessoas que já estão transformando suas vidas 
            com nossas ferramentas e conteúdos exclusivos.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/empreendedorismo"
              className="bg-white text-rose-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200 inline-block"
            >
              Explorar Conteúdos
            </Link>
            <Link
              to="/sobre"
              className="border-2 border-gray-800 text-gray-800 px-8 py-3 rounded-lg font-semibold hover:bg-gray-800 hover:text-white transition-all duration-200 inline-block"
            >
              Saiba Mais
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
