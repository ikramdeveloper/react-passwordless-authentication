import axios from "axios";
import React from "react";
import Cookies from "universal-cookie";

const Home = ({ isLoading, setIsLoading }) => {
  const cookies = new Cookies();

  const testAPI = () => {
    const sessionToken = cookies.get("sessionToken");

    if (!sessionToken) {
      alert("First go to login page and then try");
      return;
    }

    setIsLoading(true);

    axios
      .post(
        "http://localhost:3002/test",
        {},
        {
          headers: { sessiontoken: sessionToken.session_token },
        }
      )
      .then((resp) => alert(resp.data))
      .catch((err) => alert(err.message))
      .finally(() => setIsLoading(false));
  };
  return (
    <div className="Home">
      <button onClick={testAPI}>
        Test API {isLoading && <span>...</span>}
      </button>
    </div>
  );
};

export default Home;
