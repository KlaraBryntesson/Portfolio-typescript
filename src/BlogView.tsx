import React from 'react';
import { useEffect, useState } from 'react';
import moment, { Moment } from 'moment';
import { useContext } from 'react';
import { SomeContext } from './SomeContext';
import styled from 'styled-components';
import { AnimatePresence, motion, easeInOut } from 'framer-motion';
import PrimaryButton from './PrimaryButton';
import { MyComponentProps } from './App';

interface Post {
  title: string;
  date: Moment;
  content: string;
}

const thisDate = moment().format('YYYY-MM-DD');

function BlogView() {
  const loggedIn = useContext(SomeContext)?.loggedIn,
    blog = useContext(SomeContext)?.blog,
    theme = useContext(SomeContext)?.theme,
    [posts, setPosts] = useState<Post[]>([]),
    [title, setTitle] = useState(''),
    [content, setContent] = useState(''),
    [isNotLoggedIn, setIsNotLoggedIn] = useState(true),
    [showForm, setShowForm] = useState(false),
    [showError, setShowError] = useState(false),
    storedPosts = JSON.parse(localStorage.getItem('posts') || '[]') as Post[];

  useEffect(() => {
    if (storedPosts) {
      const storedList = storedPosts.map((post) => ({
        title: post.title,
        date: moment(post.date),
        content: post.content,
      }));
      setPosts(storedList);
    }
    if (blog) {
      const blogList = blog.map((post) => ({
        title: post.title,
        date: moment(post.date),
        content: post.content,
      }));
      localStorage.setItem('posts', JSON.stringify(blogList));
      setPosts(blogList);
    }
  }, []);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    if (loggedIn) {
      const newPost = {
        title: title,
        date: moment(thisDate),
        content: content,
      };
      setPosts([newPost, ...posts]);
      localStorage.setItem('posts', JSON.stringify([newPost, ...posts]));
      setTitle('');
      setContent('');
    }
  }

  useEffect(() => {
    if (loggedIn) {
      setIsNotLoggedIn(false);
    }
  }, [loggedIn]);

  function handleClick() {
    if (isNotLoggedIn === false) {
      setShowForm(true);
    } else {
      setShowError(true);
      setTimeout(() => {
        setShowError(false);
      }, 3000);
    }
  }

  useEffect(() => {
    console.log(posts);
  }, [posts]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ x: 200, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: -300, opacity: 0 }}
        transition={{ delay: 0.3, ease: easeInOut, duration: 1.3 }}
      >
        <main>
          <HeaderDiv>
            <h1>Blog</h1>
            <div>
              <hr />
            </div>
          </HeaderDiv>
          {posts.map((post) => (
            <BlogDiv key={post.title}>
              <h2>{post.title}</h2>
              <p>{moment(post.date).format('YYYY-MM-DD')}</p>
              <p>{post.content}</p>
              <hr />
            </BlogDiv>
          ))}
          <FormDiv>
            {showForm ? (
              <Form
                ThemeColor={
                  theme === 'light' ? 'rgb(42, 42, 42)' : 'antiquewhite'
                }
                onSubmit={handleSubmit}
              >
                <label>
                  Title
                  <input
                    onChange={(event) => setTitle(event.target.value)}
                    value={title}
                    required
                  />
                </label>
                <label>
                  Content
                  <textarea
                    rows={4}
                    onChange={(event) => setContent(event.target.value)}
                    value={content}
                    required
                  />
                </label>
                <PrimaryButton type='submit'>Publish</PrimaryButton>
              </Form>
            ) : (
              <AddButton
                ThemeColor={
                  theme === 'light' ? 'rgb(42, 42, 42)' : 'antiquewhite'
                }
                onClick={handleClick}
                // disabled={isNotLoggedIn ? true : false}
              >
                Add blogpost
              </AddButton>
            )}
            {showError && <p>Only admin can add blogposts, please log in!</p>}
          </FormDiv>
        </main>
      </motion.div>
    </AnimatePresence>
  );
}

const HeaderDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;

  div {
    width: 70%;
    padding-bottom: 1.2%;
  }

  @media (max-width: 500px) {
    div {
      width: 60%;
      padding-bottom: 0;
    }
  }
`;

const BlogDiv = styled.div`
  margin-top: 60px;

  h2 {
    font-size: calc(50% + 4vw);
  }

  p {
    width: 80%;
  }

  hr {
    margin: 40px 0 40px 0;
  }
`;

const FormDiv = styled.div`
  position: relative;
  margin-top: 60px;
  display: flex;
  justify-content: center;

  p {
    font-size: calc(80% + 0.2vw);
    color: rgb(254, 105, 5);
    position: absolute;
    top: 35px;
  }
`;

const Form = styled.form<MyComponentProps>`
  width: 70%;
  min-width: 300px;
  max-width: 450px;

  label {
    width: 100%;
    max-width: 400px;
    border-bottom: 1px solid ${(props) => props.ThemeColor};
  }

  input {
    width: 250px;
  }

  textarea {
    width: 350px;
    background-color: inherit;
    outline: none;
    border: none;
    padding: 5px;
  }
`;

const AddButton = styled.button<MyComponentProps>`
  border: 1.5px solid ${(props) => props.ThemeColor};
`;

export default BlogView;
