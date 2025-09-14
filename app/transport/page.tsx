'use client'

import { Suspense, useState, useEffect } from 'react'
import Image from 'next/image'
import { getPageProperties, Property } from '@/lib/pagelogic'
import { useRouter, useSearchParams } from 'next/navigation'
import Alert from '@/components/ui/alert'
import FullscreenImage from '@/components/ui/fullscreenImage'
import SearchAndFilterSection from '@/components/searchandfiltersection'
import { Skeleton } from '@/components/ui/skeleton'
import { Card, CardHeader, CardContent } from '@/components/ui/card'
import { SortOption, sortOptions, parseNumber, filterTypes } from '@/lib/pagelogic/transport'

function PageContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const initialSort = searchParams.get('sort') as SortOption
  const validSortOptions = sortOptions.map(o => o.value)
  const initialSortOption: SortOption = validSortOptions.includes(initialSort) ? initialSort : 'none'

  const [properties, setProperties] = useState<Property[]>([])
  const [searchTerm, setSearchTerm] = useState<string>(searchParams.get('search') || '')
  const [fullscreenImage, setFullscreenImage] = useState<string | null>(null)
  const [sortOption, setSortOption] = useState<SortOption>(initialSortOption)
  const [filterType, setFilterType] = useState<string>(searchParams.get('type') || 'all')
  const [isLoading, setIsLoading] = useState(true)
  const [alertMessage, setAlertMessage] = useState<string | null>(null)

  useEffect(() => {
    const params = new URLSearchParams()
    if (searchTerm) params.set('search', searchTerm)
    if (filterType !== 'all') params.set('type', filterType)
    if (sortOption !== 'none') params.set('sort', sortOption)
    router.push(`?${params.toString()}`, { scroll: false })
  }, [searchTerm, filterType, sortOption, router])

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true)
      try {
        const data = await getPageProperties('transport')
        setProperties(data)
      } finally {
        setIsLoading(false)
      }
    }
    fetchData()
  }, [])

  useEffect(() => {
    document.body.style.overflow = fullscreenImage ? 'hidden' : ''
  }, [fullscreenImage])

  const handleCopy = (value: string | number | undefined) => {
    if (value !== undefined && value !== null) {
      navigator.clipboard.writeText(String(value)).then(() => {
        setAlertMessage('Скопійовано!')
      })
    }
  }

  const filteredAndSortedProperties = [...properties]
    .filter(item => 
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) && 
      (filterType === 'all' || item.type === filterType)
    )
    .sort((a, b) => {
      if (sortOption === 'none') return 0
      const [field, direction] = sortOption.split('_')
      const factor = direction === 'asc' ? 1 : -1
      return (parseNumber(a[field as keyof Property]) - parseNumber(b[field as keyof Property])) * factor
    })

  return (
    <div className="min-h-screen">
      {alertMessage && <Alert message={alertMessage} onClose={() => setAlertMessage(null)} />}
      <main className="w-full max-w-screen-xl px-4 sm:px-6 lg:px-8 mt-8 sm:mt-10 lg:mt-12 mb-16 sm:mb-20 mx-auto">
        <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 dark:text-gray-100 text-center mb-6 sm:mb-8 tracking-tight">
          Транспорт
        </h1>
        <SearchAndFilterSection<SortOption>
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          filterType={filterType}
          setFilterType={setFilterType}
          sortOption={sortOption}
          setSortOption={setSortOption}
          filterTypes={filterTypes}
          sortOptions={sortOptions}
        />
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mt-6 sm:mt-8">
            {[...Array(6)].map((_, i) => (
              <Card key={i} className="p-4 sm:p-5">
                <Skeleton className="w-full h-48 sm:h-56 rounded-lg mb-4" />
                <Skeleton className="h-4 w-3/4 mb-2" />
                <Skeleton className="h-3 w-1/2 mb-1" />
                <Skeleton className="h-3 w-2/3 mb-1" />
                <Skeleton className="h-3 w-1/3" />
              </Card>
            ))}
          </div>
        ) : filteredAndSortedProperties.length === 0 ? (
          <p className="text-center text-gray-600 dark:text-gray-400 mt-12 text-base sm:text-lg font-medium">
            Нічого не знайдено
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mt-6 sm:mt-8">
            {filteredAndSortedProperties.map((item, index) => (
              <Card key={index} className="group">
                {item.image && (
                  <CardHeader className="p-0">
                    <div
                      className="relative w-full h-48 sm:h-56 cursor-pointer"
                      onClick={() => setFullscreenImage(`/${item.image}`)}
                    >
                      <Image
                        src={`/${item.image}`}
                        alt={item.title}
                        fill
                        className="object-cover rounded-t-lg group-hover:scale-105 transition-transform duration-200"
                        priority={index < 3}
                      />
                    </div>
                  </CardHeader>
                )}
                <CardContent className="pt-4 space-y-2">
                  <h2
                    className="text-sm sm:text-base lg:text-lg font-semibold text-gray-900 dark:text-gray-100 line-clamp-1 card-title transition-colors duration-200 cursor-pointer"
                    onClick={() => handleCopy(item.title)}
                    title="Натисніть, щоб скопіювати"
                  >
                    {item.title}
                  </h2>
                  {item.type && (
                    <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                      <span
                        className="cursor-pointer hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                        onClick={() => handleCopy(item.type)}
                        title="Натисніть, щоб скопіювати"
                      >
                        <strong>Тип:</strong> {item.type}
                      </span>
                    </p>
                  )}
                  {item.price && (
                    <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                      <span
                        className="cursor-pointer hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                        onClick={() => handleCopy(item.price)}
                        title="Натисніть, щоб скопіювати"
                      >
                        <strong>Ціна:</strong> {item.price}
                      </span>
                    </p>
                  )}
                  {item.capacity && (
                    <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                      <span
                        className="cursor-pointer hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                        onClick={() => handleCopy(item.capacity)}
                        title="Натисніть, щоб скопіювати"
                      >
                        <strong>Вмістимість:</strong> {item.capacity}
                      </span>
                    </p>
                  )}
                  {item.speed && (
                    <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                      <span
                        className="cursor-pointer hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                        onClick={() => handleCopy(item.speed)}
                        title="Натисніть, щоб скопіювати"
                      >
                        <strong>Швидкість:</strong> {item.speed}
                      </span>
                    </p>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
        <FullscreenImage
          imageSrc={fullscreenImage}
          onClose={() => setFullscreenImage(null)}
        />
      </main>
    </div>
  )
}

export default function TransportPage() {
  return (
    <Suspense
      fallback={
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 p-6">
          {[...Array(6)].map((_, i) => (
            <Card key={i} className="p-4 sm:p-5">
              <Skeleton className="w-full h-48 sm:h-56 rounded-lg mb-4" />
              <Skeleton className="h-4 w-3/4 mb-2" />
              <Skeleton className="h-3 w-1/2 mb-1" />
              <Skeleton className="h-3 w-2/3 mb-1" />
              <Skeleton className="h-3 w-1/3" />
            </Card>
          ))}
        </div>
      }
    >
      <PageContent />
    </Suspense>
  )
}
