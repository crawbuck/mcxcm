<template>
  <section class="Registry">
    <div class="Registry__Image">
      <img src="M&C_NYC_ByLeandraCreativeCo.Photography-3164.jpg" />
    </div>
    <div class="Registry__Info">
      <h3>{{ content.title }}</h3>
      <p>{{ content.description}}</p>
      <ul v-if="content.links.length > 0">
        <li v-for="link in content.links" :key="link.url">
          <a :href="link.url" target="_blank">
            {{ link.title }}
          </a>
        </li>
      </ul>
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
  }
};
</script>
