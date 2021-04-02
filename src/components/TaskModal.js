import React, { useState } from 'react';
import './TaskModal.css';
import { useDataLayerValue } from '../global-state/DataLayer';
import ModalComment from './ModalComment';
import { ListBullets, TextAlignLeft, Users, ClipboardText, Calendar, Share, Trash, Tag } from 'phosphor-react';
import moment from 'moment';
import Checklists from './Checklists';
import Rodal from 'rodal';
import 'rodal/lib/rodal.css';

const checklistModalStyles = {
    background: "#ECECEC",
    height: "67px"
}

function TaskModal({ task, list }) {
    const [commentTitle, setCommentTitle] = useState("");
    const [{state}, dispatch] = useDataLayerValue();
    const [checklistModalOpen, setChecklistModalOpen] = useState(false);
    const [checklistTitle, setChecklistTitle] = useState("");

    const closeChecklistModal = () => {
        setChecklistModalOpen(false);
    }

    const openChecklistModal = () => {
        setChecklistModalOpen(true);
    }
    const comments = task.comments;

    const onTypingComment = (e) => {
        setCommentTitle(e.target.value)
    }

    const addComment = () => {
        const date = new Date();
        const postDate = moment().format('MMMM Do YYYY, h:mm a');

        console.log();
        const comment = {
            comment: commentTitle,
            taskId: task.id,
            listId: list.id,
            date: postDate
        }

        dispatch({
            type: "ADD_COMMENT",
            comment: comment
        })

        setCommentTitle("");
    }

    const onTypingChecklistTitle = (e) => {
        setChecklistTitle(e.target.value);
    }

    const addChecklist = () => {
        const checklist = {
            title: checklistTitle,
            items: [],
            taskId: task.id,
            listId: list.id,
        }

        dispatch({
            type: "ADD_CHECKLIST",
            checklist: checklist
        })

        setChecklistTitle('');
        closeChecklistModal();
    }

    return (
        <>
            <div className="task-modal-container">
                <div className="task-modal-content">
                    <div className="task-modal-title-container">
                        <h3 className="task-modal-title">{task.title}</h3>
                        <i><p className="task-modal-subtitle">in list {list.title}</p></i>
                    </div>
                    <div className="task-modal-description-container">
                        <div className="description-icon">
                            <TextAlignLeft size={28} />
                        </div>
                        <div className="description-content">
                            <h4>Description</h4>
                            <input className="task-modal-description" placeholder="Add a more detailed description..." type="text"></input>
                        </div>                    
                    </div>
                    {task.checklists.length > 0 && <Checklists task={task} list={list}/>}
                    <div className="task-modal-comments-container">
                        <div className="comments-icon">
                            <ListBullets size={28} />
                        </div>
                        <div className="comments-content">
                            <h4>Comments</h4>
                            <div className="comment-box">
                                <input className="task-modal-comments" placeholder="Write a comment..." type="text" value={commentTitle} onChange={onTypingComment}></input>
                                <button className="comment-button" onClick={addComment}>Save</button>
                            </div>
                            <div className="comments-list">
                                {comments.map(comment => {
                                    return <ModalComment comment={comment} />
                                })}
                            </div>
                        </div>                    
                    </div>
                    
                </div>
                <div className="task-modal-actions">
                    <div className="action">
                        <Users size={16} />
                        <p className="task-modal-action">Members</p>
                    </div>
                    <div className="action" onClick={openChecklistModal}>
                        <ClipboardText size={16} />
                        <p className="task-modal-action">Checklist</p>
                    </div>
                    <div className="action">
                        <Calendar size={16} /> 
                        <p className="task-modal-action">Due date</p>
                    </div>
                    <div className="action">
                        <Share size={16} />
                        <p className="task-modal-action">Share</p>
                    </div>
                    <div className="action">
                        <Trash size={16} />
                        <p className="task-modal-action">Archive</p>
                    </div>
                    <div className="action">
                        <Tag size={16} />
                        <p className="task-modal-action">Label</p>
                    </div>
                </div>
            </div>

            <Rodal visible={checklistModalOpen} onClose={closeChecklistModal} animation="zoom" className="checklist-modal" customStyles={checklistModalStyles}>
                <div className="comment-box checklist-title-modal">
                    <input className="task-modal-comments" placeholder="Checklist title..." type="text" value={checklistTitle} onChange={onTypingChecklistTitle}></input>
                    <button className="comment-button" onClick={addChecklist}>Add</button>
                </div>
            </Rodal>
        </>
    )
}

export default TaskModal
