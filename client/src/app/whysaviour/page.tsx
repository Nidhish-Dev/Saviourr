'use client'
import React from 'react'
import { HoverEffect } from "@/components/ui/card-hover-effect";

function WhySaviour() {
  return (
    <div>
       <div className="max-w-5xl mx-auto mt-20 px-8">
      <HoverEffect items={projects} />
    </div>
    </div>
  )
}
export const projects = [
    {
      title: "Stripe",
      description:
        "A technology company that builds economic infrastructure for the internet.",
      link: "#",
    },
    {
      title: "Netflix",
      description:
        "A streaming service that offers a wide variety of award-winning TV shows, movies, anime, documentaries, and more on thousands of internet-connected devices.",
      link: "/",
    },
    {
      title: "Google",
      description:
        "A multinational technology company that specializes in Internet-related services and products.",
      link: "/whysaviour",
    },
   
  ];
export default WhySaviour
