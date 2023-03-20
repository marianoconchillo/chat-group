export interface UserAuth {
    _id: string;
    token: string;
}

export interface User {
    _id: string;
    email: string;
    password: string;
    name: string;
    bio: string;
    phone: string;
    pictureUrl: string;
}
