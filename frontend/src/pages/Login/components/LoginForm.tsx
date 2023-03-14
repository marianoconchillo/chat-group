import { Loading } from "../../../components/Loading";
import { useAppSelector } from "../../../hooks/useAppSelector";
import { FirebaseAuthButtons } from "./FirebaseAuthButtons";
import { FormikForm } from "./FormikForm";
import { Separator } from "./Separator";

interface Props {
    setShowLoginForm: (value: boolean) => void;
}

export const LoginForm = ({ setShowLoginForm }: Props) => {
    const { isLoading, error } = useAppSelector((state) => state.auth);

    return (
        <>
            <h3 className="font-bold text-3xl">Login</h3>

            <FormikForm showLoginForm={true} />

            {isLoading && <Loading />}

            {error && (
                <p className="text-sm mt-5 text-red-500 text-center">{error}</p>
            )}

            <Separator />

            <FirebaseAuthButtons />

            <p className="text-center text-gray-400 text-sm">
                Don't have an account yet?{" "}
                <span
                    className="cursor-pointer text-cyan-800 font-bold"
                    onClick={() => setShowLoginForm(false)}
                >
                    Register
                </span>
            </p>
        </>
    );
};
