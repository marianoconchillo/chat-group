import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faCircleUser,
    faUsers,
    faArrowRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import { logout } from "../../../redux/features/auth/authSlice";
import { useAppDispatch } from "../../../hooks/useAppDispatch";

interface Props {
    showDropwdown: boolean;
}

const backdrop = {
    visible: { opacity: 1 },
    hidden: { opacity: 0 },
};

export const Dropdown = ({ showDropwdown }: Props) => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    return (
        <AnimatePresence mode="wait">
            {showDropwdown && (
                <motion.div
                    className="modal absolute left-1/2 bottom-8 py-1 px-2 shadow mt-3 rounded-lg divide-y divide-slate-600 w-max"
                    style={{ backgroundColor: "#1d1b20" }}
                    variants={backdrop}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                >
                    <ul className="text-sm">
                        <li
                            className="px-4 py-2 rounded cursor-pointer flex items-center justify-start space-x-5 hover:bg-backgroundLight"
                            onClick={() => navigate("/profile")}
                        >
                            <FontAwesomeIcon icon={faCircleUser} size="lg" />
                            <p>My Profile</p>
                        </li>
                        <li className="px-4 py-2 rounded cursor-pointer flex items-center justify-start space-x-5 hover:bg-backgroundLight">
                            <FontAwesomeIcon icon={faUsers} />
                            <p>Group Chat</p>
                        </li>
                    </ul>
                    <div className="text-sm text-red-500 hover:bg-backgroundLight">
                        <button
                            className="px-4 py-2 w-full rounded cursor-pointer flex items-center justify-start space-x-5"
                            onClick={() => dispatch(logout())}
                        >
                            <FontAwesomeIcon
                                icon={faArrowRightFromBracket}
                                size="lg"
                            />
                            <p>Logout</p>
                        </button>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
        // <div
        //     className="absolute left-1/2 bottom-8 py-1 px-2 shadow mt-3 rounded-lg divide-y divide-slate-600"
        //     style={{ backgroundColor: "#252329" }}
        // >
        //     <ul className="text-sm">
        //         <li
        //             className="px-4 py-2 rounded cursor-pointer flex items-center justify-start space-x-5 hover:bg-backgroundLight"
        //             onClick={() => navigate("/profile")}
        //         >
        //             <FontAwesomeIcon icon={faCircleUser} size="lg" />
        //             <p>My Profile</p>
        //         </li>
        //         <li className="px-4 py-2 rounded cursor-pointer flex items-center justify-start space-x-5 hover:bg-backgroundLight">
        //             <FontAwesomeIcon icon={faUsers} />
        //             <p>Group Chat</p>
        //         </li>
        //     </ul>
        //     <div className="text-sm text-red-500 hover:bg-backgroundLight">
        //         <button
        //             className="px-4 py-2 w-full rounded cursor-pointer flex items-center justify-start space-x-5"
        //             onClick={() => dispatch(logout())}
        //         >
        //             <FontAwesomeIcon icon={faArrowRightFromBracket} size="lg" />
        //             <p>Logout</p>
        //         </button>
        //     </div>
        // </div>
    );
};
