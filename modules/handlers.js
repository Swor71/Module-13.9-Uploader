var fs = require('fs');
var formidable = require('formidable');
var colors = require('colors');

exports.welcome = function (request, response) {
    console.log('Starting welcome procedure'.blue);
    fs.readFile('./templates/start.html', function (error, html) {
        response.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
        response.write(html);
        response.end();
    });
}

exports.upload = function(request, response) {
    console.log('Starting upload procedure'.blue);
    var form = new formidable.IncomingForm();
    form.parse(request, function(error, fields, files) {
        fs.renameSync(files.upload.path, "test.png");
        fs.readFile('./templates/upload.html', function (error, html) {
            response.writeHead(200, { "Content-Type": "text/html; charset=utf-8"});
            response.write(html);
            response.write('<h1>Received image: </h1></br>');
            response.write('<div class="container"><img src="/show" /></div>');
            response.end();
        });
    })
}

exports.error = function(request, response) {
    console.log('Help, send help!'.red);
    response.write('404 :/');
    response.end();    
}

exports.show = function(request, response) {
    fs.readFile('test.png', 'binary', function(error, file) {
        response.writeHead(200, {"Content-Type": "image/png"});
        response.write(file, 'binary');
        response.end();
    })
}

exports.maincss = function(request, response) {
    fs.readFile('./templates/css/main.css', function(error, css) {
        response.writeHead(200, { "Content-Type": "text/css; charset=utf-8"});
        response.write(css);
        response.end();
    });    
}

exports.uploadcss = function (request, response) {
    fs.readFile('./templates/css/upload.css', function (error, css) {
        response.writeHead(200, { "Content-Type": "text/css; charset=utf-8" });
        response.write(css);
        response.end();
    });
}