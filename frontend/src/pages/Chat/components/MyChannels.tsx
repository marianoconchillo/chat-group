import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { NewChannelModal } from "./NewChannelModal";

interface Props {
    setShowChannelInfo: (value: boolean) => void;
}

export const MyChannels = ({ setShowChannelInfo }: Props) => {
    const [showModal, setShowModal] = useState<boolean>(false);

    return (
        <>
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
        </>
    );
};
