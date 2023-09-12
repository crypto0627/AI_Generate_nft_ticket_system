import { Outlet, useNavigation } from "react-router-dom";
import MainNavigation from "../components/MainNavigation";

const RootLayout = () => {
  const navigation = useNavigation();

  return (
    <div>
      <MainNavigation />
      {navigation.state === "loading" ? <h1>Loading..</h1> : <Outlet />}
    </div>
  );
};

export default RootLayout;
