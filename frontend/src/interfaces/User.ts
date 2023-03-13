export interface User {
    _id: string;
    email: string;
    token: string;
    name?: string;
    bio?: string;
    phone?: string;
    pictureUrl?: string;
}
