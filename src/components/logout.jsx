import Cookies from "universal-cookie";
import { useNavigate } from "react-router";

function Logout() {
  const cookie = new Cookies();
  const navigate = useNavigate();

  cookie.remove("auth_token");

  return navigate("/home");
}

export default Logout;
