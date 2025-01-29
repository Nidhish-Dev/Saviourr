"use client";
import React from 'react';
import { useState, useRef, useEffect } from "react";
import { LayoutGrid } from "@/components/ui/layout-grid";
import { TypewriterEffectSmooth } from "@/components/ui/typewriter-effect";
import { FlipWords } from "@/components/ui/flip-words";
import Link from 'next/link';

function Hero() {
  const words = [
    {
      text: "Saviourr",
      className: "text-red-900 dark:text-blue-500",
    },
  ];
  const words2 = ["Donate", "Save", "Care", "Love"];

  return (
    <div>
      <div className='flex '>
        <div className="flex flex-col pt-24">
          <div className="ml-20">
            <TypewriterEffectSmooth words={words} />
          </div>

          <div className="pt-10 flex ml-20">
            <div className="text-4xl font-normal text-white dark:text-neutral-400">
              We <FlipWords words={words2} /> <br />
              Life is very Precious
            </div>
          </div>

          <div className="mt-16 flex gap-20 ml-20">
            <Link href={'/finder'} className='font-bold'>
              <span className="cursor-pointer relative group">
                <span className="transition-all duration-300">Need Blood</span>
                <span className="absolute left-1/2 bottom-0 w-0 h-0.5 bg-red-800 transform -translate-x-1/2 group-hover:w-full transition-all duration-500"></span>
              </span>
            </Link>
            <Link className='font-bold' href={'/donor'}>
              <span className="cursor-pointer relative group">
                <span className="transition-all duration-300">Become Donor</span>
                <span className="absolute left-1/2 bottom-0 w-0 h-0.5 bg-red-800 transform -translate-x-1/2 group-hover:w-full transition-all duration-500"></span>
              </span>
            </Link>
          </div>
        </div>

        <div className="h-screen py-16 ml-60 w-1/2">
      <LayoutGrid cards={cards} />
    </div>
      </div>

     
    </div>
  );
}
const SkeletonOne = () => {
    return (
      <div>
        <p className="font-bold md:text-4xl text-xl text-white">
          House in the woods
        </p>
        <p className="font-normal text-base text-white"></p>
        <p className="font-normal text-base my-4 max-w-lg text-neutral-200">
          A serene and tranquil retreat, this house in the woods offers a peaceful
          escape from the hustle and bustle of city life.
        </p>
      </div>
    );
  };
   
  const SkeletonTwo = () => {
    return (
      <div>
        <p className="font-bold md:text-4xl text-xl text-white">
          House above the clouds
        </p>
        <p className="font-normal text-base text-white"></p>
        <p className="font-normal text-base my-4 max-w-lg text-neutral-200">
          Perched high above the world, this house offers breathtaking views and a
          unique living experience. It&apos;s a place where the sky meets home,
          and tranquility is a way of life.
        </p>
      </div>
    );
  };
  const SkeletonThree = () => {
    return (
      <div>
        <p className="font-bold md:text-4xl text-xl text-white">
          Greens all over
        </p>
        <p className="font-normal text-base text-white"></p>
        <p className="font-normal text-base my-4 max-w-lg text-neutral-200">
          A house surrounded by greenery and nature&apos;s beauty. It&apos;s the
          perfect place to relax, unwind, and enjoy life.
        </p>
      </div>
    );
  };
  const SkeletonFour = () => {
    return (
      <div>
        <p className="font-bold md:text-4xl text-xl text-white">
          Rivers are serene
        </p>
        <p className="font-normal text-base text-white"></p>
        <p className="font-normal text-base my-4 max-w-lg text-neutral-200">
          A house by the river is a place of peace and tranquility. It&apos;s the
          perfect place to relax, unwind, and enjoy life.
        </p>
      </div>
    );
  };
   
  const cards = [
    {
      id: 1,
      content: <SkeletonOne />,
      className: "md:col-span-2",
      thumbnail:
        "/1.webp",
    },
    {
      id: 2,
      content: <SkeletonTwo />,
      className: "col-span-1",
      thumbnail:
        "/2.webp",
    },
    {
      id: 3,
      content: <SkeletonThree />,
      className: "col-span-1",
      thumbnail:
        "/3.webp",
    },
    {
      id: 4,
      content: <SkeletonFour />,
      className: "md:col-span-2",
      thumbnail:
        "/5.avif",
    },
  ];
export default Hero;
