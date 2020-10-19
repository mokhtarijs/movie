


export class Carrr extends React.Component {
    movise() {
      class Movise extends React.Component {
        getData(filmtitle, year, user, pass, img) {

          const reader = new FileReader();

          reader.onload = function (event) {

            var base = event.target.result 
            console.log(base)

          var xhr = new XMLHttpRequest();


          xhr.open("POST", "http://localhost:81/Movise", true);
          xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
          xhr.send(JSON.stringify({ filmtitle: filmtitle, year: year, user: user, pass: pass, img: base }));
        };
        reader.readAsDataURL(img[0]);
        }

        render() {


          return (

            <div id="div">
              {this.getData(document.getElementById('filmtitle').value,
                document.getElementById('year').value,
                document.getElementById('user').value,
                document.getElementById('pass').value,
                document.getElementById('photo').files)}
            </div>
          );
        }
      }

      ReactDOM.render(<Movise />, document.getElementById('root2'));
    }


    render() {
      return (
        <div>
          <h1>Enter Your Doc</h1>
          <div>
            <input type="text" id="filmtitle" placeholder="Plase Enter Filmtitle"></input><br></br>
            <input type="text" id="year" placeholder="Plase Enter Year"></input><br></br>
            <input type="text" id="user" placeholder="Plase Enter User"></input><br></br>
            <input type="text" id="pass" placeholder="Plase Enter Pass"></input><br></br>
            <input type="file" id="photo"></input><br></br>
            <button onClick={this.movise}>send</button>
          </div>
        </div>
      );
    }
  }