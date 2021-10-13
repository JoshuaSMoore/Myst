import { Auth0Provider } from '@bcwdev/auth0provider'
import { accountService } from '../services/AccountService'
import { firebaseservice } from '../services/FirebaseService.js'
import BaseController from '../utils/BaseController'

export class AccountController extends BaseController {
  constructor() {
    super('account')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('', this.getUserAccount)
      .get('/search', this.getAccountsByQuery)
      .get('/:accountId', this.getAccountById)
      .put('', this.editAccount)
      .get('/firebase-token', this.getFirebaseAuthToken)
  }

  async getUserAccount(req, res, next) {
    try {
      const account = await accountService.getAccount(req.userInfo)
      res.send(account)
    } catch (error) {
      next(error)
    }
  }

  async getAccountById(req, res, next) {
    try {
      const account = await accountService.getAccountById(req.params.accountId)
      res.send(account)
    } catch (error) {
      next(error)
    }
  }

  async getAccountsByQuery(req, res, next) {
    try {
      const accounts = await accountService.getAccountsByQuery(req.query)
      res.send(accounts)
    } catch (error) {
      next(error)
    }
  }

  async editAccount(req, res, next) {
    try {
      const account = await accountService.editAccount(req.userInfo, req.body)
      res.send(account)
    } catch (error) {
      next(error)
    }
  }

  async getFirebaseAuthToken(req, res, next) {
    try {
      const token = await firebaseservice.getFirebaseAuthToken(req.userInfo)
      return res.send({ token })
    } catch (error) {
      next(error)
    }
  }
}
