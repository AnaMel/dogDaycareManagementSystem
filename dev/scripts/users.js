import React from 'react';

class Users extends React.Component {
    constructor() {
        super();
        this.state = {
            createEmail: '',
            createPassword: ''            
        }
        this.createUser = this.createUser.bind(this);
        
    }

    handleChange(e){
        this.setState({
            [e.target.id]: e.target.value
        })
    }
 
    createUser(event) {
        event.preventDefault();
  
        const email = this.state.createEmail;
        const password = this.state.createPassword;
    
        firebase.auth().createUserWithEmailAndPassword(email, password)
          .catch((error) => console.log(error.code, error.message));
  
        this.setState ({
          createEmail: '',
          createPassword: ''
        });
      }

    render () {
        return (
           <div className="create-user">
              <form onSubmit={(event) => this.createUser(event)}>
                <input type="text" value = {this.state.createEmail} placeholder="Please enter your e-mail address" onChange={(event) => this.handleChange(event, "createEmail")} />
                <input type="password" value = {this.state.createPassword} placeholder="Please enter your desired password" onChange={(event) => this.handleChange(event, "createPassword")} />
                <button>Create User</button>
              </form>
            </div>
        )
    }
}

export default Users;