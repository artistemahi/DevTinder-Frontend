import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import axios from "axios";
import { addRequest, removeRequest } from "../utils/requestSlice";
const Request = () => {
  const dispatch = useDispatch();
  const requests = useSelector((store) => store.request);
  const reviewRequestAccepted = async (status, toUserID) => {
    try {
     await axios.post(
        `http://localhost:3000/request/review/${status}/${toUserID}`,
        {}, // body empty
        { withCredentials: true }, // config correct place
      );
        dispatch(removeRequest(toUserID))
    } catch (err) {
      console.log(err);
    }
  };
  const fetchRequest = async () => {
    try {
      const res = await axios("http://localhost:3000/user/requests/received", {
        withCredentials: true,
      });
      dispatch(addRequest(res.data.data));
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchRequest();
  }, []);
  if (!requests) return;
  if (requests.length == 0)
    return (
      <h1 className="text-black font-bold text-center">No Request Found</h1>
    );
  return (
    <div className="flex flex-col items-center gap-6">
      <div className="text-center font-bold text-4xl">Requests</div>
      <div className="">
        {requests.map((requests) => {
          const { firstName, lastName, age, gender, photoURL, about } =
            requests.fromUserId;
          const requestId = requests._id;
          return (
            <div
              key={requests._id}
              className="flex shadow-xl bg-base-100 w-full rounded-2xl max-w-2xl p-4 m-4"
            >
              <img
                src={photoURL}
                alt="photo"
                className="w-32 h-32 object-cover rounded-full"
              ></img>
              <div className="flex flex-col p-4 gap-2">
                <h1 className="text-xl font-bold">
                  {firstName} {lastName}
                </h1>
                <p className="text-gray-600">
                  {age} | {gender}
                </p>
                <p className="text-gray-500">{about}</p>
                <div className="flex gap-6 p-6">
                  <button
                    onClick={() => reviewRequestAccepted("rejected", requestId)}
                    className="btn p-6 btn-error bg-red-500 text-white font-bold hover:bg-red-400"
                  >
                    Ignore
                  </button>
                  <button
                    className="btn p-6 hover:bg-green-400 text-white font-bold bg-green-500 btn-success"
                    onClick={() => reviewRequestAccepted("accepted", requestId)}
                  >
                    Accept
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Request;
