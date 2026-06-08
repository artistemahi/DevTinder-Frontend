import {useState} from 'react'
import axios from "axios";
import {useDispatch} from "react-redux";
import {addUser} from "../utils/userSlice";
import {useNavigate} from "react-router-dom";
const Login = () => {
 const [email, setEmail] = useState("kittu@gmail.com");
 const[password , setPassword] = useState("Kittu@123");
 const [Error, setError] = useState();
 const dispatch = useDispatch();
const navigate = useNavigate();
 const LoginHandler = async () =>{
      try{
          const response = await axios.post("http://localhost:3000/login",{
            email,
            password
          },{withCredentials:true});
          // console.log(response.data);
         dispatch(addUser(response.data));
          navigate("/feed")
      }catch(err){
        setError(err?.response?.data || "something went wrong !")
       
      }
 }

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="card bg-slate-900 text-white bg-base-300 w-96 shadow-sm">
        <figure className="px-10 pt-10"></figure>
        <div className="card-body items-center text-center">
          <h2 className="card-title py-0 my-2 text-lg font-bold">Welcome to DevTinder !</h2>
          <div className="w-full h-full bg-green-300 rounded-lg">
            <fieldset className="fieldset  text-black rounded-box w-xs border p-4">

              <label className="label text-black">Email</label>
              <input type="email" className="input px-2" placeholder="Email" value ={email} onChange={(e)=>setEmail(e.target.value)}/>

              <label className="label text-black ">Password</label>
              <input type="password" className="input px-2" placeholder="Password" value ={password} onChange={(e)=>setPassword(e.target.value)}/>
            </fieldset>
          </div>
            <p className="text-red-600">{Error}</p>
          <div className="card-actions">
            <button className="btn btn-primary bg-blue-500 px-4" onClick={LoginHandler}>login</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
