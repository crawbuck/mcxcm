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
  },
  computed: {
    garages() {
      return (this.content.parking.garages);
    }
  }
};
</script>
