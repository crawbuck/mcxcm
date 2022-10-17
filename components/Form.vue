<template>
  <form class="Form" :name="formName" netlify @submit.prevent="handleSubmit">
    <input type="hidden" name="form-name" :value="formName" />
    <fieldset>
      <div class="Form__Field Form__Field--Full">
        <span class="Header__Title" v-text="content.title"></span>
        <span class="Form__Description" v-text="content.description"></span>
      </div>
      <p class="Form__Field">
        <label for="f_name" class="Form__FieldLabel">
          <span class="Form__FieldTitle">
            First Name
          </span>
          <input id="f_name" v-model="data['f_name']" class="Form__FieldInput" type="text" name="f_name" required />
        </label>
      </p>
      <p class="Form__Field">
        <label for="l_name" class="Form__FieldLabel">
          <span class="Form__FieldTitle">
            Last Name
          </span>
          <input id="l_name" v-model="data['l_name']" class="Form__FieldInput" type="text" name="l_name" required />
        </label>
      </p>
      <p class="Form__Field Form__Field--Full">
        <span class="Form__FieldTitle">
          Are You Attending?
        </span>
        <label for="attending" class="Form__FieldLabel">
          <input id="attending" v-model="data['attending']" class="Form__FieldInput" type="radio" name="attending" value="yes" />
          <span class="Form__FieldTitle Form__FieldTitle--Fixed">
            Yes! We're ready to eat, drink, and celebrate!
          </span>
        </label>
        <label for="not_attending" class="Form__FieldLabel">
          <input id="not_attending" v-model="data['attending']" class="Form__FieldInput" type="radio" name="not_attending" value="no" />
          <span class="Form__FieldTitle Form__FieldTitle--Fixed">
            No, but will toast to you from afar
          </span>
        </label>
      </p>
      <p v-show="data.attending === 'yes'" class="Form__Field">
        <label for="party" class="Form__FieldLabel">
          <span class="Form__FieldTitle">
            Party Size?
          </span>
          <input id="party" v-model="data['party']" class="Form__FieldInput" min="0" max="10" value="1" type="number" name="party" />
        </label>
      </p>
      <p v-show="data.attending === 'yes'" class="Form__Field">
        <label for="phone" class="Form__FieldLabel">
          <span class="Form__FieldTitle">
            Phone Number
          </span>
          <input id="phone" v-model="data['phone']" class="Form__FieldInput" type="tel" name="phone" />
        </label>
      </p>
      <p v-show="data.attending === 'yes'" class="Form__Field Form__Field--Full">
        <label for="song" class="Form__FieldLabel">
          <span class="Form__FieldTitle">
            Request a song? (Optional)
          </span>
          <textarea id="song" v-model="data['song']" class="Form__FieldInput" name="song"></textarea>
        </label>
      </p>
      <p class="Form__Field Form__Field--Full">
        <input type="submit" name="submit" value="Press to RSVP" />
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
      data: {
        fname: "",
        lname: "",
        phone: "",
        party: "1",
        song: "",
        attending: false,
      }
    }
  },
  methods: {
    async handleSubmit() {
      if (this.data.attending === "no") {
        this.data.attending = "No";
        this.data.party = 0;
      } else {
        this.data.attending = "Yes";
        const containsCountry = this.data.phone.substring(0, 1) === "1";

        if (containsCountry) this.data.phone = this.data.phone.substring(1);
        this.data.phone = this.data.phone.replaceAll("-", "");
      }

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
