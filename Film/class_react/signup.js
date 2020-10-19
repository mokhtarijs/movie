


export class Car extends React.Component {

    signup() {
      class Signup extends React.Component {
        getData(user, pass, phone) {
          var xhr = new XMLHttpRequest();

          xhr.onload = () => {
            if (xhr.status >= 200 && xhr.status < 300) {
              const response = JSON.parse(xhr.responseText);
              console.log(response);

              // for (let index = 0; index < response.length; index++) {
              //   var a = document.createElement("A");
              //   var div = document.createElement("DIV");
              //   var img = document.createElement("IMG");
              //   document.getElementById('div').appendChild(div);
              //   div.appendChild(a);
              //   img.src="data:image/jpg;base64,"+response[index].base64;
              //   img.style.cssText = "width:100%;height=100%;"
              //   div.style.cssText = "font-size:15px;border:2px solid black;color:black;width:200px;min-height=300px;float:left;float:right;margin:20px"
              //   a.innerHTML = "filmtitle:" + response[index].filmtitle + "<br>year:" + response[index].year + "<br>rate:" + response[index].rate;
              //   a.appendChild(img);
              //   a.href = "http://localhost:81/Movies?id=" + response[index].id;
              //   document.getElementById('div').appendChild(document.createElement("BR"));
              // }

            }
          };

          xhr.open("POST", "http://localhost:81/Signup", true);
          xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
          xhr.send(JSON.stringify({ user: user, pass: pass, phone: phone }));
        }

        render() {
          return (

            <div id="div">
              {this.getData(document.getElementById('user').value,
                document.getElementById('pass').value,
                document.getElementById('phone').value)}
            </div>
          );
        }
      }

      ReactDOM.render(<Signup />, document.getElementById('root2'));
    }

    render() {
      return (
        <div>
          <h1>Enter Your Doc</h1>
          <div>
            <input type="text" id="user" placeholder="Plase Enter User"></input><br></br>
            <input type="text" id="pass" placeholder="Plase Enter Pass"></input><br></br>
            <input type="text" id="phone" placeholder="Plase Enter Phone"></input><br></br>
            <button class="btn" onClick={this.signup}>send</button>
          </div>
        </div>
      );
    }
  }