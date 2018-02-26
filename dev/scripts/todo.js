import React from 'react';

const Todo = (props) => {
    return (
        <div className={props.data.completed === true ? 'completed':null}>
            <p>{props.data.todo} - {props.data.timestamp}
                <input type="checkbox" 
                    onChange={() => props.toggleCompleted
                    (props.data.key, props.appointmentkey)}
                    checked={props.data.completed}  
                />
            </p>	
        </div>
    );
};

export default Todo;