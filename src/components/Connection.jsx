import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addConnection } from "../utils/connectionSlice";
const Connection = () => {
  const connection = useSelector((store) => store.connection);
  const dispatch = useDispatch();
  const fetchConnection = async () => {
    try {
      const res = await axios.get("http://localhost:3000/user/connections", {
        withCredentials: true,
      });
      dispatch(addConnection(res.data.data));
      console.log(res.data.data);
    } catch (err) {
      console.log(err.response.message);
    }
  };
  useEffect(() => {
    fetchConnection();
  }, []);
  if (!connection) return;
  if (connection.length == 0 || null) return <h1>No Connection Found</h1>;
  return (
    <div className="flex flex-col items-center gap-6">
      {" "}
      <h1 className="text-3xl font-bold text-center mb-6">Connection</h1>
      <div className= "flex flex-col items-center gap-6 ">
        {connection.map((connection) => {
          const { firstName, lastName, age, gender, photoURL, about } =
            connection;
          return (
            <div key={connection._id} className="flex bg-base-100 shadow-xl rounded-2xl w-full max-w-2xl p-4 gap-6">
  
                {" "}
                <img className="w-32 h-32 object-cover rounded-full" src={photoURL} alt="photo"></img>
               <div className="flex flex-col gap-2 ">
                   <h1 className="text-xl font-bold">
                  {firstName} {lastName}
                </h1>
                <p className="text-gray-600">
                  {age} | {gender}
                </p >
                <p className="text-gray-500">{about}</p>
               </div>
               
              
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Connection;
