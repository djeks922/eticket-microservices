import axios from "axios";
import buildClient from "../api/build-client";
import Header from "../components/header";

const LandingPage = ({ currentUser }) => {
  return (
    <>
      <Header currentUser={currentUser} />
      {currentUser ? (
        <h1>You are signed in</h1>
      ) : (
        <h1>You are NOT signed in</h1>
      )}
    </>
  );
};

LandingPage.getInitialProps = async (context) => {
  if (typeof window === "undefined") {
  } else {
    const response = await axios.get("/api/users/currentuser");

    return response.data;
  }
  const client = buildClient(context);
  const { data } = await client.get("/api/users/currentuser");

  return data;
};

export default LandingPage;
