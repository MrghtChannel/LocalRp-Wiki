import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const fileExists = async (filePath: string): Promise<boolean> => {
  try {
    await fs.promises.access(filePath);
    return true;
  } catch {
    return false;
  }
};

export const getCategoriesFromWiki = async (): Promise<any[]> => {
  try {
    const wikiDir = path.join(process.cwd(), 'app/content/wiki');
    const folders = await fs.promises.readdir(wikiDir, { withFileTypes: true });

    const categories = await Promise.all(
      folders
        .filter((folder) => folder.isDirectory())
        .map(async (folder) => {
          const indexPath = path.join(wikiDir, folder.name, 'index.mdx');
          let categoryData = { title: folder.name, slug: folder.name };

          try {
            if (await fileExists(indexPath)) {
              const fileContent = await fs.promises.readFile(indexPath, 'utf-8');
              const { data } = matter(fileContent);
              categoryData = {
                title: data.title || folder.name,
                slug: folder.name,
              };
            }
          } catch (err) {
            console.error(`Error reading index.mdx in folder ${folder.name}:`, err);
          }
          return categoryData;
        })
    );

    return categories.filter(Boolean);
  } catch (error) {
    console.error('Error reading categories:', error);
    return [];
  }
};

export const getSubcategoriesFromCategory = async (category: string): Promise<any[]> => {
  try {
    const categoryDir = path.join(process.cwd(), 'app/content/wiki', category);
    const files = await fs.promises.readdir(categoryDir, { withFileTypes: true });

    const subcategories = await Promise.all(
      files
        .filter((file) => file.isFile() && file.name.endsWith('.mdx') && file.name !== 'index.mdx')
        .map(async (file) => {
          const filePath = path.join(categoryDir, file.name);
          const fileContent = await fs.promises.readFile(filePath, 'utf-8');
          const { data } = matter(fileContent);
          return {
            title: data.title || file.name.replace('.mdx', ''),
            slug: file.name.replace('.mdx', ''),
          };
        })
    );

    return subcategories.filter(Boolean);
  } catch (error) {
    console.error(`Error reading subcategories for category ${category}:`, error);
    return [];
  }
};

export const getMdxContent = async (category: string, subcategory: string): Promise<string | null> => {
  try {
    const mdxFilePath = path.join(process.cwd(), 'app/content/wiki', category, `${subcategory}.mdx`);

    if (await fileExists(mdxFilePath)) {
      const fileContent = await fs.promises.readFile(mdxFilePath, 'utf-8');
      const { content } = matter(fileContent);
      return content;
    } else {
      return null;
    }
  } catch (error) {
    console.error(`Error reading MDX file for category ${category}, subcategory ${subcategory}:`, error);
    return null;
  }
};

export const getIndexMdxContent = async (category: string): Promise<string | null> => {
  try {
    const indexPath = path.join(process.cwd(), 'app/content/wiki', category, 'index.mdx');

    if (await fileExists(indexPath)) {
      const fileContent = await fs.promises.readFile(indexPath, 'utf-8');
      const { content } = matter(fileContent);
      return content;
    } else {
      return null;
    }
  } catch (error) {
    console.error(`Error reading index.mdx for category ${category}:`, error);
    return null;
  }
};
