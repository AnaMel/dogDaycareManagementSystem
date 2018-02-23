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

        const appointment = {
            dog: this.state.selectedDog,
            date: this.state.selectedDate.toString()
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
            <div>
                <form onSubmit={(event) => this.scheduleAppointment(event)}>
                    <Calender handleDayClick={this.handleDayClick} selectedDate= {this.state.selectedDate}/>
                    {this.state.existingDogs.map((existingDog, i) => {
                        return (
                            <p key={existingDog.key}>{existingDog.dogName}
                                <input type="checkbox" value="" onChange={() => this.selectDog(existingDog.dogName)}/>
                            </p>
                        )
                    })}
                    <button>Schedule</button>
                </form>
            </div>
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