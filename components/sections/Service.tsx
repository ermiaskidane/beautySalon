"use client"

import React, { Component } from "react";

// var $ = require("jquery");
// if (typeof window !== "undefined") {
//    window.$ = window.jQuery = require("jquery");
// }

import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";

import dynamic from "next/dynamic";
const OwlCarousel = dynamic(() => import("react-owl-carousel"), {
  ssr: false,
});

const breakPoints = {
  0: {
    items: 2,
  },
  576: {
    items: 3,
  },
  768: {
    items: 4,
  },
};

const Service = () => {
  return (
    // Service section start
    <section className="service">
      <OwlCarousel
        autoplay
        className="service-caro"
        dots={false}
        items={4}
        loop
        margin={5}
        nav={false}
        responsive={breakPoints}
      >
        <div className="single-service">
          <img src="/images/service/1.jpg" alt="" />
          <div className="service-hover">
            <img src="/images/icons/1.png" alt="" />
            <span>Body Treatment</span>
          </div>
        </div>

        <div className="single-service">
          <img src="/images/service/2.jpg" alt="" />
          <div className="service-hover">
            <img src="/images/icons/1.png" alt="" />
            <span>Body Treatment</span>
          </div>
        </div>

        <div className="single-service">
          <img src="/images/service/3.jpg" alt="" />
          <div className="service-hover">
            <img src="/images/icons/1.png" alt="" />
            <span>Body Treatment</span>
          </div>
        </div>

        <div className="single-service">
          <img src="/images/service/4.jpg" alt="" />
          <div className="service-hover">
            <img src="/images/icons/1.png" alt="" />
            <span>Body Treatment</span>
          </div>
        </div>
      </OwlCarousel>
    </section>
    // Service section end
  );
};

export default Service;
