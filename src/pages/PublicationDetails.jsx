import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Calendar, Users, FileText, ExternalLink } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useLanguage } from '@/components/LanguageContext';

export default function PublicationDetails() {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const { t, language } = useLanguage();

  useEffect(() => {
    base44.auth.me().then(setUser).catch(() => setUser(null));
  }, []);

  const { data: publication, isLoading } = useQuery({
    queryKey: ['publication', id],
    queryFn: async () => {
      const results = await base44.entities.Publication.filter({ id });
      return results[0];
    },
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white pt-12 md:pt-32 flex justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#3b93a8]"></div>
      </div>
    );
  }

  if (!publication) {
    return (
      <div className="min-h-screen bg-white pt-12 md:pt-32 text-center">
        <h1 className="text-2xl font-serif text-gray-800 mb-4">{t('pub_not_found_title')}</h1>
        <Link to="/Publications">
          <Button variant="outline">{t('pub_back')}</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white pt-0 md:pt-24">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
      >
        <Link to="/Publications" className="inline-flex items-center text-gray-500 hover:text-[#3b93a8] mb-8 transition-colors">
          {language === 'he' ? <ArrowRight className="w-4 h-4 ml-2" /> : <ArrowLeft className="w-4 h-4 mr-2" />}
          {t('pub_back')}
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Metadata Sidebar */}
          <div className="lg:col-span-1 space-y-8">
            <div>
              <h1 className="font-serif text-3xl text-gray-800 mb-4 leading-tight">
                {publication.title}
              </h1>
              
              <div className="space-y-4 text-sm">
                {publication.authors && (
                  <div className="flex items-start gap-3 text-gray-600">
                    <Users className="w-5 h-5 text-[#3b93a8] shrink-0 mt-0.5" />
                    <span>{publication.authors}</span>
                  </div>
                )}
                
                {publication.year && (
                  <div className="flex items-center gap-3 text-gray-600">
                    <Calendar className="w-5 h-5 text-[#3b93a8] shrink-0" />
                    <span>{publication.year}</span>
                  </div>
                )}

                {publication.journal && (
                  <div className="flex items-start gap-3 text-gray-600">
                    <FileText className="w-5 h-5 text-[#3b93a8] shrink-0 mt-0.5" />
                    <span className="italic">{publication.journal}</span>
                  </div>
                )}
              </div>
            </div>

            {publication.abstract && (
              <div className="bg-gray-50 p-6 rounded-xl border border-[#cac5e1]/30">
                <h3 className="font-serif text-lg text-gray-800 mb-3">{t('pub_abstract')}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {publication.abstract}
                </p>
              </div>
            )}

            {publication.external_link && (
              <a 
                href={publication.external_link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-full px-6 py-3 border border-[#3b93a8] text-[#3b93a8] font-medium rounded-xl hover:bg-[#3b93a8] hover:text-white transition-all shadow-sm"
              >
                <ExternalLink className="w-4 h-4 mr-2 rtl:ml-2 rtl:mr-0" />
                {t('pub_view_source')}
              </a>
            )}
          </div>

          {/* Content Viewer */}
          <div className="lg:col-span-2">
            {publication.file_url ? (
              <div className="bg-gray-100 rounded-2xl overflow-hidden shadow-lg border border-[#cac5e1] min-h-[800px]">
                {/* Check if file is likely an image */}
                {/\.(jpg|jpeg|png|gif|webp)$/i.test(publication.file_url) ? (
                  <img 
                    src={publication.file_url} 
                    alt={publication.title}
                    className="w-full h-auto"
                  />
                ) : (
                  /* Use Google Docs Viewer for PDFs to prevent auto-download and ensure embedding */
                  <iframe
                    src={`https://docs.google.com/gview?url=${encodeURIComponent(publication.file_url)}&embedded=true`}
                    className="w-full h-[800px]"
                    title={publication.title}
                    frameBorder="0"
                  />
                )}
              </div>
            ) : (
              <div className="bg-gray-50 rounded-2xl p-12 text-center border border-dashed border-gray-300">
                <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">{t('pub_no_doc')}</p>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}