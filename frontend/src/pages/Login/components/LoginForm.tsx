import { Formik, Form, Field } from "formik";
import { FormFieldsLogin } from "../Login";
import { FirebaseAuthButtons } from "./FirebaseAuthButtons";
import { Separator } from "./Separator";

interface Props {
    initialValues: FormFieldsLogin;
    setLoginForm: (value: boolean) => void;
}

export const LoginForm = ({ initialValues, setLoginForm }: Props) => {
    return (
        <>
            <h3 className="font-bold text-3xl">Login</h3>
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
                            className="text-stone-800 bg-white py-2 rounded font-medium hover:bg-gray-600 hover:ease-in hover:text-lightText duration-150 ease-out"
                        >
                            Login
                        </button>
                    </Form>
                )}
            </Formik>

            <Separator />

            <FirebaseAuthButtons />

            <p className="text-center text-gray-400 text-sm">
                Don't have an account yet?{" "}
                <span
                    className="cursor-pointer text-cyan-800 font-bold"
                    onClick={() => setLoginForm(false)}
                >
                    Register
                </span>
            </p>
        </>
    );
};
