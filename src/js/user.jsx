import React from "react";

class User extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render () {
        const user = this.props.user;
        return <section className= "main-user-data">
            <article>
                <img src = {user.avatar} alt="user-avatar"/>
                <div className = "user-data">
                    <h2>{user.userName}</h2>
                    <span>{user.email}</span>
                    <span>{user.company}</span>
                    <p>{user.bio}</p>
                    <span>{user.location}</span>
                </div>
            </article>
        </section>
    }
}

export default User;