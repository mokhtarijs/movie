
const { Client } = require('pg');
const base64_encode = require('../util/base64_encode');
const getBody = require('../util/getBody');


module.exports=function Search(req, res) {

    const client = new Client({
      user: 'postgres',
      host: 'localhost',
      database: 'prospect',
      password: '12281693',
      port: 5432
    });
    client.connect();
  
  
    getBody(req)
      .then(body => {
        console.log(body);
        if (body == null) {
          res.statusCode = 400;
          res.write("err input type");
          res.end();
        } else {
          if (body.minviewers >= 0) {
            var query = `SELECT * FROM film.movies WHERE viewers >= ('` + body.minviewers + `') `;
            if (body.partname != "") { query = query + ` AND filmtitle LIKE ('%` + body.partname + `%') ` }
            if (body.downyear != "") { query = query + ` AND year >= ('` + body.downyear + `') ` }
            if (body.upyear != "") { query = query + ` AND year <= ('` + body.upyear + `') ` }
            if (body.downrate != "") { query = query + ` AND rate >= ('` + body.downrate + `') ` }
            if (body.uprate != "") { query = query + ` AND rate <= ('` + body.uprate + `') ` }
            query = query + ` ORDER BY rate DESC `
            console.log("aaaaaaaaaaaaaaaaaaaaaaaaa", query)
            client.query(query)
              .then(res1 => {
  
  
                console.log("oooooooooooooooooooooooooooooooooooooooo", res1.rows.length);
                var arr = [];
                for (let index = 0; index < res1.rows.length; index++) {
                  console.log("oooooooooooooooooooooooooooooooooooooooo", res1.rows[index]);
  
                  arr[index] = {
                    filmtitle: res1.rows[index].filmtitle,
                    year: res1.rows[index].year,
                    rate: res1.rows[index].rate,
                    id: res1.rows[index].id,
                    base64: base64_encode('photo/' + res1.rows[index].img)
                  }
                }
  
  
  
  
  
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.write(JSON.stringify(arr));
                res.end();
  
  
              })
              .catch(err => {
                console.error(err);
              })
              .finally(() => {
                client.end();
              });
  
  
  
  
          } else {
            res.statusCode = 400;
            res.write("err input type");
            res.end();
          }
        }
      })
  }
