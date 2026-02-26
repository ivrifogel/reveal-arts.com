import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { BookOpen, Calendar, Users, ArrowRight } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useLanguage } from '@/components/LanguageContext';

export default function Courses() {
  const { t } = useLanguage();

  return (
    <div className="bg-white pt-0 md:pt-24 min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden bg-gradient-to-br from-[#3b93a8]/10 to-[#cac5e1]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto">

            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="font-serif text-4xl md:text-5xl text-gray-800 mt-4 mb-6"
            >
              {t('courses_hero_title')}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-gray-600 text-lg leading-relaxed mb-8"
            >
              {t('courses_hero_desc')}
            </motion.p>
          </div>
        </div>
      </section>

      {/* Courses Content */}
      <section className="py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-serif text-2xl font-bold text-gray-800 mb-6">
              {t('courses_list_title')}
            </h2>
            <p className="text-gray-600 mb-8 leading-relaxed">
              {t('courses_list_desc')}
            </p>

            <div className="space-y-4">
              {[
                t('course_1'),
                t('course_2'),
                t('course_3'),
                t('course_4'),
                t('course_5')
              ].map((course, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center gap-4 p-4 rounded-xl bg-gray-50 hover:bg-[#3b93a8]/5 transition-colors group"
                >
                  <div className="w-2 h-2 rounded-full bg-[#3b93a8] group-hover:scale-125 transition-transform" />
                  <span className="font-medium text-gray-800">{course}</span>
                </motion.div>
              ))}
            </div>


          </motion.div>
        </div>
      </section>
    </div>
  );
}