import React from "react";

class Repositories extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    handleRepositoriesRender = () => {
      return this.props.repos.map((repo, index) => {
        return <li key = {index}>
            <h2> Name: {repo.name}</h2>
            <p>Description: {repo.description}</p>
        </li>
      })
    };

    render () {
        return <section>
            <ul>
                {this.handleRepositoriesRender()}
            </ul>
        </section>
    }
}

export default Repositories;