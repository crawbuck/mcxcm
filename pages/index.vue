<template>
  <main role="main" class="App" :class="{ 'App--Loaded' : loaded }" :data-theme="theme">
    <div :style="`min-height: calc(100vh - ${offset}px)`">
      <Header :content="header" />
      <Billboard :content="event" />
      <Location :content="location"></Location>
      <Parking :content="location.parking" />
      <Parking :content="location.subway" />
      <Registry :content="registry" />
      <Form v-if="!submitted" :content="form" @formSubmitted="formSubmitted" />
      <ThankYou v-if="submitted" :content="form" :data="data" />
    </div>
    <Footer ref="footer" />
  </main>
</template>

<script>
export default {
  async asyncData({ $content }) {
    try {
      const response = await $content('data').fetch();
      const {
        location,
        registry,
        header,
        event,
        form,
      } = response;

      return {
        location,
        registry,
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
      theme: "light",
      submitted: false,
      data: {}
    }
  },
  mounted() {
    this.setOffset();
    window.addEventListener("resize", () => {
      this.setOffset();
    });
    setTimeout(() => {
      return (this.loaded = true);
    }, 250);
  },
  methods: {
    setOffset() {
      return (this.offset = this.$refs.footer.$el.scrollHeight);
    },
    formSubmitted(event) {
      this.submitted = !this.submitted;
      this.data = event;
      setTimeout(() => {
        this.setDarkMode();
      }, 250);
    },
    setLightMode() {
      const root = document.documentElement;
      root.style.setProperty(
        '--background',
        getComputedStyle(root).getPropertyValue('--color-whiteRock')
      );
      root.style.setProperty(
        '--foreground',
        getComputedStyle(root).getPropertyValue('--color-black')
      );
      root.style.setProperty(
        '--borders',
        getComputedStyle(root).getPropertyValue('--color-borderDark')
      );
    },
    setDarkMode() {
      const root = document.documentElement;
      root.style.setProperty(
        '--background',
        getComputedStyle(root).getPropertyValue('--color-black')
      );
      root.style.setProperty(
        '--foreground',
        getComputedStyle(root).getPropertyValue('--color-whiteRock')
      );
      root.style.setProperty(
        '--borders',
        getComputedStyle(root).getPropertyValue('--color-borderLight')
      );
    }
  }
}
</script>
