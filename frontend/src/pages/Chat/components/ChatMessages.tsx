import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { useAppSelector } from "../../../hooks/useAppSelector";
import moment from "moment";
import { useEffect } from "react";

export const ChatMessages = () => {
    const { selectedChannel } = useAppSelector((state) => state.channel);

    useEffect(() => {
        const element = document.getElementById("last-child");
        if (element) {
            console.log(element);
            element.scrollIntoView({ behavior: "smooth" });
        }
    }, [selectedChannel?.messages]);

    return (
        <div className="px-5 flex flex-col justify-end font-medium md:pl-10">
            {selectedChannel &&
                selectedChannel.messages.map((message, index) => (
                    <div
                        className="flex items-center justify-center space-x-5 mt-5"
                        id={
                            index === selectedChannel.messages.length - 1
                                ? `last-child`
                                : ``
                        }
                        key={message._id}
                    >
                        {message.user.pictureUrl ? (
                            <img
                                src={message.user.pictureUrl}
                                className="h-10 w-10 rounded-lg"
                            />
                        ) : (
                            <div className="border h-10 w-10 rounded-lg flex items-center justify-center">
                                <FontAwesomeIcon icon={faUser} />
                            </div>
                        )}
                        <div className="flex-1 flex flex-col">
                            <div
                                className="flex items-center space-x-5"
                                style={{ color: "#828282" }}
                            >
                                <h3 className="font-semibold text-sm">
                                    {message.user.name}
                                </h3>
                                <p className="text-xs">
                                    {moment(message.createdAt).fromNow()}
                                </p>
                            </div>
                            <p className="text-sm md:text-base leading-relaxed">
                                {message.text}
                            </p>
                        </div>
                    </div>
                ))}
        </div>
    );
};
