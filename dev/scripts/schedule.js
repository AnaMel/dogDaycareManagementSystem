import React from 'react';
import Calender from './daypicker.js';

class Schedule extends React.Component {
    constructor() {
        super();
        this.state ={
            selectedDog: '',
            selectedDate: undefined,
            existingDogs : []
        }
        this.handleChange = this.handleChange.bind(this);
        this.scheduleAppointment = this.scheduleAppointment.bind(this);
        this.handleDayClick = this.handleDayClick.bind(this);
        this.selectDog = this.selectDog.bind(this);
    }

    handleChange(e){
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    scheduleAppointment(e) {
        e.preventDefault();

        let month = this.state.selectedDate.getUTCMonth() + 1; 
        let day = this.state.selectedDate.getUTCDate();
        let year = this.state.selectedDate.getUTCFullYear();
        let converteddate = month + "/" + day + "/" + year;


        const appointment = {
            dog: this.state.selectedDog,
            date: converteddate,
            activities: [
                {
                    todo: 'poop',
                    completed: false
                },
                {
                    todo: 'food',
                    completed: false
                }
            ]
        }
        console.log(appointment);

        const dbref = firebase.database().ref('/appointment');
	    dbref.push(appointment);

        this.setState({
            selectedDog: '',
            selectedDate: undefined
        });
    }
    handleDayClick(day) {
        this.setState({ selectedDate: day });
      }

    selectDog(selection) {
        this.setState({
            selectedDog: selection
        });
    }

    render() {
        return (
            <section className="schedule">
                <form onSubmit={(event) => this.scheduleAppointment(event)}>
                    <Calender handleDayClick={this.handleDayClick} selectedDate= {this.state.selectedDate}/>
                    {this.state.existingDogs.map((existingDog, i) => {
                        return (
                            <div className="listOfDogs">
                                <p key={existingDog.key}>{existingDog.dogName}
                                    <input type="checkbox" value="" onChange={() => this.selectDog(existingDog.dogName)}/>
                                </p>
                            </div>
                        )
                    })}
                    <button>Schedule</button>
                </form>
            </section>
        )
    }

    componentDidMount() {
        const dbref = firebase.database().ref('/dogs');
        dbref.on('value', (snapshot) => {
            const dataAboutDogs = snapshot.val();
            const stateOfDB = [];
            for (let key in dataAboutDogs) {
                dataAboutDogs[key].key = key;
                stateOfDB.push(dataAboutDogs[key]);
            }
            this.setState({
                existingDogs: stateOfDB
            });
        });
    }
}

export default Schedule;