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
export interface IServiceRequestResult {
    result: number;
    message: string;
    serviceRequestID: string;
}
export interface ISubdivisionInfo {
    SubdivisionID: string;
    SubdivisionName: string;
}
export interface IServiceRequestStatusInfo {
    StatusID: number;
    StatusName: string;
    StatusCode: string;
}
export interface IServiceRequestsTypeInfo {
    ServiceRequestTypeID: number;
    ServiceRequestTypeName: string;
    ServiceRequestTypeCode: string;
}
export interface IServiceRequestHeader {
    ServiceRequestID: string;
    ServiceRequestType: IServiceRequestsTypeInfo;
    Client: IClientInfo;
    Subdivision: ISubdivisionInfo;
    Status: IServiceRequestStatusInfo;
    DueDate: string;
    Remarks: string;
}
export interface ISKU {
    ID: string;
    BarCode: string;
    SKUName: string;
    Weight: number;
    Volume: number;
    BaseX: number;
    BaseY: number;
}
export interface IPAL {
    ID: string;
    PALName: string;
}
export interface IServiceRequestDetailsRow {
    SKU: ISKU;
    PAL: IPAL;
}
