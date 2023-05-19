<template>
  <section class="Location">
    <client-only>
      <Splide :options="settings">
        <SplideSlide v-for="image in images" :key="image">
          <div class="square">
            <img :src="image" />
          </div>
        </SplideSlide>
      </Splide>
    </client-only>
    <div class="Location__Info">
      <div class="Location__InfoWrap">
        <a v-if="content.title !== ''" :href="content.url" target="_blank">
          {{ content.title }}
        </a>
        <div v-if="content.description !== ''" v-html="content.description"></div>
        <small v-if="content.subdescription !== ''">
          {{ content.subdescription }}
        </small>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    content: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      settings: {
        type: "loop",
        perPage: 1,
        perMove: 1,
        arrows: false,
        pagination: false,
        easing: "cubic-bezier(.33, 1, .68, 1)",
        autoplay: true,
        interval: 3000,
        cover: true,
        drag: true
      }
    }
  },
  computed: {
    images() {
      return (this.content.images);
    }
  }
};
</script>
