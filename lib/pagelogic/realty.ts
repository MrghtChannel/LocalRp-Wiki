import {
  Warehouse, Building2, Home, Building,
  Filter, SortAsc, SortDesc, LucideIcon
} from 'lucide-react'

export type SortOption = 'price_desc' | 'price_asc' | 'none'

export const sortOptions: { value: SortOption; label: string; icon: LucideIcon }[] = [
  { value: 'none', label: 'Без сортування', icon: Filter },
  { value: 'price_asc', label: 'За зростанням ціни', icon: SortAsc },
  { value: 'price_desc', label: 'За спаданням ціни', icon: SortDesc },
]

export const filterTypes: { value: string; label: string; icon: LucideIcon }[] = [
  { value: 'all', label: 'Всі', icon: Filter },
  { value: 'warehouse', label: 'Склад', icon: Warehouse },
  { value: 'office', label: 'Офіс', icon: Building2 },
  { value: 'house', label: 'Будинок', icon: Home },
  { value: 'apartment', label: 'Квартира', icon: Building },
]

export const getSortLabel = (option: SortOption) =>
  sortOptions.find(o => o.value === option)?.label ?? 'Фільтр'

export const getTypeIcon = (type: string): LucideIcon =>
  (filterTypes.find(t => t.value === type) ?? filterTypes[0]).icon

export const parseNumber = (value: string | number | undefined): number => {
  if (value === undefined || value === null) return 0
  const strValue = typeof value === 'number' ? value.toString() : value
  return parseFloat(strValue.replace(/[^\d]/g, '')) || 0
}
