import { motion } from "framer-motion";
import { ChannelInfo } from "./ChannelInfo";
import { useState } from "react";
import { MyChannels } from "./MyChannels";

export const SideNavigation = () => {
    const [showChannelInfo, setShowChannelInfo] = useState<boolean>(true);

    return (
        <motion.div
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: "100%", opacity: 1 }}
            transition={{ ease: "circOut", duration: 0.3 }}
        >
            <div className="bg-backgroundDark h-screen flex flex-col justify-between">
                {showChannelInfo ? (
                    <ChannelInfo setShowChannelInfo={setShowChannelInfo} />
                ) : (
                    <MyChannels setShowChannelInfo={setShowChannelInfo} />
                )}
            </div>
        </motion.div>
    );
};
