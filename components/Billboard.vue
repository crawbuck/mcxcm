<template>
  <div>
    <Icon />
  </div>
</template>

<script>
export default {
  name: "EventBillboard",
  props: {
    content: {
      type: Object,
      required: true
    }
  }
};
</script>
