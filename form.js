var http = require('http');
var fs = require('fs');
var url = require('url');
var querystring = require('querystring');

http.createServer(function(req, res) {
    if (req.url == "/") {
        res.writeHead(200, { 'content-type': 'text/html' });
        fs.createReadStream('form.html', 'utf-8').pipe(res);

    }
    if (req.method == 'GET') {
        var q = url.parse(req.url, true).query;
        console.log(q)
    } else if (req.method == 'POST') {
        var data = "";
        req.on('data', function(chunk) {
            data += chunk;
        });
        req.on('end', function(chunk) {
            // var formdata = querystring.parse(data);
            var formdata = data;
            console.log(formdata)
            fs.writeFile('file.txt', formdata, function(err) {
                if (err) throw err
            })
        })
    }
}).listen(3000);