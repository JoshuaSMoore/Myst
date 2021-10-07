import mongoose from 'mongoose'
const Schema = mongoose.Schema

export const FollowSchema = new Schema(
  {
    followerId: { type: Schema.Types.ObjectId, required: true },
    followingId: { type: Schema.Types.ObjectId, required: true }
  },
  { timestamps: true, toJSON: { virtuals: true } }
)

FollowSchema.virtual('follower', {
  localField: 'followerId',
  foreignField: '_id',
  justOne: true,
  ref: 'Account'
})

FollowSchema.virtual('following', {
  localField: 'followingId',
  foreignField: '_id',
  justOne: true,
  ref: 'Account'
})
