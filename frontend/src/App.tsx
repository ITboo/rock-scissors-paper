import { useState } from "react";

import type { User } from "./types/User";

import LoginPage from "./pages/LoginPage";

import "./App.css";

const App = () => {
  const [user, setUser] = useState<User | undefined>(undefined);

  return (
    <>{user ? "Welcome" + JSON.stringify(user, null, 4) : <LoginPage />}</>
  );
};

export { App };
