import { useState } from "react";
import { EditUserInfo } from "./components/EditUserInfo";
import { UserInfo } from "./components/UserInfo";

export const Profile = () => {
    const [edit, setEdit] = useState<boolean>(false);

    return (
        <div className="asds">
            {!edit ? (
                <UserInfo setEdit={setEdit} />
            ) : (
                <EditUserInfo setEdit={setEdit} />
            )}
        </div>
    );
};
