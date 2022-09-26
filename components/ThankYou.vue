<!-- eslint-disable vue/no-v-html -->
<template>
  <section class="Thanks">
    <h1 class="Thanks__Title">
      {{ title }}
    </h1>
    <span v-if="data" class="Thanks__Details">
      <span>
        <p class="Thanks__DetailsTitle" v-html="content.success.issues"></p>
        <p v-if="data.party > 0" v-text="`${data.f_name} ${data.l_name}`"></p>
        <p v-if="data.party > 0" v-text="`Party of ${data.party}`"></p>
        <p v-if="data.party > 0">
          {{ data.phone }}
        </p>
        <p v-if="data.email !== '' && data.party > 0">
          {{ data.email }}
        </p>
      </span>
    </span>
  </section>

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
