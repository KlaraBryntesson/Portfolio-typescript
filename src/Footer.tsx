import LoginComponent from './LoginComponent';
import { useState, useContext, useEffect } from 'react';
import styled from 'styled-components';
import PrimaryButton from './PrimaryButton';
import { SomeContext } from './SomeContext';

interface FooterProps {
  path: string;
}

function Footer(props: FooterProps) {
  const loggedIn = useContext(SomeContext)?.loggedIn,
    [showLogin, setShowLogin] = useState(false),
    [isLoggedIn, setIsLoggedIn] = useState(false);

  function handleClick() {
    setShowLogin(!showLogin);
  }

  useEffect(() => {
    if (loggedIn) {
      setIsLoggedIn(true);
    }
  }, [loggedIn]);

  useEffect(() => {
    console.log(props.path);
  }, [props.path]);

  return (
    <FooterDiv>
      {showLogin && !isLoggedIn && <LoginComponent />}
      {props.path === '/blog' && !isLoggedIn && !showLogin && (
        <PrimaryButton type='button' onClick={handleClick}>
          Admin login
        </PrimaryButton>
      )}
    </FooterDiv>
  );
}

const FooterDiv = styled.div`
  margin-top: 20px;
  height: 150px;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  margin-bottom: 5px;
`;

export default Footer;
