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
            user: "",
            arrayOfRepos: []
        }
    }

    fetchData = () => {

      //  fetch user data
      fetch("https://api.github.com/users/" + this.state.userName).then(resp => {
        resp.json().then( userData => {

                // create object with user data
                const user = {
                    userName: userData.name === null ? "data not provided" : userData.name,
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
                     sortedRepos.push(repo);
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
            <form action="">
                <label>Name</label>
                <input type="text" name="name" value={this.state.userName} onChange={(e) => this.handleInputChange(e)}/>
            </form>
            <button onClick = {() => this.fetchData()} disabled= {this.state.buttonState}>fetch data</button>
            {this.handleUserDataRender()}
            {this.handleUserReposRender()}
        </div>
    }
}

document.addEventListener("DOMContentLoaded", () => {
    ReactDOM.render(
        <App/>,
        document.getElementById("root")
    )
});