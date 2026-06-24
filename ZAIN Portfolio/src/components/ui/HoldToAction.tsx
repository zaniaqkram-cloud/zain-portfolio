import { useRef, useCallback } from "react";
import { motion, useMotionValue, animate } from "framer-motion";

interface HoldToActionProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  innerClassName?: string;
  onMouseEnter?: () => void;
}

export default function HoldToAction({ href, children, className, innerClassName = "bg-surface rounded-full px-3 py-1 backdrop-blur-md", onMouseEnter }: HoldToActionProps) {
  const progress = useMotionValue(0);
  const animRef = useRef<ReturnType<typeof animate> | null>(null);
  const completedRef = useRef(false);
  const holdingRef = useRef(false);

  const startHold = useCallback(() => {
    holdingRef.current = true;
    completedRef.current = false;
    animRef.current?.stop();
    progress.set(0);
    animRef.current = animate(progress, 1, {
      duration: 0.8,
      ease: "easeOut",
      onComplete: () => {
        completedRef.current = true;
        holdingRef.current = false;
        window.location.href = href;
      },
    });
  }, [href, progress]);

  const endHold = useCallback(() => {
    if (completedRef.current) {
      holdingRef.current = false;
      return;
    }
    holdingRef.current = false;
    animRef.current?.stop();
    const current = progress.get();
    if (current > 0 && current < 1) {
      animate(progress, 0, {
        duration: 0.2,
        ease: "easeIn",
      });
    }
  }, [progress]);

  return (
    <motion.a
      href={href}
      onMouseDown={startHold}
      onTouchStart={startHold}
      onMouseUp={endHold}
      onMouseLeave={endHold}
      onTouchEnd={endHold}
      onTouchCancel={endHold}
      onMouseEnter={onMouseEnter}
      onClick={(e) => {
        if (!completedRef.current) e.preventDefault();
      }}
      className={className}
    >
      <span className="absolute inset-[-2px] rounded-full accent-gradient opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      <span className={`relative flex items-center gap-1 overflow-hidden ${innerClassName}`}>
        <motion.span
          className="absolute inset-0 rounded-full accent-gradient pointer-events-none"
          style={{ scaleX: progress, originX: 0, opacity: 0.35 }}
        />
        <span className="relative z-10 flex items-center gap-1">{children}</span>
      </span>
    </motion.a>
  );
}
