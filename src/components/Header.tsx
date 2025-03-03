import Image from "next/image";
import Link from "next/link";
import { ThemeToggle } from "./ThemeToggle";
import SearchInput from "./SearchInput";
import GenreDropdown from "./GenreDropdown";
import { SignedIn, SignedOut, UserButton, SignInButton } from "@clerk/nextjs";
import { Menu } from "lucide-react";
import { Button } from "./ui/button";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetClose,
} from "./ui/sheet";
import logo from "../../public/Untitled_design-removebg-preview.png";

const Header = () => {
  return (
    <header className="fixed w-full z-[60] top-0 flex items-center justify-between p-5 
      bg-gradient-to-t from-white/0 via-white/10 to-white/30 
      dark:from-gray-900/0 dark:via-gray-900/25 dark:to-gray-900">
      
      {/* Left Section */}
      <div className="flex items-center space-x-4">
        {/* Mobile Menu (Only on SM) */}
        <div className="sm:block md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="w-6 h-6" />
              </Button>
            </SheetTrigger>

            <SheetContent side="left" className="w-72 py-24 z-50">
              <SheetHeader>
                <SheetTitle>Menu</SheetTitle>
              </SheetHeader>

              {/* Search Input (Moved inside menu on SM) */}
              <div className="py-2">
                <SearchInput />
              </div>

              {/* Theme Toggle */}
              <ThemeToggle />

              {/* Signed In: Show "My List" */}
              <SignedIn>
                <Link
                  href="/profile"
                  className="block text-center text-black dark:text-gray-100 font-semibold px-4 mt-2 mb-2 py-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition"
                >
                  My List
                </Link>
              </SignedIn>

              {/* Signed Out: Show Sign In Button */}
              <div className="mt-2">
                <SignedOut>
                  <SignInButton />
                </SignedOut>
              </div>

              {/* Close Button */}
              <SheetClose asChild>
                <Button variant="outline" className="w-full mt-4">Close</Button>
              </SheetClose>
            </SheetContent>
          </Sheet>
        </div>

        {/* Logo (Always Visible) */}
        <Link href="/" className="flex items-center">
          <Image
          src={logo}
            //src="https://links.papareact.com/a943ae"
            alt="disney logo"
            width={50}
            height={50}
            className="cursor-pointer invert-0 dark:invert w-auto h-auto"
            priority
          />
        </Link>
      </div>

      {/* Genre Dropdown (Always Visible) + Avatar (Only Signed In) */}
      <div className="mr-4 ml-auto flex items-center space-x-4">
        <GenreDropdown />
        
        {/* Move Avatar Outside the Sheet (Only on SM) */}
        <SignedIn>
          <div className="block sm:hidden">
            <UserButton afterSignOutUrl="/" />
          </div>
        </SignedIn>
      </div>

      {/* Desktop Only: Search, Theme, My List, Avatar */}
      <div className="hidden md:flex items-center space-x-4">
        <SearchInput />
        <ThemeToggle />

        <SignedIn>
          <Link
            href="/profile"
            className="text-black dark:text-gray-100 font-semibold px-4 py-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition"
          >
            My List
          </Link>
          <UserButton afterSignOutUrl="/" />
        </SignedIn>

        <SignedOut>
          <SignInButton />
        </SignedOut>
      </div>
    </header>
  );
};

export default Header;