const http = require('http');
const url = require('url');
const Home = require('./APIs/Home');
const Movise = require('./APIs/Movise');
const Rate = require('./APIs/Rate');
const Search = require('./APIs/Search');
const Signup = require('./APIs/Signup');


http.createServer((req, res) => {  //ساخت سرور
  console.log(req.method)
  console.log(req.url)
  var httpHandlers = {    //مدیریت توابع
    Home: {
      GET: Home // صفحه اصلی برنامه (برای دور زدن ارور کارسپالسی)
    },
    Movies: {
      POST: Search, //تابع جستجوی پیشرفته
    },
    Signup: {
      POST: Signup, //تابع ثبتنام
    },
    Movise: {
      POST: Movise, //تابع افرودن فیلم
    },
    Rate: {
      POST: Rate, //تابع افزودن ریت
    }
  };

  const queryObject = url.parse(req.url, true);
  pathname = queryObject.pathname.split('/');
  if (httpHandlers[pathname[1]] && httpHandlers[pathname[1]][req.method]) {

    httpHandlers[pathname[1]][req.method](req, res)   //فراخوانی تابع مورد نظر

  } else {
    res.statusCode = 400;
    res.write("err from url or method");
    res.end();
  }

}).listen(81, () => console.log("server start")); // پورت ۸۱

