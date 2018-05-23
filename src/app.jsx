import React from "react";
import ReactDOM from 'react-dom';
import Sass from "./scss/main.scss";

const promise = new Promise((resolve, reject) => {});

class Test extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    fetchData = () => {
      fetch("https://api.github.com/users/MateuszKowalskiCL").then(resp => {
        resp.json().then( user => {
               console.log(user);
            })
      })
    };

    render () {
        return <div>
            <p>element jest stabilny</p>
            <button onClick = {() => this.fetchData()}>fetch data</button>
        </div>
    }
}

document.addEventListener("DOMContentLoaded", () => {
    ReactDOM.render(
        <Test/>,
        document.getElementById("root")
    )
});