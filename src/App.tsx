import WorkView from './WorkView';
import HomeView from './HomeView';
import AboutView from './AboutView';
// import BlogView from './BlogView';
import Root from './Root';
import { SomeContext } from './SomeContext';
import { useMemo, useState, useEffect } from 'react';
import { createHashRouter, RouterProvider } from 'react-router-dom';
import type { Result } from './useFetch';
import { useFetch } from './useFetch';

export interface MyComponentProps {
  ThemeColor: string;
}

function App() {
  const [loggedIn, setLoggedIn] = useState(false),
    [theme, setTheme] = useState('light'),
    result: Result | null = useFetch();

  const details = useMemo(() => {
    if (result) {
      return result.about.details;
    } else {
      return undefined;
    }
  }, [result]);

  const misc = useMemo(() => {
    if (result) {
      return result.about.misc;
    } else {
      return undefined;
    }
  }, [result]);

  const work = useMemo(() => {
    if (result) {
      return result.work;
    } else {
      return undefined;
    }
  }, [result]);

  const blog = useMemo(() => {
    if (result) {
      return result.blog;
    } else {
      return undefined;
    }
  }, [result]);

  useEffect(() => {
    const body = document.querySelector('body');
    if (theme === 'dark') {
      body?.classList.remove('light');
      body?.classList.add('dark');
      console.log('Temat är ', theme);
    } else {
      body?.classList.remove('dark');
      body?.classList.add('light');
      console.log('Temat är ', theme);
    }
  }, [theme]);

  const router = createHashRouter([
    {
      children: [
        { element: <HomeView />, path: '/' },
        { element: <AboutView />, path: '/about' },
        { element: <WorkView />, path: '/:projectId' },
        // { element: <BlogView />, path: '/blog' },
      ],
      element: <Root />,
    },
  ]);

  return (
    <SomeContext.Provider
      value={{
        details,
        misc,
        work,
        blog,
        loggedIn,
        setLoggedIn,
        theme,
        setTheme,
      }}
    >
      <RouterProvider router={router} />
    </SomeContext.Provider>
  );
}

export default App;
