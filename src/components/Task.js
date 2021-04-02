import React, { useState } from 'react';
import './Task.css';
import { Draggable } from 'react-beautiful-dnd';
import Rodal from 'rodal';
import 'rodal/lib/rodal.css';
import TaskModal from './TaskModal';
import { ChatsCircle, ListBullets } from 'phosphor-react';

const rodalStyles = {
    background: "#ECECEC",
    width: "730px",
    height: "90%",
    overflowY: "scroll"
}

function Task({ task, index, list }) {
    const [modalOpen, setModalOpen] = useState(false);

    const closeModal = () => {
        setModalOpen(false);
    }

    const openModal = () => {
        setModalOpen(true);
    }

    return (
        <>
            <Draggable draggableId={String(task.id)} index={index}>
                {(provided) => 
                    <div className="task" ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} onClick={openModal}>
                        <p>{task.title}</p>
                        <div className="card-icons-row">
                            {task.comments.length > 0 && <div className="preview-comments-container"><ChatsCircle size={16} /><p className="preview-comments">{task.comments.length}</p></div>}
                            {task.checklists.length > 0 && <div className="preview-comments-container"><ListBullets size={16} /><p className="preview-comments">{task.checklists.length}</p></div>}
                        </div>
                    </div>
                }
            </Draggable>

            <Rodal visible={modalOpen} onClose={closeModal} animation="slideUp" customStyles={rodalStyles}>
                <TaskModal task={task} list={list}/>
            </Rodal>
        </>
    )
}

export default Task
