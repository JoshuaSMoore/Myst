export class Post {
  constructor(postData) {
    this.id = postData.id
    this.body = postData.body
    this.title = postData.title
    this.img = postData.img
    this.video = postData.video
    this.creatorId = postData.creatorId
    this.creator = postData.creator
    this.mediaUrl = postData.mediaUrl || null
  }
}
