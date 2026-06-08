import NavBar from "./NavBar";
import { Outlet ,useNavigate} from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const fetchUser = async () => {
    try {
      const res = await axios.get("http://localhost:3000/profile/view", {
        withCredentials: true,
      });
      dispatch(addUser(res.data.data));
    } catch (err) {
      if(err?.response?.status === 401){
        console.log("please login !")
        navigate("/login");
      }
    }
  };
  useEffect(() => {
    fetchUser();
  }, []);
  return (
    <div>
      <NavBar></NavBar>
      <Outlet></Outlet>
    </div>
  );
};

export default Body;
