import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { NewspaperIcon, MagnifyingGlassIcon, CalendarIcon, UserIcon, ClockIcon, TagIcon, ArrowRightIcon } from '@heroicons/react/24/outline';
import newsData from '../components/News/news.json';

const NewsPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const articles = useMemo(() => {
    const sorted = [...newsData].sort((a, b) => new Date(b.date) - new Date(a.date));
    return sorted.map(n => ({
      ...n,
      readTime: `${n.readTime} min`,
      image: n.image || '/images/news/default.jpg'
    }));
  }, []);

  const categories = useMemo(() => {
    const counts = articles.reduce((acc, n) => { acc[n.category] = (acc[n.category] || 0) + 1; return acc; }, {});
    const mapping = { nacional: 'Nacional', local: 'Local', constitucional: 'Constitucional', penal: 'Penal', civil: 'Civil' };
    const list = [{ id: 'all', name: 'Todas', count: articles.length }];
    Object.keys(counts).forEach(k => list.push({ id: k, name: mapping[k] || k, count: counts[k] }));
    return list;
  }, [articles]);

  const filtered = useMemo(() => {
    const t = searchTerm.trim().toLowerCase();
    return articles.filter(a => {
      const catOk = selectedCategory === 'all' || a.category === selectedCategory;
      const sOk = !t || a.title.toLowerCase().includes(t) || a.excerpt.toLowerCase().includes(t) || a.author.toLowerCase().includes(t);
      return catOk && sOk;
    });
  }, [articles, selectedCategory, searchTerm]);

  const getCategoryName = (id) => categories.find(c => c.id === id)?.name || id;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="bg-white shadow-lg border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full mb-6">
            <NewspaperIcon className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Noticias Legales</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">Últimas novedades del mundo jurídico, integradas con nuestro boletín informativo.</p>
        </div>
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Buscar Noticias</h3>
            <div className="relative">
              <MagnifyingGlassIcon className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input type="text" value={searchTerm} onChange={(e)=>setSearchTerm(e.target.value)} placeholder="Buscar..." className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center"><TagIcon className="h-5 w-5 mr-2 text-blue-600"/>Categorías</h3>
            <div className="space-y-2">
              {categories.map(cat => (
                <button key={cat.id} onClick={()=>setSelectedCategory(cat.id)} className={`w-full text-left px-3 py-2 rounded-lg flex items-center justify-between ${selectedCategory===cat.id?'bg-blue-100 text-blue-700 border border-blue-200':'hover:bg-gray-100 text-gray-700'}`}>
                  <span className="font-medium">{cat.name}</span>
                  <span className="text-sm text-gray-500">({cat.count})</span>
                </button>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Suscríbete al Newsletter</h3>
            <p className="text-sm text-gray-600 mb-4">Recibe noticias legales y análisis directamente en tu correo.</p>
            <form onSubmit={(e)=>{e.preventDefault(); alert('¡Suscripción registrada!')}}>
              <div className="flex gap-2">
                <input type="email" required placeholder="Correo electrónico" className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
                <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Suscribirse</button>
              </div>
            </form>
          </div>
        </div>

        <div className="lg:col-span-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filtered.map((n, idx)=> (
              <motion.article key={n.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05*idx }} className="bg-white rounded-lg shadow overflow-hidden group">
                <Link to={`/noticias/${n.id}`}>
                  <div className="relative h-48">
                    <img src={n.image} alt={n.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" onError={(e)=>{e.target.src='/images/news/default.jpg'}} />
                    <div className="absolute top-4 left-4"><span className="bg-blue-500 text-white px-2 py-1 rounded-full text-xs font-medium">{getCategoryName(n.category)}</span></div>
                  </div>
                </Link>
                <div className="p-6">
                  <div className="flex items-center text-sm text-gray-500 mb-2">
                    <CalendarIcon className="h-4 w-4 mr-1"/>
                    <span className="mr-4">{n.date}</span>
                    <ClockIcon className="h-4 w-4 mr-1"/>
                    <span className="mr-4">{n.readTime}</span>
                    <UserIcon className="h-4 w-4 mr-1"/>
                    <span>{n.author}</span>
                  </div>
                  <Link to={`/noticias/${n.id}`} className="block"><h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">{n.title}</h3></Link>
                  <p className="text-gray-600 mb-4">{n.excerpt}</p>
                  <div className="flex justify-end">
                    <Link to={`/noticias/${n.id}`} className="text-blue-600 hover:text-blue-700 font-medium text-sm flex items-center">Leer más<ArrowRightIcon className="h-3 w-3 ml-1"/></Link>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsPage;
