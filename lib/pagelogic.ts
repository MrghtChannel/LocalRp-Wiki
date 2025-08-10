import businessProperties from '@/contents/business/index.json';
import realtyProperties from '@/contents/realty/index.json';
import transportProperties from '@/contents/transport/index.json';

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

const allPageProperties: Record<string, Property[]> = {
  business: businessProperties as Property[],
  realty: realtyProperties as Property[],
  transport: transportProperties as Property[],
};

export const getPageProperties = async (
  page: keyof typeof allPageProperties
): Promise<Property[]> => {
  return allPageProperties[page] || [];
};
