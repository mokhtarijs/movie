
const q = require('q');
const { Client } = require('pg');
const decode_base64 = require('../util/decode_base64');
const getBody = require('../util/getBody');


module.exports = function Movise(req, res) {


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
      // console.log(body);
      if (body == null) {
        res.statusCode = 400;
        console.log("err input type");
        res.write("err input type");
        res.end();
      } else {
        console.log("i am Herrrrrrrrrrrrrrrrrrrrrrrr8");
        if (body.filmtitle && body.year && body.user && body.pass) {
          console.log("i am Herrrrrrrrrrrrrrrrrrrrrrrr9");
          var base = body.img;
          var base64 = base.split(',');
          var name = body.filmtitle + '.JPG';
          console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"+name)
          decode_base64(base64[1], name);




          const querySELECT = `SELECT username FROM film.users WHERE username IN ('` + body.user + `') AND password IN ('` + body.pass + `')`;
          console.log("i am Herrrrrrrrrrrrrrrrrrrrrrrr");
          client.query(querySELECT)
            .then(res4 => {

              if (res4.rows[0] != undefined) {

                const querymovies = `SELECT filmtitle FROM film.movies WHERE filmtitle IN ('` + body.filmtitle + `') AND year IN ('` + body.year + `')`;
                console.log("i am Herrrrrrrrrrrrrrrrrrrrrrrr1");
                client.query(querymovies)
                  .then(res1 => {
                    if (res1.rows[0] == undefined) {
                      const queryid = `SELECT nextval('movies_id_seq')`;
                      client.query(queryid)
                        .then(resid => {
                          id = resid.rows[0].nextval;
                          let today = new Date();

                          const queryINSERT = `INSERT INTO film.movies (filmtitle, year, id, rate, viewers, recommendedby, dateregister,img) VALUES ('` + body.filmtitle + `', '` + body.year + `', '` + id + `', '` + 0 + `', '` + 0 + `', '` + body.user + `', '` + today + `', '` + name + `')`;
                          console.log("i am Herrrrrrrrrrrrrrrrrrrrrrrr2");
                          q.allSettled([
                            client.query(queryINSERT)
                          ]).then(function (results) {
                            console.log("sabt shod");
                            res.write("sabt shod");
                            res.end();
                          });

                        })
                        .catch(err => {
                          console.log("i am Herrrrrrrrrrrrrrrrrrrrrrrr3");
                          console.error(err);
                        })
                    } else {
                      console.log("i am Herrrrrrrrrrrrrrrrrrrrrrrr4");
                      console.log("movie tekrare");
                      res.write("movie tekrare");
                      res.end();
                    }
                  })
                  .catch(err => {
                    console.error(err);
                  })

              } else {
                console.log("i am Herrrrrrrrrrrrrrrrrrrrrrrr5");
                console.log("user ea pass eshtbah");
                res.write("user ea pass eshtbah");
                res.end();
              }
            })
            .catch(err => {
              console.log("i am Herrrrrrrrrrrrrrrrrrrrrrrr6");
              console.error(err);
            })

        } else {
          console.log("i am Herrrrrrrrrrrrrrrrrrrrrrrr7");
          console.log("err input type");
          res.statusCode = 400;
          res.write("err input type");
          res.end();
        }
      }
    })
}