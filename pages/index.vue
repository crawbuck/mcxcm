<template>
  <main role="main" class="App" :class="{ 'App--Loaded' : loaded }">
    <div>
      <Header :content="header" />
      <Billboard :content="event" />
      <Form v-if="!submitted" :content="form" @formSubmitted="formSubmitted" />
      <ThankYou v-if="submitted" :content="form" :data="data" />
    </div>
    <Footer />
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
      loaded: false,
      offset: 0,
      submitted: false,
      data: {}
    }
  },
  mounted() {
    setTimeout(() => {
      return (this.loaded = true);
    }, 250);
  },
  methods: {
    formSubmitted(event) {
      this.submitted = !this.submitted;
      this.data = event;
    }
  }
}
</script>
