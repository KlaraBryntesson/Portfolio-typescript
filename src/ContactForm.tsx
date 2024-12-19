import { useState, useContext } from 'react';
import emailjs from '@emailjs/browser';
import PrimaryButton from './PrimaryButton';
import styled from 'styled-components';
import { SomeContext } from './SomeContext';
import { MyComponentProps } from './App';

function ContactForm() {
  const [formData, setFormData] = useState({
      name: '',
      email: '',
      message: '',
    }),
    [showSuccess, setShowSuccess] = useState(false),
    theme = useContext(SomeContext)?.theme;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const serviceID: string = process.env.REACT_APP_EMAILJS_SERVICE_ID ?? '';
    const templateID: string = process.env.REACT_APP_EMAILJS_TEMPLATE_ID ?? '';
    const publicKey: string = process.env.REACT_APP_EMAILJS_PUBLIC_KEY ?? '';

    if (!formData.name || !formData.email || !formData.message) {
      alert('Fill in all required fields before sending.');
      return;
    }

    // Use emailjs to send the email
    if (serviceID && templateID && publicKey) {
      emailjs
        .send(serviceID, templateID, formData, publicKey)
        .then((response) => {
          console.log(response);
          setShowSuccess(true);
        })
        .catch((error) => {
          console.error(error);
          alert('Something went wrong! Please try again');
        });
    }
  };

  return (
    <>
      {showSuccess ? (
        <SuccessText>Thank you for your inquiry!</SuccessText>
      ) : (
        <FormDiv
          ThemeColor={theme === 'light' ? 'rgb(42, 42, 42)' : 'antiquewhite'}
          onSubmit={handleSubmit}
        >
          <label>
            Name
            <input name='name' onChange={handleChange} required />
          </label>
          <label>
            Email
            <input name='email' type='email' onChange={handleChange} required />
          </label>
          <label>
            Message
            <textarea name='message' onChange={handleChange} required />
          </label>
          <PrimaryButton type='submit'>Send Inquiry</PrimaryButton>
        </FormDiv>
      )}
    </>
  );
}

const SuccessText = styled.p`
  margin: 0 !important;
  padding: 1.5rem;
  width: fit-content !important;
`;

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
