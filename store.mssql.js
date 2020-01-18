const mssql = require('mssql');

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
