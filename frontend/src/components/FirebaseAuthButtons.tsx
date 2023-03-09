export const FirebaseAuthButtons = () => {
    return (
        <div className="flex flex-col space-y-3">
            <button className="w-full flex justify-center relative items-center px-5 font-medium py-1.5 rounded bg-dark text-white border border-white">
                <img src="/google.png" className="h-5 w-5 absolute left-4" />
                Continue with Google
            </button>
            <button className="w-full flex justify-center relative items-center px-5 font-medium py-1.5 rounded bg-dark text-white border border-white">
                <img src="/github.png" className="h-5 w-5 absolute left-4" />
                Continue with GitHub
            </button>
        </div>
    );
};
