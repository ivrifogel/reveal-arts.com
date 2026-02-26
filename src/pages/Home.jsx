import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { base44 } from '@/api/base44Client';
import { motion } from 'framer-motion';
import { useLanguage } from '@/components/LanguageContext';
import PhotoStrip from '@/components/PhotoStrip';

export default function Home() {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const { t } = useLanguage();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    await base44.entities.ContactMessage.create(formData);
    setSubmitting(false);
    setSubmitted(true);
    setFormData({ first_name: '', last_name: '', email: '', phone: '', message: '' });
  };

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section id="home" className="relative pt-24 pb-16 lg:pt-48 lg:pb-32 overflow-hidden bg-white">
        {/* Decor Circles */}
        <div className="absolute top-0 right-0 -mr-32 -mt-32 w-[600px] h-[600px] bg-[#3b93a8]/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-[#cac5e1]/30 rounded-full blur-3xl"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Text Content */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center lg:text-left order-2 lg:order-1 rtl:lg:text-right"
            >
              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-medium text-gray-800 leading-tight mb-6">
                {t('hero_title_name')}<span className="text-[#3b93a8]">{t('hero_title_suffix')}</span>
              </h1>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="flex flex-col gap-2 mb-8 text-sm md:text-base text-gray-600 font-medium tracking-wide"
              >
                <p>{t('hero_cert_1')}</p>
                <p>{t('hero_cert_2')}</p>
                <p>{t('hero_cert_3')}</p>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative p-8 bg-white rounded-2xl shadow-sm border border-[#cac5e1] mb-10 max-w-2xl mx-auto lg:mx-0"
              >
                <p className="font-serif text-lg md:text-xl text-gray-600 leading-relaxed italic relative z-10 pl-4 rtl:pl-0 rtl:pr-4">
                  {t('hero_quote')}
                </p>
                <footer className="mt-4 text-xs font-bold text-[#3b93a8] uppercase tracking-widest pl-4 rtl:pl-0 rtl:pr-4">{t('hero_quote_author')}</footer>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4"
              >
                <a href="#practice" className="px-8 py-3 bg-[#3b93a8] text-white font-medium rounded-full hover:bg-[#2a6b7a] transition-all shadow-md hover:shadow-lg text-center">
                  {t('btn_practice')}
                </a>
                <button onClick={() => window.dispatchEvent(new Event('open-contact-modal'))} className="px-8 py-3 bg-white text-gray-800 border border-[#cac5e1] font-medium rounded-full hover:border-[#3b93a8] hover:text-[#3b93a8] transition-all text-center">
                  {t('btn_contact')}
                </button>
              </motion.div>
            </motion.div>

            {/* Profile Photo */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="order-1 lg:order-2 flex justify-center lg:justify-end rtl:lg:justify-start"
            >
              <div className="relative w-72 h-72 md:w-96 md:h-96 lg:w-[450px] lg:h-[450px]">
                <div className="absolute inset-0 border-2 border-[#cac5e1] rounded-full transform rotate-12 scale-105"></div>
                <div className="w-full h-full rounded-full overflow-hidden border-8 border-white shadow-2xl relative z-10">
                  <img 
                    src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/695b4def8c7c0e48cd96be5e/70be146a0_MomProfessionalImage.png" 
                    alt="Meytal Fogel-Simhony" 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Practice Areas */}
      <section id="practice" className="pt-24 pb-12 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-[#3b93a8] font-bold uppercase tracking-wider text-sm">{t('practice_title_small')}</span>
            <h2 className="font-serif text-4xl text-gray-800 mt-2">{t('practice_title_large')}</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* 01 Expressive and Creative Arts Therapy */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-xl p-8 hover:shadow-xl transition-all duration-300 group border border-[#cac5e1]/30 hover:border-[#3b93a8]/50"
            >
              <div className="text-5xl font-serif text-[#cac5e1] font-bold mb-4 group-hover:text-[#3b93a8] transition-colors">01</div>
              <h3 className="font-serif text-2xl text-gray-800 mb-4 min-h-[64px]">{t('practice_01_title')}</h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-6 whitespace-pre-wrap">
                {t('practice_01_desc')}
              </p>
            </motion.div>

            {/* 02 Psychodrama */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-white rounded-xl p-8 hover:shadow-xl transition-all duration-300 group border border-[#cac5e1]/30 hover:border-[#3b93a8]/50"
            >
              <div className="text-5xl font-serif text-[#cac5e1] font-bold mb-4 group-hover:text-[#3b93a8] transition-colors">02</div>
              <h3 className="font-serif text-2xl text-gray-800 mb-4 min-h-[64px]">{t('practice_02_title')}</h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-6 whitespace-pre-wrap">
                {t('practice_02_desc')}
              </p>
            </motion.div>

            {/* 03 Group Workshops */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white rounded-xl p-8 hover:shadow-xl transition-all duration-300 group border border-[#cac5e1]/30 hover:border-[#3b93a8]/50"
            >
              <div className="text-5xl font-serif text-[#cac5e1] font-bold mb-4 group-hover:text-[#3b93a8] transition-colors">03</div>
              <h3 className="font-serif text-2xl text-gray-800 mb-4 min-h-[64px]">{t('practice_03_title')}</h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-6 whitespace-pre-wrap">
                {t('practice_03_desc')}
              </p>
            </motion.div>

            {/* 04 Lecturing */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-white rounded-xl p-8 hover:shadow-xl transition-all duration-300 group border border-[#cac5e1]/30 hover:border-[#3b93a8]/50"
            >
              <div className="text-5xl font-serif text-[#cac5e1] font-bold mb-4 group-hover:text-[#3b93a8] transition-colors">04</div>
              <h3 className="font-serif text-2xl text-gray-800 mb-4 min-h-[64px]">{t('practice_04_title')}</h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-6 whitespace-pre-wrap">
                {t('practice_04_desc')}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Photo Strip */}
      <PhotoStrip />

      {/* What is Arts Therapy Section */}
      <section className="py-24 bg-gray-800 text-white relative">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-[#3b93a8] opacity-10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-[#cac5e1] opacity-20 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl mb-4">{t('arts_therapy_title')}</h2>
            <div className="w-24 h-1 bg-[#3b93a8] mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-12">
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#3b93a8]/20 flex items-center justify-center text-[#3b93a8]">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path>
                </svg>
              </div>
              <div>
                <h4 className="text-xl font-serif text-[#3b93a8] mb-2">{t('at_feat_1_title')}</h4>
                <p className="text-gray-300 leading-relaxed text-sm">
                  {t('at_feat_1_desc')}
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#3b93a8]/20 flex items-center justify-center text-[#3b93a8]">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z"></path>
                </svg>
              </div>
              <div>
                <h4 className="text-xl font-serif text-[#3b93a8] mb-2">{t('at_feat_2_title')}</h4>
                <p className="text-gray-300 leading-relaxed text-sm">
                  {t('at_feat_2_desc')}
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#3b93a8]/20 flex items-center justify-center text-[#3b93a8]">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
                </svg>
              </div>
              <div>
                <h4 className="text-xl font-serif text-[#3b93a8] mb-2">{t('at_feat_3_title')}</h4>
                <p className="text-gray-300 leading-relaxed text-sm">
                  {t('at_feat_3_desc')}
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#3b93a8]/20 flex items-center justify-center text-[#3b93a8]">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <div>
                <h4 className="text-xl font-serif text-[#3b93a8] mb-2">{t('at_feat_4_title')}</h4>
                <p className="text-gray-300 leading-relaxed text-sm">
                  {t('at_feat_4_desc')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>


    </div>
  );
}