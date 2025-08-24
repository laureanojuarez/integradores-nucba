import {User} from "lucide-react";

export const Header = () => {
  return (
    <header className="h-16 bg-neutral-900 text-white flex items-center justify-center">
      my header
      <nav>
        <li>Peliculas</li>
        <User />
      </nav>
    </header>
  );
};
