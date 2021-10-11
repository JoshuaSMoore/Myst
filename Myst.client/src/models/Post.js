export class PostModel {
  constructor(postData) {
    this.id = postData.id
    this.body = postData.body
    this.title = postData.title
    this.img = postData.img
    this.video = postData.video
    this.creatorId = postData.creatorId
  }
}
