// import React from 'react'
import { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import UserCard from "./UserCard.jsx";
const Feed = () => {
  const dispatch = useDispatch();
  const feed = useSelector((state) => state.feed);
  const getFeed = async () => {
if (feed && feed.length > 0) return;
    try {
      const res = await axios.get("http://localhost:3000/user/feed", {
        withCredentials: true,
      });
      // console.log(res);
      dispatch(addFeed(res?.data?.data));
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    getFeed();
  }, []);
  return (
    feed && (
      <div className="flex justify-center items-center h-screen">
        <UserCard user={feed[0]}></UserCard>
      </div>
    )
  );
};

export default Feed;
