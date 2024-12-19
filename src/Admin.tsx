export interface Admin {
  userName: string;
  password: string;
}

// Fake account to test the login functionality for the blog page

export function Admin() {
  return {
    userName: 'klarabryntesson',
    password: 'secret',
  };
}
