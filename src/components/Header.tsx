import Image from "next/image";
import Link from "next/link";
import { ThemeToggle } from "./ThemeToggle";
import SearchInput from "./SearchInput";
import GenreDropdown from "./GenreDropdown";
import { SignedIn, SignedOut, UserButton, SignInButton } from "@clerk/nextjs";

const Header = () => {
  return (
    <header className="fixed w-full z-[60] top-0 flex items-center justify-between p-5 
  bg-gradient-to-t from-white/0 via-white/10 to-white/30 dark:from-gray-900/0 dark:via-gray-900/25 dark:to-gray-900">
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

      <div className="flex items-center space-x-4">
        <GenreDropdown />
        <SearchInput />
        <ThemeToggle />

        
        {/* If Signed In, Show Avatar */}
        <SignedIn>
          <UserButton afterSignOutUrl="/" />
        </SignedIn>

        {/* If Signed Out, Show Sign In Button */}
        <SignedOut>
          <SignInButton />
        </SignedOut>

      </div>
    </header>
  );
};

export default Header;