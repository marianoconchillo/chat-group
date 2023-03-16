import { ChangeEvent, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { NewChannelModal } from "./NewChannelModal";
import { useAppDispatch } from "../../../hooks/useAppDispatch";
import { useAppSelector } from "../../../hooks/useAppSelector";
import { getAllChannels } from "../../../redux/features/channel/channelServices";
import { Loading } from "../../../components/Loading";
import { Channel } from "../../../interfaces/Channel";

export const Channels = () => {
    const dispatch = useAppDispatch();
    const { isLoading, channels, error } = useAppSelector(
        (state) => state.channel
    );

    console.log(channels);

    const [showModal, setShowModal] = useState<boolean>(false);
    const [inputValue, setInputValue] = useState<string>("");

    useEffect(() => {
        dispatch(getAllChannels());
    }, []);

    return (
        <div className="h-full flex flex-col justify- px-5">
            <NewChannelModal
                showModal={showModal}
                setShowModal={setShowModal}
            />

            <div className="h-16 shadow-md flex items-center justify-between font-bold">
                <p>Channels</p>
                <FontAwesomeIcon
                    icon={faPlus}
                    className="cursor-pointer px-2 py-1.5 rounded-md bg-backgroundLight"
                    onClick={() => setShowModal(true)}
                />
            </div>

            <div className="mt-5">
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

            <div>{isLoading && <Loading />}</div>
            <p className="text-sm my-5 text-red-500 text-center">{error}</p>

            {channels && (
                <ul className="space-y-5">
                    {channels.map((channel: Channel) => (
                        <li
                            key={channel._id}
                            className="flex items-center font-bold space-x-5"
                        >
                            <p className="bg-backgroundLight w-10 h-8 flex items-center justify-center rounded-lg text-white tracking-wider">
                                {channel.name[0]}
                                {channel.name.split(" ").length > 1 &&
                                    channel.name.split(" ")[1][0]}
                            </p>
                            <p>{channel.name}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};
