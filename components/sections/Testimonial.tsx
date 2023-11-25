"use client"

import React, { useEffect, useState } from "react";
// import axios from "../axios-orders";
import SingleTestimonial from "../SingleTestimonial";
import Loader from "../Loader";

import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";

import dynamic from "next/dynamic";
import { Testimonial, User } from "@prisma/client";
const OwlCarousel = dynamic(() => import("react-owl-carousel"), {
  ssr: false,
});

interface TestimonialProps {
  testimonials: (Testimonial & {users: {name: String}})[]
}

const Testimonial = ({testimonials}: TestimonialProps) => {
  // const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    // axios
    //   .get("/testimonials.json")
    //   .then((res) => {
    //     // console.log(res)
    //     setTestimonials(res.data);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  }, []);

  // console.log(this.state.testimonials)

  let renderTestimonials = <Loader />;
  if (testimonials.length) {
    renderTestimonials = (
      <OwlCarousel
        autoplay
        className="test-caro"
        dots={true}
        items={1}
        loop
        margin={0}
        nav={false}
      > 
        {testimonials.map((tsml) => {
          return (
            <SingleTestimonial
              key={tsml.id}
              id={tsml.id}
              name={tsml.users.name}
              designation={tsml.designation}
              body={tsml.desc}
            />
          );
        })}
      </OwlCarousel>
    );
  }

  return (
    // Testimonial section start
    <section className="testimonial bg-lightred">
      <div className="container">
        <div className="row">
          <div className="col-lg-10 col-md-12 m-auto">{renderTestimonials}</div>
        </div>
      </div>
    </section>
    // Testimonial section end
  );
};

export default Testimonial;
