import React from 'react';
import { Page, PublicRoute } from '../types';
import { blogPosts } from '../data/blogData';
import { format } from 'date-fns';
import { es } from 'date-fns/locale/es';

interface BlogPostPageProps {
  slug: string;
  onNavigate: (page: Page | PublicRoute | string) => void;
}

const MarkdownRenderer = ({ content }) => {
    const renderContent = () => {
        return content.split('\n').map((line, index) => {
            if (line.startsWith('### ')) {
                return <h3 key={index} className="text-xl font-bold mt-6 mb-2">{line.substring(4)}</h3>;
            }
            if (line.startsWith('## ')) {
                return <h2 key={index} className="text-2xl font-bold mt-8 mb-4 border-b pb-2">{line.substring(3)}</h2>;
            }
            if (line.startsWith('*   ')) {
                return <li key={index} className="ml-6">{line.substring(4)}</li>;
            }
            if (line.trim() === '') {
                return <br key={index} />;
            }
            return <p key={index} className="my-4">{line}</p>;
        });
    };
    return <>{renderContent()}</>;
};

const BlogPostPage: React.FC<BlogPostPageProps> = ({ slug, onNavigate }) => {
    const post = blogPosts.find(p => p.slug === slug);

    if (!post) {
        return (
            <div className="text-center py-20">
                <h1 className="text-2xl font-bold">Artículo no encontrado</h1>
                <p className="text-[var(--muted-foreground)] mt-2">El artículo que buscas no existe o ha sido movido.</p>
                <button onClick={() => onNavigate('blog')} className="mt-6 px-4 py-2 bg-[var(--primary)] text-[var(--primary-foreground)] rounded-md">
                    Volver al Blog
                </button>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto py-8">
            <article>
                <header className="mb-8 text-center">
                    <p className="text-[var(--accent-color)] font-semibold">{post.category}</p>
                    <h1 className="text-4xl lg:text-5xl font-bold font-serif mt-2">{post.title}</h1>
                     <p className="text-sm text-[var(--muted-foreground)] mt-4">
                        Publicado el {format(new Date(post.publishDate), 'd LLLL, yyyy', { locale: es })}
                    </p>
                </header>
                <img src={post.imageUrl} alt={post.title} className="w-full h-96 object-cover rounded-xl shadow-lg mb-8" />
                <div className="prose dark:prose-invert max-w-none text-lg">
                    <MarkdownRenderer content={post.content} />
                </div>
            </article>
             <div className="mt-12 text-center">
                <button onClick={() => onNavigate('blog')} className="text-[var(--accent-color)] font-semibold hover:underline">
                    &larr; Volver a todos los artículos
                </button>
            </div>
        </div>
    );
};

export default BlogPostPage;