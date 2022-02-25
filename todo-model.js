import mongoose from "mongoose";
const Schema = mongoose.Schema;

let Todo = new Schema({

    todo_description: {
        type: String
    },
    todo_responsible: {
        type: String
    },
    todo_priority: {
        type: String
    },
    todo_completed: {
        type: Boolean
    }
});

export default mongoose.model('Todo', Todo);