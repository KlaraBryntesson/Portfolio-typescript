import styled from 'styled-components';
import { ReactNode, useContext } from 'react';
import { SomeContext } from './SomeContext';
import { MyComponentProps } from './App';

type PrimaryButtonProps = {
  children: ReactNode;
  type?: 'button' | 'submit';
  onClick?: () => void;
};

function PrimaryButton({ children, type, onClick }: PrimaryButtonProps) {
  const theme = useContext(SomeContext)?.theme;

  return (
    <MyButton
      ThemeColor={theme === 'light' ? 'rgb(42, 42, 42)' : 'antiquewhite'}
      type={type}
      onClick={type === 'button' ? onClick : undefined}
    >
      {children}
    </MyButton>
  );
}

const MyButton = styled.button<MyComponentProps>`
  border: 1.5px solid ${(props) => props.ThemeColor};
`;

export default PrimaryButton;
