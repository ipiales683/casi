import React from 'react';

interface FilterBarProps {
    categories: string[];
    activeCategory: string;
    setActiveCategory: (category: string) => void;
}

const FilterBar: React.FC<FilterBarProps> = ({ categories, activeCategory, setActiveCategory }) => {
    return (
        <aside className="w-64 flex-shrink-0 p-6 space-y-6 hidden lg:block sticky top-24 h-screen">
            <div>
                <h3 className="text-lg font-semibold mb-3">Categorías</h3>
                <ul className="space-y-2">
                    {categories.map(category => (
                        <li key={category}>
                            <button
                                onClick={() => setActiveCategory(category)}
                                className={`w-full text-left px-3 py-1.5 text-sm rounded-md transition-colors ${
                                    activeCategory === category
                                        ? 'bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300 font-semibold'
                                        : 'hover:bg-gray-100 dark:hover:bg-gray-800/50'
                                }`}
                            >
                                {category === 'all' ? 'Todas las categorías' : category}
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </aside>
    );
};

export default FilterBar;
