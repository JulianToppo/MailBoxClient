import { Route, Routes } from "react-router-dom";
import SignUp from "./components/SignUp";
import Home from "./components/Home";
import Inbox from "./components/Inbox";
import ComposeEmail from "./components/ComposeEmail";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import useCrudForMail from "./hooks/useCrudForMail";
import ErrorPage from "./components/ErrorPage";
function App() {
  const userStore = useSelector((store) => store.user);
  const {getUserData}=useCrudForMail();

  useEffect(()=>{
    if(localStorage.getItem('token')){
      getUserData();
    }
  },[])

  return (
    <div>
      <Routes>
       
        {userStore.loginStatus && (
          <>
            <Route path="/home" element={<Home />} />
            <Route path="/inbox" element={<Inbox />} />
            <Route path="/composemail" element={<ComposeEmail />}/>
            <Route path="*" element={<Inbox />} />
          
          </>
        )}
        {
          !userStore.loginStatus &&  <Route path="*" element={<SignUp />} />
        }
        
      </Routes>
    </div>
  );
}

export default App;
