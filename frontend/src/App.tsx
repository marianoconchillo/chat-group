import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
} from "react-router-dom";
import { Chat } from "./pages/Chat/Chat";
import { Login } from "./pages/Login/Login";
import { Profile } from "./pages/Profile/Profile";

function App() {
    return (
        <Router>
            <div className="text-lightText">
                <Routes>
                    <Route path="/" element={<Chat />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route
                        path="/"
                        element={<Navigate to="/profile" replace />}
                    />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
