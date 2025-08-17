import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Testimonial } from '../types';
import { ChevronLeftIcon, ChevronRightIcon, QuoteIcon } from './icons/InterfaceIcons';
import Card from './Card';

interface TestimonialsCarouselProps {
  testimonials: Testimonial[];
}

const variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 1000 : -1000,
    opacity: 0,
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    zIndex: 0,
    x: direction < 0 ? 1000 : -1000,
    opacity: 0,
  }),
};

const swipeConfidenceThreshold = 10000;
const swipePower = (offset: number, velocity: number) => {
  return Math.abs(offset) * velocity;
};

const MotionDiv = motion.div as any;

const TestimonialsCarousel: React.FC<TestimonialsCarouselProps> = ({ testimonials }) => {
  const [[page, direction], setPage] = useState([0, 0]);

  const paginate = (newDirection: number) => {
    setPage([page + newDirection, newDirection]);
  };
  
  const testimonialIndex = (page % testimonials.length + testimonials.length) % testimonials.length;

  useEffect(() => {
    const interval = setInterval(() => {
      paginate(1);
    }, 5000); // Change testimonial every 5 seconds
    return () => clearInterval(interval);
  }, [page]);

  const currentTestimonial = testimonials[testimonialIndex];

  return (
    <div className="relative w-full h-[450px] flex items-center justify-center overflow-hidden">
      <AnimatePresence initial={false} custom={direction}>
        <MotionDiv
          key={page}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: 'spring', stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 },
          }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={1}
          onDragEnd={(e, { offset, velocity }) => {
            const swipe = swipePower(offset.x, velocity.x);
            if (swipe < -swipeConfidenceThreshold) {
              paginate(1);
            } else if (swipe > swipeConfidenceThreshold) {
              paginate(-1);
            }
          }}
          className="absolute w-full max-w-4xl px-4"
        >
          <Card className="!p-8 md:!p-12 text-center">
            <QuoteIcon className="h-12 w-12 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
            <p className="text-xl italic text-gray-700 dark:text-gray-300">
              "{currentTestimonial.quote}"
            </p>
            <div className="mt-6 flex items-center justify-center">
                <img src={currentTestimonial.avatar} alt={currentTestimonial.author} className="h-12 w-12 rounded-full mr-4"/>
                <div>
                    <p className="font-bold text-gray-900 dark:text-white">{currentTestimonial.author}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{currentTestimonial.authorTitle}</p>
                </div>
            </div>
            <div className="mt-4 text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500">
                <span>Caso: {currentTestimonial.caseType}</span>
                <span className="mx-2">|</span>
                <span>Resultado: {currentTestimonial.caseResult}</span>
            </div>
          </Card>
        </MotionDiv>
      </AnimatePresence>
      <div className="absolute top-1/2 -translate-y-1/2 left-4 z-10">
        <button
          onClick={() => paginate(-1)}
          className="p-2 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-full hover:bg-white dark:hover:bg-gray-700"
        >
          <ChevronLeftIcon className="h-6 w-6" />
        </button>
      </div>
       <div className="absolute top-1/2 -translate-y-1/2 right-4 z-10">
        <button
          onClick={() => paginate(1)}
          className="p-2 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-full hover:bg-white dark:hover:bg-gray-700"
        >
          <ChevronRightIcon className="h-6 w-6" />
        </button>
      </div>
    </div>
  );
};

export default TestimonialsCarousel;