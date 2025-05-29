'use client';
import React, { useState, useRef, useEffect } from 'react';
import { Search, X } from 'lucide-react';

const SearchButton = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const inputRef = useRef(null);

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

  const handleClose = () => {
    setIsExpanded(false);
    setSearchQuery('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      console.log('Recherche pour:', searchQuery);
      // Ici vous pouvez ajouter votre logique de recherche
    }
  };

  // Focus automatique quand le champ s'ouvre
  useEffect(() => {
    if (isExpanded && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isExpanded]);

  return (
    <div className="flex items-center justify-center ">
      <div className="relative">
        {/* Version mobile - toujours visible sur petits écrans */}
        <div className="md:hidden">
          <div className="relative">
            <input
              ref={inputRef}
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSubmit(e)}
              placeholder="Rechercher..."
              className="w-[50%] h-8 p-20  py-3 border-2 border-gray-300 rounded-full bg-white shadow-lg focus:outline-none focus:border-blue-500 focus:shadow-xl transition-all duration-300"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          </div>
        </div>

        {/* Version desktop - animation d'expansion */}
        <div className="hidden md:block">
          <div className="relative flex items-center">
            {/* Bouton icône seule */}
            {!isExpanded && (
              <button
                onClick={handleToggle}
                className="bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 ease-out"
              >
                <Search className="w-5 h-5" />
              </button>
            )}

            {/* Champ de recherche étendu */}
            {isExpanded && (
              <div className="relative animate-in slide-in-from-right-5 duration-300">
                <div className="flex items-center bg-white rounded-full shadow-lg border-2 border-blue-200 focus-within:border-blue-500 transition-all duration-300">
                  <button
                    type="button"
                    onClick={handleToggle}
                    className="p-3 text-blue-500 hover:text-blue-600 transition-colors duration-200"
                  >
                    <Search className="w-5 h-5" />
                  </button>
                  <input
                    ref={inputRef}
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSubmit(e)}
                    placeholder="Tapez votre recherche..."
                    className="flex-1 py-3 px-2 bg-transparent outline-none text-gray-700 min-w-[300px]"
                    onBlur={(e) => {
                      // Ne ferme que si on clique ailleurs et qu'il n'y a pas de texte
                      if (!searchQuery.trim()) {
                        setTimeout(() => setIsExpanded(false), 150);
                      }
                    }}
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => setSearchQuery('')}
                      className="p-2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={handleClose}
                    className="p-3 text-gray-400 hover:text-gray-600 transition-colors duration-200"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Affichage des résultats de recherche (exemple) */}
        {searchQuery && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-lg border border-gray-200 z-10 max-w-md md:max-w-lg">
            <div className="p-4">
              <p className="text-sm text-gray-600 mb-2">Résultats pour: "{searchQuery}"</p>
              <div className="space-y-2">
                <div className="p-2 hover:bg-gray-50 rounded cursor-pointer">
                  <p className="text-sm font-medium">Résultat exemple 1</p>
                  <p className="text-xs text-gray-500">Description du résultat...</p>
                </div>
                <div className="p-2 hover:bg-gray-50 rounded cursor-pointer">
                  <p className="text-sm font-medium">Résultat exemple 2</p>
                  <p className="text-xs text-gray-500">Description du résultat...</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Instructions d'utilisation */}
      <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-80">
        <div className="bg-white p-4 rounded-lg shadow-lg border border-gray-200">
          <h3 className="font-semibold text-gray-800 mb-2">Instructions:</h3>
          <div className="text-sm text-gray-600 space-y-1">
            <p><span className="font-medium">Desktop:</span> Cliquez sur l'icône pour étendre le champ</p>
            <p><span className="font-medium">Mobile:</span> Champ de recherche toujours visible</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchButton;