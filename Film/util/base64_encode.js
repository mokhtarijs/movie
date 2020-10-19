
var fs = require('fs');

module.exports=function base64_encode(file) {
  
  var bitmap = fs.readFileSync(file);            // read binary data
  return new Buffer(bitmap).toString('base64');  // convert binary data to base64 encoded string
  
}
