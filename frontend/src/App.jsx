import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./App.css";
import ErrorPage from "./pages/Error";
import HomePage from "./pages/Home";
import RootLayout from "./pages/Root";
import Banner from "./pages/Banner";
import Ticket_admin from "./pages/Ticketadmin";


const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    id: "root",
    loader: () => {
      return "Hello World";
    },
    children: [
      { index: true, element: <HomePage /> },
      {
        path: "buy_ticket",
        element: <Banner />,
      },
      {
        path: "Ticket_admin",
        element: <Ticket_admin/>,
      }
      
    ],
  },
]);

function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
