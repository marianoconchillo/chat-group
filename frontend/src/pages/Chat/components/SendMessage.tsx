import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";

export const SendMessage = () => {
    return (
        <div className="mb-3 mt-5 px-5 md:pl-10">
            <div className="flex bg-backgroundLight items-center rounded-lg">
                <textarea
                    placeholder="Type a message here"
                    className="bg-transparent w-full mx-4 p-2.5 focus:outline-none rounded-lg text-sm resize-none"
                    rows={1}
                />
                <FontAwesomeIcon
                    icon={faPaperPlane}
                    className="p-2 mr-3 rounded-lg cursor-pointer bg-backgroundBlue"
                />
            </div>
        </div>
    );
};
