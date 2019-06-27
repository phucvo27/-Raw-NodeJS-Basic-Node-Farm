const http = require('http');
const fs = require('fs');
const url = require('url');
const helpers = require('./utils/helpers')
const { renderHtml } = require('./utils/renderTemplate');

const getCSS = function(res, name){
    helpers.read('public', name, function(err, data){
        if(!err){
            res.writeHead(200, {
                'Content-Type': 'text/css'
            })
            res.end(data);
        }else{
            res.writeHead(400)
            res.end("File not found \n ")
        }
    })
}

// run only once
const json = fs.readFileSync('./data/data.json');

// run for every request
const server = http.createServer((req, res)=>{
    const parsedUrl = url.parse(req.url, true);
    const pathname = parsedUrl.pathname;
    const queryObject = parsedUrl.query;
    const jsonData = JSON.parse(json);
    
    if(pathname === '/' || pathname === '/overview'){
        renderHtml(true, jsonData ,function(statusCode, type, data){
            type = type ? type : '';
            statusCode = statusCode ? statusCode : 200;
            data = data ? data : {};
            res.writeHead(statusCode, {
                'Content-Type': type
            })
            res.end(data)
        })
    }else if( pathname === '/product'){
        renderHtml(false, jsonData[queryObject.id] ,function(statusCode, type, data){
            type = type ? type : '';
            statusCode = statusCode ? statusCode : 200;
            data = data ? data : {};
            res.writeHead(statusCode, {
                'Content-Type': type
            })
            res.end(data)
        })

    }else if(pathname.startsWith('/css')){
        getCSS(res, pathname);
        return;

    }else {
        res.statusCode = 404;
        res.end('<h1>Page not found</h1>')
    }
})


server.listen(8000, 'localhost', ()=>{
    console.log(`Server is starting at 8000..`)
})