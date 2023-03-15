import { ChangeEvent, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { NewChannelModal } from "./NewChannelModal";

export const MyChannels = () => {
    const [showModal, setShowModal] = useState<boolean>(false);
    const [inputValue, setInputValue] = useState<string>("");

    return (
        <div className="h-full flex flex-col justify-start">
            <NewChannelModal
                showModal={showModal}
                setShowModal={setShowModal}
            />

            <div className="h-16 px-5 shadow-md flex items-center justify-between font-bold">
                <p>Channels</p>
                <FontAwesomeIcon
                    icon={faPlus}
                    className="cursor-pointer px-2 py-1.5 rounded-md bg-backgroundLight"
                    onClick={() => setShowModal(true)}
                />
            </div>

            <div className="px-5 mt-5">
                <div className="w-full flex items-center py-3 rounded-lg px-5 space-x-3 bg-backgroundLight">
                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                    <input
                        placeholder="Search"
                        className="w-full bg-transparent focus:outline-none text-sm"
                        type="text"
                        value={inputValue}
                        onChange={(e: ChangeEvent<HTMLInputElement>) =>
                            setInputValue(e.target.value)
                        }
                    />
                </div>
            </div>
        </div>
    );
};
