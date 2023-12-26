"use client"

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, ShoppingBag } from 'lucide-react';
import Loader from "./Loader";
import { usePathname, useRouter } from "next/navigation";
import { UserButton, useAuth } from "@clerk/nextjs";
import { Button } from "@/components/ui/button"
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"
import useCart from "@/hooks/use-cart";
import Image from "next/image";

const Navbar = (props: any) => {
  const pathName = usePathname();
  const router = useRouter()
  const cart = useCart();
  const { userId } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  // solve hydration where the Html server render : 0 and client html render the no. order in cart <0-5>
  const [isMounted, setIsMounted] = useState<boolean>(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const menuToggleHandler = () => {
    setMenuOpen(!menuOpen);
    // setMenuOpen((prevState) => !prevState.menuOpen);
  };

  const clearStateHandler = () => {
    if (menuOpen) {
      setMenuOpen(false);
    }
  };

  const NavCartPage = () => {
    router.push("/cart")
    setMenuOpen(!menuOpen);
  }

  let absHeader = pathName === "/" ? " abs-header" : "";
  let right = pathName === "/" ? "" : " text-right";

  return (
    // Header start
    <header className={"header" + absHeader}>
      <div className="container lg:!max-w-6xl">
        <div className="row">
          {/* align-items-end */}
          <div className="col-md-3">
            <Link href="/" className="logo">
            {/* <img src="/images/logo.png" alt="" /> */}
            <Image
              src="/images/logo.png"
              alt="" 
              width={109}
              height={77}
              className=""
            />
            </Link>
          </div>
          <div className={"col-md-9" + right}>
            <nav className="primary-menu">
              <button className="mobile-menu" onClick={menuToggleHandler}>
              {/* <Menu className="ti-menu"/> */}
              <i className="ti-menu"></i>
              </button>
              <ul className={`${menuOpen ? "active" : ""}  flex flex-col sm:!block `} >
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
                        <Button variant="link" className="py-2 px-3 m-0 text-sm cursor-pointer md:py-0 hover:text-[#ff817e]">BLOG</Button>
                      </HoverCardTrigger>
                      <HoverCardContent className="w-80">
                        <div className="flex justify-between space-x-4 z-50">
                          <div className="">
                            <Link href="/blog"  onClick={clearStateHandler} className="text-sm ">Blog post</Link>
                            <Link href="/write"  onClick={clearStateHandler} className="text-sm">Write blog</Link>
                          </div>
                        </div>
                      </HoverCardContent>
                    </HoverCard>
                </li>
                {/* <li>
                  <Link href="/contact" onClick={clearStateHandler}>
                    Contact
                  </Link>
                </li> */}
                {!userId && 
                <li>
                  <Link href="/sign-in" onClick={clearStateHandler}>
                    Login
                  </Link>
                </li>}
                
                <li  className={`${userId ? " ml-2 translate-y-2" : ""} self-center mb-2 sm:mb-0 sm:text-center`}>
                    <UserButton afterSignOutUrl='/' />
                </li>
                <li className="self-center py-3 translate-y-0.5 sm:px-6 ">
                  <div className="mx-auto flex items-center gap-x-4">
                    <Button onClick={NavCartPage} className="flex items-center rounded-full bg-black px-4 py-2">
                      <ShoppingBag
                        size={20}
                        color="white"
                      />
                      <span className="ml-2 text-sm font-medium text-white">
                        {isMounted ? cart.items.length : 0}
                      </span>
                    </Button>
                  </div>
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
