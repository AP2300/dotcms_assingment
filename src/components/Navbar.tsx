"use client";

import Image from "next/image";
import imageLoader from "../utils/imageLoader";
import Link from "next/link";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { usePathname } from "next/navigation";
import { useState } from "react";

interface NavItem {
  folder: string;
  href: string;
  target?: string;
  title: string;
}

const Navbar = ({ navItems }: { navItems: NavItem[] }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50);
  });

  // Check if screen is desktop size (lg breakpoint = 1024px)
  useState(() => {
    const checkDesktop = () => {
      setIsDesktop(window?.innerWidth >= 1024);
    };
    
    checkDesktop();
    window.addEventListener('resize', checkDesktop);
    return () => window.removeEventListener('resize', checkDesktop);
  });

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex justify-center">
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ 
          y: 0, 
          opacity: 1,
          width: (isDesktop && isScrolled) ? "auto" : "100%",
          marginTop: (isScrolled) ? "0.5rem" : "0rem",
          marginLeft: (isScrolled) ? "1rem" : "0rem",
          marginRight: (isScrolled) ? "1rem" : "0rem",
        }}
        transition={{ 
          y: { duration: 0.5, ease: "easeOut" },
          opacity: { duration: 0.5, ease: "easeOut" },
          width: { duration: 0.25, ease: "easeInOut" },
          marginTop: { duration: 0.3, ease: "easeInOut" },
          marginLeft: { duration: 0.3, ease: "easeInOut" },
          marginRight: { duration: 0.3, ease: "easeInOut" },
        }}
        style={{
          backdropFilter: isScrolled ? "blur(40px)" : "blur(0px)",
        }}
        className="flex justify-center bg-linear-to-b from-black/55 via-black/25 to-transparent items-center rounded-xl "
      >
        <div className="flex justify-between items-center py-4 px-4 w-full gap-6 lg:gap-12 container">
          <Link href="/">
            <motion.div
              whileHover={{ scale: 1.05 }}
              animate={{
                width: isScrolled ? 60 : 100,
              }}
              transition={{ 
                scale: { type: "spring", stiffness: 300 },
                width: { duration: 0.5, ease: "easeInOut" }
              }}
            >
              <Image
                className="dark:invert w-full h-auto"
                src="/outspire-logo.webp"
                alt="Outspire logo"
                width={100}
                height={20}
                priority
                unoptimized
                loader={imageLoader}
              />
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          {navItems && (
            <div className="hidden md:block">
              <Navigation navItems={navItems} />
            </div>
          )}

          {/* Mobile Menu Button */}
          {navItems && (
            <button
              onClick={toggleMobileMenu}
              className="md:hidden p-2 text-white hover:bg-slate-600/50 rounded-lg transition-colors"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          )}
        </div>

        {/* Mobile Navigation Menu */}
        {navItems && isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden absolute top-full left-0 right-0 mt-2 bg-black/90 backdrop-blur-xl rounded-xl shadow-xl overflow-hidden"
          >
            <MobileNavigation
              navItems={navItems}
              onItemClick={() => setIsMobileMenuOpen(false)}
            />
          </motion.div>
        )}
      </motion.nav>
    </div>
  );
};

function Navigation({ navItems }: { navItems: NavItem[] }) {
  const pathname = usePathname();

  return (
    <ul className="flex lg:gap-2 items-center justify-center">
      <li>
        <Link
          href={{ pathname: "/" }}
          className={`p-3 text-sm lg:text-base hover:bg-slate-600/50 transition-all ease-in-out rounded-2xl ${
            pathname === "/" && "bg-slate-600"
          }`}
        >
          Home
        </Link>
      </li>
      {navItems.map(({ folder, href, target, title }) => (
        <li key={folder}>
          <Link
            href={{ pathname: href }}
            className={`p-3 text-sm lg:text-base hover:bg-slate-600/50 transition-all ease-in-out rounded-2xl ${
              pathname === href && "bg-slate-600"
            }`}
            target={target}
          >
            {title}
          </Link>
        </li>
      ))}
    </ul>
  );
}

function MobileNavigation({
  navItems,
  onItemClick,
}: {
  navItems: NavItem[];
  onItemClick: () => void;
}) {
  const pathname = usePathname();

  return (
    <ul className="flex flex-col p-4">
      <li>
        <Link
          href={{ pathname: "/" }}
          onClick={onItemClick}
          className={`block p-4 hover:bg-slate-600/50 transition-all ease-in-out rounded-xl ${
            pathname === "/" && "bg-slate-600"
          }`}
        >
          Home
        </Link>
      </li>
      {navItems.map(({ folder, href, target, title }) => (
        <li key={folder}>
          <Link
            href={{ pathname: href }}
            onClick={onItemClick}
            className={`block p-4 hover:bg-slate-600/50 transition-all ease-in-out rounded-xl ${
              pathname === href && "bg-slate-600"
            }`}
            target={target}
          >
            {title}
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default Navbar;
