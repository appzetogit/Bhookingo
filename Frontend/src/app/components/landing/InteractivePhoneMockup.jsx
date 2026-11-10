import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, ShieldCheck, Navigation } from 'lucide-react';
import { useReducedMotionSafe } from '@/shared/motion/useReducedMotionSafe';

/**
 * Two app phones shown side-by-side, each auto-cycling (cross-fading) through
 * the app screenshots below. To change the images: drop files in
 * /public/assets/images and update SCREENSHOTS — nothing else needs to change.
 */
const SCREENSHOTS = [
  '/assets/images/app-driving-home.jpg',
  '/assets/images/app-restaurants-home.jpg',
];

function PhoneFrame({ startIndex = 0, widthClass, extraClass = '' }) {
  const shouldReduceMotion = useReducedMotionSafe();
  const [index, setIndex] = useState(startIndex % SCREENSHOTS.length);

  useEffect(() => {
    if (shouldReduceMotion || SCREENSHOTS.length < 2) return undefined;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % SCREENSHOTS.length);
    }, 3400);
    return () => clearInterval(id);
  }, [shouldReduceMotion]);

  return (
    <div
      className={`${widthClass} ${extraClass} rounded-[30px] border-[5px] border-[#18110D] bg-[#18110D] p-0.5 shadow-[0_20px_40px_rgba(0,0,0,0.6)] overflow-hidden`}
    >
      <div className="relative overflow-hidden rounded-[24px] bg-white aspect-[9/19.2]">
        {/* Dynamic Island */}
        <div className="absolute left-1/2 top-1.5 -translate-x-1/2 h-2.5 w-12 rounded-full bg-[#18110D] z-20" />
        <AnimatePresence mode="wait">
          <motion.img
            key={index}
            src={SCREENSHOTS[index]}
            alt="Bhookingo app screen"
            className="absolute inset-0 w-full h-full object-cover object-top"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7, ease: 'easeInOut' }}
            loading="eager"
          />
        </AnimatePresence>
      </div>
    </div>
  );
}

/**
 * Dual phone mockup for the landing hero — two highway-app screens floating
 * together with contextual micro-badges.
 */
export default function InteractivePhoneMockup() {
  const shouldReduceMotion = useReducedMotionSafe();

  return (
    <div
      style={{ fontFamily: 'var(--font-ui)' }}
      className="relative flex flex-col items-center justify-center py-2 sm:py-3 select-none w-full max-w-[340px] sm:max-w-[380px] lg:max-w-[400px] mx-auto px-1"
    >
      {/* Ambient background glow behind the phones */}
      <div className="absolute w-56 h-56 sm:w-64 sm:h-64 rounded-full bg-gradient-to-tr from-[#E0332F]/25 via-[#D62828]/15 to-transparent blur-3xl -z-10 pointer-events-none" />

      {/* Label pill */}
      <div className="mb-3 z-30 inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-black/75 px-2.5 py-0.5 text-[9.5px] font-bold text-white shadow-lg backdrop-blur-md">
        <Navigation className="w-2.5 h-2.5 text-red-400" />
        <span>Drive Mode &amp; Live Restaurants</span>
      </div>

      {/* Two auto-cycling phones + floating badges */}
      <div className="relative flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{
            opacity: 1,
            scale: 1,
            y: shouldReduceMotion ? 0 : [0, -6, 0],
          }}
          transition={{
            opacity: { duration: 0.6 },
            scale: { duration: 0.6 },
            y: { duration: 5, repeat: Infinity, ease: 'easeInOut' },
          }}
          className="flex items-end justify-center gap-2.5 sm:gap-3"
        >
          <PhoneFrame
            startIndex={0}
            widthClass="w-[128px] sm:w-[140px] md:w-[148px]"
            extraClass="-rotate-[4deg] translate-y-3 z-0"
          />
          <PhoneFrame
            startIndex={1}
            widthClass="w-[138px] sm:w-[152px] md:w-[162px]"
            extraClass="rotate-[3deg] z-10"
          />
        </motion.div>

        {/* Floating contextual badges — kept outside the float so they read cleanly */}
        <motion.div
          animate={{ y: shouldReduceMotion ? 0 : [0, -6, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
          className="pointer-events-none absolute inset-0 z-30"
        >
          {/* Top right — Live Route */}
          <div className="absolute top-2 -right-2 sm:-right-4 hidden xs:flex items-center gap-1.5 rounded-xl border border-white/20 bg-black/85 px-2 py-0.5 sm:px-2.5 sm:py-1 text-white shadow-xl backdrop-blur-md">
            <div className="w-4.5 h-4.5 rounded-lg bg-gradient-to-br from-[#E0332F] to-[#C72420] flex items-center justify-center shrink-0">
              <Navigation className="w-2.5 h-2.5 text-white" />
            </div>
            <div>
              <span className="block text-[7px] font-bold text-[#FF8582] uppercase tracking-wider">
                Live Route
              </span>
              <span className="text-[9px] font-bold text-white flex items-center gap-1">
                Forward Only
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping inline-block" />
              </span>
            </div>
          </div>

          {/* Bottom left — Pre-Order Ready */}
          <div className="absolute bottom-4 sm:bottom-6 -left-3 sm:-left-5 flex items-center gap-2 rounded-xl border border-white/30 bg-white/95 px-2.5 py-1.5 text-slate-900 shadow-[0_10px_25px_rgba(0,0,0,0.2)] backdrop-blur-md">
            <div className="w-6 h-6 rounded-lg bg-emerald-500 text-white flex items-center justify-center shrink-0">
              <Clock className="w-3 h-3" />
            </div>
            <div>
              <span className="block text-[7.5px] font-bold text-emerald-700 uppercase tracking-wider">
                PRE-ORDER READY
              </span>
              <span className="text-[9.5px] font-bold text-slate-900">Zero Wait Pickup</span>
            </div>
          </div>

          {/* Bottom right — Verified Hygiene */}
          <div className="absolute -bottom-1 -right-1 hidden sm:flex items-center gap-1 rounded-lg border border-white/15 bg-black/80 px-2 py-0.5 text-white shadow-lg backdrop-blur-md">
            <ShieldCheck className="w-2.5 h-2.5 text-emerald-400" />
            <span className="text-[9px] font-bold text-white/90">Verified Hygiene 4.8★</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
