<template>
  <div
    class="flex-grow-1 d-flex align-items-center justify-content-center m-5 p-5"
  >
    <figure class="aboutCard">
      <img src="../assets/img/space1.jpg" alt="sample87" />
      <figcaption>
        <img
          src="../assets/img/Josh.jpg"
          alt="profile-sample4"
          class="profile"
        />
        <h2>Joshua Moore<span>Full Stack Developer</span></h2>
        <!-- <p>Placeholder Bio </p> -->
        <a
          href="https://www.linkedin.com/in/joshuasmoore7/"
          class="follow"
          target="_blank"
          rel="noreferrer noopener"
        >Linkedin</a>
        <a
          href="https://github.com/JoshuaSMoore"
          class="info"
          target="_blank"
          rel="noreferrer noopener"
        >GitHub</a>
      </figcaption>
    </figure>

    <figure class="aboutCard">
      <img src="../assets/img/city.jpg" alt="sample69" />
      <figcaption>
        <img
          src="../assets/img/Talan.jpg"
          alt="profile-sample5"
          class="profile"
        />
        <h2>Talan Weeks<span>Full Stack Developer</span></h2>
        <!-- <p>Placeholder Bio </p> -->
        <a
          href="https://www.linkedin.com/in/talan-weeks/"
          class="follow"
          target="_blank"
          rel="noreferrer noopener"
        >Linkedin</a>
        <a
          href="https://talanweeks.github.io/Landing-Page/"
          class="info"
          target="_blank"
          rel="noreferrer noopener"
        >GitHub</a>
      </figcaption>
    </figure>
    <figure class="aboutCard">
      <img src="../assets/img/lake2.jpg" alt="sample87" />
      <figcaption>
        <img
          src="../assets/img/Nick.jpg"
          alt="profile-sample4"
          class="profile"
        />
        <h2>Nick Sondrup<span>Full Stack Developer</span></h2>
        <!-- <p>Placeholder Bio </p> -->
        <a
          href="https://www.linkedin.com/in/nicholas-sondrup/"
          class="follow"
          target="_blank"
          rel="noreferrer noopener"
        >Linkedin</a>
        <a
          href="https://github.com/NickSondrup"
          class="info"
          target="_blank"
          rel="noreferrer noopener"
        >GitHub</a>
      </figcaption>
    </figure>
    <figure class="aboutCard">
      <img src="../assets/img/space2.jpg" alt="sample87" />
      <figcaption>
        <img
          src="../assets/img/Derek.jpg"
          alt="profile-sample4"
          class="profile"
        />
        <h2>Derek Shain<span>Full Stack Developer</span></h2>
        <!-- <p>Placeholder Bio </p> -->
        <a
          href="https://www.linkedin.com/in/derekshain"
          class="follow"
          target="_blank"
          rel="noreferrer noopener"
        >Linkedin</a>
        <a
          href="https://derekshain.github.io"
          class="info"
          target="_blank"
          rel="noreferrer noopener"
        >GitHub</a>
      </figcaption>
    </figure>
    <figure class="aboutCard">
      <img src="../assets/img/city.jpg" alt="sample87" />
      <figcaption>
        <img
          src="../assets/img/kyle.jpg"
          alt="profile-sample4"
          class="profile"
        />
        <h2>Kyle Hanna<span>Full Stack Developer</span></h2>
        <!-- <p>Placeholder Bio </p> -->
        <a href="https://www.linkedin.com/in/kyle-m-hanna/"
           class="follow"
           target="_blank"
           rel="noreferrer noopener"
        >Linkedin</a>
        <a href="https://github.com/KyleMHanna" class="info" target="_blank" rel="noreferrer noopener">GitHub</a>
      </figcaption>
    </figure>
    <div class="row text-center">
      <h3 class="text-center">
        Thanks to (not our sponsors) Twitch
      </h3>
      <br />
      <h3 class="text-center">
        <a href="https://rawg.io/" target="_blank" rel="noreferrer noopener">RAWG.Io</a>
      </h3>
      <br />
      <h3 class="text-center">
        <a href="https://www.mmobomb.com/" target="_blank" rel="noreferrer noopener">MMOBOMB</a>
      </h3>
      <br />
      <h3 class="text-center">
        <a href="https://boisecodeworks.com/" target="_blank" rel="noreferrer noopener">The Codeworks Team</a>
      </h3>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AboutPage'
}
</script>
<style lang="scss" scoped>
.aboutCard {
  font-family: "Roboto", Arial, sans-serif;
  position: relative;
  overflow: hidden;
  margin: 10px;
  min-width: 230px;
  max-width: 315px;
  width: 100%;
  color: #ffffff;
  text-align: left;
  line-height: 1.4em;
  background-color: #141414;
}
.aboutCard * {
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  -webkit-transition: all 0.25s ease;
  transition: all 0.25s ease;
}
.aboutCard img {
  max-width: 100%;
  vertical-align: top;
  opacity: 0.85;
}
.aboutCard figcaption {
  width: 100%;
  background-color: #141414;
  padding: 25px;
  position: relative;
}
.aboutCard figcaption:before {
  position: absolute;
  content: "";
  bottom: 100%;
  left: 0;
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 55px 0 0 400px;
  border-color: transparent transparent transparent #141414;
}
.aboutCard figcaption a {
  padding: 5px;
  border: 1px solid #ffffff;
  color: #ffffff;
  font-size: 0.7em;
  text-transform: uppercase;
  margin: 10px 0;
  display: inline-block;
  opacity: 0.65;
  width: 47%;
  text-align: center;
  text-decoration: none;
  font-weight: 600;
  letter-spacing: 1px;
}
.aboutCard figcaption a:hover {
  opacity: 1;
}
.aboutCard .profile {
  border-radius: 50%;
  position: absolute;
  bottom: 100%;
  left: 25px;
  z-index: 1;
  max-width: 90px;
  opacity: 1;
  box-shadow: 0 0 15px rgba(240, 240, 240, 0.863);
}
.aboutCard .follow {
  margin-right: 4%;
  border-color: #2980b9;
  color: #2980b9;
}
.aboutCard h2 {
  margin: 0 0 5px;
  font-weight: 300;
}
.aboutCard h2 span {
  display: block;
  font-size: 0.5em;
  color: #2980b9;
}
.aboutCard p {
  margin: 0 0 10px;
  font-size: 0.8em;
  letter-spacing: 1px;
  opacity: 0.8;
}

.parent {
  // height:500px;
  // position:relative;
}
.overlay {
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  transition: all 0.3s ease-in;
}
/* hover effect*/
.parent:hover .overlay {
  opacity: 0;
}
</style>
