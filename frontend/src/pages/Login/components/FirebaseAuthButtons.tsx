import { useAppDispatch } from "../../../hooks/useAppDispatch";
import {
    loginWithGithub,
    loginWithGoogle,
} from "../../../redux/features/auth/authServices";

export const FirebaseAuthButtons = () => {
    const dispatch = useAppDispatch();

    return (
        <div className="flex flex-col space-y-3">
            <button
                className="w-full flex justify-center relative items-center px-5 font-medium py-2 rounded bg-dark border border-gray-600"
                onClick={() => dispatch(loginWithGoogle())}
            >
                <img src="/google.png" className="h-5 w-5 absolute left-4" />
                Continue with Google
            </button>
            <button
                className="w-full flex justify-center relative items-center px-5 font-medium py-2 rounded bg-dark border border-gray-600"
                onClick={() => dispatch(loginWithGithub())}
            >
                <img src="/github.png" className="h-5 w-5 absolute left-4" />
                Continue with GitHub
            </button>
        </div>
    );
};
