import { FormFieldsLogin } from "../pages/Login/components/FormikForm";
import { FormFieldsNewChannel } from "../pages/Chat/components/NewChannelModal";

interface ErrorLogin {
    email: string | null;
    password: string | null;
}

interface ErrorNewChannel {
    name: string | null;
}

export const validateForm = (values: FormFieldsLogin): ErrorLogin | void => {
    let errors: ErrorLogin = {
        email: null,
        password: null,
    };

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

    if (errors.email || errors.password) {
        return errors;
    }
};

export const validateNewChannel = (values: FormFieldsNewChannel) => {
    let errors: ErrorNewChannel = {
        name: null,
    };

    const { name } = values;

    // Email Validation
    if (!name) {
        errors.name = "Channel name is required";
    }

    if (errors.name) {
        return errors;
    }
};
