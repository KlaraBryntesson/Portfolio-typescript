// import ContactForm from './ContactForm';
import styled from 'styled-components';
import * as Icon from 'react-bootstrap-icons';

type ContactProps = {
  id: string;
};

function ContactComponent(props: ContactProps) {
  return (
    <ContactDiv id={props.id}>
      <div>
        <p>
          Do you want to know more about me or have a business inquiry? Feel
          free to contact me through email and I will get back to you asap.
        </p>
        {/* <p>
          Do you want to know more about me or have a business inquiry? Please
          fill out your details and I will be in touch!
        </p> */}
      </div>
      <div className='mail-div'>
        <Icon.Envelope className='Contact-bi' />
        <p className='mail-p'>k_bryntesson@hotmail.com</p>
        {/* <ContactForm /> */}
      </div>
    </ContactDiv>
  );
}

const ContactDiv = styled.div`
  height: 300px;
  display: flex;
  flex-direction: row;
  margin-left: 0 !important;

  div {
    width: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  p {
    width: 70%;
    margin: auto;
  }

  .mail-div {
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .mail-p {
    margin: 10px 0 0 0;
    width: 100%;
    text-align: center;
    font-size: calc(80% + 0.5vw);
    font-weight: bold;
  }

  .Contact-bi {
    width: 30px;
    height: 30px;
  }

  @media (max-width: 950px) {
    flex-direction: column;

    div {
      width: 80%;
      margin-top: 20px;
      justify-content: flex-start;
    }

    p {
      width: 90%;
      margin: 0;
    }
  }

  @media (max-width: 500px) {
    p {
      width: 100%;
    }
  }
`;

export default ContactComponent;
