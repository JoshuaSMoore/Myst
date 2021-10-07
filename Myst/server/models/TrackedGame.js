import mongoose from 'mongoose'
const Schema = mongoose.Schema

export const TrackedGameSchema = new Schema(
  {
    gameName: { type: String, required: false },
    gamePic: { type: String, required: false },
    gameId: { type: Schema.Types.ObjectId, required: true, ref: 'Game' },
    favorite: { type: Boolean, default: false },
    accountId: { type: Schema.Types.ObjectId, required: true, ref: 'Account' }
  },
  { timestamps: true, toJSON: { virtuals: true } }
)

TrackedGameSchema.virtual('game', {
  localField: 'gameId',
  foreignField: '_id',
  justOne: true,
  ref: 'Game'
})
TrackedGameSchema.virtual('tracker', {
  localField: 'accountId',
  foreignField: '_id',
  justOne: true,
  ref: 'Account'
})
