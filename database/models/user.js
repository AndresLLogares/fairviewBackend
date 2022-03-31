import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const userSchema = new Schema({
    address: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: false
    },
    picture: {
        type: String,
        required: false
    },
    name: {
        type: String,
        required: false
    },
    favorites: {
        type: Array,
        required: false
    },
    idFavorite: {
        type: Array,
        required: false
    },
    transactions: {
        type: Array,
        required: false
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const user = mongoose.model("users", userSchema);

export default user;