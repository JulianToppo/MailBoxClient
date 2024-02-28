import { Route, Routes } from "react-router-dom";
import SignUp from "./components/SignUp";
import Home from "./components/Home";
import Inbox from "./components/Inbox";
import ComposeEmail from "./components/ComposeEmail";
import { useSelector } from "react-redux";
function App() {
  const userStore = useSelector((store) => store.user);
  return (
    <div>
      <Routes>
        <Route path="/" element={<SignUp />} />
        {userStore.loginStatus && (
          <>
            <Route path="/home" element={<Home />} />
            <Route path="/inbox" element={<Inbox />} />
            <Route path="/composemail" element={<ComposeEmail />} />
          </>
        )}
        <Route path="*" element={<SignUp />} />
      </Routes>
    </div>
  );
}

export default App;
