import React from 'react';
import './ModalComment.css';

function ModalComment({ comment }) {
    return (
        <div className="comment-container">
            <p className="comment-date"><strong>USERNAME: </strong>Added: {comment.date}</p>
            <p className="comment-textbox">{comment.textContent}</p>
        </div>
    )
}

export default ModalComment
