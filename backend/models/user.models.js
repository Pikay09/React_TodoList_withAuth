import mongoose, {Schema} from "mongoose";

const userSchema = new Schema({
    firstName:  { type: String, required: false},
    lastName:  { type: String, required: false},
    username: { type: String, required: true, unique: true},
    password:  { type: String, required: true},
    todos: [
        { type: mongoose.Types.ObjectId, ref: 'Todo'}
    ]
},{timestamps: true})

export const User = mongoose.model('User', userSchema)

