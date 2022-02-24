const X2JS = require('x2js');
var iconv = require('iconv-lite');
import { readFileSync } from 'fs';

async function xmlToJson(filePath: string){
    const input = readFileSync(filePath, {encoding: "binary"});
    const xmlContent = iconv.decode(input, "ISO-8859-1")
    const x2js = new X2JS();
    const jsonContent = x2js.xml2js(xmlContent);
    return JSON.stringify(jsonContent);
}

export { xmlToJson };