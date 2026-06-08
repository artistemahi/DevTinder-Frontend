import { BrowserRouter, Routes, Route } from "react-router-dom";
import {Provider} from "react-redux";
import Body from "./components/Body";
import Login from "./components/Login";
import Profile from "./components/Profile";
import AppStore from "./utils/appStore"
import Feed from "./components/Feed";
import SignUp from "./components/SignUp";
import Connection from "./components/Connection";
import Request from "./components/Request";
function App() {
  return (
    <Provider store={AppStore}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Body />}>
          <Route path="signup" element={<SignUp />} />
          <Route path="login" element={<Login />} />
          <Route path="feed" element={<Feed />} />
          <Route path="profile" element={<Profile />} />
          <Route path="connection" element={<Connection />} />
          <Route path="request" element={<Request />} />
        </Route>
      </Routes>
    </BrowserRouter>
    </Provider>
  );
}

export default App;