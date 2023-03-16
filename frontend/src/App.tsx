import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProtectedRoute from "./components/ProtectedRoute";
import { Chat } from "./pages/Chat/Chat";
import { Login } from "./pages/Login/Login";
import { Profile } from "./pages/Profile/Profile";

function App() {
    return (
        <>
            <Router>
                <div className="text-lightText">
                    <Routes>
                        <Route
                            path="/"
                            element={
                                <ProtectedRoute>
                                    <Chat />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/profile"
                            element={
                                <ProtectedRoute>
                                    <Profile />
                                </ProtectedRoute>
                            }
                        />

                        <Route path="/login" element={<Login />} />
                    </Routes>
                </div>
            </Router>
            <ToastContainer />
        </>
    );
}

export default App;
