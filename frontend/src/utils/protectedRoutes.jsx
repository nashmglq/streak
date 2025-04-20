import { useNavigate } from "react-router-dom";
import { SideBar } from "../components/sideBar";
import { useEffect } from "react";

export const ProtectedRouting = ({ children }) => {
  const userInfo = localStorage.getItem("userInfo");

  const nav = useNavigate();
  let renderNav = null;

  if (userInfo) renderNav = <SideBar />;

  // check every load
  useEffect(() => {
    console.log(userInfo)
    if (!userInfo) nav("/");
  }, []);

  return (
    <div>
      {renderNav}
      {children}
    </div>
  );
};
