import { Outlet, useLocation } from 'react-router-dom';
import NavBar from './NavBar';
import Footer from './Footer';
import BlackTransition from './BlackTransition';
import { motion } from 'framer-motion';

function Root() {
  const location = useLocation();
  return (
    <>
      <motion.section exit={{ opacity: 0 }}>
        <BlackTransition />
      </motion.section>
      <NavBar />
      <Outlet />
      <Footer path={location.pathname} />
    </>
  );
}

export default Root;
