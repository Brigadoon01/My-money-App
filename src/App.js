import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./Pages/Login/Login";
import Home from "./Pages/Home/Home";
import SignUp from "./Pages/SignUp/SignUp";
import Navbar from "./components/Navbar";
import { useTheme } from "./hooks/useTheme";
import ThemeSelector from "./components/ThemeSelector";
import { useAuthContext } from "./hooks/useAuthContext";

import "./App.css";

function App() {
  const { authIsReady, user } = useAuthContext();
  const { mode } = useTheme();
  return (
    <div className={`App ${mode}`}>
      {authIsReady && (
        <BrowserRouter>
          <Navbar />
          <ThemeSelector />
          <main>
            <Routes>
              {user && <Route path="/" element={<Home />} />}
              {!user && <Route path="/" element={<Login />} />}
              {!user && <Route path="/login" element={<Login />} />}
              {user && <Route path="/login" element={<Home />} />}
              {!user && <Route path="/signup" element={<SignUp />} />}
              {user && <Route path="/signup" element={<Home />} />}
              <Route path="/*" element={<Home />} />
            </Routes>
          </main>
        </BrowserRouter>
      )}
    </div>
  );
}

export default App;
