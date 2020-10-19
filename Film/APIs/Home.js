
var fs = require('fs');

module.exports=function Home(req, res) { // تابع دریافت صفحه اصلی برنامه (برای دور زدن ارور کارسپالسی)

  fs.readFile('./react.html', function (err, html) { //دریافت صفحه اصلی
    if (err) {
      throw err;
    }

    res.writeHeader(200, { "Content-Type": "text/html" });
    res.write(html); //ارسال صفحه اصلی
    res.end();

  });
}