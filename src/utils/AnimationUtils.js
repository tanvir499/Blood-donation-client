export const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  exit: { opacity: 0, y: -20 },
};

export const cardVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { type: "spring", stiffness: 100, damping: 15 },
  },
};

export const pulseAnimation = {
  scale: [1, 1.05, 1],
  transition: {
    duration: 2,
    repeat: Infinity,
    ease: "easeInOut",
  },
};

export const floatAnimation = {
  y: [0, -10, 0],
  transition: {
    duration: 3,
    repeat: Infinity,
    ease: "easeInOut",
  },
};

export const hoverAnimation = {
  scale: 1.02,
  transition: {
    type: "spring",
    stiffness: 400,
    damping: 17,
  },
};

export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
};

export const bounceAnimation = {
  scale: [1, 1.05, 1],
  y: [0, -5, 0],
  transition: {
    duration: 0.6,
    repeat: Infinity,
  },
};

export const backgroundGradientAnimation = {
  animate: {
    backgroundPosition: ["0%", "100%", "0%"],
  },
  transition: {
    duration: 6,
    repeat: Infinity,
    ease: "linear",
  },
};

export const textGradientAnimation = {
  animate: {
    backgroundPosition: ["0%", "100%", "0%"],
  },
  transition: {
    duration: 5,
    repeat: Infinity,
    ease: "linear",
  },
};

export const buttonHoverAnimation = {
  whileHover: {
    scale: 1.02,
    boxShadow: "0 10px 30px rgba(239, 68, 68, 0.3)",
  },
  whileTap: { scale: 0.98 },
};

export const iconHoverRotation = {
  whileHover: { rotate: 360 },
  transition: { duration: 0.6 },
};

export const rotateAnimation = {
  rotate: 360,
  transition: {
    duration: 2,
    repeat: Infinity,
    ease: "linear",
  },
};

export const menuItemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: (i) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: i * 0.1,
      type: "spring",
      stiffness: 100,
      damping: 15,
    },
  }),
};

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

export const sidebarVariants = {
  collapsed: { width: 80 },
  expanded: { width: 280 },
};

export const progressBarAnimation = {
  animate: {
    x: ["0%", "100%"],
  },
  transition: {
    repeat: Infinity,
    duration: 1.5,
    ease: "linear",
  },
};

export const shineEffect = {
  animate: {
    x: ["-100%", "200%"],
  },
  transition: {
    repeat: Infinity,
    duration: 1.5,
    ease: "linear",
  },
};

export const confettiAnimation = (i) => ({
  initial: {
    x: "50%",
    y: "50%",
    rotate: 0,
    opacity: 1,
  },
  animate: {
    x: Math.random() * 100 - 50 + "%",
    y: Math.random() * 100 - 50 + "%",
    rotate: 360,
    opacity: 0,
  },
  transition: {
    duration: 1.5,
    ease: "easeOut",
  },
});
