import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";

export const SendMessage = () => {
    return (
        <div className="my-3 px-5">
            <div className="flex bg-backgroundLight items-center rounded-lg">
                <textarea
                    placeholder="Type a message here"
                    className="bg-transparent w-full mx-4 p-2.5 focus:outline-none rounded-lg text-sm resize-none"
                    rows={1}
                />
                <FontAwesomeIcon
                    icon={faPaperPlane}
                    className="p-2 mr-3 bg-red-500 rounded-lg cursor-pointer"
                    style={{ backgroundColor: "#2F80ED" }}
                />
            </div>
        </div>
    );
};
