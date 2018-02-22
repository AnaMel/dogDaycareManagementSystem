import React from 'react';

class Schedule extends React.Component {
    constructor() {
        super();
        this.state ={
            existingDogs : []
        }
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e){
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    render() {
        return (
            <div>
                {this.state.existingDogs.map((existingDog, i) => {
                    return (
                        <p key={existingDog.key}>{existingDog.dogName}
                            <input type="checkbox"/>
                        </p>
                    )
                })}
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