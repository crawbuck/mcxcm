<!-- eslint-disable vue/no-v-html -->
<template>
  <span>
    <h1>{{ content.success.title }}</h1>
    <span v-if="data">
      <span>
        <h2 v-html="content.success.issues"></h2>
        <h3 v-text="`${data.f_name} ${data.l_name}`"></h3>
        <p v-text="`Party of ${data.party}`"></p>
        <p>{{ data.phone }}</p>
        <p v-if="data.email !== ''">{{ data.email }}</p>
      </span>
    </span>
  </span>

</template>

<script>
export default {
  props: {
    content: {
      type: Object,
      required: true
    },
    data: {
      type: Object,
      required: false,
      default: () => {
        return {};
      }
    }
  }
};
</script>
