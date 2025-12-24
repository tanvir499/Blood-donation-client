// src/utils/AnimationUtils.js

// Page animation variants
export const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  exit: { opacity: 0, y: -20 }
};

// Card animation variants
export const cardVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { type: "spring", stiffness: 100, damping: 15 }
  }
};

// Pulse animation
export const pulseAnimation = {
  scale: [1, 1.05, 1],
  transition: {
    duration: 2,
    repeat: Infinity,
    ease: "easeInOut"
  }
};

// Float animation
export const floatAnimation = {
  y: [0, -10, 0],
  transition: {
    duration: 3,
    repeat: Infinity,
    ease: "easeInOut"
  }
};

// Hover animation for cards
export const hoverAnimation = {
  scale: 1.02,
  transition: {
    type: "spring",
    stiffness: 400,
    damping: 17
  }
};

// Stagger container for lists
export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

// Fade in up animation
export const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6 }
  }
};

// Bounce animation
export const bounceAnimation = {
  scale: [1, 1.05, 1],
  y: [0, -5, 0],
  transition: {
    duration: 0.6,
    repeat: Infinity
  }
};

// Background gradient animation
export const backgroundGradientAnimation = {
  animate: {
    backgroundPosition: ["0%", "100%", "0%"],
  },
  transition: {
    duration: 6,
    repeat: Infinity,
    ease: "linear",
  }
};

// Text gradient animation
export const textGradientAnimation = {
  animate: {
    backgroundPosition: ["0%", "100%", "0%"],
  },
  transition: {
    duration: 5,
    repeat: Infinity,
    ease: "linear",
  }
};

// Button hover animation
export const buttonHoverAnimation = {
  whileHover: { 
    scale: 1.02,
    boxShadow: "0 10px 30px rgba(239, 68, 68, 0.3)"
  },
  whileTap: { scale: 0.98 }
};

// Icon hover rotation
export const iconHoverRotation = {
  whileHover: { rotate: 360 },
  transition: { duration: 0.6 }
};

// Rotate animation
export const rotateAnimation = {
  rotate: 360,
  transition: {
    duration: 2,
    repeat: Infinity,
    ease: "linear"
  }
};

// DonationRequest specific animations
export const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export const cardHoverVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
    },
  },
  hover: {
    y: -8,
    scale: 1.02,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 17,
    },
  },
};