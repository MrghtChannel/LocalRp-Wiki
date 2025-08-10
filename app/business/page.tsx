'use client';

import Image from "next/image";
import { getPageProperties, Property } from '@/lib/pagelogic';
import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  Search, DollarSign, Store, Fuel, CreditCard, Target, Shirt, Car, Scissors, Droplet, Filter, SortAsc, SortDesc
} from 'lucide-react';
import Alert from '@/components/ui/alert';
import FullscreenImage from '@/components/ui/fullscreenImage';

type SortOption = 'price_desc' | 'price_asc' | 'none';

function PageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialSort = searchParams.get('sort');
  const validSortOptions: SortOption[] = ['price_desc', 'price_asc', 'none'];
  const initialSortOption: SortOption = validSortOptions.includes(initialSort as SortOption)
    ? (initialSort as SortOption)
    : 'none';

  const [properties, setProperties] = useState<Property[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>(searchParams.get('search') || '');
  const [fullscreenImage, setFullscreenImage] = useState<string | null>(null);
  const [sortOption, setSortOption] = useState<SortOption>(initialSortOption);
  const [filterType, setFilterType] = useState<string>(searchParams.get('type') || 'all');
  const [showTypeFilter, setShowTypeFilter] = useState(false);
  const [showSortFilter, setShowSortFilter] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [alertMessage, setAlertMessage] = useState<string | null>(null);

  useEffect(() => {
    const params = new URLSearchParams();
    if (searchTerm) params.set('search', searchTerm);
    if (filterType !== 'all') params.set('type', filterType);
    if (sortOption !== 'none') params.set('sort', sortOption);
    router.push(`?${params.toString()}`, { scroll: false });
  }, [searchTerm, filterType, sortOption, router]);

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      try {
        const data = await getPageProperties('business');
        setProperties(data);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    document.body.style.overflow = fullscreenImage ? 'hidden' : '';
  }, [fullscreenImage]);

  const handleCopy = (value: string | number | undefined) => {
    if (value !== undefined && value !== null) {
      const textToCopy = String(value);
      navigator.clipboard.writeText(textToCopy).then(() => {
        setAlertMessage('Скопійовано!');
      });
    }
  };

  const parseNumber = (value: string | number | undefined): number => {
    if (value === undefined || value === null) return 0;
    const strValue = typeof value === 'number' ? value.toString() : value;
    return parseFloat(strValue.replace(/[^\d]/g, '')) || 0;
  };

  const filteredAndSortedProperties = [...properties]
    .filter(item =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (filterType === 'all' || item.type === filterType)
    )
    .sort((a: Property, b: Property) => {
      switch (sortOption) {
        case 'price_desc':
          return parseNumber(b.price) - parseNumber(a.price);
        case 'price_asc':
          return parseNumber(a.price) - parseNumber(b.price);
        default:
          return 0;
      }
    });

  const getSortLabel = (option: SortOption) => {
    switch (option) {
      case 'price_desc': return 'За спаданням ціни';
      case 'price_asc': return 'За зростанням ціни';
      case 'none': return 'Без сортування';
      default: return 'Фільтр';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'shop': return <Store className="h-4 w-4" strokeWidth={2} />;
      case 'gasstation': return <Fuel className="h-4 w-4" strokeWidth={2} />;
      case 'atm': return <CreditCard className="h-4 w-4" strokeWidth={2} />;
      case 'gunstore': return <Target className="h-4 w-4" strokeWidth={2} />;
      case 'clothingstore': return <Shirt className="h-4 w-4" strokeWidth={2} />;
      case 'carshowroom': return <Car className="h-4 w-4" strokeWidth={2} />;
      case 'tattooparlor': return <Scissors className="h-4 w-4" strokeWidth={2} />;
      case 'barbershop': return <Scissors className="h-4 w-4" strokeWidth={2} />;
      case 'carwash': return <Droplet className="h-4 w-4" strokeWidth={2} />;
      default: return <Filter className="h-4 w-4" strokeWidth={2} />;
    }
  };

  return (
    <div className="min-h-screen">
      {alertMessage && <Alert message={alertMessage} onClose={() => setAlertMessage(null)} />}
      <main className="w-full max-w-screen-xl px-4 sm:px-6 lg:px-8 mt-8 sm:mt-10 lg:mt-12 mb-16 sm:mb-20 mx-auto">
        <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 dark:text-gray-100 text-center mb-6 sm:mb-8 tracking-tight">
          Бізнес
        </h1>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
          <div className="relative w-full max-w-lg">
            <span className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-gray-500">
              <Search className="h-5 w-5" strokeWidth={2} />
            </span>
            <input
              type="text"
              placeholder="Пошук бізнесу..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full py-3 pl-12 pr-10 rounded-xl bg-gray-100 dark:bg-[#1a1c24] text-gray-900 dark:text-gray-100 placeholder-gray-500 border border-gray-200 dark:border-[#2a2c36] focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-200"
            />
            {searchTerm && (
              <button
                type="button"
                onClick={() => setSearchTerm('')}
                className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                ✕
              </button>
            )}
          </div>
          <div className="relative">
            <button
              onClick={() => {
                setShowTypeFilter(!showTypeFilter);
                setShowSortFilter(false);
              }}
              className="flex items-center justify-between gap-2 px-4 py-3 bg-gray-100 dark:bg-[#1a1c24] text-gray-900 dark:text-gray-100 rounded-xl border border-gray-200 dark:border-[#2a2c36] hover:bg-gray-200 dark:hover:bg-[#2a2c36] transition-colors duration-200 w-48"
            >
              <span className="flex items-center gap-2">
                {getTypeIcon(filterType)}
                {filterType === 'all' ? 'Тип бізнесу' : filterType}
              </span>
            </button>
            {showTypeFilter && (
              <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-900 text-gray-900 dark:text-white rounded-xl shadow-lg z-10 overflow-hidden border border-gray-200 dark:border-[#2a2c36]">
                {['all', 'shop', 'gasstation', 'atm', 'gunstore', 'clothingstore', 'carshowroom', 'tattooparlor', 'barbershop', 'carwash'].map((type) => (
                  <button
                    key={type}
                    className="flex items-center gap-2 w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700"
                    onClick={() => { setFilterType(type); setShowTypeFilter(false); }}
                  >
                    {getTypeIcon(type)}
                    {type === 'all' ? 'Всі' : 
                     type === 'shop' ? 'Магазин' :
                     type === 'gasstation' ? 'Заправка' :
                     type === 'atm' ? 'Банкомат' :
                     type === 'gunstore' ? 'Збройовий магазин' :
                     type === 'clothingstore' ? 'Магазин одягу' :
                     type === 'carshowroom' ? 'Автосалон' :
                     type === 'tattooparlor' ? 'Тату-салон' :
                     type === 'barbershop' ? 'Барбершоп' :
                     type === 'carwash' ? 'Автомийка' : type}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="relative">
            <button
              onClick={() => {
                setShowSortFilter(!showSortFilter);
                setShowTypeFilter(false);
              }}
              className="flex items-center justify-between gap-2 px-4 py-3 bg-gray-100 dark:bg-[#1a1c24] text-gray-900 dark:text-gray-100 rounded-xl border border-gray-200 dark:border-[#2a2c36] hover:bg-gray-200 dark:hover:bg-[#2a2c36] transition-colors duration-200 w-64 whitespace-nowrap overflow-hidden text-ellipsis"
            >
              <span className="flex items-center gap-2 whitespace-nowrap">
                {sortOption.includes('asc')
                  ? <SortAsc className="h-4 w-4" strokeWidth={2} />
                  : <SortDesc className="h-4 w-4" strokeWidth={2} />}
                {getSortLabel(sortOption)}
              </span>
            </button>

            {showSortFilter && (
              <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-900 text-gray-900 dark:text-white rounded-xl shadow-lg z-10 overflow-hidden border border-gray-200 dark:border-[#2a2c36]">
                <button onClick={() => { setSortOption('none'); setShowSortFilter(false); }} className="flex items-center gap-2 w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700">
                  <Filter className="h-4 w-4" strokeWidth={2} /> Без сортування
                </button>
                <button onClick={() => { setSortOption('price_asc'); setShowSortFilter(false); }} className="flex items-center gap-2 w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700">
                  <SortAsc className="h-4 w-4" strokeWidth={2} /> За зростанням ціни
                </button>
                <button onClick={() => { setSortOption('price_desc'); setShowSortFilter(false); }} className="flex items-center gap-2 w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700">
                  <SortDesc className="h-4 w-4" strokeWidth={2} /> За спаданням ціни
                </button>
              </div>
            )}
          </div>
        </div>

        {isLoading ? (
          <div className="flex flex-col items-center justify-center mt-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500 border-solid"></div>
            <p className="mt-4 text-lg font-semibold text-gray-900 dark:text-gray-100">Завантаження...</p>
          </div>
        ) : filteredAndSortedProperties.length === 0 ? (
          <p className="text-center text-gray-600 dark:text-gray-400 mt-12 text-base sm:text-lg font-medium">
            Нічого не знайдено
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mt-6 sm:mt-8">
            {filteredAndSortedProperties.map((item: Property, index: number) => (
              <div
                key={index}
                className="relative bg-white dark:bg-[#1a1c24] p-4 sm:p-5 rounded-xl border border-gray-200 dark:border-[#2a2c36] group"
              >
                {item.image && (
                  <div
                    className="relative w-full h-48 sm:h-56 cursor-pointer mb-4"
                    onClick={() => setFullscreenImage(`/${item.image}`)}
                  >
                    <Image
                      src={`/${item.image}`}
                      alt={item.title}
                      fill
                      className="object-cover rounded-lg group-hover:scale-105 transition-transform duration-200"
                      priority={index < 3}
                    />
                  </div>
                )}
                <div className="space-y-2">
                  <h2
                    className="text-sm sm:text-base lg:text-lg font-semibold text-gray-900 dark:text-gray-100 line-clamp-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200 cursor-pointer"
                    onClick={() => handleCopy(item.title)}
                    title="Натисніть, щоб скопіювати"
                  >
                    {item.title}
                  </h2>
                  {item.type && (
                    <p className="flex items-center text-xs sm:text-sm text-gray-600 dark:text-gray-400 gap-2">
                      {getTypeIcon(item.type)}
                      <span
                        className="cursor-pointer hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                        onClick={() => handleCopy(item.type)}
                        title="Натисніть, щоб скопіювати"
                      >
                        <strong>Тип:</strong> { 
                          item.type === 'shop' ? 'Магазин' :
                          item.type === 'gasstation' ? 'Заправка' :
                          item.type === 'atm' ? 'Банкомат' :
                          item.type === 'gunstore' ? 'Збройовий магазин' :
                          item.type === 'clothingstore' ? 'Магазин одягу' :
                          item.type === 'carshowroom' ? 'Автосалон' :
                          item.type === 'tattooparlor' ? 'Тату-салон' :
                          item.type === 'barbershop' ? 'Барбершоп' :
                          item.type === 'carwash' ? 'Автомийка' : item.type
                        }
                      </span>
                    </p>
                  )}
                  {item.price && (
                    <p className="flex items-center text-xs sm:text-sm text-gray-600 dark:text-gray-400 gap-2">
                      <DollarSign className="h-4 w-4" strokeWidth={2} />
                      <span
                        className="cursor-pointer hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                        onClick={() => handleCopy(item.price)}
                        title="Натисніть, щоб скопіювати"
                      >
                        <strong>Ціна:</strong> {item.price}
                      </span>
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      <FullscreenImage imageSrc={fullscreenImage} onClose={() => setFullscreenImage(null)} />
      </main>
    </div>
  );
}

export default function BusinessPage() {
  return (
    <Suspense fallback={
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500 border-solid"></div>
        <p className="mt-4 text-lg font-semibold text-gray-900 dark:text-gray-100">Завантаження...</p>
      </div>
    }>
      <PageContent />
    </Suspense>
  );
}