import { useState, useContext } from 'react';
import PrimaryButton from './PrimaryButton';
import styled from 'styled-components';
import { SomeContext } from './SomeContext';
import { MyComponentProps } from './App';

function ContactForm() {
  const [name, setName] = useState(''),
    [email, setEmail] = useState(''),
    [phone, setPhone] = useState(''),
    [showError, setShowError] = useState(false),
    [showSuccess, setShowSuccess] = useState(false),
    theme = useContext(SomeContext)?.theme;

  function handleSubmit() {
    if (name === '' || email === '' || phone === '') {
      setShowError(true);
      setTimeout(() => {
        setShowError(false);
      }, 3000);
    } else {
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
      }, 3000);
    }
  }

  return (
    <>
      <FormDiv
        ThemeColor={theme === 'light' ? 'rgb(42, 42, 42)' : 'antiquewhite'}
        onSubmit={handleSubmit}
      >
        <label>
          Name
          <input
            onChange={(event) => setName(event.target.value)}
            value={name}
            required
          />
        </label>
        <label>
          Email
          <input
            type='email'
            onChange={(event) => setEmail(event.target.value)}
            value={email}
            required
          />
        </label>
        <label>
          Phone
          <input
            type='tel'
            onChange={(event) => setPhone(event.target.value)}
            value={phone}
            required
          />
        </label>
        <PrimaryButton type='submit'>Send Inquiry</PrimaryButton>
        {showError && (
          <p className='Contact-message'>All fields must be filled in!</p>
        )}
        {showSuccess && (
          <p className='Contact-message'>Thank you for your inquiry!</p>
        )}
      </FormDiv>
    </>
  );
}

const FormDiv = styled.form<MyComponentProps>`
  width: 100%;
  position: relative;
  padding: 25px;
  margin-top: 10px;

  label {
    width: 80%;
    min-width: 250px;
    max-width: 450px;
    border-bottom: 1px solid ${(props) => props.ThemeColor};
  }

  @media (max-width: 1100px) {
    padding: 0;
  }
`;

export default ContactForm;
