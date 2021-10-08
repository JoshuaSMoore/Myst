export class Profile {
  constructor(data) {
    this.subs = data.subs
    this.email = data.email
    this.name = data.email
    this.picture = data.picture || ''
    this.bio = data.bio
    this.coverImg = data.coverImg || ''
    this.profileClip = data.profileClip || ''
    this.twitch = data.twitch
    this.github = data.github
    this.steam = data.steam
    this.xbox = data.xbox
    this.playstation = data.playstation
    this.nintendo = data.nintendo
  }
}
