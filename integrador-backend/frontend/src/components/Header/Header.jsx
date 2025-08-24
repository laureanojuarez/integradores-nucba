import {User} from "lucide-react";

export const Header = () => {
  return (
    <header className="h-16 bg-neutral-900 text-white flex items-center justify-between px-4 border-b border-neutral-500">
      <div>Logo</div>
      <nav className="flex items-center">
        <li>Peliculas</li>
        <User />
      </nav>
    </header>
  );
};
