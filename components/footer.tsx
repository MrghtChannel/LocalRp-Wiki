export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full h-auto py-3">
      <div className="container flex flex-col items-center justify-center text-center text-muted-foreground text-sm px-4">
        <p>Усі права захищені © 2024 - {currentYear} LocalRp Wiki</p>
      </div>
    </footer>
  );
}
