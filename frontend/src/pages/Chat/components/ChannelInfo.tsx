import { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faUser } from "@fortawesome/free-solid-svg-icons";
import { useAppSelector } from "../../../hooks/useAppSelector";
import { Loading } from "../../../components/Loading";
import { User } from "../../../interfaces/User";
import { AnimateComponent } from "../../../components/AnimateComponent";

interface Props {
    setShowChannelInfo: (value: boolean) => void;
}

export const ChannelInfo = ({ setShowChannelInfo }: Props) => {
    const { selectedChannel, isLoading } = useAppSelector(
        (state) => state.channel
    );

    useEffect(() => {}, [selectedChannel?.users]);

    return (
        <div className="h-full flex flex-col justify-between">
            {!selectedChannel && isLoading ? (
                <Loading />
            ) : (
                selectedChannel && (
                    <>
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
                                <AnimateComponent>
                                    <p className="font-bold">
                                        {selectedChannel.name}
                                    </p>
                                    <p className="text-sm">
                                        {selectedChannel.description}
                                    </p>
                                </AnimateComponent>
                            </div>

                            <AnimateComponent>
                                <div className="flex flex-col space-y-5">
                                    <p className="font-bold">MEMBERS</p>
                                    {selectedChannel.users.map((user: User) => (
                                        <div
                                            className="flex space-x-5"
                                            key={user.email}
                                        >
                                            {user.pictureUrl ? (
                                                <img
                                                    src={user.pictureUrl}
                                                    className="h-10 w-10 rounded-lg"
                                                />
                                            ) : (
                                                <div className="h-10 w-10 rounded-lg flex items-center justify-center">
                                                    <FontAwesomeIcon
                                                        icon={faUser}
                                                        size="xl"
                                                    />
                                                </div>
                                            )}
                                            <button
                                                className="font-semibold"
                                                style={{ color: "#828282" }}
                                            >
                                                {user.name !== ""
                                                    ? user.name
                                                    : "Anonymous"}
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </AnimateComponent>
                        </div>
                    </>
                )
            )}
        </div>
    );
};
