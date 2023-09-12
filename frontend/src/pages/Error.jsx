import React from "react";
import { useRouteError } from "react-router-dom";
import MainNavigation from "../components/MainNavigation";

const ErrorPage = () => {
  const error = useRouteError();
  let title = "An error occurred!!";
  let message = "Could not find this page";

  if (error.status === 500) {
    message = error.data.message;
  }

  if (error.status === 404) {
    title = "Not Found!";
    message = "Could not find this page";
  }

  return (
    <>
      <MainNavigation />
      <div>
        <h1>{title}</h1>
        <p>{message}</p>
      </div>
    </>
  );
};

export default ErrorPage;
