import { Button, Heading, TextInput, toaster } from "evergreen-ui";
import { ChangeEvent, FormEvent, useState } from "react";

type LoginOkResponse = {
  status: "ok";
  token: string;
};

type LoginErrorResponse = {
  status: "error";
};

type LoginResponse = LoginOkResponse | LoginErrorResponse;

const LoginForm = () => {
  const [loading, setLoading] = useState(false);
  const [login, setLogin] = useState("");
  const handleLoginChange = (event: ChangeEvent<HTMLInputElement>) => {
    setLogin(event.target.value);
  };
  const handleFormSubmit = (event: FormEvent) => {
    event.preventDefault();
    setLoading(true);

    fetch("http://localhost:3000/login?login=" + login)
      .then((response) => response.json())
      .then((result: LoginResponse) => {
        if (result.status === "ok") {
          const token = result.token;
          console.log(token);
        } else {
          toaster.danger("Oops! Something went wrong. Try again!");
        }
      })
      .catch(() => toaster.danger("Request error"))
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <Heading size={400}>Nickname</Heading>
      <TextInput
        value={login}
        onChange={handleLoginChange}
        disabled={loading}
      />
      <Button
        disabled={login === "" || loading}
        type="submit"
        appearance="primary"
      >
        Log in
      </Button>
    </form>
  );
};

export default LoginForm;
