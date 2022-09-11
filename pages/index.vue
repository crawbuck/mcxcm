<template>
  <main role="main">
    <Header :content="header" />
    <Billboard :content="event" />
    <Form :content="form" />
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
  }
}
</script>
