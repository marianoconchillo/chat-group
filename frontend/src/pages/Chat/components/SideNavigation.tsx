import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faUser } from "@fortawesome/free-solid-svg-icons";
import { ChannelInfo } from "./ChannelInfo";
import { useState } from "react";
import { MyChannels } from "./MyChannels";
import { Dropdown } from "./Dropdown";

export const SideNavigation = () => {
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
                    <MyChannels />
                )}
                <div
                    onClick={(
                        e: React.MouseEvent<HTMLDivElement, MouseEvent>
                    ) => e.stopPropagation()}
                >
                    <div className="h-16 bg-backgroundVeryDark px-5 shadow-md flex items-center justify-between font-bold absolute bottom-0 w-full">
                        <div className="space-x-5">
                            <FontAwesomeIcon icon={faUser} />
                            <button
                                onClick={() => setShowDropwdown(!showDropwdown)}
                            >
                                Mariano Conchillo
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
