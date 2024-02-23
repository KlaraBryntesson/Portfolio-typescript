// import './Home.css';
import * as Icon from 'react-bootstrap-icons';
import WorkList from './WorkList';
import Contact from './ContactComponent';
import PrimaryButton from './PrimaryButton';
import styled from 'styled-components';
import { useContext, useRef, useEffect } from 'react';
import { SomeContext } from './SomeContext';
import { MyComponentProps } from './App';
import {
  AnimatePresence,
  motion,
  easeInOut,
  useInView,
  useAnimation,
} from 'framer-motion';

function Home() {
  const theme = useContext(SomeContext)?.theme,
    contactId = 'contact-section',
    ref = useRef(null),
    isInView = useInView(ref),
    animation = useAnimation(),
    misc = useContext(SomeContext)?.misc,
    projects = useContext(SomeContext)?.work;

  // const details = useContext(SomeContext)?.details;

  function handleClick() {
    const element = document.querySelector(`#${contactId}`);
    element?.scrollIntoView({ behavior: 'smooth' });
  }

  useEffect(() => {
    if (isInView) {
      animation.start({
        y: 0,
        opacity: 1,
        transition: {
          ease: easeInOut,
          delay: 0.1,
          duration: 0.4,
        },
      });
    }
    console.log('elementet syns', isInView);
  }, [isInView]);

  return (
    <AnimatePresence mode='wait'>
      <motion.div
        initial={{ x: 200, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: -300, opacity: 0 }}
        transition={{ delay: 0.3, ease: easeInOut, duration: 1.3 }}
      >
        <main>
          <IntroDiv
            ThemeColor={
              theme === 'light' ? 'rgb(42, 42, 42)' : 'rgb(254, 105, 5)'
            }
          >
            {theme === 'light' ? (
              <AnimatePresence mode='wait'>
                <motion.div
                  key={'light'}
                  initial={{ rotate: 0 }}
                  animate={{ rotate: 720 }}
                  exit={{ rotate: -360 }}
                  transition={{
                    delayChildren: 0.5,
                    ease: easeInOut,
                    duration: 0.5,
                  }}
                >
                  <Icon.EmojiSmile className='bi bi-emoji-smile' />
                </motion.div>
              </AnimatePresence>
            ) : (
              <AnimatePresence mode='wait'>
                <motion.div
                  key={'dark'}
                  initial={{ rotate: 0 }}
                  animate={{
                    rotate: 720,
                  }}
                  exit={{ rotate: -360 }}
                  transition={{
                    delayChildren: 0.5,
                    ease: easeInOut,
                    duration: 0.5,
                  }}
                >
                  <Icon.EmojiSunglasses className='bi bi-emoji-smile' />
                </motion.div>
              </AnimatePresence>
            )}
            <div>
              <h1>Hello!</h1>
              {misc && misc !== null && <p>{misc.bio}</p>}
              <PrimaryButton type='button' onClick={handleClick}>
                Contact me!
              </PrimaryButton>
            </div>
          </IntroDiv>

          <CategoryDiv>
            <h2>Work</h2>
            <div>
              <hr />
            </div>
          </CategoryDiv>
          {projects && <WorkList projects={projects} />}
          <AnimatePresence>
            <motion.div initial={{ y: 100, opacity: 0 }} animate={animation}>
              <CategoryDiv ref={ref}>
                <h2>Contact</h2>
                <div>
                  <hr />
                </div>
              </CategoryDiv>
            </motion.div>
          </AnimatePresence>
          <Contact id={contactId} />
        </main>
      </motion.div>
    </AnimatePresence>
  );
}

const IntroDiv = styled.div<MyComponentProps>`
  display: flex;
  flex-direction: row;

  h1 {
    /* font-size: 10rem; */
    font-size: 12vw;
  }

  div:nth-child(1) {
    width: 30%;
    margin-right: 40px;
  }

  div {
    width: 70%;
  }

  p {
    width: 70%;
  }

  .bi-emoji-smile {
    color: ${(props) => props.ThemeColor};
    align-self: flex-start;
    margin-top: 20px;
    margin-right: 20px;
    height: 350px;
    width: 100%;
    padding: 10px;
    transform: rotate(0);
  }

  .bi-emoji-smile:hover {
    animation: spinn 0.7s linear infinite;
  }

  @keyframes spinn {
    0% {
      transform: rotate(0deg);
    }
    25% {
      transform: rotate(10deg);
    }
    50% {
      transform: rotate(0deg);
    }
    75% {
      transform: rotate(-10deg);
    }
    100% {
      transform: rotate(0deg);
    }
  }

  img {
    max-width: 400px;
    min-width: 270px;
  }

  @media (max-width: 900px) {
    flex-direction: column-reverse;

    div {
      width: 100%;
      margin-bottom: 20px;
      margin-left: 0;
    }

    p {
      width: 90%;
    }

    .bi-emoji-smile {
      display: none;
    }
  }

  @media (max-width: 550px) {
    img {
      width: 90%;
    }
  }
`;

const CategoryDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;
  margin-top: 60px;
  margin-bottom: 20px;

  div {
    width: 70%;
    padding-bottom: 1.2%;
  }

  @media (max-width: 500px) {
    div {
      padding-bottom: 0;
    }
  }
`;

// const Skills = styled.div`
//   padding: 10px;
//   background-color: rgb(254, 105, 5);
//   position: relative;
//   width: 100vw;
//   overflow-x: hidden;
//   height: 3rem;
// `;

export default Home;
