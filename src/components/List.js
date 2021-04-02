import React, { useState, useEffect } from 'react';
import { useDataLayerValue } from '../global-state/DataLayer';
import TaskCreator from '../utilities/TaskCreator';
import Task from './Task';
import './List.css';
import { Droppable } from 'react-beautiful-dnd';

function List({ list }) {
    const [state, dispatch] = useDataLayerValue();
    const [taskTitle, setTaskTitle] = useState('');

    const onTypeTaskHandler = (e) => {
        return setTaskTitle(e.target.value)
    }

    const addTaskToListEnter = (e) => {
        if(taskTitle === '') return;

        if (e.key === 'Enter') {
            dispatch({
                type: "ADD_TASK",
                payload: { title: taskTitle, listId: list.id }
            })
    
            setTaskTitle('')
          }
    }

    const addTaskToListClick = () => {
        if(taskTitle === '') return;

        dispatch({
            type: "ADD_TASK",
            payload: { title: taskTitle, listId: list.id }
        })

        setTaskTitle('')
    }

    return (
        <Droppable droppableId={String(list.id)}>
            {(provided) => 
                <div {...provided.droppableProps} className="list-container" ref={provided.innerRef}>
                <p className="list-title">{list.title}</p>
                <div className="list-tasks">
                    {list.tasks.map((task, index) => {
                        return <Task task={task} index={index} key={task.id} list={list}/>
                    })}
                </div>
                {provided.placeholder}
                <div className="add-task">
                    <input type="text" placeholder="Add a task" onChange={onTypeTaskHandler} value={taskTitle} onKeyPress={addTaskToListEnter}/>
                    <button onClick={addTaskToListClick}>Add</button>
                </div>
            </div>
            }
        </Droppable>
    )
}

export default List
