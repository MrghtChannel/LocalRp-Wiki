'use client'
import { Search, Filter, X } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { FilterType, SortOptionType } from '@/lib/pagelogic'

interface SearchAndFilterSectionProps<T extends string> {
  searchTerm: string
  setSearchTerm: (term: string) => void
  filterType: string
  setFilterType: (type: string) => void
  sortOption: T
  setSortOption: (option: T) => void
  filterTypes: FilterType[]
  sortOptions: SortOptionType[]
}

export default function SearchAndFilterSection<T extends string>({
  searchTerm,
  setSearchTerm,
  filterType,
  setFilterType,
  sortOption,
  setSortOption,
  filterTypes,
  sortOptions,
}: SearchAndFilterSectionProps<T>) {
  const FilterIcon = filterTypes.find(t => t.value === filterType)?.icon ?? Filter
  const SortIcon = sortOptions.find(o => o.value === sortOption)?.icon ?? Filter

  return (
    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
      <div className="relative w-full max-w-lg">
        <span className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-gray-500">
          <Search className="h-5 w-5" strokeWidth={2} />
        </span>
        <Input
          type="text"
          placeholder="Пошук..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-12 pr-10"
        />
        {searchTerm && (
        <button
          type="button"
          onClick={() => setSearchTerm('')}
          className="absolute inset-y-0 right-3 flex items-center justify-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
        >
          <X className="h-5 w-5" strokeWidth={2} />
        </button>
        )}
      </div>
      <Select value={filterType} onValueChange={setFilterType}>
        <SelectTrigger className="w-48 flex items-center gap-2">
          <SelectValue>
            <span className="flex items-center gap-2">
              <FilterIcon className="h-4 w-4" strokeWidth={2} />
              {filterType === 'all' ? 'Тип' : filterType}
            </span>
          </SelectValue>
        </SelectTrigger>
        <SelectContent className="bg-white dark:bg-[#09090B] text-gray-900 dark:text-white border border-gray-200 dark:border-[#2a2c36]">
          {filterTypes.map((type) => (
            <SelectItem key={type.value} value={type.value}>
              <span className="flex items-center gap-2">
                <type.icon className="h-4 w-4" strokeWidth={2} />
                {type.label}
              </span>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Select value={sortOption} onValueChange={setSortOption}>
        <SelectTrigger className="w-64 flex items-center gap-2 whitespace-nowrap">
          <SelectValue>
            <span className="flex items-center gap-2">
              {SortIcon && <SortIcon className="h-4 w-4" strokeWidth={2} />}
              {sortOptions.find(o => o.value === sortOption)?.label ?? 'Фільтр'}
            </span>
          </SelectValue>
        </SelectTrigger>
        <SelectContent className="bg-white dark:bg-[#09090B] text-gray-900 dark:text-white border border-gray-200 dark:border-[#2a2c36]">
          {sortOptions.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              <span className="flex items-center gap-2">
                <option.icon className="h-4 w-4" strokeWidth={2} />
                {option.label}
              </span>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}