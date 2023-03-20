import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { useAppSelector } from "../../../hooks/useAppSelector";
import { useAppDispatch } from "../../../hooks/useAppDispatch";
import { newMessage } from "../../../redux/features/channel/channelServices";

export const SendMessage = () => {
    const dispatch = useAppDispatch();
    const channel = useAppSelector((state) => state.channel.selectedChannel);
    const user = useAppSelector((state) => state.auth.userAuth);

    const [message, setMessage] = useState<string>("");

    const handleClick = async () => {
        if (channel && user && message !== "") {
            await dispatch(
                newMessage({
                    userId: user._id,
                    text: message,
                    channelId: channel?._id,
                })
            );

            setMessage("");
        }
    };

    return (
        <div className="mb-3 mt-5 px-5 md:pl-10">
            <div className="flex bg-backgroundLight items-center rounded-lg">
                <textarea
                    placeholder="Type a message here"
                    className="bg-transparent w-full mx-4 p-2.5 focus:outline-none rounded-lg text-sm resize-none"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={1}
                />
                <FontAwesomeIcon
                    icon={faPaperPlane}
                    className="p-2 mr-3 rounded-lg cursor-pointer bg-backgroundBlue"
                    onClick={handleClick}
                />
            </div>
        </div>
    );
};
