import React from 'react';
import './Checklists.css';
import { CheckSquare } from 'phosphor-react';
import Checklist from './Checklist';

function Checklists({ task, list }) {
    return (
        <div className="checklists-container">
            <div className="checklists-icon">
                <CheckSquare size={28} />
            </div>
            <div className="checklists-content">
                {task.checklists.map(checklist => {
                    return <Checklist task={task} list={list} checklist={checklist}/>
                })}
            </div>
        </div>
    )
}

export default Checklists
