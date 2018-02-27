import React from 'react';

class Users extends React.Component {
    constructor() {
        super();
        this.state = {
            createEmail: '',
            createPassword: ''            
        }
        this.handleChange = this.handleChange.bind(this);
        this.createUser = this.createUser.bind(this);
        
    }

    handleChange(event, field) {
        const newState = Object.assign({}, this.state);
        newState[field] = event.target.value;
        this.setState(newState);
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
          <section className="create-user">
            <form className="appForm" onSubmit={(event) => this.createUser(event)}>
              <input type="text" value = {this.state.createEmail} placeholder="Please enter e-mail address" onChange={(event) => this.handleChange(event, "createEmail")} />
              <input type="password" value = {this.state.createPassword} placeholder="Please enter password" onChange={(event) => this.handleChange(event, "createPassword")} />
              <button>Create User</button>
            </form>
          </section>
        )
    }
}

export default Users;