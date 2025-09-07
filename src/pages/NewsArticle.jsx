import React, { useEffect, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CalendarIcon, UserIcon, ClockIcon, ArrowLeftIcon } from '@heroicons/react/24/outline';
import newsData from '../components/News/news.json';

const NewsArticle = () => {
  const { id } = useParams();
  const article = useMemo(()=> newsData.find(n => String(n.id) === String(id)), [id]);

  useEffect(()=>{ window.scrollTo(0,0); }, [id]);

  if (!article) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
        <h2 className="text-2xl font-semibold text-gray-900">Noticia no encontrada</h2>
        <Link to="/noticias" className="mt-4 inline-flex items-center text-blue-600 hover:text-blue-800">
          <ArrowLeftIcon className="h-4 w-4 mr-1"/> Volver a noticias
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white py-8">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link to="/noticias" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6">
          <ArrowLeftIcon className="h-4 w-4 mr-1"/> Volver a noticias
        </Link>

        <article className="max-w-4xl mx-auto">
          <header>
            <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight sm:text-4xl">{article.title}</h1>
            <p className="mt-4 text-xl text-gray-500">{article.excerpt}</p>
            <div className="mt-6 flex items-center text-sm text-gray-600">
              <CalendarIcon className="h-4 w-4 mr-1"/>
              <span className="mr-4">{article.date}</span>
              <ClockIcon className="h-4 w-4 mr-1"/>
              <span className="mr-4">{article.readTime} min de lectura</span>
              <UserIcon className="h-4 w-4 mr-1"/>
              <span>{article.author}</span>
            </div>
          </header>

          {article.image && (
            <div className="my-8">
              <img src={article.image} alt={article.title} className="w-full h-auto rounded-lg shadow"/>
            </div>
          )}

          <div className="prose prose-blue prose-lg max-w-none mt-8" dangerouslySetInnerHTML={{ __html: article.content }} />
        </article>

        <div className="max-w-4xl mx-auto mt-12 bg-gray-50 border rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Suscríbete al boletín</h3>
          <p className="text-sm text-gray-600 mb-4">Recibe noticias legales y análisis en tu correo.</p>
          <form onSubmit={(e)=>{e.preventDefault(); alert('¡Suscripción registrada!')}} className="flex flex-col sm:flex-row gap-3">
            <input type="email" required placeholder="Correo electrónico" className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
            <button type="submit" className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Suscribirse</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewsArticle;
