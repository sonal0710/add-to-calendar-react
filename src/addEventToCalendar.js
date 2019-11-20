import React from 'react';
import PropTypes from 'prop-types';

const format_date = function(date) {
    var day = date.getDate();
    var monthIndex = date.getMonth();
    var year = date.getFullYear();

    var hour = date.getHours();
    var minutes = date.getMinutes();
  
    let formatted_date;
    if(hour === 0 && minutes === 0) {
        formatted_date = ("" + year) + zero_pad2(monthIndex + 1) + zero_pad2(day);
    } else {
        formatted_date = ("" + year) + zero_pad2(monthIndex + 1) + zero_pad2(day) + "T" + zero_pad2(hour) + zero_pad2(minutes) + "00Z";
    }
    return formatted_date;
}

const zero_pad2 = function(num) {
    if(num < 10) return "0" + num;
    return num;
}

class addEventToCalendar extends React.Component {

    addToCalendarHandler(eventData){
        let start_date = eventData.eventStartDate;
        let end_date = eventData.eventEndDate ;
        let error_count = 0;
        if(eventData.eventTitle === '' || eventData.eventTitle === undefined){
            error_count++;
            console.error('Failed prop type: Invalid prop `eventTitle` is marked as required, but its value is `'+eventData.eventTitle+'`');
        }
        if(start_date === ''){
            error_count++;
            console.error('Failed prop type: Invalid prop `eventStartDate` of type `String` supplied, expected instance of `Date`.');
        }
        if(end_date === ''){
            error_count++;
            console.error('Failed prop type: Invalid prop `eventEndDate` of type `String` supplied, expected instance of `Date`.');
        }
        if(error_count === 0) {
            let dates = format_date(start_date) + "/" + format_date(end_date);
            const url = 'http://www.google.com/calendar/event?action=TEMPLATE&text='+eventData.eventTitle+'&dates='+dates+'&details='+eventData.eventDetails+'&location='+eventData.eventLocation;
            window.open(url, '_blank');
        }
    }

    render() {
        return (
            <div>
                <h4>ADD EVENT</h4>
                <button name="add-to-calendar" onClick={(e) => this.addToCalendarHandler(this.props)}>Add Event</button>
            </div>
        );
    }
}

addEventToCalendar.propTypes = {
    eventDetails: PropTypes.string,
    eventTitle: PropTypes.string.isRequired,
    eventEndDate: PropTypes.instanceOf(Date).isRequired,
    eventLocation: PropTypes.string,
    eventStartDate: PropTypes.instanceOf(Date).isRequired,
};

addEventToCalendar.defaultProps = {
    eventDetails: '',
    // eventTitle: '',
    eventEndDate: '',
    eventLocation: '',
    eventStartDate: ''      
};

export default addEventToCalendar;