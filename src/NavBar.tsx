import { useEffect, useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import * as Icon from 'react-bootstrap-icons';
import moment from 'moment';
import { SomeContext } from './SomeContext';
import styled from 'styled-components';
import './NavBar.css';

const currentYear = moment().format('YYYY');

function NavBar() {
  const details = useContext(SomeContext)?.details,
    [isChecked, setChecked] = useState(false),
    theme = useContext(SomeContext)?.theme,
    setTheme = useContext(SomeContext)?.setTheme;

  useEffect(() => {
    if (isChecked) {
      setTheme?.('dark');
    } else {
      setTheme?.('light');
    }
  });

  return (
    <div className='NavBar'>
      <div className='NavBar-top'>
        <header>
          <div className='NavBar-toggle-container'>
            <ThemeParagraph>{theme} mode</ThemeParagraph>
            <Toggle>
              <input
                type='checkbox'
                checked={isChecked}
                onChange={(event) => setChecked(event.target.checked)}
              />
              <span className='slider' />
            </Toggle>
          </div>
        </header>
        <nav>
          <ul className='NavBar-list'>
            <li>
              <Link className='NavBar-links' to='/'>
                Home
              </Link>
            </li>
            <li>
              <Link className='NavBar-links' to='/about'>
                About
              </Link>
            </li>
          </ul>
        </nav>
      </div>
      <div className='NavBar-navbar-left'>
        {details && details !== null && (
          <div className='NavBar-icons'>
            <a href={details.github} target='_blank'>
              <Icon.Github className='NavBar-bi bi-github' />
            </a>
            <a href={details.linkedin} target='_blank'>
              <Icon.Linkedin className='NavBar-bi bi-linkedin' />
            </a>
          </div>
        )}

        <p className='NavBar-year'>© {currentYear}</p>
      </div>
    </div>
  );
}

const ThemeParagraph = styled.p`
  font-size: calc(50% + 0.1vw);
  text-transform: uppercase;
  margin-bottom: 5px;
`;

const Toggle = styled.label`
  height: 20px;
  width: 40px;
  position: relative;
  display: inline-block;
  color: inherit;

  input {
    opacity: 0;
    width: 0;
    height: 0;
  }

  &:focus-within {
    border-bottom: none !important;
    color: none !important;
  }

  .slider {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    cursor: pointer;
    border-radius: 30px;
    background-color: rgb(128, 127, 125);
    transition: 0.4s;
  }

  .slider:before {
    position: absolute;
    content: '';
    height: 16px;
    width: 16px;
    left: 2px;
    bottom: 2px;
    background-color: rgb(42, 42, 42);
    border-radius: 50%;
    transition: 0.4s;
  }

  .slider:hover:before {
    animation: twitch-left 0.3s ease;
  }

  input:checked + .slider:hover:before {
    animation: twitch-right 0.3s ease;
  }

  @keyframes twitch-left {
    0%,
    100% {
      transform: translateX(0);
    }
    50% {
      transform: translateX(2px);
    }
  }

  @keyframes twitch-right {
    0%,
    100% {
      transform: translateX(20px);
    }
    50% {
      transform: translateX(18px);
    }
  }

  input:checked + .slider {
    background-color: rgb(254, 105, 5);
  }

  input:checked + .slider:before {
    transform: translateX(20px);
    animation: transform 0.5s ease;
  }

  @media (max-width: 700px) {
    height: 15px;
    width: 30px;

    .slider:before {
      height: 11px;
      width: 11px;
      left: 2px;
      bottom: 2px;
    }

    input:checked + .slider:before {
      transform: translateX(15px);
    }
  }
`;

export default NavBar;
