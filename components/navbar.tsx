"use client"

import React, { useState } from "react";
import Link from "next/link";
import { Menu } from 'lucide-react';
import Loader from "./Loader";
import { usePathname } from "next/navigation";
import { UserButton, useAuth } from "@clerk/nextjs";
import { Button } from "@/components/ui/button"
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"

const Navbar = (props: any) => {
  const pathName = usePathname();
  const { userId } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  const menuToggleHandler = () => {
    setMenuOpen(!menuOpen);
    // setMenuOpen((prevState) => !prevState.menuOpen);
  };

  const clearStateHandler = () => {
    if (menuOpen) {
      setMenuOpen(false);
    }
  };

  let absHeader = pathName === "/" ? " abs-header" : "";
  let right = pathName === "/" ? "" : " text-right";

  return (
    // Header start
    <header className={"header" + absHeader}>
      <div className="container lg:!max-w-6xl">
        <div className="row align-items-end">
          <div className="col-md-3">
            <Link href="/" className="logo">
            <img src="/images/logo.png" alt="" />
              {/* <img src={require("../assets/images/logo.png")} alt="" /> */}
            </Link>
          </div>
          <div className={"col-md-9" + right}>
            <nav className="primary-menu">
              <button className="mobile-menu" onClick={menuToggleHandler}>
              {/* <Menu className="ti-menu"/> */}
              <i className="ti-menu"></i>
              </button>
              <ul className={`${menuOpen ? "active" : ""} flex flex-col sm:block `}>
                <li>
                  <Link href="/" onClick={clearStateHandler}>
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/about" onClick={clearStateHandler}>
                    About
                  </Link>
                </li>
                <li>
                  <Link href="/services" onClick={clearStateHandler}>
                    Service
                  </Link>
                </li>
                <li>
                  <Link href="/appointmentList" onClick={clearStateHandler}>
                    Appointment
                  </Link>
                </li>
                <li>
                    <HoverCard>
                      <HoverCardTrigger asChild>
                        <p  className="py-2 px-3 m-0 text-sm cursor-pointer md:py-0 hover:text-[#ff817e]">BLOG</p>
                      </HoverCardTrigger>
                      <HoverCardContent className="w-80">
                        <div className="flex justify-between space-x-4">
                          <div className="">
                            <Link href="/blog"  onClick={clearStateHandler} className="text-sm ">Blog post</Link>
                            <Link href="/write"  onClick={clearStateHandler} className="text-sm">Write blog</Link>
                          </div>
                        </div>
                      </HoverCardContent>
                    </HoverCard>
                </li>
                <li>
                  <Link href="/contact" onClick={clearStateHandler}>
                    Contact
                  </Link>
                </li>
                {!userId && 
                <li>
                  <Link href="/sign-in" onClick={clearStateHandler}>
                    Login
                  </Link>
                </li>}
                
                <li  className={`${userId ? " ml-2 translate-y-2" : ""} self-center mb-2 sm:mb-0 sm:text-center`}>
                    <UserButton afterSignOutUrl='/' />
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </header>
    // Header start
  );
};

export default Navbar;
