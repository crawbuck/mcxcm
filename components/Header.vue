<template>
  <h1>{{ content.title }}</h1>
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
