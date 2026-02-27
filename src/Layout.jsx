import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Menu, X, Mail, Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { LanguageProvider, useLanguage } from '@/components/LanguageContext';

function LayoutContent({ children, currentPageName }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const { t, language, setLanguage, dir } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);

    const handleOpenContact = () => setIsContactOpen(true);
    window.addEventListener('open-contact-modal', handleOpenContact);

    if (window.location.hash) {
      setTimeout(() => {
        const element = document.querySelector(window.location.hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('open-contact-modal', handleOpenContact);
    };
  }, [window.location.pathname, window.location.hash]);

  const navLinks = [
    { name: t('nav_home'), page: 'Home' },
    { name: t('nav_about'), page: 'About' },
    { name: t('nav_publications'), page: 'Publications' },
    { name: t('nav_courses'), page: 'Courses' },
  ];

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'he' : 'en');
  };

  return (
    <div className="min-h-screen bg-white text-gray-800 font-sans antialiased selection:bg-[#cac5e1] selection:text-[#3b93a8]" dir={dir}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&family=Heebo:wght@300;400;500;700&display=swap');

        html { scroll-behavior: smooth; }
        .font-serif { font-family: ${language === 'he' ? '"Heebo", sans-serif' : '"Playfair Display", serif'}; }
        .font-sans { font-family: ${language === 'he' ? '"Heebo", sans-serif' : '"Inter", sans-serif'}; }
        `}</style>

      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-300 pointer-events-none md:pointer-events-auto md:bg-[#3b93a8] md:border-b md:border-[#2a6b7a]/20 md:shadow-sm`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-24 relative">
            {/* Logo - Hidden on mobile */}
            <div className="hidden md:flex items-center gap-4 pointer-events-auto">
              <Link to={createPageUrl('Home')} className="flex-shrink-0 flex items-center">
                <div className="flex items-center justify-center bg-white rounded-full p-2 shadow-md">
                  <img 
                    src="https://static.wixstatic.com/media/2bfa27_7b755902d0c04313b8d3a2ee054bcd98~mv2.png/v1/fill/w_216,h_216,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/2bfa27_7b755902d0c04313b8d3a2ee054bcd98~mv2.png" 
                    alt="Reveal Arts Logo" 
                    className="h-14 w-14 object-contain"
                  />
                </div>
              </Link>
            </div>
            
            {/* Desktop Menu - Centered */}
            <div className="hidden md:flex gap-8 items-center absolute left-1/2 transform -translate-x-1/2 pointer-events-auto">
              {navLinks.map((link) => (
                <Link
                  key={link.page}
                  to={createPageUrl(link.page)}
                  className={`text-sm font-bold transition-colors ${
                    currentPageName === link.page 
                      ? 'text-white' 
                      : 'text-white/90 hover:text-white'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>

            {/* Desktop CTA & Language */}
            <div className="hidden md:flex items-center gap-4 pointer-events-auto">
              <button
                onClick={toggleLanguage}
                className="p-2 text-white hover:bg-white/10 rounded-full transition-colors flex items-center gap-2"
                title={language === 'en' ? 'Switch to Hebrew' : 'Switch to English'}
              >
                <Globe className="w-5 h-5" />
                <span className="text-xs font-bold uppercase">{language === 'en' ? 'HE' : 'EN'}</span>
              </button>
              <button
                onClick={() => setIsContactOpen(true)}
                className="px-6 py-3 bg-white text-[#3b93a8] text-sm font-extrabold rounded-full hover:bg-[#cac5e1] hover:text-gray-800 transition-all shadow-md"
              >
                {t('cta_contact')}
              </button>
            </div>

            {/* Mobile Menu Button - Bubble */}
            <div className="md:hidden fixed top-4 right-4 pointer-events-auto z-50 flex gap-2">
              <button 
                onClick={toggleLanguage}
                className="flex items-center justify-center w-12 h-12 rounded-full shadow-lg transition-all duration-300 bg-white text-[#3b93a8]"
              >
                <span className="text-xs font-bold">{language === 'en' ? 'HE' : 'EN'}</span>
              </button>
              <button 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className={`flex items-center justify-center w-12 h-12 rounded-full shadow-lg transition-all duration-300 ${
                  mobileMenuOpen ? 'bg-white text-[#3b93a8]' : 'bg-[#3b93a8] text-white'
                }`}
              >
                {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Popup */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:hidden pointer-events-auto">
              <motion.div 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-black/60 backdrop-blur-sm" 
                onClick={() => setMobileMenuOpen(false)}
              />
              <motion.div 
                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 10 }}
                className="relative bg-white rounded-3xl p-8 w-full max-w-sm shadow-2xl overflow-hidden"
              >
                <button 
                  onClick={() => setMobileMenuOpen(false)}
                  className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="flex flex-col items-center space-y-4 pt-4">
                  {navLinks.map((link) => (
                    <Link
                      key={link.page}
                      to={createPageUrl(link.page)}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`w-full text-center py-3 rounded-xl transition-colors font-serif text-lg font-medium ${
                        currentPageName === link.page 
                          ? 'bg-[#3b93a8]/10 text-[#3b93a8]' 
                          : 'text-gray-800 hover:bg-gray-50'
                      }`}
                    >
                      {link.name}
                    </Link>
                  ))}
                  <div className="w-full pt-2 space-y-3">
                    <button
                      onClick={() => {
                        setMobileMenuOpen(false);
                        setIsContactOpen(true);
                      }}
                      className="w-full py-3 bg-[#3b93a8] text-white text-lg font-bold rounded-xl shadow-md hover:bg-[#2a6b7a] transition-colors"
                    >
                      {t('cta_contact')}
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </nav>

      {/* Main Content */}
      <main>{children}</main>

      {/* Contact Modal */}
      {isContactOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsContactOpen(false)}></div>
          <div className="relative bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl animate-in fade-in zoom-in duration-200">
            <button 
              onClick={() => setIsContactOpen(false)}
              className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            
            <h3 className="font-serif text-2xl font-bold text-gray-800 mb-6 text-center">{t('contact_title')}</h3>
            
            <div className="space-y-4">
              <a 
                href="https://wa.me/66926670044" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 rounded-xl border border-gray-100 bg-[#25D366]/10 text-[#075E54] hover:bg-[#25D366]/20 transition-all font-medium group"
              >
                <svg className="w-6 h-6 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.008-.57-.008-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
                {t('social_whatsapp')}
                <span className="ml-auto text-sm opacity-60 group-hover:opacity-100">+66 92-667-0044</span>
              </a>

              <a 
                href="https://line.me/ti/p/~meytalfs" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 rounded-xl border border-gray-100 bg-[#00B900]/10 text-[#00B900] hover:bg-[#00B900]/20 transition-all font-medium group"
              >
                <svg className="w-6 h-6 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor"><path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63h2.386c.346 0 .627.285.627.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.511.254l2.444 3.322V8.108c0-.345.279-.63.626-.63.345 0 .626.285.626.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.627-.63.349 0 .631.285.631.63v4.771zm-2.466.629H4.917c-.345 0-.629-.285-.629-.629V8.108c0-.345.284-.63.629-.63.348 0 .628.285.628.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.281.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.259 1.058.59.12.301.079.766.038 1.08l-.164 1.026c-.045.303-.213 1.182 1.043.645 1.256-.539 6.904-4.038 9.434-6.915 1.673-1.902 2.556-4.042 2.556-6.034"/></svg>
                {t('social_line')}
                <span className="ml-auto text-sm opacity-60 group-hover:opacity-100">meytalfs</span>
              </a>

              <a 
                href="mailto:meytal@reveal-arts.com" 
                className="flex items-center gap-4 p-4 rounded-xl border border-gray-100 bg-blue-50 text-blue-600 hover:bg-blue-100 transition-all font-medium group"
              >
                <Mail className="w-6 h-6 flex-shrink-0" />
                {t('contact_email')}
                <span className="ml-auto text-sm opacity-60 group-hover:opacity-100">meytal@reveal-arts.com</span>
              </a>

              <a 
                href="https://www.linkedin.com/in/drmeytal" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 rounded-xl border border-gray-100 bg-[#0077b5]/10 text-[#0077b5] hover:bg-[#0077b5]/20 transition-all font-medium group"
              >
                <svg className="w-6 h-6 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                {t('social_linkedin')}
                <span className="ml-auto text-sm opacity-60 group-hover:opacity-100">@DrMeytal</span>
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-[#3b93a8] border-t border-[#2a6b7a] py-8 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-2">
          <div className="text-center md:text-left">
            <p className="font-serif text-sm text-white font-medium tracking-wide">Reveal Arts</p>
            <p className="text-xs text-white/70 mt-1">{t('footer_rights')}</p>
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            <a 
              href="https://wa.me/66926670044" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-white flex items-center justify-center hover:bg-[#25D366] hover:text-white transition-all text-gray-600 border border-gray-200 shadow-sm"
              title="WhatsApp"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.008-.57-.008-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
            </a>

            <a 
              href="https://line.me/ti/p/~meytalfs" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-white flex items-center justify-center hover:bg-[#00B900] hover:text-white transition-all text-gray-600 border border-gray-200 shadow-sm"
              title="Line"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63h2.386c.346 0 .627.285.627.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.511.254l2.444 3.322V8.108c0-.345.279-.63.626-.63.345 0 .626.285.626.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.627-.63.349 0 .631.285.631.63v4.771zm-2.466.629H4.917c-.345 0-.629-.285-.629-.629V8.108c0-.345.284-.63.629-.63.348 0 .628.285.628.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.281.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.259 1.058.59.12.301.079.766.038 1.08l-.164 1.026c-.045.303-.213 1.182 1.043.645 1.256-.539 6.904-4.038 9.434-6.915 1.673-1.902 2.556-4.042 2.556-6.034"/></svg>
            </a>

            <a 
              href="mailto:meytal@reveal-arts.com" 
              className="w-10 h-10 rounded-full bg-white flex items-center justify-center hover:bg-[#3b93a8] hover:text-white transition-colors text-gray-600 border border-gray-200 shadow-sm"
              title="Email"
            >
              <Mail className="w-5 h-5" />
            </a>

            <a 
              href="https://www.linkedin.com/in/drmeytal" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-white flex items-center justify-center hover:bg-[#0077b5] hover:text-white transition-all text-gray-600 border border-gray-200 shadow-sm"
              title="LinkedIn"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default function Layout(props) {
  return (
    <LanguageProvider>
      <LayoutContent {...props} />
    </LanguageProvider>
  );
}