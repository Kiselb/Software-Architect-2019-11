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
