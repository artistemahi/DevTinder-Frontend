import UserCard from "./UserCard";
import { useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
const Profile = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const [firstName, setFirstName] = useState(user?.firstName || "");
  const [lastName, setLastName] = useState(user?.lastName || "");
  const [photoURL, setPhotoURL] = useState(user?.photoURL || "");
  const [age, setAge] = useState(user?.age || "");
  const [gender, setGender] = useState(user?.gender || "");
  const [about, setAbout] = useState(user?.about || "");
  const [error, setError] = useState("");
  const [showToast, setShowToast] = useState(false);

  const saveProfile = async () => {
    setError("");
    try {
      const res = await axios.post(
        "http://localhost:3000/profile/edit",
        {
          firstName,
          lastName,
          photoURL,
          age,
          gender,
          about,
        },
        { withCredentials: true },
      );
      dispatch(addUser(res?.data?.data));
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 4000);
    } catch (err) {
      setError(err?.response?.data?.error || err.message);
    }
  };
  return (
    user && (
      <div className="min-h-screen flex justify-center items-center bg-base-200">
        <div>
          <div className="card w-full max-w-md bg-base-300 shadow-2xl my-10">
            <div className="card-body">
              <h2 className="card-title text-3xl justify-center mb-4">
                Edit Profile
              </h2>

              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text font-semibold py-2">
                    First Name
                  </span>
                </label>

                <input
                  type="text"
                  placeholder="Enter your First Name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="input input-bordered w-full pl-4"
                />
              </div>

              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text font-semibold py-2">
                    Last Name
                  </span>
                </label>

                <input
                  type="text"
                  placeholder="Enter your Last Name"
                  className="input input-bordered w-full  pl-4"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text font-semibold py-2">
                    Photo URL
                  </span>
                </label>

                <input
                  type="text"
                  placeholder="Enter you photo URL"
                  className="input input-bordered w-full  pl-4"
                  value={photoURL}
                  onChange={(e) => setPhotoURL(e.target.value)}
                />
              </div>
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text font-semibold py-2">Age</span>
                </label>

                <input
                  type="number"
                  placeholder="Enter your age"
                  className="input input-bordered w-full  pl-4"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                />
              </div>
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text font-semibold py-2">Gender</span>
                </label>

                <select
                  className="select select-bordered w-full pl-4"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text font-semibold py-2 pr-4">
                    About
                  </span>
                </label>

                <textarea
                  type="text"
                  placeholder="Enter your about"
                  className="textarea textarea-bordered w-full pl-4"
                  value={about}
                  onChange={(e) => setAbout(e.target.value)}
                />
              </div>

              <div className="card-actions justify-center mt-4">
                <div className="text-red-500 text-center">{error}</div>
                <button
                  className="btn btn-primary w-full bg-blue-600 text-white
                   font-bold hover:bg-blue-300"
                  onClick={saveProfile}
                >
                  Save Profile
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="pl-10">
          <UserCard
            user={{ firstName, lastName, age, gender, about, photoURL }}
          ></UserCard>
        </div>
        {showToast && (
          <div className="toast toast-top toast-center">
            <div className="alert alert-success">
              <span>Profile updated successfully.</span>
            </div>
          </div>
        )}
      </div>
    )
  );
};

export default Profile;
