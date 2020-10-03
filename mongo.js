var http = require('http');
var fs = require('fs');
var url = require('url');
var querystring = require('querystring');
const { Db } = require('mongodb');
var mongoclient = require('mongodb').mongoclient;
var url = ""

http.createServer(function(req, res) {
    if (req.url == "/form") {
        res.writeHead(200, { 'content-type': 'text/html' });
        fs.createReadStream('form.html', 'utf-8').pipe(res);
    }

        if (req.method == 'POST') {
            var data = "";
            req.on('data', function(chunk) {
                data += chunk;
            });
            req.on('end', function(chunk) {
               
                mongoclient.connect(url,function(err,db){
                    if(err) throw err;
                    var formdata = querystring.parse(data);
                    db.collection('student').insertOne(formdata,function(err,res){
                        if (err) throw err;
                        db.close()
                    })
                })
            })
        }
    }).listen(3000);