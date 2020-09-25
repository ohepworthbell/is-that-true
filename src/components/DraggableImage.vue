<template>
  <section class="game">
    <div
      class="game__box"
      :class="{ 'game__box--active': active }"
      @mousedown="registerMovementStart"
      @touchstart="registerMovementStart"
      :style="`transform: translate(${dragDistance}px, 0) rotate(${dragRotation}deg); opacity: ${dragOpacity}`"
    >
      <p
        class="game__question"
        :class="{ 'game__question--larger': question.text.length < 150 }"
      >
        {{ question.text }}
      </p>
    </div>

    <div v-if="answered" class="game__results">
      <h1 class="game__results__title">
        You are
        <strong
          class="game__results__bold"
          :class="{ 'game__results__bold--correct': correct }"
          >{{ correctText }}!</strong
        >
      </h1>
      <p class="game__results__description">{{ truthfulText }}</p>
    </div>

    <div v-if="score > 0" class="game__score">Score: {{ score }}</div>

    <div class="game__celebration" v-if="disabled">
      {{ correct ? "👍" : "👎" }}
    </div>
  </section>
</template>

<script>
import randomQuestion from "@/assets/questions.js";

export default {
  name: "DraggableImage",
  data() {
    return {
      question: randomQuestion(),
      start: 0,
      active: false,
      dragDistance: 0,
      dragRotation: 0,
      dragOpacity: 1,
      correct: false,
      truthful: false,
      answered: false,
      score: 0,
      disabled: false,
    };
  },
  computed: {
    correctText() {
      return this.correct ? "correct" : "incorrect";
    },
    truthfulText() {
      return this.truthful ? "That is true!" : "That is false!";
    },
  },
  methods: {
    updateQuestion() {
      this.question = randomQuestion();
    },
    getEventCoords(e) {
      if (e.changedTouches) return e.changedTouches[0].pageX;

      return e.pageX;
    },
    registerMovementStart(e) {
      this.active = true;
      this.start = this.getEventCoords(e);
    },
    moveBox(e) {
      if (!this.active) return;

      // Get distance moved
      let distance = this.getEventCoords(e) - this.start;
      let opacity = 1 - Math.abs(distance) / (window.innerWidth / 1.5);

      // Save
      this.dragDistance = distance;
      this.dragRotation = (15 * distance) / window.innerWidth;
      this.dragOpacity = Math.max(opacity, 0);
    },
    endMovement() {
      if (!this.active) return;

      // Check drag distance
      let distance = Math.abs(this.dragDistance);
      let direction = this.dragDistance > 0 ? "right" : "left";
      let answer = this.question.correct ? "right" : "left";

      // Reset
      this.active = false;
      this.dragDistance = 0;
      this.dragRotation = 0;

      // Ignore if insufficient drag distance
      if (distance < 40) {
        this.dragOpacity = 1;

        return;
      }

      // Hide box, to later reset
      this.dragOpacity = 0;

      // Mark user
      this.correct = direction === answer;
      this.truthful = answer === "right";

      // Remember answer
      this.answered = true;

      // Count score
      if (this.correct) this.score++;

      // Disabled game temporarily
      this.disabled = true;

      // Fetch new question
      this.updateQuestion();

      // Re-enable game
      setTimeout(() => {
        this.disabled = false;
        this.dragOpacity = 1;
      }, 200);
    },
  },
  created() {
    window.addEventListener("touchend", this.endMovement);
    window.addEventListener("mouseup", this.endMovement);
    window.addEventListener("mousemove", this.moveBox);
    window.addEventListener("touchmove", this.moveBox);
  },
  beforeDestroy() {
    window.removeEventListener("touchend", this.endMovement);
    window.removeEventListener("mouseup", this.endMovement);
    window.removeEventListener("mousemove", this.moveBox);
    window.removeEventListener("touchmove", this.moveBox);
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.game {
  text-align: center;
  margin: 0 auto;
  width: 85vw;
  max-width: 20em;

  &--disabled {
    pointer-events: none;
  }

  &__box {
    position: relative;
    background: #fff;
    border: 1px solid #eee;
    display: flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    padding: 2em 1.5em 1.5em;
    border-radius: 0.5em;
    box-shadow: 0 2px 6px rgba(#000, 0.1), 0 10px 40px -10px rgba(#000, 0.1);
    transition: transform 0.2s ease-out;
    cursor: grab;
    user-select: none;
    touch-action: none;
    transform-origin: 50% 100%;

    &:before,
    &:after {
      position: absolute;
      font-family: sans-serif;
      font-size: 4em;
      line-height: 0.6em;
      color: rgba(#000, 0.15);
    }

    &:before {
      top: 2rem;
      left: 1rem;
      content: "“";
    }

    &:after {
      right: 1rem;
      bottom: -0.15em;
      content: "”";
    }

    &--active {
      transition: none;
      cursor: grabbing;
    }
  }

  &__question {
    font-size: 1em;
    line-height: 1.5em;

    &--larger {
      font-size: 1.2em;
      line-height: 1.4em;
    }
  }

  &__results {
    margin: 2em 0 0;

    &__title {
      font-size: 1.5em;
      line-height: 1.2em;
      margin: 0;
      font-weight: bold;
    }

    &__bold {
      font-weight: bolder;
      color: #c21b32;

      &--correct {
        color: #2bac2b;
      }
    }

    &__description {
      font-size: 1.15em;
      line-height: 1.6em;
      margin: 0;
    }
  }

  &__score {
    position: fixed;
    top: 0.6em;
    right: 0.6em;
    font-size: 0.89em;
    color: var(--light-text);
    font-weight: bolder;
  }

  &__celebration {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20em;
    pointer-events: none;
    animation: popIn 0.4s;
    animation-fill-mode: forwards;
  }

  @keyframes popIn {
    0% {
      opacity: 0;
      transform: scale(0.25);
    }
    30% {
      opacity: 1;
    }
    100% {
      transform: scale(1);
      opacity: 0;
    }
  }
}
</style>
