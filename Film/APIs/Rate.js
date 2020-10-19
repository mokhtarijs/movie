
const { Client } = require('pg');
const getBody = require('../util/getBody');


module.exports=function Rate(req, res) {


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
        if (body == null) {
          res.statusCode = 400;
          res.write("err input type");
          res.end();
        } else {
          if (body.user && body.pass && body.movieid && body.rate) {
  
            let today = new Date();
  
            client.connect();
            const querySELECT = `SELECT username FROM film.users WHERE username IN ('` + body.user + `') AND password IN ('` + body.pass + `')`;
            client.query(querySELECT)
              .then(res5 => {
                if (res5.rows[0] != undefined) {
                  const querySELECT2 = `SELECT username FROM film.rate WHERE username IN ('` + body.user + `') AND movieid IN ('` + body.movieid + `')`;
                  client.query(querySELECT2)
                    .then(res1 => {
                      if (res1.rows[0] == undefined) {
                        const queryINSERT = `INSERT INTO film.rate (username, movieid, rate, date) VALUES ('` + body.user + `', '` + body.movieid + `', '` + body.rate + `', '` + today + `')`;
                        client.query(queryINSERT)
                          .then(res2 => {
                            const querySELECT3 = `SELECT rate,viewers FROM film.movies WHERE id IN ('` + body.movieid + `')`;
                            client.query(querySELECT3)
                              .then(res3 => {
                                var tab = (res3.rows[0].viewers + 1);
                                var newrate = (((res3.rows[0].rate * res3.rows[0].viewers) + (body.rate * 1)) / tab);
                                const queryUPDATE = `UPDATE film.movies SET rate = '` + newrate + `', viewers = '` + tab + `' WHERE id IN ('` + body.movieid + `')`;
                                client.query(queryUPDATE)
                                  .then(res4 => {
                                    res.write("save shod");
                                    res.end();
                                  })
                                  .catch(err => {
                                    console.error(err);
                                  })
                              })
                              .catch(err => {
                                console.error(err);
                              })
                          })
                          .catch(err => {
                            console.error(err);
                          })
                      } else {
                        res.write("your rated");
                        res.end();
                      }
                    })
  
                    .catch(err => {
                      console.error(err);
                      client.end();
                    })
  
                } else {
                  res.write("user or pass invalid");
                  res.end();
                }
              })
              .catch(err => {
                console.error(err);
                client.end();
              })
  
          } else {
            res.statusCode = 400;
            res.write("err input type");
            res.end();
          }
        }
      })
  }