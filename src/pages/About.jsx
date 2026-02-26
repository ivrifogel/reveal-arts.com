import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { motion } from 'framer-motion';
import { GraduationCap, Award, Users, Heart, BookOpen, MapPin, Briefcase } from 'lucide-react';
import { useLanguage } from '@/components/LanguageContext';

export default function About() {
  const { t } = useLanguage();

  return (
    <div className="bg-white pt-0 md:pt-24 min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute top-0 right-0 -mr-32 -mt-32 w-[600px] h-[600px] bg-[#3b93a8]/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-[#cac5e1]/30 rounded-full blur-3xl"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <motion.span 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-[#3b93a8] font-bold uppercase tracking-wider text-sm"
            >
              {t('about_title_small')}
            </motion.span>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="font-serif text-4xl md:text-5xl text-gray-800 mt-4 mb-6"
            >
              {t('hero_title_name')}<span className="text-[#3b93a8]">{t('hero_title_suffix')}</span>
            </motion.h1>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="w-24 h-1 bg-[#3b93a8] mx-auto rounded-full"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Content */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="lg:col-span-7 space-y-12 order-2 lg:order-1"
            >
              {/* Bio */}
              <div className="prose prose-lg max-w-none text-gray-600 leading-relaxed space-y-6">
                <p className="font-medium text-xl text-[#3b93a8] font-serif">
                  {t('about_bio_1')}
                </p>
                
                <p>
                  {t('about_bio_2')}
                </p>
                
                <p>
                  {t('about_bio_3')}
                </p>

                <p>
                  {t('about_bio_4')}
                </p>

                <p>
                  {t('about_bio_5')}
                </p>

                <p>
                  {t('about_bio_yahat')}
                  <a href="https://www.yahat.org/therapists/info.aspx?id=75" target="_blank" rel="noopener noreferrer" className="text-[#3b93a8] hover:underline font-medium">{t('about_bio_yahat_link')}</a>
                  {t('about_bio_yahat_suffix')}
                </p>

                <p className="font-serif italic text-lg text-gray-800 bg-[#3b93a8]/10 p-4 rounded-xl border-l-4 border-[#3b93a8] rtl:border-l-0 rtl:border-r-4">
                  {t('about_bio_mom')}
                </p>
              </div>

              {/* Education */}
              <div>
                <h3 className="flex items-center gap-3 font-serif text-2xl text-gray-800 mb-6 border-b border-[#cac5e1] pb-2">
                  <GraduationCap className="w-6 h-6 text-[#3b93a8]" />
                  {t('edu_title')}
                </h3>
                <ul className="space-y-4">
                  <li className="flex gap-4">
                    <span className="font-bold text-[#3b93a8] min-w-[4rem]">2022</span>
                    <div>
                      <h4 className="font-bold text-gray-800">{t('edu_1_deg')}</h4>
                      <p className="text-sm text-gray-600">{t('edu_1_loc')}</p>
                    </div>
                  </li>
                  <li className="flex gap-4">
                    <span className="font-bold text-[#3b93a8] min-w-[4rem]">2009</span>
                    <div>
                      <h4 className="font-bold text-gray-800">{t('edu_2_deg')}</h4>
                      <p className="text-sm text-gray-600">{t('edu_2_loc')}</p>
                    </div>
                  </li>
                  <li className="flex gap-4">
                    <span className="font-bold text-[#3b93a8] min-w-[4rem]">2004</span>
                    <div>
                      <h4 className="font-bold text-gray-800">{t('edu_3_deg')}</h4>
                      <p className="text-sm text-gray-600">{t('edu_3_loc')}</p>
                    </div>
                  </li>
                </ul>
              </div>

              {/* Accreditations */}
              <div>
                <h3 className="flex items-center gap-3 font-serif text-2xl text-gray-800 mb-6 border-b border-[#cac5e1] pb-2">
                  <Award className="w-6 h-6 text-[#3b93a8]" />
                  {t('cert_title')}
                </h3>
                <ul className="grid grid-cols-1 gap-4">
                  {[
                    t('cert_1'),
                    t('cert_2'),
                    t('cert_3'),
                    t('cert_4'),
                    t('cert_5'),
                    t('cert_6'),
                    t('cert_7')
                  ].map((item, i) => (
                    <li key={i} className="flex gap-3 text-sm text-gray-600 bg-gray-50 p-3 rounded-lg border border-[#cac5e1]/20">
                      <div className="min-w-[6px] h-[6px] rounded-full bg-[#3b93a8] mt-2"></div>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

            </motion.div>

            {/* Image */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="lg:col-span-5 flex justify-center lg:sticky lg:top-32 order-1 lg:order-2"
            >
              <div className="relative">
                <div className="absolute inset-0 border-2 border-[#cac5e1] rounded-2xl transform rotate-3 scale-105"></div>
                <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                  <img 
                    src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/695b4def8c7c0e48cd96be5e/70be146a0_MomProfessionalImage.png" 
                    alt="Meytal Fogel-Simhony" 
                    className="w-full max-w-md object-cover"
                  />
                </div>
              </div>
            </motion.div>
            </div>
            </div>
            </section>

      {/* CTA Section */}
      <section className="py-20 bg-[#3b93a8]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-serif text-3xl text-white mb-6">{t('connect_title')}</h2>
          <p className="text-white/90 mb-8 max-w-2xl mx-auto">
            {t('connect_desc')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => window.dispatchEvent(new Event('open-contact-modal'))}
              className="px-8 py-3 bg-white text-[#3b93a8] font-medium rounded-full hover:bg-[#cac5e1] hover:text-gray-800 transition-all shadow-md"
            >
              {t('cta_contact')}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}