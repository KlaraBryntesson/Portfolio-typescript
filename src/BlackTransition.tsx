import { motion } from 'framer-motion';

const Box = {
  initial: {
    height: '100vh',
    bottom: 0,
  },
  animate: {
    height: 0,
    transition: {
      when: 'afterChildren',
      duration: 1.5,
      ease: [0.8, 0, 0.15, 1],
    },
  },
};
function BlackTransition() {
  return (
    <div className='BlackTransition'>
      <motion.div
        className='BlackTransition-box'
        initial='initial'
        animate='animate'
        variants={Box}
      ></motion.div>
    </div>
  );
}

export default BlackTransition;
