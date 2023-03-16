import { useAppSelector } from "../../../hooks/useAppSelector";

export const ChatMessages = () => {
    const { selectedChannel } = useAppSelector((state) => state.channel);

    return (
        <div className="px-5 h-full flex flex-col justify-end font-medium md:pl-10">
            {selectedChannel &&
                selectedChannel.messages.map((message) => (
                    <p className="text-sm md:text-sm leading-relaxed">
                        {message.text}
                    </p>
                ))}
        </div>
    );
};
