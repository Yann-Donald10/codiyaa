import { useNavigate } from "react-router-dom";
import useAutoLogout from "../hooks/AutoLogOut";

function AutoLogoutCall() {
  const navigate = useNavigate();
  //useAutoLogout(10 * 1000, navigate);
  useAutoLogout(2 * 60 * 60 * 1000, navigate);
  return null;
}

export default AutoLogoutCall;
