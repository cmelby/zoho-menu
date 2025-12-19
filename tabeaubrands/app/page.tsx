import { Hero } from "@/components/sections/hero";
import { Marquee } from "@/components/sections/marquee";
import { Comparison } from "@/components/sections/comparison";
import { Products } from "@/components/sections/products";
import { Safety } from "@/components/sections/safety";
import { Packaging } from "@/components/sections/packaging";

export default function Home() {
  return (
    <div className="flex flex-col gap-0">
      <Hero />
      <Marquee />
      <Comparison />
      <Products />
      <Safety />
      <Packaging />
    </div>
  );
}
