<template>
  <section class="Parking">
    <h3>
      {{ content.title }}
    </h3>
    <p>
      {{ content.description }}
    </p>
    <ul v-if="garages.length > 0" class="Parking__Options">
      <li v-for="garage in garages" :key="garage.title" class="Parking__Option">
        <p class="Parking__Title">
          {{ garage.title }}
        </p>
        <small class="Parking__Distance">
          {{ garage.distance }}
        </small>
        <address>
          <p v-html="garage.address"></p>
          <small>{{ garage.hours }}</small>
        </address>
        <div class="Parking__BtnWrap">
          <a :href="getNumber(garage.telephone)">
            {{ content.cta_phone }}
          </a>
          <a :href="garage.url" target="_blank">
            {{ content.cta }}
          </a>
        </div>
      </li>
    </ul>
    <ul v-if="Object.values(routes).length > 0" class="Parking__Options">
      <li v-for="data in Object.values(routes)" :key="data.title" class="Parking__Option">
        <p class="Parking__Title">
          {{ data.title }}
        </p>
        <div v-for="set in data.routes" :key="set.url" class="Parking__Path">
          <div class="start">
            <img v-for="image in set.start" :key="image" :src="image" />
          </div>
          <div v-if="set.transfer.length > 0" class="then">
            <img :src="content.to" />
          </div>
          <div v-if="set.transfer.length > 0" class="transfer">
            <img v-for="image in set.transfer" :key="image" :src="image" />
          </div>
          <div class="then">
            <img :src="content.to" />
          </div>
          <div class="walk">
            <img :src="content.walking"/>
          </div>
          <a :href="set.url" target="_blank">
            {{ content.directions }}
          </a>
        </div>
      </li>
    </ul>
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
      routes: false
    }
  },
  computed: {
    garages() {
      const data  = this.content?.garages ? this.content.garages : [];
      return (data);
    }
  },
  mounted() {
    this.routes = this.parseRoutes();
  },
  methods: {
    parseRoutes() {
      const data = this.content?.walking ? Object.values(this.content) : false;
      if (!data) return false;

      const routes = data.filter((item) => typeof item !== 'string');
      const total = {};
      total.penn = {};
      total.penn.title = `From Penn Station`;
      total.penn.routes = routes.filter((item) => item.penn);

      total.gc = {};
      total.gc.title = `From Grand Central Station`;
      total.gc.routes = routes.filter((item) => !item.penn);

      return total;
    },
    getNumber(context) {
      return (`tel:${context}`);
    }
  }
};
</script>
