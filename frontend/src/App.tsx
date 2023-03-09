import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
} from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { Login } from "./pages/Login/Login";
import { Profile } from "./pages/Profile/Profile";

function App() {
    return (
        <Router>
            <Navbar />
            <div className="container mx-auto mb-10 px-5 md:w-3/4 lg:w-1/2 text-white">
                <Routes>
                    <Route path="/profile" element={<Profile />} />
                    {/* <Route path="/login" element={<Login />} /> */}
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
