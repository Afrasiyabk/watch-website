import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        minlength: 8,
        required: true,
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user',
    },
}, { timestamps: true });

userSchema.index({
  fullName: "text",
  email: "text"
}, {
  weights: {
    fullName: 5,
    email: 2
  }
});

const User = mongoose.model('User', userSchema);

export default User;