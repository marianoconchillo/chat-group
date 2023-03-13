import { Error } from "../pages/Login/components/LoginForm";
import { FormFieldsLogin } from "../pages/Login/Login";

export const validateForm = (values: FormFieldsLogin): Error => {
    let errors: Error = {};
    const { email, password } = values;

    const emailRegex: RegExp =
        /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

    // Email Validation
    if (!email) {
        errors.email = "Your email field is required";
    } else if (!emailRegex.test(email)) {
        errors.email = "Valid email is required";
    }

    // Password Validation
    if (!password) {
        errors.password = "Password field is required";
    } else if (password.length < 4) {
        errors.password =
            "Your password needs to be at least 4 characters long";
    }
    return errors;
};
