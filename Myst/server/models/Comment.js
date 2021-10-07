import mongoose from 'mongoose'
const Schema = mongoose.Schema

export const CommentSchema = new Schema({
  body: { type: String, required: true, maxlength: 500, minlength: 3 },
  postId: { type: Schema.Types.ObjectId, ref: 'Post', required: true },
  creatorId: { type: Schema.Types.ObjectId, ref: 'Account', required: true }
}, { timestamps: true, toJSON: { virtuals: true } }
)
CommentSchema.virtual('creator', {
  localField: 'creatorId',
  foreignField: '_id',
  ref: 'Account',
  justOne: true
})

CommentSchema.virtual('post', {
  localField: 'postId',
  foreignField: '_id',
  ref: 'Post',
  justOne: true
})
