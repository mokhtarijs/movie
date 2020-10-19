
const { Client } = require('pg');
const getBody = require('../util/getBody');


module.exports=function Signup(req, res) {


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
          if (body.user && body.pass && body.phone) {
            let today = new Date();
  
            const query = `SELECT username FROM film.users WHERE username IN ('` + body.user + `') `
            client.query(query)
              .then(res1 => {
  
                if (res1.rows[0] == undefined) {
  
                  const query1 = ` INSERT INTO film.users (username, password, phone, date) VALUES ('` + body.user + `', '` + body.pass + `', '` + body.phone + `', '` + today + `') `;
                  client.query(query1)
                    .then(res3 => {
  
                      res.write("sabt shod");
                      res.end();
  
                    })
                    .catch(err => {
                      console.error(err);
                    })
  
  
                } else {
                  res.write("user takrare");
                  res.end();
                }
  
              })
              .catch(err => {
                console.error(err);
              })
  
  
  
  
          } else {
            res.statusCode = 400;
            res.write("err input type");
            res.end();
          }
        }
      })
  }
  