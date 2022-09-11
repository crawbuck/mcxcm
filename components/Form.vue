<template>
  <form class="Form" name="rsvp" netlify @submit.prevent="handleSubmit">
    <fieldset>
      <legend class="Form__Header">
        {{ content.legend }}
      </legend>
      <p v-for="(value, name) in content.inputs" :key="name" class="Form__Field">
        <label :for="name" class="Form__FieldLabel">
          <span class="Form__FieldTitle">
            {{ value }}
          </span>
          <input :id="name" v-model="data[name]" class="Form__FieldInput" :type="getType(name)" :name="name" />
        </label>
      </p>
      <p class="Form__Field">
        <input type="submit" name="submit" value="RSVP" />
      </p>
    </fieldset>
  </form>
</template>

<script>
export default {
  name: "EventForm",
  props: {
    content: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      data: {
        fname: "",
        lname: "",
        phone: "",
        email: "",
        party: ""
      }
    }
  },
  methods: {
    getType(context) {
      const isEmail = context === "email";
      const isPhone = context === "phone";
      const isNumber = context === "party";
      let type;

      switch (true) {
        case isEmail: {
          type = "email";
          break;
        }
        case isPhone: {
          type = "tel";
          break;
        }
        case isNumber: {
          type = "number";
          break;
        }
        default: {
          type = "text";
          break;
        }
      }

      return type;
    },
    handleSubmit() {
      return fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(this.data).toString(),
      });
    }
  },
};
</script>
