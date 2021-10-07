import mongoose from 'mongoose'
const Schema = mongoose.Schema

export const AccountSchema = new Schema(
  {
    subs: [{ type: String, unique: true }],
    email: { type: String, lowercase: true, unique: true },
    name: { type: String, required: true, maxlength: 20 },
    picture: { type: String },
    // NOTE If you wish to add additional properties do so here
    bio: { type: String, maxlength: 500 },
    coverImg: { type: String },
    profileClip: { type: String },
    twitch: { type: String },
    github: { type: String },
    steam: { type: String },
    xbox: { type: String },
    playstation: { type: String },
    nintendo: { type: String }
  },
  { timestamps: true, toJSON: { virtuals: true } }
)

export const ProfileSchema = new Schema(
  {
    name: { type: String, required: true },
    picture: { type: String }
    // NOTE if you want to make properties from the account public put them here
  },
  { timestamps: true, toJSON: { virtuals: true } }
)
