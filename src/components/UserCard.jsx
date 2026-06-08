import axios from "axios";
import { useDispatch } from "react-redux";

import { removeFeed } from "../utils/feedSlice";
const UserCard = ({ user }) => {
  const dispatch = useDispatch();
  

  // console.log(user);
    if (!user) {
    return <h1 className= "text-center font-bold text-2xl">No user found</h1>;
  }
  const { _id, firstName, lastName, photoURL, age, gender, about } = user;
  const fullName = [firstName, lastName].filter(Boolean).join(" ") || "No name";
  const ageGender =
    [age, gender].filter(Boolean).join(" ") || "No details available";

  const handleRequestClick = async (status, userId) => {
    try {
      const res = await axios.post(
        `http://localhost:3000/request/send/${status}/${userId}`,
        {},
        { withCredentials: true },
      );
      console.log(res.data);
      dispatch(removeFeed(userId));
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="card  bg-base-300 w-96 shadow-sm">
      <figure>
        <img
          className="w-full h-full object-cover"
          src={
            photoURL ||
            "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
          }
          alt="photo"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{fullName}</h2>
        <p>{ageGender}</p>
        <p>{about || "No details available"}</p>
        <div className="card-actions justify-center ">
          <button
            onClick={() => handleRequestClick("ignore", _id)}
            className=" btn btn-secondary bg-red-600 text-white font-bold px-4"
          >
            Ignore
          </button>
          <button
            onClick={() => handleRequestClick("interested", _id)}
            className=" btn btn-primary bg-green-400 text-white font-bold px-4"
          >
            Interested
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
