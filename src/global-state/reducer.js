export const initialState = [
    {
        title: 'TO DO',
        id: 1,
        tasks: [{
            title: "Read the comment of this card for some info about this Trello clone",
            id: 1,
            done: false,
            comments: [{
                textContent: "You can add comments to a specific Trello card by typing some text and clicking the green 'Save' button above. Additionally you can add checklists with unique items per card as well as drag and drop the cards between lists. The other features I didn't find the time to develop yet. Nothing is stored, this is purely a client-side project.",
                commentId: 1,
                listId: 1,
                taskId: 1, 
                date: "May 6th: 10:00 AM"
            }],
            checklists: [],
            description: null
        }]
    },
    {
        title: 'DOING',
        id: 2,
        tasks: []
    },
    {
        title: 'DONE',
        id: 3,
        tasks: []
    }
];

let listId = 4;
let taskId = 2;
let commentId = 2;
let checklistId = 1;
let itemId = 1;

const reducer = (state, action) => {
    switch(action.type) {
        case "ADD_LIST":{
            const newList = {
                title: action.title,
                id: listId,
                tasks: []
            }
            listId++;
            return [...state, newList];
        }
        case "ADD_TASK": {
            const newTask = {
                title: action.payload.title,
                id: taskId,
                done: false,
                comments: [],
                checklists: [],
                description: null
            }
            taskId++;

            const newState = state.map(list => {
                if(list.id === action.payload.listId) {
                    return {
                        ...list,
                        tasks: [...list.tasks, newTask]
                    };
                } else {
                    return list
                }
            });

            return newState;
        }
        case "DRAG_HAPPENED": {
            const {sourceId,
            destinationId,
            sourceIndex,
            destinationIndex,
            draggableId
            } = action.dragItems;

            const newState = [...state];

            // in the same list
            if(sourceId === destinationId) {
                const list = newState.find(list => destinationId == list.id);
                const task = list.tasks.splice(sourceIndex, 1);
                list.tasks.splice(destinationIndex, 0, ...task);
            }

            // in different lists
            if(sourceId !== destinationId) {
                const sourceList = newState.find(list => sourceId == list.id);
                const destinationList = newState.find(list => destinationId == list.id);
                const task = sourceList.tasks.splice(sourceIndex, 1);
                destinationList.tasks.splice(destinationIndex, 0, ...task);
            }

            return newState;
        }

        case "ADD_COMMENT": {
            const newState = [...state];
            const {comment, listId, taskId, date} = action.comment;
            console.log(date);
            const commentToAdd = {
                textContent: comment,
                commentId,
                listId,
                taskId, 
                date
            }
            commentId++;

            for(let i = 0; i < newState.length; i++) {
                if(newState[i].id == listId) {
                    for(let j = 0; j < newState[i].tasks.length; j++) {
                        if(newState[i].tasks[j].id == taskId) {
                            newState[i].tasks[j].comments.unshift(commentToAdd)
                        }
                    }
                }
            }

            return newState
        }
        
        case "ADD_CHECKLIST": {
            const newState = [...state];
            const {listId, taskId} = action.checklist;
            const checklistToAdd = action.checklist;
            checklistToAdd.id = checklistId;
            console.log(checklistToAdd);

            for(let i = 0; i < newState.length; i++) {
                if(newState[i].id == listId) {
                    for(let j = 0; j < newState[i].tasks.length; j++) {
                        if(newState[i].tasks[j].id == taskId) {
                            console.log(newState[i]);
                            newState[i].tasks[j].checklists.unshift(checklistToAdd)
                        }
                    }
                }
            }
            checklistId++;

            return newState;
        }

        case "ADD_CHECKLIST_ITEM": {
            const newState = [...state];
            const {taskId, listId, checklistId, textContent} = action.checklistItem;
            let itemToAdd = {
                textContent,
                done: false,
                taskId,
                listId,
                checklistId
            }

            for(let i = 0; i < newState.length; i++) {
                if(newState[i].id == listId) {
                    for(let j = 0; j < newState[i].tasks.length; j++) {
                        if(newState[i].tasks[j].id == taskId) {
                            for(let k = 0; k < newState[i].tasks[j].checklists.length; k++) {
                                if(newState[i].tasks[j].checklists[k].id == checklistId) {
                                    console.log(checklistId, newState[i].tasks[j].checklists[k].id);
                                    newState[i].tasks[j].checklists[k].items.push(itemToAdd)
                                }
                            }
                        }
                    }
                }
            }

            return newState;
        }

        case "TOGGLE_CHECKLIST_ITEM": {
            const newState = [...state];

            const {taskId, listId, checklistId, item} = action.itemToToggle;
            console.log(item)
        }

        default: return state;
    }
}

export default reducer;