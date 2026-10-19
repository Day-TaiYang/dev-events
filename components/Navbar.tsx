import Image from "next/image";
import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <header>
      <nav>
        <Link href="/" className="logo">
          <Image
            alt="brand-logo"
            src="/icons/logo.png"
            width={24}
            height={24}
            className="w-full h-full object-contain"
          />
          <p className="text-md">DevEvent</p>
        </Link>
        <ul>
          <Link href="/">Home</Link>
          <Link href="/">Events</Link>
          <Link href="/">Create</Link>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
