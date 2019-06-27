const helpers = require('./helpers');

String.prototype.replaceAll = function(search, replace){
    const s = this;
    let res = s.replace(new RegExp(search, 'g'), replace);
    return res;
}

const renderHtml = (isList , data ,cb)=>{
    if(isList){
        const res = fullFillTemplate(isList, helpers.tempOveriew, data);
        cb(200, 'text/html', res)
    }else{
        const res = fullFillTemplate(isList, helpers.tempProduct, data);
        cb(200, 'text/html', res)
    }
}

function fullFillTemplate(isList, template , data){
    if(isList){
        let res = '';
        for(let i = 0; i < data.length; i++){
            res += helpers.card.replaceAll('{%PRODUCTNAME%}',data[i].productName)
                    .replaceAll('{%IMAGE%}',data[i].image)
                    .replaceAll('{%QUANTITY%}',data[i].quantity)
                    .replaceAll('{%PRICE%}',data[i].price)
                    .replaceAll('{%NOT_ORGANIC%}',data[i].organic ? '' : 'not-organic')
                    .replaceAll('{%ID%}',data[i].id);
        }
        return template.replace('{%PRODUCT_CARDS%}', res);
    }else{
        return template
            .replaceAll('{%PRODUCTNAME%}',data.productName)
            .replaceAll('{%IMAGE%}',data.image)
            .replaceAll('{%FROM%}',data.from)
            .replaceAll('{%NUTRIENTS%}',data.nutrients)
            .replaceAll('{%QUANTITY%}',data.quantity)
            .replaceAll('{%PRICE%}',data.price)
            .replaceAll('{%NOT_ORGANIC%}',data.organic ? '' : 'not-organic')
            .replaceAll('{%DESCRIPTION%}',data.description);
    }
}


module.exports = { renderHtml };