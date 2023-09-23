// rafce
import "./App.css";
import { Routes, Route, useNavigate } from "react-router-dom";
// import LandingPage from "./Components/LandingPage";
import Home from "./Components/Home";
import Chat from "./Components/chatCompo/Chat";
import { ChatState } from "./context/ChatProvider";
import { useEffect } from "react";

function App() {
  const { setUser } = ChatState();
  const navigate = useNavigate();

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));

    if (userInfo) {
      setUser(userInfo)
      navigate("/chat");
    } else navigate("/");
  }, [navigate]);
  return (
    <div className="App">
      <Routes>
        {/* <Route path="/" element={<LandingPage />} /> */}
        <Route path="/" element={<Home />} />
        <Route path="/chat" element={<Chat />} />
      </Routes>
    </div>
  );
}

export default App;
