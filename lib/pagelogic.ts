import businessProperties from '@/contents/business/index.json';
import realtyProperties from '@/contents/realty/index.json';
import transportProperties from '@/contents/transport/index.json';
import { filterTypes as businessFilterTypes, sortOptions as businessSortOptions } from './pagelogic/business';
import { filterTypes as realtyFilterTypes, sortOptions as realtySortOptions } from './pagelogic/realty';
import { filterTypes as transportFilterTypes, sortOptions as transportSortOptions } from './pagelogic/transport';
import { LucideIcon } from 'lucide-react';

export interface Property {
  title: string;
  image?: string;
  price?: number | string;
  capacity?: number | string;
  garage?: string;
  tenants?: string;
  speed?: number | string;
  date?: string;
  type?: string;
}

export interface PropertiesJSON {
  imageFolder?: string;
  items: Property[];
}

export interface FilterType {
  value: string;
  label: string;
  icon: LucideIcon;
}

export interface SortOptionType {
  value: string;
  label: string;
  icon: LucideIcon;
}

const parseProperties = (data: PropertiesJSON): Property[] => {
  const folder = data.imageFolder || '';
  const items = data.items || data;
  return items.map(item => ({
    ...item,
    image: folder && item.image ? `${folder}/${item.image}` : item.image
  }));
};

const allPageProperties: Record<string, Property[]> = {
  business: parseProperties(businessProperties as PropertiesJSON),
  realty: parseProperties(realtyProperties as PropertiesJSON),
  transport: parseProperties(transportProperties as PropertiesJSON),
};

const allFilterTypes: Record<string, FilterType[]> = {
  business: businessFilterTypes,
  realty: realtyFilterTypes,
  transport: transportFilterTypes,
};

const allSortOptions: Record<string, SortOptionType[]> = {
  business: businessSortOptions,
  realty: realtySortOptions,
  transport: transportSortOptions,
};

export const parseNumber = (value: string | number | undefined): number => {
  if (value === undefined || value === null) return 0;
  const strValue = typeof value === 'number' ? value.toString() : value;
  return parseFloat(strValue.replace(/[^\d]/g, '')) || 0;
};

export const getPageProperties = async (
  page: keyof typeof allPageProperties
): Promise<Property[]> => {
  return allPageProperties[page] || [];
};

export const getFilterTypes = (page: keyof typeof allFilterTypes): FilterType[] => {
  return allFilterTypes[page] || [];
};

export const getSortOptions = (page: keyof typeof allSortOptions): SortOptionType[] => {
  return allSortOptions[page] || [];
};