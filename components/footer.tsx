import React from "react";
import Link from "next/link";
import Image from "next/image";

const Footer = () => {
  return (
    // Footer strat
    <footer className="footer">
      <div className="container">
        <div className="row">
          <div className="col-12 text-center">
            <Link href="/" className="logo foo-logo">
              <Image 
              src="/images/logo.png"
              alt="" 
              width={109}
              height={77}
              className=""
            />
            </Link>
            <nav className="foo-nav">
              <ul>
                <li>
                  <Link href="/">Home</Link>
                </li>
                <li>
                  <Link href="/about">About</Link>
                </li>
                <li>
                  <Link href="/feature">feature</Link>
                </li>
                <li>
                  <Link href="/services">service</Link>
                </li>
                <li>
                  <Link href="/contact">Contact</Link>
                </li>
              </ul>
            </nav>
            <div className="foo-social">
              <Link href="#">
                <i className="ti-facebook"></i>
              </Link>
              <Link href="#">
                <i className="ti-twitter-alt"></i>
              </Link>
              <Link href="#">
                <i className="ti-vimeo-alt"></i>
              </Link>
              <Link href="#">
                <i className="ti-instagram"></i>
              </Link>
            </div>
            <p className="copyright">
              &copy; COPYRIGHT {`${new Date().getFullYear()} `}
              <a href="https://themeies.com">themeies.com.</a> ALL RIGHTS
              RESERVED.
            </p>
          </div>
        </div>
      </div>
    </footer>
    // Footer end
  );
};

export default Footer;
