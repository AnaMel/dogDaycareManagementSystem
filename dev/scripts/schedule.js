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
                    todo: 'first break',
                    completed: false,
                    timestamp: ''
                },
                {
                    todo: 'second break',
                    completed: false,
                    timestamp: ''
                },
                {
                    todo: 'lunch',
                    completed: false,
                    timestamp: ''
                },
                {
                    todo: 'sleep',
                    completed: false,
                    timestamp: ''
                }
            ]
        }
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

    selectDog(e,selection) {
        if(e.target.checked === true){
            this.setState({
                selectedDog: selection
            });
            console.log(selection);
        }
        else {
            this.setState({
                selectedDog: ''
            });
        }
    }

    render() {
        return (
            <section className="schedule">
                <form className="appForm" onSubmit={(event) => this.scheduleAppointment(event)}>
                    <div>
                        <h2>Select a date</h2>
                        <Calender handleDayClick={this.handleDayClick} selectedDate= {this.state.selectedDate}/>
                    </div>
                    <div>
                        <h2>Select a dog</h2>
                        <div className="listOfDogs">
                            <ul>
                                {this.state.existingDogs.map((existingDog, i) => {
                                    return (
                                        <li key={existingDog.key}>{existingDog.dogName}
                                            <label className="myCheckbox">
                                                <input type="checkbox" onChange={(e) => {this.selectDog(e,existingDog.dogName)}}/>
                                                <span></span>
                                            </label>
                                        </li>                             
                                    )
                                })}
                            </ul>
                        </div>
                    </div>
                    <div>
                        <h2>Schedule visit</h2>
                        <button>Schedule</button>
                    </div>
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