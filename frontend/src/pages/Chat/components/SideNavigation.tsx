import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faUser } from "@fortawesome/free-solid-svg-icons";
import { ChannelInfo } from "./ChannelInfo";
import { useState } from "react";
import { Channels } from "./Channels";
import { Dropdown } from "./Dropdown";
import { useAppSelector } from "../../../hooks/useAppSelector";

export const SideNavigation = () => {
    const { user } = useAppSelector((state) => state.user);

    const [showChannelInfo, setShowChannelInfo] = useState<boolean>(true);
    const [showDropwdown, setShowDropwdown] = useState<boolean>(false);

    return (
        <motion.div
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: "100%", opacity: 1 }}
            transition={{ ease: "circOut", duration: 0.3 }}
        >
            <div
                className="bg-backgroundDark h-screen"
                onClick={() => setShowDropwdown(false)}
            >
                {showChannelInfo ? (
                    <ChannelInfo setShowChannelInfo={setShowChannelInfo} />
                ) : (
                    <Channels />
                )}
                <div
                    onClick={(
                        e: React.MouseEvent<HTMLDivElement, MouseEvent>
                    ) => e.stopPropagation()}
                >
                    <div className="h-16 bg-backgroundVeryDark px-5 shadow-md flex items-center justify-between font-bold absolute bottom-0 w-full">
                        <div className="flex space-x-5">
                            {user && user.pictureUrl ? (
                                <img
                                    src={user.pictureUrl}
                                    className="h-10 w-10 rounded-lg"
                                />
                            ) : (
                                <FontAwesomeIcon icon={faUser} />
                            )}
                            <button
                                onClick={() => setShowDropwdown(!showDropwdown)}
                            >
                                {user
                                    ? user.name !== ""
                                        ? user.name
                                        : "Anonymous"
                                    : "Loading ..."}
                            </button>
                        </div>
                        <FontAwesomeIcon
                            icon={faAngleDown}
                            onClick={() => setShowDropwdown(!showDropwdown)}
                            className="hidden md:inline-block cursor-pointer"
                        />
                    </div>
                    <Dropdown showDropwdown={showDropwdown} />
                </div>
            </div>
        </motion.div>
    );
};
