import { useState } from "react";
import { LoginForm } from "../components/LoginForm";
import { RegisterForm } from "../components/RegisterForm";

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
                    loginForm={loginForm}
                    setLoginForm={setLoginForm}
                />
            ) : (
                <RegisterForm
                    initialValues={initialValues}
                    loginForm={loginForm}
                    setLoginForm={setLoginForm}
                />
            )}
            {/* <h3 className="font-bold text-3xl">Login</h3>
            <Formik
                initialValues={initialValues}
                onSubmit={() => {
                    console.log("Submit!");
                }}
            >
                {({ values }) => (
                    <Form className="flex flex-col space-y-7">
                        <div className="flex flex-col space-y-2">
                            <label>Email</label>
                            <Field
                                id="email"
                                name="email"
                                value={values.email}
                                placeholder="hello@company.com"
                                type="email"
                                className="rounded-lg py-2 px-5 bg-transparent text-sm border border-gray-600 focus:outline-none"
                            />
                        </div>
                        <div className="flex flex-col space-y-2">
                            <label>Password</label>
                            <Field
                                id="password"
                                name="password"
                                value={values.password}
                                placeholder="Your password"
                                type="password"
                                className="rounded-lg py-2 px-5 bg-transparent text-sm border border-gray-600 focus:outline-none"
                            />
                        </div>
                        <button
                            type="submit"
                            className="text-stone-800 bg-white py-1.5 rounded font-medium hover:bg-dark hover:ease-in hover:text-white hover:border hover:border-white duration-150 ease-out "
                        >
                            Login
                        </button>
                    </Form>
                )}
            </Formik>
            <div className="flex items-center">
                <div className="w-full border-b border-gray-600 h-0" />
                <p className="mx-3 text-gray-400 text-sm">OR</p>
                <div className="w-full border-b border-gray-600 h-0" />
            </div>
            <div className="flex flex-col space-y-3">
                <button className="w-full flex justify-center relative items-center px-5 font-medium py-1.5 rounded bg-dark text-white border border-white">
                    <img
                        src="/google.png"
                        className="h-5 w-5 absolute left-4"
                    />
                    Continue with Google
                </button>
                <button className="w-full flex justify-center relative items-center px-5 font-medium py-1.5 rounded bg-dark text-white border border-white">
                    <img
                        src="/github.png"
                        className="h-5 w-5 absolute left-4"
                    />
                    Continue with GitHub
                </button>
            </div>
            <p className="text-center text-gray-400 text-sm">
                Don't have an account yet?{" "}
                <span className="cursor-pointer text-cyan-800 font-bold">
                    Register
                </span>
            </p> */}
        </div>
    );
};
