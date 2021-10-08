export class News {
  constructor(data) {
    this.id = data.id
    this.title = data.title
    this.short_description = data.short_description
    this.thumbnail = data.thumbnail
    this.main_image = data.main_image
    this.article_content = data.article_content
    this.article_url = data.article_url
  }
}
