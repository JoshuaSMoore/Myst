export class Comment {
  constructor(data) {
    this.id = data.id
    this.postId = data.postId
    this.body = data.body
    this.creatorId = data.creatorId
    this.creator = data.creator
  }
}
