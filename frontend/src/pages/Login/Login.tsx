import { useState } from "react";
import { LoginForm } from "./components/LoginForm";
import { RegisterForm } from "./components/RegisterForm";

export type FormFieldsLogin = {
    email: string;
    password: string;
};

export const Login = () => {
    const [loginForm, setLoginForm] = useState<boolean>(true);

    const initialValues: FormFieldsLogin = {
        email: "",
        password: "",
    };

    return (
        <div className="text-white space-y-7 lg:border lg:px-10 lg:py-5 rounded-lg border-gray-600">
            {loginForm ? (
                <LoginForm
                    initialValues={initialValues}
                    setLoginForm={setLoginForm}
                />
            ) : (
                <RegisterForm
                    initialValues={initialValues}
                    setLoginForm={setLoginForm}
                />
            )}
        </div>
    );
};
