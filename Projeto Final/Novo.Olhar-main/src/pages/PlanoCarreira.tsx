import React, { useEffect, useState } from 'react';
import Navigation from '../components/Navigation';
import SkillForm from '../components/SkillForm';
import CareerCanvas from '../components/CareerCanvas';
import SwotAnalysis from '../components/SwotAnalysis';
import * as LucideIcons from "lucide-react";
import { useToast } from '@/hooks/use-toast';
import axios from 'axios';

const PlanoCarreira = () => {
  const { toast } = useToast();
  const [selectedSkill, setSelectedSkill] = useState<null | typeof sectionsHabilidades[0]>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'canvas' | 'swot'>('overview');

  const [sectionsPhases, setSectionsGet] = useState([]);
  const secPhases = () => {
    axios.get('http://localhost:3001/api/plano-carreira/temas').then((res) => {
      setSectionsGet(res.data);
      console.log(res.data);
    }).catch((err) => {
      console.error(err, "Erro ao obter sections")
    })
  }

  const [sectionsHabilidades, setSectionsHabilidadesGet] = useState([]);
  const secHabilidadesGet = () => {
    axios.get('http://localhost:3001/api/plano-carreira/habilidades').then((res) => {
      setSectionsHabilidadesGet(res.data);
      console.log(res.data);
    }).catch((err) => {
      console.error(err, "Erro ao obter sections")
    })
  }

  const [sectionsDestaques, setSectionsDestaques] = useState([]);
  const secDestaquesGet = () => {
    axios.get('http://localhost:3001/api/plano-carreira/destaques').then((res) => {
      setSectionsDestaques(res.data);
      console.log(res.data);
    }).catch((err) => {
      console.error(err, "Erro ao obter sections")
    })
  }

  const [sectionsMenu, setSectionsMenu] = useState([]);
  const secMenu = () => {
    axios.get('http://localhost:3001/api/plano-carreira/menu').then((res) => {
      setSectionsMenu(res.data);
      console.log(res.data);
    }).catch((err) => {
      console.error(err, "Erro ao obter sections")
    })
  }


  useEffect(() => {
    secPhases();
    secHabilidadesGet();
    secDestaquesGet();
    secMenu();
  }, [])

  const phases = [
    {
      title: 'Autoconhecimento',
      icon: LucideIcons.Compass,
      description: 'Identifique suas habilidades, interesses, valores e objetivos profissionais',
      steps: [
        'Faça uma análise SWOT pessoal',
        'Identifique suas paixões e interesses',
        'Avalie suas competências técnicas e comportamentais',
        'Defina seus valores e propósito de vida'
      ]
    },
    {
      title: 'Definição de Metas',
      icon: LucideIcons.Target,
      description: 'Estabeleça objetivos claros e mensuráveis para sua carreira',
      steps: [
        'Defina metas de curto, médio e longo prazo',
        'Use a metodologia SMART para suas metas',
        'Crie um cronograma realista',
        'Estabeleça indicadores de progresso'
      ]
    },
    {
      title: 'Desenvolvimento de Habilidades',
      icon: LucideIcons.BookOpen,
      description: 'Invista continuamente em seu crescimento profissional',
      steps: [
        'Identifique gaps de competências',
        'Busque cursos e certificações relevantes',
        'Pratique novas habilidades em projetos',
        'Solicite feedback constante'
      ]
    },
    {
      title: 'Networking e Relacionamentos',
      icon: LucideIcons.Users,
      description: 'Construa uma rede de contatos sólida e estratégica',
      steps: [
        'Participe de eventos do seu setor',
        'Mantenha contato com colegas e mentores',
        'Use LinkedIn de forma estratégica',
        'Ofereça ajuda antes de pedir favores'
      ]
    }
  ];

  const skills = [
    {
      name: 'Comunicação Eficaz',
      description: 'Habilidade de transmitir ideias de forma clara e persuasiva, tanto verbal quanto escrita.',
      importance: 'Essencial para liderança, colaboração e crescimento profissional.'
    },
    {
      name: 'Liderança',
      description: 'Capacidade de influenciar, motivar e guiar pessoas em direção a objetivos comuns.',
      importance: 'Fundamental para cargos de gestão e desenvolvimento de equipes.'
    },
    {
      name: 'Inteligência Emocional',
      description: 'Habilidade de reconhecer e gerenciar emoções próprias e dos outros.',
      importance: 'Crucial para relacionamentos saudáveis e tomada de decisões equilibradas.'
    },
    {
      name: 'Pensamento Crítico',
      description: 'Capacidade de analisar informações de forma objetiva e tomar decisões fundamentadas.',
      importance: 'Vital para resolução de problemas complexos e inovação.'
    },
    {
      name: 'Adaptabilidade',
      description: 'Flexibilidade para se ajustar a mudanças e aprender continuamente.',
      importance: 'Indispensável em um mundo de trabalho em constante transformação.'
    },
    {
      name: 'Gestão de Tempo',
      description: 'Habilidade de organizar e priorizar tarefas para maximizar produtividade.',
      importance: 'Essencial para eficiência e equilíbrio entre vida pessoal e profissional.'
    },
    {
      name: 'Trabalho em Equipe',
      description: 'Capacidade de colaborar efetivamente com pessoas diversas.',
      importance: 'Fundamental na maioria dos ambientes de trabalho modernos.'
    },
    {
      name: 'Resolução de Problemas',
      description: 'Habilidade de identificar, analisar e solucionar desafios de forma criativa.',
      importance: 'Competência valorizada em todas as áreas e níveis profissionais.'
    }
  ];

  const handleSkillClick = (skill: typeof skills[0]) => {
    setSelectedSkill(skill);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-green-500 to-green-600 mb-6">
              <LucideIcons.TrendingUp className="h-10 w-10 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Plano de Carreira
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Desenvolva um plano estratégico para sua carreira profissional.
              Defina metas claras e construa o caminho para alcançar seus objetivos.
            </p>
          </div>

          {/* Navigation Tabs */}
          <div className="flex justify-center mb-8">
            <div className="bg-white rounded-lg p-1 shadow-lg">
              <button
                onClick={() => setActiveTab('overview')}
                className={`px-6 py-3 rounded-lg font-medium transition-colors ${activeTab === 'overview'
                  ? 'bg-green-500 text-white'
                  : 'text-gray-600 hover:text-green-600'
                  }`}
              >
                {sectionsMenu[0]?.nome_exibicao}
              </button>
              <button
                onClick={() => setActiveTab('canvas')}
                className={`px-6 py-3 rounded-lg font-medium transition-colors ${activeTab === 'canvas'
                  ? 'bg-green-500 text-white'
                  : 'text-gray-600 hover:text-green-600'
                  }`}
              >
                <LucideIcons.Layers className="h-4 w-4 inline mr-2" />
                {sectionsMenu[1]?.nome_exibicao}
              </button>
              <button
                onClick={() => setActiveTab('swot')}
                className={`px-6 py-3 rounded-lg font-medium transition-colors ${activeTab === 'swot'
                  ? 'bg-green-500 text-white'
                  : 'text-gray-600 hover:text-green-600'
                  }`}
              >
                <LucideIcons.BarChart3 className="h-4 w-4 inline mr-2" />
                {sectionsMenu[2]?.nome_exibicao}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Conditional Content Based on Active Tab */}
      {activeTab === 'canvas' && (
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <CareerCanvas />
          </div>
        </section>
      )}

      {activeTab === 'swot' && (
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <SwotAnalysis />
          </div>
        </section>
      )}

      {activeTab === 'overview' && (
        <>
          {/* Phases Section */}
          <section className="py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
                Fases do Desenvolvimento de Carreira
              </h2>

              <div className="space-y-8">
                {sectionsPhases.map((phase, index) => {
                  const iconeFormatado = phase.icone.charAt(0).toUpperCase() + phase.icone.slice(1).toLowerCase()
                  const Icon = LucideIcons[iconeFormatado];
                  return (
                    <div
                      key={phase.titulo}
                      className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300"
                    >
                      <div className="flex flex-col lg:flex-row lg:items-center gap-10">
                        <div className="flex items-center">
                          <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center mr-4">
                            <Icon className="h-8 w-8 text-white" />
                          </div>
                          <div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">
                              {phase.titulo}
                            </h3>
                            <p className="text-gray-600">
                              {phase.descricao}
                            </p>
                          </div>
                        </div>

                        <div className="lg:flex-1">
                          <ul className="space-y-2">
                            {phase.passos.map((step, stepIndex) => (
                              <li key={stepIndex} className="flex items-center text-gray-700">
                                <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                                {step}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* Skills Section */}
          <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-green-500 to-green-600">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-12">
                <LucideIcons.Award className="h-12 w-12 text-white mx-auto mb-4" />
                <h2 className="text-3xl font-bold text-white mb-4">
                  Habilidades Essenciais do Século XXI
                </h2>
                <p className="text-green-100 text-lg max-w-2xl mx-auto">
                  Clique nas habilidades para criar seu plano de desenvolvimento personalizado
                </p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {sectionsHabilidades.map((skill, index) => (
                  <div
                    key={skill.nome}
                    onClick={() => handleSkillClick(skill)}
                    className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center hover:bg-white/20 transition-colors duration-200 cursor-pointer group"
                  >
                    <span className="text-white font-medium group-hover:text-green-100 transition-colors">
                      {skill.nome}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Content Section */}
          <section className="py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto space-y-12">
              {sectionsDestaques.map((destaques, index) => (
                <div className="bg-white rounded-xl shadow-lg p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">
                    {destaques.titulo}
                  </h3>
                  <div className="prose prose-lg max-w-none text-gray-600">
                    <p className="mb-4" style={{ whiteSpace: "pre-line" }}>
                     {destaques.descricao}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </>
      )}

      {selectedSkill && (
        <SkillForm
          skill={selectedSkill}
          onClose={() => {
            setSelectedSkill(null);
            secHabilidadesGet();
          }
          }
        />
      )}
    </div>
  );
};

export default PlanoCarreira;
