import React from 'react';

const Todo = (props) => {
    return (
        <div className={props.data.completed === true ? 'completed':null}>
            <p>{props.data.todo}
                <input type="checkbox" 
                    onChange={() => props.toggleCompleted
                    (props.data.key, props.appointmentkey)}
                    checked={props.data.completed ? 'checked' : null}  
                />
            </p>	
        </div>
    );
};

export default Todo;