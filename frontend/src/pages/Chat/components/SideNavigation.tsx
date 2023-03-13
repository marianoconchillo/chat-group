import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faAngleLeft,
    faUser,
    faCircleUser,
    faUsers,
    faArrowRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";

export const SideNavigation = () => {
    const navigate = useNavigate();

    const [click, setClick] = useState<boolean>(false);

    return (
        <motion.div
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: "100%", opacity: 1 }}
            transition={{ ease: "circOut", duration: 0.3 }}
        >
            <div className="bg-backgroundDark h-screen flex flex-col justify-between">
                <div className="h-16 px-5 shadow-md flex items-center space-x-5 font-bold">
                    <FontAwesomeIcon
                        icon={faAngleLeft}
                        className="cursor-pointer"
                    />
                    <p>All channels</p>
                </div>
                <div className="px-5 mt-5 flex flex-col space-y-10 flex-1">
                    <div className="flex flex-col space-y-4">
                        <p className="font-bold">WELCOME</p>
                        <p className="text-sm">
                            This is the Welcome Channel. Join new channels and
                            start chatting!
                        </p>
                    </div>

                    <div>
                        <p className="font-bold mb-2.5">MEMBERS</p>
                    </div>
                </div>
                <div className="h-16 bg-backgroundVeryDark px-5 shadow-md flex items-center space-x-5 font-bold">
                    <FontAwesomeIcon icon={faUser} />
                    <button onClick={() => setClick(!click)}>
                        Mariano Conchillo
                    </button>
                </div>
                {click && (
                    <div
                        className="absolute right-5 bottom-10 py-1 px-2 shadow mt-3 rounded-lg divide-y divide-slate-600"
                        style={{ backgroundColor: "#252329" }}
                    >
                        <ul className="text-sm">
                            <li
                                className="px-4 py-2 rounded cursor-pointer flex items-center justify-start space-x-5 hover:bg-backgroundLight"
                                onClick={() => navigate("/profile")}
                            >
                                <FontAwesomeIcon
                                    icon={faCircleUser}
                                    size="lg"
                                />
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
                                // onClick={handleLogout}
                            >
                                <FontAwesomeIcon
                                    icon={faArrowRightFromBracket}
                                    size="lg"
                                />
                                <p>Logout</p>
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </motion.div>
    );
};
