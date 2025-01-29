import React from 'react'
import { AnimatedTestimonials } from "@/components/ui/animated-testimonials";

function About() {
  const testimonials = [
    {
      quote:
        "A Full-Stack software engineer with a robust background in the MERN stack, encompassing MongoDB, Express.js, React, and Node.js. My expertise also includes working with Next.js to build high-performance Applications.",
      name: "Nidhish Rathore",
      designation: "Full-Stack Developer",
      src: "/nidhish.jpg",
    },
    {
      quote:
        "An aspiring full stack developer really passionate about web development. Persuing BTech CSE Software Engineering from SRMIST, my passion for technology brought me here. I love bringing ideas to real world.",
      name: "Paras ",
      designation: "Full-Stack Developer",
      src: "/paras.JPG",
    },
   
  ];
  return (
    <div>
       <p className='ml-20 mt-28 text-4xl font-bold'>About US</p>
      <AnimatedTestimonials testimonials={testimonials} />
    </div>
  )
}

export default About
