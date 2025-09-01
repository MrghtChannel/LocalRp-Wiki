import menuData from "@/contents/home/home.json";
import emojiData from "@/contents/home/home-emoji.json";

export type MenuItem = {
  title: string;
  description: string;
  icon?: string;
  link?: string;
};

export const Menu: MenuItem[] = menuData;

export function renderIcon(name?: string): string {
  if (!name) return emojiData.default;
  return emojiData[name as keyof typeof emojiData] ?? emojiData.default;
}
