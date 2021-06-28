<template>
  <div class='container'>
    <div class='columns is-centered is-vcentered is-mobile'>
      <div class='column is-narrow has-text-centereds'>
        <table class="table is-bordered">
            <thead>
                <tr>
                  <th>id</th>
                  <th>text</th>
                </tr>
            </thead>
            <tbody>
                  <tr v-for="(data, i) in userData" :key="i">
                  <td>{{data.id}}</td>
                  <td>{{data.text}}</td>
                </tr>
            </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
export default {
  data: function() {
    return{
      userData:[
        {id: 1, text: 'First'},
        {id: 2, text: 'Second'},
      ]
    }
  },
  computed: {
    ...mapGetters(["isLoggedIn"]),
    ...mapState({
      token: "token",
    }),
  },
  methods: {
    getData() {
      fetch("http://localhost:3000/data", {
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      });
    },
  },
};
</script>

<style></style>