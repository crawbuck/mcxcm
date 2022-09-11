<template>
  <main role="main">
    <Header :content="header" />
    <Billboard :content="event" />
    <Form v-if="!submitted" :content="form" @formSubmitted="formSubmitted" />
    <ThankYou v-if="submitted" :content="form" :data="data" />
  </main>
</template>

<script>
export default {
  async asyncData({ $content }) {
    try {
      const response = await $content('data').fetch();
      const { header, event, form } = response;

      return {
        header,
        event,
        form
      };
    } catch (err) {
      return { err };
    }
  },
  data() {
    return {
      submitted: false,
      data: {}
    }
  },
  methods: {
    formSubmitted(event) {
      this.submitted = !this.submitted;
      this.data = event;
    }
  }
}
</script>

<style lang="css">
  :root {
    --color-black: #222;
    --color-white: #efeee0;
    --easing: cubic-bezier(.33, 1, .68, 1);
    --timing: 400ms;
    --transition: var(--timing) var(--easing);
  }

  body {
    background: var(--color-black);
    color: var(--color-white);
    font-size: 16px;
  }
</style>
