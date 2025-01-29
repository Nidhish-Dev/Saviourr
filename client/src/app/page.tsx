import Hero from "@/components/Hero";
import WhySaviour from "@/components/WhySaviour";
import About from "@/components/About";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <div className="px-12 rounded-3xl">
        <ul className="flex gap-5 text-center justify-center items-center py-4">
          <li>
            <Link href="#hero">Home</Link>
          </li>
          <li>
            <Link href="#why-saviourr">Why Saviourr</Link>
          </li>
          <li>
            <Link href="#about-us">About us</Link>
          </li>
          <li className="bg-red-900 text-white px-2 py-1 rounded-md transition-all duration-300 hover:bg-red-700">
            <Link href="/donor">Become Donor</Link>
          </li>
        </ul>
      </div>


      <div id="hero">
        <Hero />
      </div>


      <div id="why-saviourr">
        <WhySaviour />
      </div>


      <div id="about-us">
        <About />
      </div>


      <footer className="py-4 text-center mt-auto">
        © Copyright 2025 Saviourr. All Rights Reserved
      </footer>
    </div>
  );
}
