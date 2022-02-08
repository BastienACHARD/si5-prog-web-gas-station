const extract = require('extract-zip');

async function unzip(filePath : string){
    try {
        await extract(filePath, { dir: `${__dirname}/zip_file` })
      } catch (err) {
        console.log(err);
      }
}

export {unzip}