<template>
  <div id="app" class="app">
    <img src="@/assets/logo.svg" alt="Logo" class="app__logo" />
    <h1 class="app__title">Is that true?</h1>
    <p class="app__description">Swipe right for true, left for false!</p>
    <DraggableImage />
  </div>
</template>

<script>
import DraggableImage from "./components/DraggableImage.vue";

export default {
  name: "App",
  components: {
    DraggableImage,
  },
};
</script>

<style lang="scss">
:root {
  --text: #2c3e50;
  --light-text: #526170;
  --colour: #f44;
}

html {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  font-size: 18px;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: var(--text);
  background: linear-gradient(to bottom, #eee, #f3f3f3);
}

body {
  margin: 0;
  padding: 0;
}

.app {
  padding: 2em 0;
  overflow: hidden;
  box-sizing: border-box;
  min-height: 100vh;

  &__logo {
    display: block;
    width: 7em;
    height: auto;
    margin: 0 auto -1em;
  }

  &__title {
    margin: 0 auto 1rem;
    text-align: center;
    font-family: "Montserrat", sans-serif;
    font-weight: 800;
    font-size: 2.4em;
    line-height: 0.8em;
    letter-spacing: -0.05em;
    transform: rotate(-2deg);
    max-width: 6em;
    color: var(--text);
  }

  &__description {
    font-size: 1.15em;
    font-weight: light;
    line-height: 1.6em;
    color: var(--light-text);
  }
}
</style>
