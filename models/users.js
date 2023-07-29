const { Schema, model } = require('mongoose');
const bcrpt = require('bcrypt');


const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },

    posts: [{
        type: Schema.Types.ObjectId,
        ref: 'Post'
    }]
});

userSchema.pre('save', async function(next){
    const salt = await bcrpt.genSalt(12);
    this.password = await bcrpt.hash(this.password, salt);

    next();
})

userSchema.methods.isCorrectPassword = async function(password) {
    return await bcrpt.compare(password, this.password);
}


userSchema.statics.isEmailFound = async function(email) {
    const user = await this.findOne({ email });
    return user != null;
}


const User = model('User', userSchema);

module.exports = User;