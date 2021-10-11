export class Game {
  constructor(data) {
    this.name = data.name || ''
    this.ratings = data.ratings || ''
    this.platforms = data.platforms || ''
    this.description = data.description || ''
    this.genres = data.genres || ''
    this.developer = data.developer || ''
    this.clip = data.clip || ''
    this.website = data.website || ''
    this.backgroundImage = data.background_image || 'https://image.shutterstock.com/image-vector/gamepads-vector-icon-set-260nw-599550152.jpg'
    this.esrb_rating = data.esrb_rating || ''
    this.background_image_additional = data.background_image_additional || ''
    this.id = data.id || ''
  }
}
