import { useEffect } from "react";
import { useSearchParams, Navigate } from "react-router-dom";
import axios from "axios";
import Cookies from "universal-cookie";

const Auth = () => {
  const [searchParams] = useSearchParams();
  const cookies = new Cookies();
  useEffect(() => {
    axios
      .post("http://localhost:3002/auth", { token: searchParams.get("token") })
      .then((resp) => cookies.set("sessionToken", resp.data));
  });
  return <Navigate to="/" replace />;
};

export default Auth;
