import mongoose from 'mongoose'
const Schema = mongoose.Schema

export const GameSchema = new Schema(
  {
    name: { type: String, required: true },
    ratings: { type: Number, required: false },
    platforms: { type: String, required: false },
    description: { type: String, required: true },
    genres: { type: Schema.Types.ObjectId, ref: 'Game', required: false },
    developer: { type: String, required: false },
    clip: { type: String, required: false },
    website: { type: String, required: false },
    background_image: { type: String, required: false },
    background_image_additional: { type: String, required: false }

  },
  { timestamps: true, toJSON: { virtuals: true } }
)
GameSchema.virtual('genre', {
  localField: 'genreId',
  foreignField: '_id',
  ref: 'Game',
  justOne: true
})
