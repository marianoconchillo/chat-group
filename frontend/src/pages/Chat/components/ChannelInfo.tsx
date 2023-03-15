import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";

interface Props {
    setShowChannelInfo: (value: boolean) => void;
}

export const ChannelInfo = ({ setShowChannelInfo }: Props) => {
    return (
        <div className="h-full flex flex-col justify-between">
            <div className="h-16 px-5 shadow-md flex items-center space-x-5 font-bold">
                <FontAwesomeIcon
                    icon={faAngleLeft}
                    className="cursor-pointer"
                    onClick={() => setShowChannelInfo(false)}
                />
                <p>All channels</p>
            </div>

            <div className="px-5 mt-5 flex flex-col space-y-10 flex-1">
                <div className="flex flex-col space-y-4">
                    <p className="font-bold">WELCOME</p>
                    <p className="text-sm">
                        This is the Welcome Channel. Join new channels and start
                        chatting!
                    </p>
                </div>

                <div>
                    <p className="font-bold mb-2.5">MEMBERS</p>
                </div>
            </div>
        </div>
    );
};
