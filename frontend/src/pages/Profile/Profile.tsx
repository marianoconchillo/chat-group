import { useState } from "react";
import { EditUserInfo } from "./components/EditUserInfo";
import { UserInfo } from "./components/UserInfo";

export const Profile = () => {
    const [edit, setEdit] = useState<boolean>(false);

    return (
        <div className="container mx-auto px-5 my-10 md:w-3/4 lg:w-1/2">
            {!edit ? (
                <UserInfo setEdit={setEdit} />
            ) : (
                <EditUserInfo setEdit={setEdit} />
            )}
        </div>
    );
};
