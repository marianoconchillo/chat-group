import { useEffect, useState } from "react";
import { Navbar } from "./components/Navbar";
import { useDimensions } from "../../hooks/useDimensions";
import { ChatMessages } from "./components/ChatMessages";
import { SendMessage } from "./components/SendMessage";
import { SideNavigation } from "./components/SideNavigation";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { getMe } from "../../redux/features/user/userServices";
import { useAppSelector } from "../../hooks/useAppSelector";
import { Loading } from "../../components/Loading";
import { getDefaultChannel } from "../../redux/features/channel/channelServices";

export const Chat = () => {
    const dispatch = useAppDispatch();
    const { isLoading: loadingUser, error: errorUser } = useAppSelector(
        (state) => state.user
    );

    const [click, setClick] = useState<boolean>(false);

    const { width } = useDimensions();

    const [wideScreen, setWideScreen] = useState<boolean>(
        width >= 768 ? true : false
    );

    useEffect(() => {
        dispatch(getMe());
        dispatch(getDefaultChannel());
    }, []);

    useEffect(() => {
        if (width >= 768) {
            setWideScreen(true);
        } else {
            setWideScreen(false);
        }
    }, [width]);

    return (
        <>
            {loadingUser ? (
                <Loading />
            ) : errorUser ? (
                <div className="h-screen flex items-center justify-center">
                    <h3 className="text-2xl font-bold text-red-600">
                        {errorUser}
                    </h3>
                </div>
            ) : (
                <div className="md:grid grid-cols-7">
                    {(click || wideScreen) && (
                        <div className="absolute top-0 left-0 w-4/5 md:col-span-3 md:relative md:w-full lg:col-span-2">
                            <SideNavigation />
                        </div>
                    )}

                    <div className="h-screen flex flex-col justify-between md:col-span-4 lg:col-span-5">
                        <div>
                            <Navbar click={click} setClick={setClick} />
                        </div>

                        <div className="flex-1">
                            <ChatMessages />
                        </div>

                        <div>
                            <SendMessage />
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};
