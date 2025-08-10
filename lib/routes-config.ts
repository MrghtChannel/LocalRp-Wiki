// for page navigation & to sort on leftbar

export type EachRoute = {
  title: string;
  href: string;
  noLink?: true; // noLink will create a route segment (section) but cannot be navigated
  items?: EachRoute[];
  tag?: string;
};

export const ROUTES: EachRoute[] = [
  {
    title: "Rage MP",
    href: "/ragemp",
    noLink: true,
    items: [
      {
        title: "Помилки RageMP",
        href: "/error"
      },
      {
        title: "Як завантажити та запустити гру",
        href: "/how-to-download-and-start-the-game"
      }
    ]
  },
  {
    title: "Початок гри",
    href: "/Cob0-of-gris",
    noLink: true,
    items: [
      {
        title: "Програмне забезпечення",
        href: "/software-security"
      },
      {
        title: "Основи Roleplay",
        href: "/basics-of-roleplay"
      }
    ]
  }
];


type Page = { title: string; href: string };

function getRecurrsiveAllLinks(node: EachRoute) {
  const ans: Page[] = [];
  if (!node.noLink) {
    ans.push({ title: node.title, href: node.href });
  }
  node.items?.forEach((subNode) => {
    const temp = { ...subNode, href: `${node.href}${subNode.href}` };
    ans.push(...getRecurrsiveAllLinks(temp));
  });
  return ans;
}

export const page_routes = ROUTES.map((it) => getRecurrsiveAllLinks(it)).flat();
