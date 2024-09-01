export declare class MailerService {
    private CLIENT_ID;
    private CLIENT_SECRET;
    private REDIRECT_URI;
    private REFRESH_TOKEN;
    private transporter;
    constructor();
    sendMessage(to: string, subject: string, message: string): Promise<void>;
    retrieveToken(): Promise<import("google-auth-library/build/src/auth/oauth2client").GetAccessTokenResponse>;
    createTransporter(): Promise<void>;
}
