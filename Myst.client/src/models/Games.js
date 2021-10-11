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
    this.backgroundImage = data.background_image || 'https://lh3.googleusercontent.com/proxy/PkQFIJObi-Y7UFMJ3GDrb_03F-ILHy6kudqkdvF63zVCZoLpfK8MkeC_mlSchvbqKSFjLDb-Z_qSv_xkHoqFF7uzWQM6_pdXQdVsi9dt-KAAh_-z7eBBxd2x2qIxid3CJ_2C9U4nhKLjtbUfTzLV9zcE7ikLCvuH5plGz0W93wc5HYYEeSs6Ezri-j2Ei4VmCQ'
    this.esrb_rating = data.esrb_rating || ''
    this.background_image_additional = data.background_image_additional || ''
    this.id = data.id || ''
  }
}
