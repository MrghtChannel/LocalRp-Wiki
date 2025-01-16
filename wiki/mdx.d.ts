declare module "*.mdx" {
    export const properties: Array<{
      image: string;
      title: string;
      price: string;
      capacity?: string;
      garage?: string;
      tenants?: string;
      type: string;
    }>;
    const content: string;
    export default content;
  }
  