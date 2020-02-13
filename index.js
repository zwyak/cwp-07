const http = require('http');
const fs = require('fs');
let articles = require('./articles.json');
const ar = require('./articles.js');
const com = require('./comments.js');
const Logger = require('node-json-logger');
const logger = new Logger();
let logs = [];

const hostname = '127.0.0.1';
const port = 3000;

const handlers = {
  '/api/articles/readall' : ar.arReadAll,
  '/api/articles/read' : ar.arRead,
  '/api/articles/create': ar.arCreate,
  '/api/articles/update': ar.arUpdate,
  '/api/articles/delete': ar.arDelete,
  '/api/comments/create': com.comCreate,
  '/api/comments/delete': com.comDelete,
  '/api/logs': readLogs,
  '/css/site.css': css,
  '/': home,
  '/index.html': home,
  '/jquery.js': jquery,
  '/app.js': app
};

const server = http.createServer((req, res) => {
  parseBodyJson(req, (err, payload) => {
    const handler = getHandler(req.url);

    handler(req, res, payload, (err, result) => {
      if (err) {
        res.statusCode = err.code;
        res.setHeader('Content-Type', 'application/json');
        res.end( JSON.stringify(err) );

        logger.info(req.url);
        logs.push({datetime: new Date(Date.now()).toString(), url: req.url, status: res.statusCode});

        return;
      }

      res.statusCode = 200;
      if(req.url == '/' || req.url == '/index.html'){
        res.setHeader('Content-Type', 'text/html');
        res.end( result );
      }else if (req.url == '/app.js' || req.url == '/jquery.js'){
        res.setHeader('Content-Type', 'text/javascript');
        res.end( result );
      }else if (req.url == '/css/site.css'){
        res.setHeader('Content-Type', 'text/css');
        res.end( result );
      }
      else{
        res.setHeader('Content-Type', 'text/javascript');
        res.end( JSON.stringify(result) );
      }

      logger.info(req.url);
      logs.push({datetime: new Date(Date.now()).toString(), url: req.url, status: res.statusCode});
    });
  });
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

function getHandler(url) {
  return handlers[url] || notFound;
}

function notFound(req, res, payload, cb) {
  cb({ code: 404, message: 'Not found'});
}

function parseBodyJson(req, cb) {
  let body = [];

  req.on('data', function(chunk) {
    body.push(chunk);
  }).on('end', function() {
    body = Buffer.concat(body).toString();
    console.log(body);
    let params;
    if (body){
      params = JSON.parse(body);
    }else{
      params = [];
    }

    cb(null, params);
  });
}

function readLogs(req, res, payload, cb) {
  cb(null, logs);
}

function home(req, res, payload, cb) {
  fs.readFile('./public/index.html', (err, data) => {
    if (err) throw err;
    cb(null, data);
  });
}

function app(req, res, payload, cb) {
  fs.readFile('./public/index.js', (err, data) => {
    if (err) throw err;
    cb(null, data);
  });
}

function jquery(req, res, payload, cb) {
  fs.readFile('./node_modules/jquery/dist/jquery.min.js', (err, data) => {
    if (err) throw err;
    cb(null, data);
  });
}

function css(req, res, payload, cb) {
  fs.readFile('./public/site.css', (err, data) => {
    if (err) throw err;
    cb(null, data);
  });
}
