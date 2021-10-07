import mongoose from 'mongoose'
import { AccountSchema, ProfileSchema } from '../models/Account'
import { ValueSchema } from '../models/Value'
import { GameSchema } from '../models/Game'
import { FollowSchema } from '../models/Follow'
import { TrackedGameSchema } from '../models/TrackedGame'
import { PostSchema } from '../models/Post'

class DbContext {
  Values = mongoose.model('Value', ValueSchema);
  Account = mongoose.model('Account', AccountSchema);
  Profiles = mongoose.model('Profile', ProfileSchema, 'accounts');
  Game = mongoose.model('Game', GameSchema);

  Follow = mongoose.model('Follow', FollowSchema);

  TrackedGame = mongoose.model('TrackedGame', TrackedGameSchema);

  Post = mongoose.model('Post', PostSchema);
}

export const dbContext = new DbContext()
