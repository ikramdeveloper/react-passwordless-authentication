import { useState } from "react";
import axios from "axios";

const Login = ({ isLoading, setIsLoading }) => {
  const [email, setEmail] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    setIsLoading(true);
    axios
      .post("http://localhost:3002/login", { email })
      .then(() => {
        console.log("login success");
        e.target.reset();
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  };
  return (
    <div className="Login">
      <h2 className="title">Sign Up</h2>
      <form onSubmit={handleLogin}>
        <p>Enter your email...</p>
        <input
          type="email"
          placeholder="Enter your email..."
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="submit">Submit {isLoading && <span>...</span>}</button>
      </form>
    </div>
  );
};

export default Login;
