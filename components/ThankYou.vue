<!-- eslint-disable vue/no-v-html -->
<template>
  <span>
    <h1>
      {{ title }}
    </h1>
    <span v-if="data">
      <span>
        <h2 v-html="content.success.issues"></h2>
        <h3 v-if="data.party > 0" v-text="`${data.f_name} ${data.l_name}`"></h3>
        <p v-if="data.party > 0" v-text="`Party of ${data.party}`"></p>
        <p v-if="data.party > 0">
          {{ data.phone }}
        </p>
        <p v-if="data.email !== '' && data.party > 0">
          {{ data.email }}
        </p>
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
  },
  computed: {
    title() {
      const partySize = parseInt(this.data.party);
      if (partySize > 0) return this.content.success.thanks;
      return this.content.success.cant;
    }
  }
};
</script>
