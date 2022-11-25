<template>
  <v-app dark>
    <v-container class="pt-0 container">
      <appNavbar/>
      <v-main>
        <Nuxt/>
      </v-main>
    </v-container>
  </v-app>
</template>

<script>
import appNavbar from "~/components/section/app-navbar";

export default {
  name: 'DefaultLayout',
  components: {
    appNavbar
  },
}
</script>
