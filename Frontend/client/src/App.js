import { Route, Routes } from "react-router-dom";
import SignUp from "./components/SignUp";
import Home from "./components/Home";
import Inbox from "./components/Inbox";
import ComposeEmail from "./components/ComposeEmail";
function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<SignUp />} />
        <Route path="/inbox" element={<Home />} />
        <Route path="/home" element={<Inbox />} />
        <Route path="/composemail" element={<ComposeEmail/>} />
      </Routes>
    </div>
  );
}

export default App;
