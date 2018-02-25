import React from 'react';
import Todo from './todo';


let date = new Date();
let month = date.getUTCMonth() + 1; 
let day = date.getUTCDate();
let year = date.getUTCFullYear();

let currentdate = month + "/" + day + "/" + year;
let tomorrow = month + "/" + (day + 1) + "/" + year;



class Activities extends React.Component {
    constructor() {
        super();
        this.state = {
            date: currentdate,
            tomorrow: tomorrow,
            appointments: [],
            activities: []
        }
        // this.handleChange = this.handleChange().bind(this);
        this.toggleCompleted = this.toggleCompleted.bind(this);
        
    }

    handleChange(e){
        this.setState({
            [e.target.id]: e.target.value
        })
    }


    toggleCompleted(todoKey,appointmentKey) {

        const todoToUpdate = this.state.activities.find((activity) => {
           return activity.key === todoKey;
        });

        const dbref = firebase.database().ref(`/appointment/${appointmentKey}/activities/${todoKey}`);
        todoToUpdate.completed = todoToUpdate.completed === true ? false : true;
        delete todoToUpdate.key;
        dbref.set(todoToUpdate);
    }



    render () {
        return (
            <div>
                <p>{`Today is: ${this.state.date}`}</p>
                {this.state.appointments.map((appointment, i) => {
                    if (appointment.date === this.state.date) {
                        return (
                            <div key={appointment.key}>
                                <p>{appointment.date} - {appointment.dog}</p>
                                {appointment.activities.map((activity, j) => {
                                    return (
                                        <Todo data={activity} key={activity.key} appointmentkey={appointment.key} toggleCompleted={this.toggleCompleted}/>
                                    )
                                })}
                            </div>
                            )
                        }
                    })}

{/*DISPLAY TOMORROW's APPOINTMENTS*/}

                {/* {this.state.appointments.map((appointment, i) => {
                    if (appointment.date === this.state.tomorrow) {
                        return (
                            <p key={appointment.key}>{appointment.date} - {appointment.dog}</p>
                            )
                        }
                    })} */}
            </div>
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
                        // let uniquekey = key + j;
                        dataAboutAppointments[key].activities[j].key= j;
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