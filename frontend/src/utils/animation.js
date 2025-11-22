export const fadeUp = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.45 },
};
export const cardPop = {
  initial: { scale: 0.99 },
  animate: { scale: 1 },
  transition: { duration: 0.3 },
};
export const stagger = (delay = 0.05) => ({
  animate: { transition: { staggerChildren: delay } },
});
