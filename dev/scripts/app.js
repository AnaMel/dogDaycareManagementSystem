import React from 'react';
import ReactDOM from 'react-dom';
import Dog from './dogrecord';
import Schedule from './schedule';
import { 
  BrowserRouter as Router, 
  Route, Link } from 'react-router-dom';

  // Initialize Firebase
  const config = {
    apiKey: "AIzaSyBzBPRW8F4yPrxSu7LihkELvV7z2wPhIlk",
    authDomain: "dogdaycare-b1b33.firebaseapp.com",
    databaseURL: "https://dogdaycare-b1b33.firebaseio.com",
    projectId: "dogdaycare-b1b33",
    storageBucket: "dogdaycare-b1b33.appspot.com",
    messagingSenderId: "848463356858"
  };
  firebase.initializeApp(config);

  class App extends React.Component {
    constructor() {
      super();
      this.state = {
        createEmail: '',
        createPassword: '',
        loginEmail: '',
        loginPassword: ''
      }
      this.handleChange = this.handleChange.bind(this);
      this.createUser = this.createUser.bind(this);
      this.signIn = this.signIn.bind(this);
    }
  
    handleChange(event, field) {
      const newState = Object.assign({}, this.state);
      newState[field] = event.target.value;
      this.setState(newState);
    }
  

    // Custom function to create a user record and push it to firebase
    createUser(event) {
      event.preventDefault();

      const email = this.state.createEmail;
      const password = this.state.createPassword;
  
      firebase.auth().createUserWithEmailAndPassword(email, password)
        .catch((error) => console.log(error.code, error.message));


      // const user = {
      //   email: this.state.createEmail,
      //   password: this.state.createPassword
      // }

      // const dbref = firebase.database().ref('/users');
      // dbref.push(user);

      this.setState ({
        createEmail: '',
        createPassword: ''
      });
    }

    signIn(event) {
      event.preventDefault();
      const email = this.state.loginEmail;
      const password = this.state.loginPassword;
  
      firebase.auth().signInWithEmailAndPassword(email, password)
        .then((success) => {
          console.log(`Logged in as ${success.email}`);
        }), (error) => {
          console.log(error);
      }
    }
  
    renderForms() {
      if(this.state.loggedIn === false) {
        return (
          <div>
            <div className="create-user">
              <form onSubmit={(event) => this.createUser(event)}>
                <input type="text" value = {this.state.createEmail} placeholder="Please enter your e-mail address" onChange={(event) => this.handleChange(event, "createEmail")} />
                <input type="password" value = {this.state.createPassword} placeholder="Please enter your desired password" onChange={(event) => this.handleChange(event, "createPassword")} />
                <button>Create User</button>
              </form>
            </div>
            <div className="sign-in">
            <form onSubmit={(event) => this.signIn(event)}>
              <input type="text" placeholder="Please enter your e-mail address" onChange={(event) => this.handleChange(event, "loginEmail")} />
              <input type="password" placeholder="Please enter your desired password" onChange={(event) => this.handleChange(event, "loginPassword")} />
              <button>Login</button>
            </form>
          </div>
        </div>
        )
      }
      else {return null}
    }

    renderLogin() {
        if(this.state.loggedIn === true) {
          return(
            <Router>
              <div>
                <Link to="/doggies">Doggies</Link>
                <Link to="/schedule">Schedule</Link>
                <Route path="/doggies" component={Dog}/>
                <Route path="/schedule" component={Schedule}/>
              </div>
            </Router>
          )
        }
        else {return null}
    }

    render() {
      return (
          <div>
              {this.renderForms()}
              {this.renderLogin()}
            </div>
      )
    }

    componentDidMount() {
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            this.setState({loggedIn: true});
          } else {
            this.setState({loggedIn: false});
          }
      })
    }

  } 

  ReactDOM.render(<App />, document.getElementById('app'))