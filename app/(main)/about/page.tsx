import React, { Fragment } from "react";
import AboutSec from '@/components/sections/About'
import Team from '@/components/sections/Team'
import Testimonial from '@/components/sections/Testimonial'
import { db } from "@/lib/db";

const About = async() => {
  const GetTestimonials = await db.testimonial.findMany({
    include: {
      users: {
        select: {
          name: true,
        }
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  })
  return (
    <>
      <AboutSec btn={false}/>
      <Team />
      <Testimonial testimonials={GetTestimonials}/>
    </>
  );
};

export default About;
