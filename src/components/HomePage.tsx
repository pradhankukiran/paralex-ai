import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Scale, Shield, Sparkles, ArrowRight, BookOpen, Users, MessageSquare } from 'lucide-react';
import Button from './common/Button';

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-sm z-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <Scale className="h-8 w-8 text-blue-900" />
              <span className="ml-2 text-xl font-bold text-slate-900">ParalexAI</span>
            </div>
            <nav className="hidden md:flex space-x-8">
              <a href="#features" className="text-slate-600 hover:text-slate-900">Features</a>
              <a href="#benefits" className="text-slate-600 hover:text-slate-900">Benefits</a>
              <a href="#testimonials" className="text-slate-600 hover:text-slate-900">Testimonials</a>
            </nav>
            <Button 
              variant="primary"
              onClick={() => navigate('/dashboard')}
            >
              Get Started
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-slate-900 tracking-tight">
              Transform Your Legal Practice with
              <span className="text-blue-900"> AI</span>
            </h1>
            <p className="mt-6 text-xl text-slate-600 max-w-3xl mx-auto">
              Streamline legal research, automate contract analysis, and enhance compliance monitoring
              with our advanced AI-powered legal assistant.
            </p>
            <div className="mt-10 flex justify-center gap-4">
              <Button 
                variant="primary"
                size="lg"
                icon={<ArrowRight size={20} />}
                onClick={() => navigate('/dashboard')}
              >
                Get Started Now
              </Button>
              <Button 
                variant="secondary"
                size="lg"
                icon={<BookOpen size={20} />}
              >
                Watch Demo
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900">Powerful Features</h2>
            <p className="mt-4 text-lg text-slate-600">
              Everything you need to modernize your legal practice
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Scale className="h-8 w-8 text-blue-900" />,
                title: 'Contract Analysis',
                description: 'AI-powered contract review and risk assessment with detailed insights and recommendations.'
              },
              {
                icon: <Shield className="h-8 w-8 text-blue-900" />,
                title: 'Compliance Monitor',
                description: 'Real-time monitoring of regulatory changes and automated compliance checks.'
              },
              {
                icon: <BookOpen className="h-8 w-8 text-blue-900" />,
                title: 'Legal Research',
                description: 'Advanced legal research assistant with natural language processing capabilities.'
              },
              {
                icon: <Sparkles className="h-8 w-8 text-blue-900" />,
                title: 'Document Generation',
                description: 'Automated creation of legal documents with customizable templates.'
              },
              {
                icon: <Users className="h-8 w-8 text-blue-900" />,
                title: 'Client Portal',
                description: 'Secure client communication and document sharing platform.'
              },
              {
                icon: <MessageSquare className="h-8 w-8 text-blue-900" />,
                title: 'AI Assistant',
                description: '24/7 AI-powered legal assistant for basic legal queries and guidance.'
              }
            ].map((feature, index) => (
              <div 
                key={index}
                className="p-6 rounded-xl border border-slate-200 hover:border-blue-200 hover:shadow-lg transition-all duration-300"
              >
                <div className="p-3 bg-blue-50 rounded-lg w-fit">
                  {feature.icon}
                </div>
                <h3 className="mt-4 text-xl font-semibold text-slate-900">
                  {feature.title}
                </h3>
                <p className="mt-2 text-slate-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="py-24 bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900">Why Choose ParalexAI?</h2>
            <p className="mt-4 text-lg text-slate-600">
              Experience the future of legal practice management
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-8">
              {[
                {
                  title: 'Save Time',
                  description: 'Reduce manual work by up to 80% with AI-powered automation'
                },
                {
                  title: 'Reduce Errors',
                  description: 'Minimize human error with automated document review and analysis'
                },
                {
                  title: 'Stay Compliant',
                  description: 'Real-time updates on regulatory changes and compliance requirements'
                }
              ].map((benefit, index) => (
                <div key={index} className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                    <span className="text-xl font-bold text-blue-900">{index + 1}</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-slate-900">{benefit.title}</h3>
                    <p className="mt-2 text-slate-600">{benefit.description}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-blue-900 rounded-3xl opacity-10"></div>
              <div className="relative p-8 rounded-3xl bg-white shadow-xl">
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <Scale className="h-8 w-8 text-blue-900" />
                    <div>
                      <h4 className="font-semibold text-slate-900">Trusted by Legal Professionals</h4>
                      <p className="text-slate-600">Join hundreds of law firms using ParalexAI</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    {[
                      '99.9% Uptime',
                      'SOC 2 Type II Certified',
                      'GDPR Compliant',
                      'Bank-grade Security'
                    ].map((item, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <Shield className="h-5 w-5 text-emerald-500" />
                        <span className="text-slate-700">{item}</span>
                      </div>
                    ))}
                  </div>
                  <Button 
                    variant="primary" 
                    fullWidth
                    onClick={() => navigate('/dashboard')}
                  >
                    Start Free Trial
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center">
                <Scale className="h-8 w-8" />
                <span className="ml-2 text-xl font-bold">ParalexAI</span>
              </div>
              <p className="mt-4 text-slate-400">
                Transforming legal practice with artificial intelligence
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-slate-400 hover:text-white">Features</a></li>
                <li><a href="#" className="text-slate-400 hover:text-white">Pricing</a></li>
                <li><a href="#" className="text-slate-400 hover:text-white">Security</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-slate-400 hover:text-white">About</a></li>
                <li><a href="#" className="text-slate-400 hover:text-white">Blog</a></li>
                <li><a href="#" className="text-slate-400 hover:text-white">Careers</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-slate-400 hover:text-white">Privacy</a></li>
                <li><a href="#" className="text-slate-400 hover:text-white">Terms</a></li>
                <li><a href="#" className="text-slate-400 hover:text-white">Security</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-slate-800 text-center text-slate-400">
            <p>&copy; {new Date().getFullYear()} ParalexAI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;