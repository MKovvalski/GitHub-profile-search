import React from "react";

class Repositories extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    handleRepositoriesRender = () => {
      return this.props.repos.map((repo, index) => {
          let colorToDisplay = "";
          switch (repo.language) {
              case "JavaScript":
                  colorToDisplay = "yellow-circle";
                  break;
              case "html":
                  colorToDisplay = "red-circle";
                  break;
              case "CSS":
                  colorToDisplay = "violet-circle";
                  break;
              default:
                  colorToDisplay = "grey-circle";
          }
        return <li className="list-element-repository" key = {index}>
            <h3 className="title-repository">{repo.name}</h3>
            <p className="description-repository">Description: {repo.description}</p>
            <div className="language-repository">
                <div className={colorToDisplay}>
                    <span className="visuallyhidden">language circle</span>
                </div>
                {repo.language}
            </div>
        </li>
      })
    };

    render () {
        return <section className="main-repositories">
            <h2 className="title-repositories">Repositories</h2>
            <ul className="list-repositories">
                {this.handleRepositoriesRender()}
            </ul>
        </section>
    }
}

export default Repositories;