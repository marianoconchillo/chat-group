import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faCamera } from "@fortawesome/free-solid-svg-icons";

interface Props {
    setEdit: (value: boolean) => void;
}

export const EditUserInfo = ({ setEdit }: Props) => {
    return (
        <>
            <button
                className="mb-10 flex items-center space-x-3 cursor-pointer"
                onClick={() => setEdit(false)}
            >
                <FontAwesomeIcon icon={faAngleLeft} color="#2D9CDB" />
                <p className="" style={{ color: "#2D9CDB" }}>
                    Back
                </p>
            </button>
            <div className="space-y-3 md:border md:px-10 md:py-5 rounded-lg border-gray-600">
                <div className="flex flex-col items-start space-y-2 mb-10">
                    <h2 className="font-medium text-xl text-center">
                        Change Info
                    </h2>
                    <h4 className="font-medium opacity-60">
                        Changes will be reflected to every services
                    </h4>
                </div>
                <form className="flex flex-col space-y-5">
                    <div className="flex items-center space-x-5">
                        <FontAwesomeIcon
                            icon={faCamera}
                            size="2x"
                            className="opacity-60 border p-2 rounded"
                        />
                        <label className="block cursor-pointer">
                            <span>CHANGE PHOTO</span>
                            <input
                                type="file"
                                className="opacity-0 pointer-events-none absolute top-0 left-0 w-full h-full"
                            />
                        </label>
                    </div>
                    <div>
                        <label className="font-medium text-sm">Name</label>
                        <input
                            placeholder="Enter your name..."
                            className="mt-1.5 w-full bg-transparent focus:outline-none border border-gray-400 rounded-lg px-4 py-3 text-sm"
                            type="text"
                        />
                    </div>
                    <div>
                        <label className="font-medium text-sm">Bio</label>
                        <textarea
                            placeholder="Enter your bio..."
                            className="mt-1.5 w-full bg-transparent focus:outline-none border border-gray-400 rounded-lg px-4 py-3 text-sm resize-none"
                            rows={4}
                        />
                    </div>
                    <div>
                        <label className="font-medium text-sm">Phone</label>
                        <input
                            placeholder="Enter your phone..."
                            className="mt-1.5 w-full bg-transparent focus:outline-none border border-gray-400 rounded-lg px-4 py-3 text-sm"
                            type="text"
                        />
                    </div>
                    <div>
                        <label className="font-medium text-sm">Password</label>
                        <input
                            placeholder="Enter your new password..."
                            className="mt-1.5 w-full bg-transparent focus:outline-none border border-gray-400 rounded-lg px-4 py-3 text-sm"
                            type="password"
                        />
                    </div>
                    {/* <button className="rounded-lg py-2 px-10 bg-blueButton text-white font-bold self-center md:self-start"> */}
                    <button className="py-2 px-10 rounded font-medium bg-gray-600 text-white md:self-start">
                        Save
                    </button>
                </form>
            </div>
        </>
    );
};
