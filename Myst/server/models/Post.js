import mongoose from 'mongoose'
const Schema = mongoose.Schema

export const PostSchema = new Schema(
  {
    body: { type: String, required: true },
    title: { type: String, required: false },
    img: { type: String },
    video: { type: String },
    creatorId: { type: Schema.Types.ObjectId, required: true },
    mediaUrl: { type: String }
  },
  { timestamps: true, toJSON: { virtuals: true } }
)

PostSchema.virtual('creator', {
  localField: 'creatorId',
  foreignField: '_id',
  justOne: true,
  ref: 'Account'
})
