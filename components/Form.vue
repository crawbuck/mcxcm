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
            No, but will toast to you from afar.
          </span>
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
      <p v-show="data.attending === 'yes'" class="Form__Field Form__Field--Add">
        <button role="button" type="button" class="Form__FieldInput Form__FieldInput--Add" @click="addGuest">
          Click to Add a Guest
        </button>
      </p>
      <ul v-show="data.attending === 'yes' && guests.length > 0" class="Form__Field Form__Field--Full">
        <li v-for="(guest, index) in guests" :key="index">
          <label :for="`attendee_${index}`" class="Form__FieldLabel">
            <span class="Form__FieldTitle">
              Guest #{{ index + 1 }}'s Full Name
            </span>
            <input :id="`attendee_${index}`" v-model="guests[index]" class="Form__FieldInput" type="text" :name="`attendee_${index}`" required />
          </label>
        </li>
      </ul>
      <input ref="guests" name="guests" value="" type="text" class="hidden" />
      <input ref="party" name="party" value="" type="number" class="hidden" />
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
      formName: "Wedding",
      guests: [],
      data: {
        fname: "",
        lname: "",
        phone: "",
        party: "1",
        song: "",
        guests: "",
        attending: false,
      }
    }
  },
  methods: {
    async handleSubmit() {
      if (this.data.attending === "no") {
        this.data.attending = "No";
      } else {
        this.data.attending = "Yes";
        const containsCountry = this.data.phone.substring(0, 1) === "1";
        const hasGuests = this.guests.length > 0;
        this.data.party = (parseInt(this.data.party) + this.guests.length);
        this.$refs.party = this.data.party;

        if (hasGuests) {
          this.data.guests = this.guests.join(", ");
          this.$refs.guests.value = this.guests.join(", ");
        }

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
    },
    addGuest() {
      return (this.guests.push(""));
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
