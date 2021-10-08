export class News {
  constructor(data) {
    this.id = data.id
    this.title = data.title
    this.shortDescription = data.short_description
    this.thumbnail = data.thumbnail
    this.img = data.main_image
    this.body = data.article_content
    this.url = data.article_url
  }
}
