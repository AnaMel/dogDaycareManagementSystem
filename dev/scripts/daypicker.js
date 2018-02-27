import React from 'react';
import DayPicker from 'react-day-picker';

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
        </div>
      );
    }
  }