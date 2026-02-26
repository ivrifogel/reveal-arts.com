import React, { useState, useCallback } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Calendar, Users, FileText } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useLanguage } from '@/components/LanguageContext';
import { publications } from '@/data/publications';

function PdfViewer({ url, title }) {
  const [key, setKey] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const gviewUrl = `https://docs.google.com/gview?url=${encodeURIComponent(url)}&embedded=true`;

  const handleLoad = useCallback(() => {
    setLoaded(true);
  }, []);

  // Auto-retry: if the iframe hasn't visually loaded after 4s, reload it
  React.useEffect(() => {
    setLoaded(false);
    const timer = setTimeout(() => {
      if (!loaded) {
        setKey(k => k + 1);
      }
    }, 4000);
    return () => clearTimeout(timer);
  }, [key]);

  return (
    <div className="relative w-full h-[800px]">
      {!loaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 z-10">
          <div className="text-center">
            <div className="w-8 h-8 border-4 border-gray-200 border-t-[#3b93a8] rounded-full animate-spin mx-auto mb-3"></div>
            <p className="text-gray-400 text-sm">Loading document...</p>
          </div>
        </div>
      )}
      <iframe
        key={key}
        src={gviewUrl}
        className="w-full h-full"
        title={title}
        onLoad={handleLoad}
      />
    </div>
  );
}

export default function PublicationDetails() {
  const [searchParams] = useSearchParams();
  const id = searchParams.get('id');
  const { t, language } = useLanguage();

  const publication = publications.find(p => p.id === id);

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

          </div>

          {/* Content Viewer */}
          <div className="lg:col-span-2">
            {publication.file_url ? (
              <div className="bg-gray-100 rounded-2xl overflow-hidden shadow-lg border border-[#cac5e1] min-h-[800px]">
                <PdfViewer url={publication.file_url} title={publication.title} />
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
