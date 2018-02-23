import React from 'react';
import DayPicker from 'react-day-picker';
// import 'react-day-picker/lib/style.css';

export default class BasicConcepts extends React.Component {
    constructor(props) {
      super(props);
    }
   
    render() {
      return (
        <div>
          <DayPicker
            onDayClick={this.props.handleDayClick}
            selectedDays={this.props.selectedDate}
          />
          {/* {this.state.selectedDay ? (
            <p>You clicked {this.state.selectedDay.toLocaleDateString()}</p>
          ) : (
            <p>Please select a day.</p>
          )} */}
        </div>
      );
    }
  }