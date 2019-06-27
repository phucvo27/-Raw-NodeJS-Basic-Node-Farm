const fs = require('fs');
const path = require('path');

const helpers = {};

const rootPath = path.join(__dirname, '..');

helpers.read = function(dir, name, cb){
    fs.readFile(`${rootPath}/${dir}/${name}`, 'utf-8', (err, data)=>{
        if(!err){
            cb(null, data);
        }else{
            cb('Could not found the file', null);
        }
    })
}

// static -> only run once , and size so small <=> we can read Sync
helpers.card = fs.readFileSync(`${rootPath}/public/components/card.html`, 'utf-8');
helpers.tempOveriew = fs.readFileSync(`${rootPath}/public/overview.html`, 'utf-8');
helpers.tempProduct = fs.readFileSync(`${rootPath}/public/product.html`, 'utf-8');

module.exports = helpers;