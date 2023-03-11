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
        <div className="container mx-auto px-5 my-10 space-y-7 md:w-3/5 md:border md:px-10 md:py-5  lg:w-2/5 rounded-lg border-gray-600">
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
