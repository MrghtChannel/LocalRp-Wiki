  import {
    Car, Truck, Plane, Ship, Bike, Bus, Tractor,
    Filter, SortAsc, SortDesc, LucideIcon
  } from 'lucide-react'

  export type SortOption = 'price_desc' | 'price_asc' | 'speed_asc' | 'speed_desc' | 'none'

  export const sortOptions: { value: SortOption; label: string; icon: LucideIcon }[] = [
    { value: 'none', label: 'Без сортування', icon: Filter },
    { value: 'price_asc', label: 'За зростанням ціни', icon: SortAsc },
    { value: 'price_desc', label: 'За спаданням ціни', icon: SortDesc },
    { value: 'speed_asc', label: 'За зростанням швидкості', icon: SortAsc },
    { value: 'speed_desc', label: 'За спаданням швидкості', icon: SortDesc },
  ]
  
  export const filterTypes: { value: string; label: string; icon: LucideIcon }[] = [
    { value: 'all', label: 'Всі', icon: Filter },
    { value: 'Lightweight', label: 'Легкові авто', icon: Car },
    { value: 'Cargo', label: 'Вантажівки', icon: Truck },
    { value: 'Helicopters', label: 'Гелікоптери', icon: Plane },
    { value: 'Boats', label: 'Човни', icon: Ship },
    { value: 'Motorcycles', label: 'Мотоцикли', icon: Bike },
    { value: 'Buses', label: 'Автобуси', icon: Bus },
    { value: 'Tractors', label: 'Трактори', icon: Tractor },
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
