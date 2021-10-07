import mongoose from 'mongoose'
const Schema = mongoose.Schema

export const TrackedGameSchema = new Schema(
  {
    gameName: { type: String, required: true },
    gamePic: { type: String, required: true },
    gameId: { type: Schema.Types.ObjectId, required: true },
    favorite: { type: Boolean, default: false },
    accountId: { type: Schema.Types.ObjectId, required: true }
  },
  { timestamps: true, toJSON: { virtuals: true } }
)

TrackedGameSchema.virtual('game', {
  localField: 'gameId',
  foreignField: '_id',
  justOne: true,
  ref: 'Game'
})
TrackedGameSchema.virtual('tacker', {
  localField: 'accountId',
  foreignField: '_id',
  justOne: true,
  ref: 'Account'
})
