import './ItemRow.css';
import { Square, CheckSquare } from 'phosphor-react';

import React from 'react'
import { useDataLayerValue } from '../global-state/DataLayer';

function ItemRow({ item, task, checklist, list}) {
    const [{state}, dispatch] = useDataLayerValue();
    const toggleDone = () => {
        const itemToToggle = {
            item: item,
            taskId: task.id,
            checklistId: checklist.id,
            listId: list.id
        }

        dispatch({
            type: "TOGGLE_CHECKLIST_ITEM",
            itemToToggle: itemToToggle
        })
    }
    
    return (
        <div className="item-row">
            {!item.done ? <Square size={16} className="check-square" onClick={toggleDone}/> : <CheckSquare size={16} className="check-square" onClick={toggleDone}/>}
            <p className={item.done ? "item-text done" : "item-text"}>{item.textContent}</p>
        </div>
    )
}

export default ItemRow

