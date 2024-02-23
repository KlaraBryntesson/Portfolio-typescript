import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Project } from './WorkView';
import { SomeContext } from './SomeContext';
import { useContext } from 'react';

interface WorkListProps {
  projects: Project[];
}

interface CardProps {
  image: string;
  ThemeColor: string;
}

function WorkList(props: WorkListProps) {
  const theme = useContext(SomeContext)?.theme;

  return (
    <Cards className='WorkList'>
      {props.projects.map((project) => (
        <Link className='WorkList-card' to={project.id} key={project.id}>
          <Card
            ThemeColor={
              theme === 'light'
                ? 'rgba(211, 206, 194, 0.7)'
                : 'rgb(254, 105, 5)'
            }
            image={project.image}
          >
            <h3>{project.name}</h3>
            <div className='WorkList-container' />
          </Card>
        </Link>
      ))}
    </Cards>
  );
}

WorkList.propTypes = {
  projects: PropTypes.array,
};

const Cards = styled.div`
  display: flex;
  /* flex-wrap: wrap; */
  overflow-x: scroll;
  width: 100%;

  /* @media (max-width: 1349px) {
    width: 70%;
  } */

  @media (max-width: 1007px) {
    width: 100%;
  }

  @media (max-width: 750px) {
    flex-direction: column;
  }
`;

const Card = styled.div<CardProps>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.ThemeColor};
  width: 280px;
  aspect-ratio: 1 / 1;
  margin-right: 20px;
  margin-bottom: 20px;
  position: relative;
  transition: 0.3s ease-in-out;

  .WorkList-container {
    opacity: 0;
    position: absolute;
    transition: 0.3s ease-in-out;
  }

  h3 {
    opacity: 1;
  }

  &:hover {
    .WorkList-container {
      aspect-ratio: 1;
      background-image: url(${(props) => props.image});
      opacity: 0.75;
      height: 100%;
      width: 100%;
      background-repeat: no-repeat;
      background-size: cover;
      animation: backGroundImage 0.5s linear;
    }

    .WorkList-container::before {
      content: '';
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      background-color: #54524f52;
    }

    h3 {
      opacity: 0;
      transition: opacity 0.1s ease-in-out;
    }
  }

  @keyframes backGroundImage {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 0.75;
    }
  }

  div {
    text-align: center;
  }

  @media (max-width: 750px) {
    width: 90%;
    min-width: 250px;
    height: 250px;

    /* &:hover {
      background-image: url(${(props) => props.image});
      opacity: 0.75;
      background-size: cover;
      background-repeat: no-repeat;
      animation: backGroundImage 0.5s linear; */

    /* .WorkList-container {
        visibility: hidden;
      } */

    /* h3 {
        visibility: hidden;
      } */
    /* } */
  }
`;

export default WorkList;
