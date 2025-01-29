'use client'
import React from 'react'
import { HoverEffect } from "@/components/ui/card-hover-effect";

function WhySaviour() {
  return (
    <div>
        <p className='ml-20 mt-28 text-4xl font-bold'>Why Saviourr?</p>
        <p className='ml-20 mr-36 mt-8 text-sm'>Saviourr is a centralized, university-based blood donation system that ensures quick, reliable, and hassle-free donor matching. Unlike traditional methods that rely on scattered contacts or public appeals, Saviourr maintains a verified database of donors, allowing administrators to instantly find the right match for patients in need. This reduces delays, eliminates last-minute panic, and fosters a culture of regular blood donation within universities. With its organized data management, scalability, and security, Saviourr creates a self-sustaining lifesaving network, ensuring no life is lost due to blood shortage on campus.</p>
       <div className="max-w-5xl mx-auto mt-8 px-8">
      <HoverEffect items={projects} />
    </div>
    </div>
  )
}
export const projects = [
    {
      title: "Every Drop Counts",
      description:
        "Every blood donation can save up to three lives. Accident victims, cancer patients, and those undergoing surgery often rely on blood transfusions. By donating, you’re giving someone a second chance at life.",
      link: "/whysaviour",
    },
    {
      title: "Shortages Happen Every Day",
      description:
        "Hospitals and blood banks often run low on supply, especially for rare blood types. A single donation can be the difference between life and death for someone in critical need.",
      link: "/",
    },
    {
      title: "100% Safe & Simple",
      description:
        "Blood donation is a quick, safe, and painless process. Every donation is done using sterilized, single-use equipment, ensuring zero risk of infection.",
      link: "#",
    },
   
  ];
export default WhySaviour
