import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faUser } from "@fortawesome/free-solid-svg-icons";

interface Props {
    setEdit: (value: boolean) => void;
}

export const UserInfo = ({ setEdit }: Props) => {
    const navigate = useNavigate();

    return (
        <>
            <button
                className="mb-10 flex items-center space-x-3 cursor-pointer"
                onClick={() => navigate(-1)}
            >
                <FontAwesomeIcon icon={faAngleLeft} color="#2D9CDB" />
                <p className="" style={{ color: "#2D9CDB" }}>
                    Back
                </p>
            </button>
            <div className="mb-10 space-y-2">
                <h2 className="font-medium text-2xl text-center">
                    Personal info
                </h2>
                <h3 className="font-extralight text-lg text-center ">
                    Basic info, like your name and photo
                </h3>
            </div>
            <div className="divide-y divide-gray-700 space-y-3 md:border md:px-10 md:py-5 rounded-lg border-gray-600">
                {/* Row 1 */}
                <div className="flex justify-between items-center h-20">
                    <div className="flex flex-col items-start space-y-2">
                        <h2 className="font-medium text-xl text-center">
                            Profile
                        </h2>
                        <h4 className="font-medium text-sm md:text-base">
                            Some info may be visible to other people
                        </h4>
                    </div>
                    <div className="flex flex-col items-end justify-center !border-t-0">
                        <button
                            className="font-medium rounded-xl px-8 py-2 text-sm md:text-base bg-gray-600"
                            onClick={() => setEdit(true)}
                        >
                            Edit
                        </button>
                    </div>
                </div>

                {/* Row 2 */}
                <div className="flex justify-between items-center h-20 text-sm md:text-base">
                    <h4 className="font-medium opacity-60">PHOTO</h4>
                    <div className="flex flex-col items-end md:items-start justify-center">
                        <FontAwesomeIcon
                            icon={faUser}
                            size="lg"
                            className="border-2 rounded-lg px-8 py-2"
                        />
                    </div>
                </div>

                {/* Row 3 */}
                <div className="flex justify-between items-center h-20 text-sm md:text-base">
                    <h4 className="font-medium opacity-60">NAME</h4>
                    <div className="flex flex-col items-end md:items-start justify-center">
                        <h4 className="font-medium opacity-90 text-end">
                            Mariano Conchillo
                        </h4>
                    </div>
                </div>

                {/* Row 4 */}
                <div className="flex justify-between items-center h-20 text-sm md:text-base">
                    <h4 className="font-medium opacity-60">BIO</h4>
                    <div className="flex flex-col items-end md:items-start justify-center">
                        <h4 className="font-medium opacity-90">
                            Softare Developer
                        </h4>
                    </div>
                </div>

                {/* Row 5 */}
                <div className="flex justify-between items-center h-20 text-sm md:text-base">
                    <h4 className="font-medium opacity-60">PHONE</h4>
                    <div className="flex flex-col items-end md:items-start justify-center">
                        <h4 className="font-medium opacity-90">123456789</h4>
                    </div>
                </div>

                {/* Row 6 */}
                <div className="flex justify-between items-center h-20 text-sm md:text-base">
                    <h4 className="font-medium opacity-60">EMAIL</h4>
                    <div className="flex flex-col items-end md:items-start justify-center">
                        <h4 className="font-medium opacity-90">
                            marianoconchillo@hotmail.com
                        </h4>
                    </div>
                </div>

                {/* Row 7 */}
                <div className="flex justify-between items-center h-20 text-sm md:text-base">
                    <h4 className="font-medium opacity-60">PASSWORD</h4>
                    <div className="flex flex-col items-end md:items-start justify-center">
                        <h4 className="font-medium opacity-90">**********</h4>
                    </div>
                </div>
            </div>
        </>
    );
};
