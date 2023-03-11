import { useState } from "react";
import { Navbar } from "../../components/Navbar";
import { ChatMessages } from "./components/ChatMessages";
import { SendMessage } from "./components/SendMessage";
import { SideNavigation } from "./components/SideNavigation";

export const Chat = () => {
    const [click, setClick] = useState<boolean>(false);

    return (
        <div className="h-screen flex flex-col justify-between relative">
            <div>
                <Navbar click={click} setClick={setClick} />
            </div>
            <div className="flex-1">
                <ChatMessages />
            </div>
            <div>
                <SendMessage />
            </div>

            {click && (
                <div className="absolute top-0 left-0 w-4/5">
                    <SideNavigation />
                </div>
            )}
        </div>
    );
};
