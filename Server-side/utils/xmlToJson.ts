const X2JS = require('x2js');
import * as fs from 'fs';

async function xmlToJson(filePath: string){
    const xmlContent = fs.readFileSync(filePath).toString();
    const x2js = new X2JS();
    const jsonContent = x2js.xml2js(xmlContent);
    return JSON.stringify(jsonContent);
}

export { xmlToJson };