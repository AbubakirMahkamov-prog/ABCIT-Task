
interface IUser {
    id: string;
    email: string;
    full_name: string;
    password: string;
    is_verifed: boolean;
}
declare global {
    namespace Express {
        interface Request {
            currentUser?: IUser;
        }
    }
}
