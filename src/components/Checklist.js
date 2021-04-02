import React, { useState } from 'react';
import { useDataLayerValue } from '../global-state/DataLayer';
import './Checklist.css';
import ItemRow from './ItemRow';

function Checklist({ task, list, checklist }) {
    const [{state}, dispatch] = useDataLayerValue();
    const [addingItem, setAddingItem] = useState(false);
    const [itemTitle, setItemTitle] = useState('');

    const toggleVisibility = () => {
        if(!addingItem) {
            setAddingItem(true)
        } else {
            setAddingItem(false)
        }
    }

    const handleItemTyping = (e) => {
        setItemTitle(e.target.value);
    }

    const addChecklistItem = () => {
        const payload = {
            textContent: itemTitle,
            listId: list.id,
            taskId: task.id,
            checklistId: checklist.id
        }

        dispatch({
            type: "ADD_CHECKLIST_ITEM",
            checklistItem: payload
        });

        setItemTitle('')
        setAddingItem(false);
    }

    return (
        <div className="checklist-container">
            <h4>{checklist.title}</h4>
            <div className="checklist-items">
                <ol>
                    {checklist.items.map(item => {
                        return <ItemRow item={item} checklist={checklist} task={task} list={list}/>
                    })}
                </ol>
            </div>
            <button className={addingItem ? "checklist-item-button hidden" : "checklist-item-button"} onClick={toggleVisibility}>Add item</button>
            <div className={addingItem ? "input-container" : "input-container hidden"}>
                <input className="input-field" placeholder="Add item..." type="text" value={itemTitle} onChange={handleItemTyping}></input>
                <button className="input-button" onClick={addChecklistItem}>Add</button>
            </div>
        </div>
    )
}

export default Checklist
