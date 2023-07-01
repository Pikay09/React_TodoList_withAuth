import mongoose, {Schema} from "mongoose";

const todoSchema = new Schema({
    title:  { type: String, required: true, unique: true},
    isCompleted:  { type: Boolean, default: false},
    description: { type: String, required: true},
    user: { type: mongoose.Types.ObjectId, ref: 'User'}
},{timestamps: true})

export const Todo = mongoose.model('Todo', todoSchema)

