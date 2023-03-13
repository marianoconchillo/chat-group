import { Formik, Form, Field, ErrorMessage } from "formik";
import { useAppDispatch } from "../../../hooks/useAppDispatch";
import { register } from "../../../redux/features/auth/authServices";
import { validateForm } from "../../../utils/validateForm";

interface Props {
    showLoginForm: boolean;
}

export type FormFieldsLogin = {
    email: string;
    password: string;
};

export const FormikForm = ({ showLoginForm }: Props) => {
    const dispatch = useAppDispatch();

    const initialValues: FormFieldsLogin = {
        email: "",
        password: "",
    };

    const handleSubmit = async (email: string, password: string) => {
        if (!showLoginForm) {
            await dispatch(register({ email, password }));
        }
    };

    return (
        <Formik
            initialValues={initialValues}
            validate={(values: FormFieldsLogin) => {
                return validateForm(values);
            }}
            onSubmit={(values: FormFieldsLogin) => {
                handleSubmit(values.email, values.password);
            }}
        >
            {({ errors }) => (
                <Form className="flex flex-col space-y-4">
                    <div className="flex flex-col space-y-2">
                        <label>Email</label>
                        <Field
                            type="email"
                            id="email"
                            name="email"
                            placeholder="hello@company.com"
                            className="rounded-lg py-2 px-5 bg-transparent text-sm border border-gray-600 focus:outline-none"
                        />
                        <ErrorMessage
                            name="email"
                            component={() => (
                                <p className="text-sm text-red-500 font-medium">
                                    {errors.email}
                                </p>
                            )}
                        />
                    </div>
                    <div className="flex flex-col space-y-2">
                        <label>Password</label>
                        <Field
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Your password"
                            className="rounded-lg py-2 px-5 bg-transparent text-sm border border-gray-600 focus:outline-none"
                        />
                        <ErrorMessage
                            name="password"
                            component={() => (
                                <p className="text-sm text-red-500 font-medium">
                                    {errors.password}
                                </p>
                            )}
                        />
                    </div>
                    <button
                        type="submit"
                        className="text-stone-800 bg-white py-2 rounded font-medium hover:bg-gray-600 hover:ease-in hover:text-lightText duration-150 ease-out"
                    >
                        {showLoginForm ? `Login` : `Continue with Email`}
                    </button>
                </Form>
            )}
        </Formik>
    );
};
