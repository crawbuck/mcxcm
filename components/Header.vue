<template>
  <header class="Header">
    <h3 class="Header__Subtitle">
      {{ content.subtitle }}
    </h3>
    <h1 class="Header__Title">
      {{ content.title }}
    </h1>
    <div class="Image">
      <img src="ivebeendrankin.jpg" />
    </div>
    <div class="Header__Details">
      <div class="Header__Subtitle" v-html="content.description">
      </div>
      <div class="Header__Subtitle" v-html="content.date">
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: "Header",
  props: {
    content: {
      type: Object,
      required: true
    }
  }
};
</script>
