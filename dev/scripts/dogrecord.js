import React from 'react';

class Dog extends React.Component {
    constructor() {
        super();
        this.state ={
            name: '',
            breed: '',
            existingDogs : []
        }
        this.handleChange = this.handleChange.bind(this);
        this.createDog = this.createDog.bind(this);
    }

    handleChange(e){
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    createDog(e) {
        e.preventDefault();
        const dog = {
            dogName: this.state.name,
            dogBreed: this.state.breed
        }

        const dbref = firebase.database().ref('/dogs');
	    dbref.push(dog);

        this.setState({
            name: '',
            breed: ''
        });
    }


    render() {
        return (
            <div>
                <form onSubmit={(event) => this.createDog(event)}>
                    <input type="text" value = {this.state.name} placeholder="Dog Name" onChange={this.handleChange} id="name"/>
                    <input type="text" value = {this.state.breed} placeholder="Dog Breed" onChange={this.handleChange} id="breed"/>
                    <button>Create Dog Record</button>
                </form>
                {this.state.existingDogs.map((existingDog, i) => {
                    // console.log(existingDog.dogName);
                    return (
                        <p key={existingDog.key}>{existingDog.dogName}
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

export default Dog;