import { Hero } from '../components/home/Hero';
import { Introduction } from '../components/home/Introduction';
import { Philosophy } from '../components/home/Philosophy';
import { Gallery } from '../components/home/Gallery';
import { Experience } from '../components/home/Experience';
import { Concept } from '../components/home/Concept';
import { Story } from '../components/home/Story';
import { Location } from '../components/home/Location';
import { Testimonials } from '../components/home/Testimonials';
import { useRef } from 'react';
import { useRevealOnce } from '../hooks/useRevealOnce';

export const Home = () => {
  const pageRef = useRef<HTMLDivElement | null>(null);
  useRevealOnce(pageRef);

  return (
    <div ref={pageRef} className="flex flex-col w-full">
      <Hero />
      <Introduction />
      <Gallery />
      <Testimonials />
      <Philosophy />
      <Experience />
      <Concept />
      <Story />
      <Location />
    </div>
  );
};
