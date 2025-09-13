import {
  Store, Fuel, CreditCard, Target, Shirt, Car, Scissors, Droplet,
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
  { value: 'shop', label: 'Магазин', icon: Store },
  { value: 'gasstation', label: 'Заправка', icon: Fuel },
  { value: 'atm', label: 'Банкомат', icon: CreditCard },
  { value: 'gunstore', label: 'Збройовий магазин', icon: Target },
  { value: 'clothingstore', label: 'Магазин одягу', icon: Shirt },
  { value: 'carshowroom', label: 'Автосалон', icon: Car },
  { value: 'tattooparlor', label: 'Тату-салон', icon: Scissors },
  { value: 'barbershop', label: 'Барбершоп', icon: Scissors },
  { value: 'carwash', label: 'Автомийка', icon: Droplet },
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
