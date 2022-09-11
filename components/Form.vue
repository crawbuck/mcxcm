<template>
  <form class="Form" :name="formName" netlify @submit.prevent="handleSubmit">
    <input type="hidden" name="form-name" :value="formName" />
    <fieldset>
      <legend class="Form__Header">
        {{ content.legend }}
      </legend>
      <p v-for="(value, key) in content.inputs" :key="key" class="Form__Field">
        <label :for="key" class="Form__FieldLabel">
          <span class="Form__FieldTitle">
            {{ value }}
          </span>
          <input :id="key" v-model="data[key]" class="Form__FieldInput" :type="getType(key)" :name="key" />
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
      formName: "RSVP",
      attending: false,
      data: {
        fname: "",
        lname: "",
        phone: "",
        email: "",
        party: "",
        attending: false,
      }
    }
  },
  methods: {
    getType(context) {
      const isEmail = context === "email";
      const isPhone = context === "phone";
      const isNumber = context === "party";
      const isAttendance = context === "attending";
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
        case isAttendance: {
          type = "checkbox";
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
    async handleSubmit() {
      if (!this.attending) this.data.party = 0;

      try {
        await fetch("/", {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: this.encodeFormData({
            "form-name": this.formName,
            ...this.data
          })
        });
        return this.$emit("formSubmitted", this.data);
      } catch (err) {
        return alert(err);
      }
    },
    encodeFormData(data) {
      const keys = Object.keys(data);

      return keys.map((key) =>
        encodeURIComponent(key) + "=" + encodeURIComponent(data[key])
      )
      .join("&");
    }
  },
};
</script>

<style lang="css">
  input,
  p {
    font-size: 16px;
  }
</style>
