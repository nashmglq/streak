import { useNavigate } from "react-router-dom";
import { SideBar } from "../components/sideBar";
import { useEffect } from "react";
import { authCheckActions } from "../actions/authActions";
import {useDispatch, useSelector} from "react-redux"
export const ProtectedRouting = ({ children }) => {
  const dispatch = useDispatch();
  const {loading, success, error, message, login} = useSelector((state) => state.authCheck)

  useEffect(() => {
    dispatch(authCheckActions())
  },[])

  
  const nav = useNavigate();
  let renderNav = null;

  if (success || login) renderNav = <SideBar />;

  useEffect(() => {
    if (error && !login) nav("/");
  }, []);

  return (
    <div>
      {renderNav}
      {children}
    </div>
  );
};
