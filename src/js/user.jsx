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
            <article className="user">
                <div className="avatar-wrapper">
                    <img src = {user.avatar} alt="user-avatar"/>
                </div>
                <h2 className="user-name">{user.userName}</h2>
                <span className="user-login">{user.userLogin}</span>
                <p className="user-bio">{user.bio}</p>
                <span className="user-location">{user.location}</span>
                <span className="user-email">{user.email}</span>
                <span className="user-position">{user.company}</span>
            </article>
        </section>
    }
}

export default User;