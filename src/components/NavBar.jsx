import {useSelector,useDispatch } from "react-redux";
import { Link ,useNavigate} from "react-router-dom";
import axios from "axios"; 
import {removeUser} from "../utils/userSlice";
const NavBar = () => {
const user = useSelector((state)=>state.user);
const navigate = useNavigate();
// console.log(user);
const dispatch = useDispatch()
 const LogOutClickHandler =  async()=>{
    try{  
        await axios.post("http://localhost:3000/logout",{},{withCrendentials: true})
        dispatch(removeUser());
        return navigate("/login")
    }catch(err){
      console.log(err);
    }
 }

  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="flex-1">
        <a className="btn btn-ghost text-2xl font-bold">Friendli</a>
      </div>
      <div className="flex gap-2">
        <div className= "form-control"></div>
          {/* user profilelogo */}
       {user && (<div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar mr-4"
          >
          <div className="w-10 rounded-full ">
              <img className="w-full h-full object-cover"
                alt="user Avatar"
                src={user.photoURL}
              />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            <li>
              <Link to="/profile" className="justify-between">
                Profile
                <span className="badge">New</span>
              </Link>
            </li>
            <li>
              <Link to="/connection">Connection</Link>
            </li>
            <li>
              <Link to="/request">Request</Link>
            </li>
            <li>
              <a  onClick={LogOutClickHandler}>Logout</a>
            </li>
          </ul>
        </div>)}
      </div>
    </div>
  );
};

export default NavBar;
