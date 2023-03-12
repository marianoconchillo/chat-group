import { useEffect, useState } from "react";
import { Navbar } from "../../components/Navbar";
import { useDimensions } from "../../hooks/useDimensions";
import { ChatMessages } from "./components/ChatMessages";
import { SendMessage } from "./components/SendMessage";
import { SideNavigation } from "./components/SideNavigation";

export const Chat = () => {
    const [click, setClick] = useState<boolean>(false);

    const { width } = useDimensions();

    const [wideScreen, setWideScreen] = useState<boolean>(
        width >= 768 ? true : false
    );

    useEffect(() => {
        if (width >= 768) {
            setWideScreen(true);
        } else {
            setWideScreen(false);
        }
    }, [width]);

    return (
        <div className={`${wideScreen && `grid grid-cols-4`}`}>
            {(click || wideScreen) && (
                <div
                    className={`absolute top-0 left-0 w-4/5 ${
                        wideScreen && `col-span-1 relative w-full`
                    }`}
                >
                    <SideNavigation />
                </div>
            )}

            <div
                className={`h-screen flex flex-col justify-between ${
                    wideScreen && `col-span-3`
                }`}
            >
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
    );
};
