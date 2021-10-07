import { dbContext } from '../db/DbContext'
import { Forbidden } from '../utils/Errors.js'

// Private Methods

/**
 * Creates account if one does not exist
 * @param {any} account
 * @param {any} user
 */
async function createAccountIfNeeded(account, user) {
  if (!account) {
    user._id = user.id
    account = await dbContext.Account.create({
      ...user,
      subs: [user.sub]
    })
  }
  return account
}

/**
 * Adds sub to account if not already on account
 * @param {any} account
 * @param {any} user
 */
async function mergeSubsIfNeeded(account, user) {
  if (!account.subs.includes(user.sub)) {
    // @ts-ignore
    account.subs.push(user.sub)
    await account.save()
  }
}
/**
 * Restricts changes to the body of the account object
 * @param {any} body
 */
function sanitizeBody(body) {
  const writable = {
    name: body.name,
    picture: body.picture
  }
  return writable
}

class AccountService {
  /**
   * Returns a user account from the Auth0 user object
   *
   * Creates user if none exists
   *
   * Adds sub of Auth0 account to account if not currently on account
   * @param {any} user
   */
  async getAccount(user) {
    let account = await dbContext.Account.findOne({
      _id: user.id
    })
    account = await createAccountIfNeeded(account, user)
    await mergeSubsIfNeeded(account, user)
    return account
  }

  /**
   * Updates account with the request body, will only allow changes to editable fields
   *  @param {any} user Auth0 user object
   *  @param {any} body Updates to apply to user object
   */
  async updateAccount(user, body) {
    const update = sanitizeBody(body)
    const account = await dbContext.Account.findOneAndUpdate(
      { _id: user.id },
      { $set: update },
      { runValidators: true, setDefaultsOnInsert: true, new: true }
    )
    return account
  }

  // REVIEW editAccount may need to be Mick proofed.
  async editAccount(user, body) {
    const account = await this.getAccount(user)
    if (user.id !== account.id) {
      throw new Forbidden('The dark fire will not avail you, flame of Udûn! You Shall not pass!')
    }
    account.name = body.name || account.name
    account.bio = body.bio || account.bio
    account.picture = body.picture || account.picture
    account.coverImg = body.coverImg || account.coverImg
    account.profileClip = body.profileClip || account.profileClip
    account.twitch = body.twitch || account.twitch
    account.github = body.github || account.github
    account.steam = body.steam || account.steam
    account.xbox = body.xbox || account.xbox
    account.playstation = body.playstation || account.playstation
    account.nintendo = body.nintendo || account.nintendo
    await account.save()
    return account
  }
}
export const accountService = new AccountService()
