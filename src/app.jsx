import React from "react";
import ReactDOM from 'react-dom';
import Sass from "./scss/main.scss";

//imports
import User from "./js/user.jsx";
import Repositories from "./js/repositories.jsx";

const promise = new Promise((resolve, reject) => {});

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: "",
            buttonState: true,
            user: {
                avatar:
                    "https://avatars0.githubusercontent.com/u/33545558?v=4",
                bio:
                    "Junior Front-End Dev from Warsaw looking for his first job in IT. ",
                company:
                    "data not provided",
                email:
                    "data not provided",
                location:
                    "Warsaw, Poland ",
                userLogin:
                    "MateuszKowalskiCL",
                userName:
                    "Mateusz"
            },
            arrayOfRepos: [
                {
                    description: "Project build in React with support of Redux. Game recreates turn based Pokemon Battles with precise damage calculations.",
                    name: "PokemonGame-simplified",
                    language: "javascript"
                }
            ]
        }
    }

    fetchData = () => {

      //  fetch user data
      fetch("https://api.github.com/users/" + this.state.userName).then(resp => {
        resp.json().then( userData => {
                // create object with user data
                const user = {
                    userName: userData.name === null ? "" : userData.name,
                    userLogin: userData.login === null ? "" : userData.login,
                    avatar: userData.avatar_url === null ? "data not provided" : userData.avatar_url,
                    email: userData.email === null ? "data not provided" : userData.email,
                    company: userData.company === null ? "data not provided" : userData.company,
                    location: userData.location === null ? "data not provided" : userData.location,
                    bio: userData.bio === null ? "data not provided" : userData.bio,
                };

                // set user as state to display on website
                this.setState({
                    user: user
                });
            });
      });

      // fetch user repositories
      fetch("https://api.github.com/users/" + this.state.userName + "/repos").then(resp => {
          resp.json().then( repos => {

              // sort repos by their size
              repos.sort( (a, b) => {
                  return b.size - a.size
              });

              // empty array for biggest repos
              const sortedRepos = [];

              // push six first repos to array
              repos.map( (repo) => {
                 if (sortedRepos.length < 6) {
                     const repoToPush = {
                         name: repo.name,
                         description: repo.description,
                         language: repo.language
                     };

                     console.log(repoToPush);
                     sortedRepos.push(repoToPush);
                 }
              });

              // set sortedRepos ad state to display on website
              this.setState({
                  arrayOfRepos: sortedRepos
              });
          })
      })
    };

    handleButtonState = () => {
        if (this.state.userName !== "") {
            this.setState({
                buttonState: false
            })
        } else {
            this.setState({
                buttonState: true
            })
        }
    };

    handleInputChange = (event) => {
        let value = event.target.value;
            this.setState({
            userName: value
        },  () => {
                this.handleButtonState();
            })
    };

    handleUserDataRender = () => {
      if (this.state.user === "") {
          return null
      }  else {
          return <User user = {this.state.user}/>
      }
    };

    handleUserReposRender = () => {
        if (this.state.arrayOfRepos === []) {
            return null
        }  else {
            return <Repositories repos = {this.state.arrayOfRepos}/>
        }
    };

    render () {
        return <div className = "container">
            <label className = "">Name</label>
            <input placeholder="input user's name" type="text" name="name" value={this.state.userName} onChange={(e) => this.handleInputChange(e)}/>
            <button onClick = {() => this.fetchData()} disabled= {this.state.buttonState}>fetch data</button>
            <main className="main">
                {this.handleUserDataRender()}
                {this.handleUserReposRender()}
            </main>
        </div>
    }
}

document.addEventListener("DOMContentLoaded", () => {
    ReactDOM.render(
        <App/>,
        document.getElementById("root")
    )
});