const mssql = require('mssql');

exports.users = function(params) {
    return new Promise(async (resolve, reject) => {
        try {
            const request = await new mssql.Request(params.pool);
            request.input('Criteria', mssql.NVarChar, params.criteria);

            const result = await request.execute('dbo.UsersList');
            resolve(result);
        }
        catch(error) {
            reject(error);
        }
    });
};
exports.userAddNew = function(params) {
    return new Promise(async (resolve, reject) => {
        try {
            const request = await new mssql.Request(params.pool);
            request.input('UserName', mssql.NVarChar, params.userName);
            request.input('Password', mssql.NVarChar, params.password);
            request.input('Email', mssql.NVarChar, params.email);
            request.input('RoleID', mssql.UniqueIdentifier, params.roleId);
            request.input('ClientID', mssql.UniqueIdentifier, params.clientId);
            request.output('UID', mssql.UniqueIdentifier);

            const result = await request.execute('dbo.UsersAddNew');
            resolve(result);
        }
        catch(error) {
            reject(error);
        }
    });
};
exports.userSetStatus = function(params) {
    return new Promise(async (resolve, reject) => {
        try {
            const request = await new mssql.Request(params.pool);
            request.input('UserID', mssql.UniqueIdentifier, params.userId);
            request.input('Status', mssql.Int, params.status);

            const result = await request.execute('dbo.UsersSetStatus');
            resolve(result);
        }
        catch(error) {
            reject(error);
        }
    });
};
exports.clientAddNew = function(params) {
    return new Promise(async (resolve, reject) => {
        try {
            const request = await new mssql.Request(params.pool);
            request.input('ClientName', mssql.NVarChar, params.clientName);
            request.input('Email', mssql.NVarChar, params.email);
            request.input('Phone', mssql.NVarChar, params.phone);
            request.input('Address', mssql.NVarChar, params.address);
            request.input('ContactName', mssql.NVarChar, params.contactName);
            request.output('UID', mssql.UniqueIdentifier);

            const result = await request.execute('dbo.ClientsAddNew');
            resolve(result);
        }
        catch(error) {
            reject(error);
        }
    });
};
exports.clientUpdate = function(params) {
    return new Promise(async (resolve, reject) => {
        try {
            const request = await new mssql.Request(params.pool);
            request.input('UID', mssql.NVarChar, params.ClientID);
            request.input('Email', mssql.NVarChar, params.EMail);
            request.input('Phone', mssql.NVarChar, params.Phone);
            request.input('Address', mssql.NVarChar, params.Address);
            request.input('ContactName', mssql.NVarChar, params.ContactName);

            const result = await request.execute('dbo.ClientsUpdate');
            resolve(result);
        }
        catch(error) {
            reject(error);
        }
    });
};
exports.clients = function(params) {
    return new Promise(async (resolve, reject) => {
        try {
            const request = await new mssql.Request(params.pool);
            request.input('Criteria', mssql.NVarChar, params.criteria);

            const result = await request.execute('dbo.ClientsList');
            resolve(result);
        }
        catch(error) {
            reject(error);
        }
    });
};
exports.subdivisions = function(params) {
    return new Promise(async (resolve, reject) => {
        try {
            const request = await new mssql.Request(params.pool);
            const result = await request.execute('dbo.SubdivisionsList');
            resolve(result);
        }
        catch(error) {
            reject(error);
        }
    });
};
exports.serviceRequestsTypes = function(params) {
    return new Promise(async (resolve, reject) => {
        try {
            const request = await new mssql.Request(params.pool);
            const result = await request.execute('dbo.ServiceRequestsTypesList');
            resolve(result);
        }
        catch(error) {
            reject(error);
        }
    });
};
exports.serviceRequestRegisterFile = function(params) {
    return new Promise(async (resolve, reject) => {
        try {
            const request = await new mssql.Request(params.pool);

            request.input('xml', mssql.Xml, params.xml);
            request.output('ServiceRequestID', mssql.UniqueIdentifier);

            const result = await request.execute('dbo.ServiceRequestsAddNew');
            resolve(result.output.ServiceRequestID);
        }
        catch(error) {
            reject(error);
        }
    });
};
exports.serviceRequests = function(params) {
    return new Promise(async (resolve, reject) => {
        try {
            const request = await new mssql.Request(params.pool);
            // request.multiple = true;

            request.input('Section', mssql.Int, params.section);
            request.input('Criteria', mssql.NVarChar, params.criteria);
            request.input('SortOrder', mssql.NVarChar, params.sortOrder);
            request.input('SortType', mssql.NVarChar, params.sortType);
            request.input('PageNo', mssql.Int, params.pageNo);
            request.input('PageSize', mssql.Int, params.pageSize);

            console.dir(params);
            const result = await request.execute('dbo.ServiceRequestsList');
            // request.execute('dbo.ServiceRequestsList', function(error, recordsets) {
            //     if (error) {
            //         console.log("Rejected");
            //         reject(error);
            //     } else {
            //         console.log("Resolved");
            //         console.dir(recordsets);
            //         resolve(recordsets.length);
            //     }
            // });
            console.dir(result);
            resolve(result);
        }
        catch(error) {
            reject(error);
        }
    });
};
exports.serviceRequestsHeader = function(params) {
    return new Promise(async (resolve, reject) => {
        try {
            const request = await new mssql.Request(params.pool);

            request.input('SRID', mssql.UniqueIdentifier, params.srid);

            console.dir(params);
            const result = await request.execute('dbo.ServiceRequestsHeader');
            console.dir(result);
            resolve(result);
        }
        catch(error) {
            reject(error);
        }
    });
};
exports.serviceRequestsHeaderUpdate = function(params) {
    return new Promise(async (resolve, reject) => {
        try {
            const request = await new mssql.Request(params.pool);

            request.input('SRID', mssql.UniqueIdentifier, params.srid);
            request.input('DueDate', mssql.DateTime, params.DueDate);
            request.input('Remarks', mssql.NVarChar, params.Remarks);

            console.dir(params);
            const result = await request.execute('dbo.ServiceRequestsHeaderUpdate');
            console.dir(result);
            resolve(result);
        }
        catch(error) {
            reject(error);
        }
    });
};
exports.serviceRequestsDetails = function(params) {
    return new Promise(async (resolve, reject) => {
        try {
            const request = await new mssql.Request(params.pool);

            request.input('ServiceRequestID', mssql.UniqueIdentifier, params.srid);

            console.dir(params);
            const result = await request.execute('dbo.ServiceRequestsDetails');
            console.dir(result);
            resolve(result);
        }
        catch(error) {
            reject(error);
        }
    });
};
exports.getPermission = function(params) {
    return new Promise(async (resolve, reject) => {
        try {
            const request = await new mssql.Request(params.pool);
            request.input('UserID', mssql.UniqueIdentifier, params.userId);
            request.input('PermissionID', mssql.UniqueIdentifier, params.permissionId);

            const result = await request.execute('dbo.UsersPermissionsCheck');
            resolve(result);
        }
        catch(error) {
            reject(error);
        }
    });
}
exports.authorization = function(params) {
    return new Promise(async (resolve, reject) => {
        try {
            const request = await new mssql.Request(params.pool);
            request.input('UserID', mssql.UniqueIdentifier, params.userId);

            const result = await request.execute('dbo.UsersAuthorization');
            resolve(result);
        }
        catch(error) {
            console.log(error);
            reject(error);
        }
    });
};
exports.authentication = function(params) {
    return new Promise(async (resolve, reject) => {
        try {
            const request = await new mssql.Request(params.pool);
            request.input('UserName', mssql.NVarChar, params.name);
            request.input('Password', mssql.NVarChar, params.password);
            request.output('UID', mssql.UniqueIdentifier);
            request.output('OriginUserName', mssql.NVarChar);

            const result = await request.execute('dbo.UsersAuthentication');
            resolve(result);
        }
        catch(error) {
            console.log(error);
            reject(error);
        }
    });
}
