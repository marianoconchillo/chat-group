import { Formik, Form, Field } from "formik";
import { FormFieldsLogin } from "../pages/Login";
import { FirebaseAuthButtons } from "./FirebaseAuthButtons";
import { Separator } from "./Separator";

interface Props {
    initialValues: FormFieldsLogin;
    loginForm: boolean;
    setLoginForm: (value: boolean) => void;
}

export const RegisterForm = ({
    initialValues,
    loginForm,
    setLoginForm,
}: Props) => {
    return (
        <>
            <h3 className="font-bold text-3xl">Get your free account</h3>

            <FirebaseAuthButtons />

            <Separator />

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
                            className="text-stone-800 bg-white py-2 rounded font-medium hover:bg-gray-600 hover:ease-in hover:text-white duration-150 ease-out"
                        >
                            Continue with Email
                        </button>
                    </Form>
                )}
            </Formik>

            <p className="text-center text-gray-400 text-sm">
                Already a member?{" "}
                <span
                    className="cursor-pointer text-cyan-800 font-bold"
                    onClick={() => setLoginForm(!loginForm)}
                >
                    Login
                </span>
            </p>
        </>
    );
};
