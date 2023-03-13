import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../hooks/useAppSelector";
import { LoginForm } from "./components/LoginForm";
import { RegisterForm } from "./components/RegisterForm";

export const Login = () => {
    const navigate = useNavigate();
    const { user } = useAppSelector((state) => state.auth);

    useEffect(() => {
        if (user) {
            navigate("/");
        }
    }, [user, navigate]);

    const [showLoginForm, setShowLoginForm] = useState<boolean>(true);

    return (
        <div className="container mx-auto px-5 my-10 space-y-7 md:w-3/5 md:border md:px-10 md:py-5 lg:w-2/5 rounded-lg border-gray-600">
            {showLoginForm ? (
                <LoginForm setShowLoginForm={setShowLoginForm} />
            ) : (
                <RegisterForm setShowLoginForm={setShowLoginForm} />
            )}
        </div>
    );
};
