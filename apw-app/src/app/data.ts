export interface IClientParams {
    clientName: string;
    contactName: string;
    email: string;
    phone: string;
    address: string;
}
export interface IClientResult {
    result: number;
    message: string;
    clientId: string;
}
export interface IClientInfo {
    ClientID: string;
    ClientName: string;
    ContactName: string;
    EMail: string;
    Phone: string;
    Address: string;
    StatusID: number;
    StatusName: string;
    StatusReason: string
}
export interface IUserParams {
    userName: string;
    email: string;
    password: string;
    roleId: string;
    clientId: string;
}
export interface IUserResult {
    result: number;
    message: string;
    userId: string;
}
export interface IUserInfo {
    UserID: string;
    UserName: string;
    EMail: string;
    StatusID: number;
    StatusName: string;
    ClientID: string;
    ClientName: string;
}
