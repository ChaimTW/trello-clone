class TaskCreator {
    constructor(title, list) {
        this.title = title;
        this.list = list;
        this.comments = [];
        this.done = false;
        this.owners = [];
    }
}

export default TaskCreator