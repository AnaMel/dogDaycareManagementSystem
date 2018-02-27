import React from 'react';
import Todo from './todo';

// Create  variable to store current date
let date = new Date();
let month = date.getUTCMonth() + 1; 
let day = date.getUTCDate();
let year = date.getUTCFullYear();
// Create a string of current month/day/year
let currentdate = month + "/" + day + "/" + year;
let tomorrow = month + "/" + (day + 1) + "/" + year;

// Create Activities component to control list of daily activities for each dog
class Activities extends React.Component {
    constructor() {
        super();
        this.state = {
            date: currentdate,
            tomorrow: tomorrow,
            appointments: [],
            activities: [],  
        }
    this.toggleCompleted = this.toggleCompleted.bind(this);
    }

    handleChange(e){
        this.setState({
            [e.target.id]: e.target.value
        })
    }

// Create a function to track whether dauly activities have been completed
    toggleCompleted(todoKey,appointmentKey) {
// Create variables to store time when activity has been completed
        let time = new Date();
        let hours = time.getHours();
        let minutes = time.getMinutes();
        let timestamp = `${hours.toString()}:${minutes.toString()}`;
        const todoToUpdate = this.state.activities.find((activity) => {
           return activity.key === todoKey;
        });
// Update completed activityand save it to firebase
        const dbref = firebase.database().ref(`/appointment/${appointmentKey}/activities/${todoToUpdate.index}`);
        todoToUpdate.completed = todoToUpdate.completed === true ? false : true;
        todoToUpdate.timestamp = timestamp;
        delete todoToUpdate.key;
        delete todoToUpdate.index;
        dbref.set(todoToUpdate);
    }

    render () {
        return (
            <section className="dailyActivities">
                <h2>{`Today is ${this.state.date}`}</h2>
                <div className="container">
                    {this.state.appointments.map((appointment, i) => {
                        if (appointment.date === this.state.date) {
                            return (
                                <div key={appointment.key}>
                                    <h3>{appointment.dog}</h3>
                                    {appointment.activities.map((activity, j) => {
                                        return (
                                            <Todo data={activity} key={activity.key} appointmentkey={appointment.key} toggleCompleted={this.toggleCompleted}/>
                                        )
                                    })}
                                </div>
                            )
                        }
                    })}
                </div>
                <h2>{`These dogs  will be coming in tomorrow (${this.state.tomorrow})`}</h2>
                {this.state.appointments.map((appointment, i) => {
                    if (appointment.date === this.state.tomorrow) {
                        return (
                            <p key={appointment.key}>{appointment.dog}</p>
                        )
                    }
                })} 
            </section>
        )
    }

    componentDidMount() {
        const dbref = firebase.database().ref('/appointment');
        dbref.on('value', (snapshot) => {
            const dataAboutAppointments = snapshot.val();
            const stateOfDB = [];
            const activitiesDB = [];
            for (let key in dataAboutAppointments) {
                dataAboutAppointments[key].key = key;
                    for (let j in dataAboutAppointments[key].activities) {
                        dataAboutAppointments[key].activities[j].key= key + j;
                        dataAboutAppointments[key].activities[j].index = j;
                        activitiesDB.push(dataAboutAppointments[key].activities[j]);
                    }
                stateOfDB.push(dataAboutAppointments[key]);
            }
            this.setState({
                appointments: stateOfDB,
                activities: activitiesDB
            });
        });
    }
}

export default Activities;