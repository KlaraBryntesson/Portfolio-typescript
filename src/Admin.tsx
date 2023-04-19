export interface Admin {
  userName: string;
  password: string;
}

export function Admin() {
  return {
    userName: "klarabryntesson",
    password: "secret",
  };
}
