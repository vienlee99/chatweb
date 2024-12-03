import logo from "./logo.svg";
import "./App.css";
import Login from "./components/Login";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import ChatRoom from "./components/ChatRoom";
import AuthProvider from "./Context/AuthProvider";
import AppProvider from "./Context/AppProvider";
import AddRoomModals from "./components/Modals/AddRoomModals";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppProvider>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<ChatRoom />} />
          </Routes>
          <AddRoomModals />
        </AppProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
