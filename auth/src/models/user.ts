import { Schema, model, Model, HydratedDocument, Date, Types } from "mongoose";
import { Password } from "../services/password";
interface CreationAttrs {
  email: string;
  password: string;
}

interface UserModel extends Model<UserDoc> {
  build(attrs: CreationAttrs): HydratedDocument<UserDoc>;
}

interface UserDoc {
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema(
  {
    email: { type: String, required: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

userSchema.pre('save', async function() {
  if(this.isModified('password')){
    const hashedPass = await Password.toHash(this.password)
    // this.set('password',hashedPass)
    this.password = hashedPass
  }
})

userSchema.statics.build = (
  attrs: CreationAttrs
): HydratedDocument<UserDoc> => {
  return new User(attrs);
};

const User = model<UserDoc, UserModel>("User", userSchema);

// const us = User.build({email:'ee',password: 'sad'})

export { User };
