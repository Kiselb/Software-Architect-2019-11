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
    uid: string;
    clientName: string;
    contactName: string;
    email: string;
    phone: string;
    address: string;
    statusId: number;
    statusName: string;
    statusReason: string
}
