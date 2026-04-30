z"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "../../lib/utils";


interface ExpandableCardProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

/**
 * A simple accordion component to wrap sections on mobile, reducing scroll fatigue.
 * It takes a title and children, and expands/collapses on click.
 * This replaces the previous complex card component to better fit the use case.
 */
export function ExpandableCard({ title, children, className }: ExpandableCardProps) {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className={cn("group overflow-hidden bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/10 rounded-[32px] shadow-[0_15px_30px_rgba(0,0,0,0.6),_inset_0_1px_1px_rgba(255,255,255,0.15)]", className)}>
      <div 
        className="flex justify-between items-center px-6 py-5 font-medium text-lg text-white hover:text-[#81ecff] transition-colors cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h3 className="font-headline uppercase tracking-tight">{title}</h3>
        <span className={`material-symbols-outlined transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${isOpen ? 'rotate-45' : ''} text-[#81ecff]`}>add</span>
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
             transition={{ duration: 0.3 }}
           >
             <div className="px-6 pb-8 border-t border-white/10 pt-6">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}