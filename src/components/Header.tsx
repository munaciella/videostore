import Image from "next/image";
import Link from "next/link";
import { ThemeToggle } from "./ThemeToggle";

const Header = () => {
  return (
    <header className="fixed w-full z-20 top-0 flex items-center justify-between p-5 bg-gradient-to-t from-gray-200/0 via-gray-900/25 to-gray-900/0">
      {/* Logo */}
      <Link href="/" className="flex items-center mr-10">
        <Image
          src="https://links.papareact.com/a943ae"
          alt="disney logo"
          width={120}
          height={100}
          className="cursor-pointer invert-0 dark:invert w-auto h-auto"
          priority
        />
      </Link>

      {/* Theme Toggle */}
      <div className="flex items-center space-x-2">
        <ThemeToggle />
      </div>
    </header>
  );
};

export default Header;