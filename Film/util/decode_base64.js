
var path = require('path');
var fs = require('fs');

module.exports=function decode_base64(base64str, filename) {
  var buf = Buffer.from(base64str, 'base64');    // read binary data

  fs.writeFile(path.join('photo', filename), buf, function (error) {    // ذخیره فایل در ادرس photo/filename
    if (error) {throw error;} else {
      console.log('File created from base64 string!');
      return true;
    }
  });

}

