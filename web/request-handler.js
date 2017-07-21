var path = require('path');
var archive = require('../helpers/archive-helpers');
var urlParser = require('url');
var fsFileSystem = require('fs');
// require more modules/folders here!

var headers = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept',
  'access-control-max-age': 10 // Seconds.
};
  
exports.handleRequest = function (req, res) {
  
   
  var parsedUrl = urlParser.parse(req.url);
  var files = fsFileSystem.readdirSync('./');
  
  console.log(parsedUrl);
  
  //filter through
  
  
  if (req.method === 'GET' && parsedUrl.pathname === '/') {
    fsFileSystem.readFile('./web/public/index.html', (err, data) => {
      if (err) {
        throw err;
      }
      
      var localHeader = headers;
      
      localHeader['Content-Type'] = 'text/html; charset=utf-8';
      var body = '';
      body += data;
  
      res.writeHead(200, localHeader);     
      
      res.end(body);
    });    
  } else if (req.method === 'GET' && parsedUrl.pathname === '/styles.css') {
    fsFileSystem.readFile('./web/public/styles.css', (err, data) => {
      if (err) {
        throw err;
      }
      
      var localHeader = headers;
      
      localHeader['Content-Type'] = 'text/css';
      var body = '';
      body += data;

      res.writeHead(200, localHeader);      
      
      res.end(body);
    });
  } else if (req.method === 'POST') {
    body = '';
    req.on('data', (chunk) => {
      body += chunk;
    }).on('end', () => {
      console.log('boooooody', body);
      
      archive.addUrlToList(body.slice(4), () => {
      // at this point, `body` has the entire request body stored in it as a string
        var localHeader = headers;
        
        localHeader['Content-Type'] = 'text/html; charset=utf-8';
      
        res.writeHead(302, localHeader);
        res.end();    
      });
    
    //we check the pathname    
      
    }); 

  } else { 
    archive.isUrlArchived(parsedUrl.pathname.slice(1), function(bool) {
      if (bool) {
        if (req.method === 'GET') {
          fsFileSystem.readFile(archive.paths.archivedSites + '/' + parsedUrl.pathname.slice(1), (err, data) => {
            if (err) {
              throw err;
            }
            var localHeader = headers;
            
            localHeader['Content-Type'] = 'text/html';
            var body = '';
            body += data;

            res.writeHead(200, localHeader);      
            
            res.end(body);
          });
        }
      } else {
        var localHeader = headers;
        
        localHeader['Content-Type'] = 'text/html';

        res.writeHead(404, localHeader);      
        
        res.end();  
      }
    });
  }


};


