import AboutSec from '@/components/sections/About'
import Appointment from '@/components/sections/Appointment'
import Banner from '@/components/sections/Banner'
import Blog from '@/components/sections/blogSec/Blog'
import Contact from '@/components/sections/Contact'
import Procedure from '@/components/sections/Procedure'
import Service from '@/components/sections/Service'
import Team from '@/components/sections/Team'
import Testimonial from '@/components/sections/Testimonial'
import { db } from '@/lib/db'
import Image from 'next/image'

const Home = async () => {
  const GetBlog = await db.blog.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  })

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
  // console.log("GetTestimonials", GetTestimonials)
  return (
    <>
      <Banner/>
      <AboutSec btn={true}/>
      <Service />
      <Procedure  blogs={GetBlog}/>
      <Testimonial testimonials={GetTestimonials} />
      <Team />
      <Appointment />
      {/* <Blog /> */}
      <Contact />
    </>
  )
}

export default Home
