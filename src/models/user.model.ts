import {Document, Schema, model} from 'mongoose';
import bcrypt from 'bcryptjs';

export interface IUser extends Document {
    name: string;
    role: string;
    username: string;
    email: string;
    password: string;
    encrypPassword(password: string): Promise<string>;
    validatePassword(password: string): Promise<boolean>;
};

const userSchema: Schema<IUser> = new Schema({
    name: {type: String, required:true},
    email: {type: String, trim:true, required:true},
    password: {type: String, required: true},
    role: {type: String, default: 'ROLE_USER'},
    created:{type:Date, default: Date.now}
});

userSchema.methods.encrypPassword = async (password: string): Promise<string> => {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
};

userSchema.methods.validatePassword = async function (password: string): Promise<boolean> {
    return await bcrypt.compare(password, this.password);
};

export default model<IUser>('User', userSchema);