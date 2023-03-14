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

export const Chat = () => {
    const dispatch = useAppDispatch();
    const { isLoading, error } = useAppSelector((state) => state.user);

    const [click, setClick] = useState<boolean>(false);

    const { width } = useDimensions();

    const [wideScreen, setWideScreen] = useState<boolean>(
        width >= 768 ? true : false
    );

    useEffect(() => {
        dispatch(getMe());
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
            {isLoading ? (
                <Loading />
            ) : error ? (
                <div className="h-screen flex items-center justify-center">
                    <h3 className="text-2xl font-bold text-red-600">{error}</h3>
                </div>
            ) : (
                <div className="md:grid grid-cols-4">
                    {(click || wideScreen) && (
                        <div className="absolute top-0 left-0 w-4/5 md:col-span-1 md:relative md:w-full">
                            <SideNavigation />
                        </div>
                    )}

                    <div className="h-screen flex flex-col justify-between md:col-span-3">
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
