


export class Carr extends React.Component {

    search() {
      class Search extends React.Component {
        getData(partname, downyear, upyear, downrate, uprate, minviewers) {
          var xhr = new XMLHttpRequest();

          xhr.onload = () => {
            if (xhr.status >= 200 && xhr.status < 300) {
              const response = JSON.parse(xhr.responseText);
              console.log(response);

              for (let index = 0; index < response.length; index++) {
                var a = document.createElement("A");
                var div = document.createElement("DIV");
                var img = document.createElement("IMG");
                document.getElementById('div').appendChild(div);
                div.appendChild(a);
                img.src = "data:image/jpg;base64," + response[index].base64;
                img.style.cssText = "width:100%;height=100%;"
                div.style.cssText = "font-size:15px;border:2px solid black;color:black;width:200px;min-height=300px;float:left;float:right;margin:20px"
                a.innerHTML = "filmtitle:" + response[index].filmtitle + "<br>year:" + response[index].year + "<br>rate:" + response[index].rate;
                a.appendChild(img);
                a.href = "http://localhost:81/Movies?id=" + response[index].id;
                // document.getElementById('div').appendChild(document.createElement("BR"));
              }

            }
          };

          xhr.open("POST", "http://localhost:81/Movies", true);
          xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
          xhr.send(JSON.stringify({ partname: partname, downyear: downyear, upyear: upyear, downrate: downrate, uprate: uprate, minviewers: minviewers }));
        }

        render() {
          return (

            <div id="div">
              {this.getData(document.getElementById('partname').value,
                document.getElementById('downyear').value,
                document.getElementById('upyear').value,
                document.getElementById('downrate').value,
                document.getElementById('uprate').value,
                document.getElementById('minviewers').value)}
            </div>
          );
        }
      }

      ReactDOM.render(<Search />, document.getElementById('root2'));
    }
    render() {

      return (

        <div>
          <h1>Enter Your Doc</h1>
          <div >
            <input type="text" id="partname" placeholder="Plase Enter Partname"></input><br></br>
            <input type="text" id="downyear" placeholder="Plase Enter Downyear"></input><br></br>
            <input type="text" id="upyear" placeholder="Plase Enter Upyear"></input><br></br>
            <input type="text" id="downrate" placeholder="Plase Enter Downrate"></input><br></br>
            <input type="text" id="uprate" placeholder="Plase Enter Uprate"></input><br></br>
            <input type="text" id="minviewers" placeholder="Plase Enter MinViewers" value={0} ></input><br></br>
            <button class="btn" onClick={this.search}>send</button>
          </div>
          <br></br>
        </div>
      );
    }
  }