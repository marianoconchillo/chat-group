import { Loading } from "../../../components/Loading";
import { useAppSelector } from "../../../hooks/useAppSelector";
import { FirebaseAuthButtons } from "./FirebaseAuthButtons";
import { FormikForm } from "./FormikForm";
import { Separator } from "./Separator";

interface Props {
    setShowLoginForm: (value: boolean) => void;
}

export const RegisterForm = ({ setShowLoginForm }: Props) => {
    const { isLoading, error } = useAppSelector((state) => state.auth);

    return (
        <>
            <h3 className="font-bold text-3xl">Get your free account</h3>

            <FirebaseAuthButtons />

            <Separator />

            <FormikForm showLoginForm={false} />

            {isLoading && <Loading />}

            {error && (
                <p className="text-sm mt-5 text-red-500 text-center">{error}</p>
            )}

            <p className="text-center text-gray-400 text-sm">
                Already a member?{" "}
                <span
                    className="cursor-pointer text-cyan-800 font-bold"
                    onClick={() => setShowLoginForm(true)}
                >
                    Login
                </span>
            </p>
        </>
    );
};
