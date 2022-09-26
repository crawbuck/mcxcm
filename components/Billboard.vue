<template>
  <section class="Billboard">
    <h3 class="Billboard__Title">
      {{ content.title }}
    </h3>
    <h4 class="Billboard__Subtitle">
      {{ content.description }}
    </h4>
    <p class="Billboard__Description">
      {{ content.time }}
    </p>
    <div class="Image">
      <img src="whattup.jpg" />
    </div>
    <a href="https://www.restaurantjoanina.com/" target="_blank" class="Billboard__Location">
      {{ content.location }}
    </a>
    <a :href="content.url" target="_blank" class="Billboard__Description">
      <address>
        {{ content.address }}
      </address>
    </a>
  </section>
</template>

<script>
export default {
  name: "EventBillboard",
  props: {
    content: {
      type: Object,
      required: true
    }
  }
};
</script>
