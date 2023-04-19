import { Formik } from 'formik';
import { useContext } from 'react';
import { SomeContext } from './SomeContext';
import { Admin } from './Admin';
import styled from 'styled-components';
import PrimaryButton from './PrimaryButton';
import { MyComponentProps } from './App';

function LoginComponent() {
  const adminUser: Admin | null = Admin(),
    setLoggedIn = useContext(SomeContext)?.setLoggedIn,
    theme = useContext(SomeContext)?.theme;

  return (
    <Formik
      initialValues={{ userName: '', password: '' }}
      onSubmit={(values) => {
        if (
          values.userName === adminUser.userName &&
          values.password === adminUser.password
        ) {
          console.log(`Välkommen ${adminUser.userName}`);
          setLoggedIn?.(true);
        } else {
          console.log('WRONG USER');
        }
      }}
    >
      {({ handleChange, handleSubmit, values }) => (
        <Form
          ThemeColor={theme === 'light' ? 'rgb(42, 42, 42)' : 'antiquewhite'}
          onSubmit={handleSubmit}
        >
          <label>
            Username
            <input
              name='userName'
              value={values.userName}
              onChange={handleChange}
              type='text'
            />
          </label>
          <label>
            Password
            <input
              name='password'
              value={values.password}
              onChange={handleChange}
              type='text'
            />
          </label>
          <PrimaryButton type='submit'>Logga in</PrimaryButton>
        </Form>
      )}
    </Formik>
  );
}

const Form = styled.form<MyComponentProps>`
  width: 350px;
  background-color: inherit;

  label {
    width: 100%;
    border-bottom: 1px solid ${(props) => props.ThemeColor};
  }

  input {
    width: 250px;
  }
`;

export default LoginComponent;
