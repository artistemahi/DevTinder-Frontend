import { createSlice } from "@reduxjs/toolkit";
const feed = createSlice({
    name: "feed",
    initialState: [],
    reducers: {
        addFeed: (state, action) => {
            return action.payload;
        },
        removeFeed: (state,action) => {
                 return state.filter((req) => req._id !== action.payload);

        }
    }
});
export const { addFeed, removeFeed } = feed.actions;
export default feed.reducer;