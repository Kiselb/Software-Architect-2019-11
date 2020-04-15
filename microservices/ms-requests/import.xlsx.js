const ExcelJS = require('exceljs'); //npm install exceljs
const config = require('./config.json');

function xlsx2xml_SR01(worksheet, clientId, typeId, subdivisionId, dueDate, remarks) {
    let xml =
    `<?xml version="1.0" encoding="utf-16"?>
        <order>
            <header>
                <clientId>${clientId}</clientId>
                <typeId>${typeId}</typeId>
                <subdivisionId>${subdivisionId}</subdivisionId>
                <dueDate>${dueDate}</dueDate>
                <remarks>${remarks ? remarks : ''}</remarks>
            </header>
            <details>\n`;
    worksheet.eachRow(function(row, rowNumber) {
        if (rowNumber !== 1) { // First row contains columns headers
            xml = xml + `<row>\n<rownumber>${rowNumber}</rownumber>\n`;
            row.eachCell({includeEmpty: true}, function(cell, colNumber) {
                switch(colNumber) {
                    case 1:
                        if (cell.value) {
                            xml = xml + `<pal>${cell.value}</pal>\n`;
                        } else {
                            xml = xml + `<pal></pal>\n`;
                        }
                        break;
                    case 2:
                        xml = xml + `<sku>${cell.value}</sku>\n`;
                        break;
                    case 3:
                        xml = xml + `<quantity>${cell.value}</quantity>\n`;
                        break;
                    case 4:
                        xml = xml + `<weight>${cell.value}</weight>\n`;
                        break;
                    case 5:
                        xml = xml + `<volume>${cell.value}</volume>\n`;
                        break;
                    case 6:
                        xml = xml + `<baseX>${cell.value}</baseX>\n`;
                        break;
                    case 7:
                        xml = xml + `<baseY>${cell.value}</baseY>\n`;
                        break;
                    case 8:
                        xml = xml + `<skuName>${cell.value}</skuName>\n`;
                        break;
                    }
            })
            xml = xml + "</row>\n";
        }
    });
    xml = xml + "</details>\n</order>";
    //console.log(xml);
    return xml;
}
function xlsx2xml_SR02(worksheet, clientId, typeId, subdivisionId, dueDate, remarks) {
    let xml =
    `<?xml version="1.0" encoding="utf-16"?>
        <order>
            <header>
                <clientId>${clientId}</clientId>
                <typeId>${typeId}</typeId>
                <subdivisionId>${subdivisionId}</subdivisionId>
                <dueDate>${dueDate}</dueDate>
                <remarks>${remarks ? remarks: ''}</remarks>
            </header>
            <details>\n`;
    worksheet.eachRow(function(row, rowNumber) {
        if (rowNumber !== 1) { // First row contains columns headers
            xml = xml + `<row>\n<rownumber>${rowNumber}</rownumber>\n`;
            row.eachCell({includeEmpty: true}, function(cell, colNumber) {
                switch(colNumber) {
                    case 1:
                        if (cell.value) {
                            xml = xml + `<pal>${cell.value}</pal>\n`;
                        } else {
                            xml = xml + `<pal></pal>\n`;
                        }
                        break;
                    case 2:
                        xml = xml + `<sku>${cell.value}</sku>\n`;
                        break;
                    case 3:
                        xml = xml + `<quantity>${cell.value}</quantity>\n`;
                        break;
                    case 4:
                        xml = xml + `<skuName>${cell.value}</skuName>\n`;
                        break;
                }
            })
            xml = xml + "</row>\n";
        }
    });
    xml = xml + "</details>\n</order>";
    return xml;
}
exports.XLSXToXML = function(fileName, clientId, subdivisionId, typeId, dueDate, remarks) {
    return new Promise((resolve, reject) => {
        const workbook = new ExcelJS.Workbook();

        workbook.xlsx.readFile(config.development.dstpath + fileName) //'I:\\USR\\MDB\\Misc\\TEST\\' + fileName)
        .then(workbook => {
            const worksheet = workbook.getWorksheet(1);

            if (worksheet) {
                switch(typeId) {
                    case '1':
                        console.log("Type 1 resolved " + typeId);
                        resolve(xlsx2xml_SR01(worksheet, clientId, typeId, subdivisionId, dueDate, remarks));
                        return;
                    case '2':
                        console.log("Type 2 resolved");
                        resolve(xlsx2xml_SR02(worksheet, clientId, typeId, subdivisionId, dueDate, remarks));
                        return;
                    default:
                        reject("Недопустимый заявки на обслуживание");
                        return;
                }
            } else {
                reject(`Лист 1 в файле '${fileName}' не найден`);
            }
        })
        .catch(error => reject(`XLSX Error: ${error}`));
    });
}
