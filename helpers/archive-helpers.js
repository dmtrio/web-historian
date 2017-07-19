var fs = require('fs');
var path = require('path');
var _ = require('underscore');

/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

exports.paths = {
  siteAssets: path.join(__dirname, '../web/public'),
  archivedSites: path.join(__dirname, '../archives/sites'),
  list: path.join(__dirname, '../archives/sites.txt')
};

// Used for stubbing paths for tests, do not modify
exports.initialize = function(pathsObj) {
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

exports.readListOfUrls = function(callback) {
  //Use fs to read the file
  fs.readFile(this.paths.list, (err, data) => {
    if (err) {
      throw err;
    }
    var body = '';
    body += data;
    var urlLists = body.split('\n');

    callback(urlLists);   
  });
  //Use the callback to return each line of the file to be item in the array
};

exports.isUrlInList = function(url, callback) {
  
  fs.readFile(this.paths.list, (err, data) => {
    if (err) {
      throw err;
    }
    var body = '';
    body += data;
    var urlLists = body.split('\n');

    for (var i = 0; i < urlLists.length; i++) {
      callback(urlLists[i] === url);
    }
  });
  
};

exports.addUrlToList = function(url, callback) {
  fs.readFile(this.paths.list, (err, data) => {
    if (err) {
      throw err;
    }
    var body = '';
    body += data;
    var urlLists = body.split('\n');
    urlLists.push(callback(url));
       
  });
  
};

exports.isUrlArchived = function(url, callback) {
};

exports.downloadUrls = function(urls) {
};
