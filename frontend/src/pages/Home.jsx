import React from "react";
import { Link, useRouteLoaderData } from "react-router-dom";

const HomePage = () => {
  const data = useRouteLoaderData("root");
  console.log(data);
  return (
    <div>
      <h1>首頁</h1>
      <h3>
        <Link to="/buy_ticket">購買門票</Link>
      </h3>
      <h3>
        <Link to="/Ticket_admin">Ticket_admin</Link>
      </h3>
    </div>
  );
};

export default HomePage;
