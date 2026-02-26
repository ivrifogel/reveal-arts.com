import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, Calendar, Users, Search } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { useLanguage } from '@/components/LanguageContext';
import { publications } from '@/data/publications';

export default function Publications() {
  const [searchQuery, setSearchQuery] = useState('');
  const { t } = useLanguage();

  const filteredPublications = publications.filter(pub => {
    const query = searchQuery.toLowerCase();
    const titleMatch = pub.title?.toLowerCase().includes(query);
    const abstractMatch = pub.abstract?.toLowerCase().includes(query);
    const authorMatch = pub.authors?.toLowerCase().includes(query);
    return titleMatch || abstractMatch || authorMatch;
  });

  return (
    <div className="min-h-screen bg-white pt-0 md:pt-24">
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-br from-[#3b93a8]/10 to-[#cac5e1]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              {t('pubs_title')} <span className="text-[#3b93a8]">{t('pubs_title_suffix')}</span>
            </h1>
            <p className="text-gray-600 max-w-2xl mx-auto mb-6">
              {t('pubs_desc')}
            </p>
            <div className="w-24 h-1 bg-[#3b93a8] mx-auto rounded-full"></div>
          </motion.div>
        </div>
      </section>

      {/* Publications List */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8 max-w-md mx-auto relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 rtl:left-auto rtl:right-3" />
            <Input
              type="text"
              placeholder={t('pubs_search')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 border-[#cac5e1] focus:border-[#3b93a8] focus:ring-[#3b93a8] rounded-full rtl:pl-4 rtl:pr-10"
            />
          </div>

          {filteredPublications.length === 0 ? (
            <div className="text-center py-16">
              <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">{t('pubs_not_found')}</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6">
              {filteredPublications.map((pub, index) => (
                <motion.div
                  key={pub.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="hover:shadow-xl transition-all duration-300 border-[#cac5e1]/30 hover:border-[#3b93a8]/50">
                    <CardHeader>
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <CardTitle className="font-serif text-2xl text-gray-800 mb-2">
                            <Link
                              to={`/PublicationDetails?id=${pub.id}`}
                              className="hover:text-[#3b93a8] transition-colors"
                            >
                              {pub.title}
                            </Link>
                          </CardTitle>
                          <div className="flex flex-wrap gap-3 text-sm text-gray-600">
                            {pub.authors && (
                              <div className="flex items-center gap-1">
                                <Users className="w-4 h-4" />
                                <span>{pub.authors}</span>
                              </div>
                            )}
                            {pub.year && (
                              <div className="flex items-center gap-1">
                                <Calendar className="w-4 h-4" />
                                <span>{pub.year}</span>
                              </div>
                            )}
                            {pub.journal && (
                              <Badge variant="secondary" className="bg-[#cac5e1]/50 text-gray-700">
                                {pub.journal}
                              </Badge>
                            )}
                          </div>
                        </div>
                        <FileText className="w-10 h-10 text-[#3b93a8]/30" />
                      </div>
                    </CardHeader>
                    <CardContent>
                      {pub.abstract && (
                        <p className="text-gray-600 leading-relaxed mb-4 line-clamp-3">
                          {pub.abstract}
                        </p>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
