<template>
  <v-layout class="d-block">
    <v-card class="pa-6">
      <v-card-title v-text="$t('convert.title')" />
      <v-row>
        <v-col>
          <v-card-subtitle class="pa-4" v-text="$t('convert.query')" />
          <v-text-field
            :label="$t('convert.placeholderQuery')"
            v-model="query"
            hide-details="auto"
            class="pa-4 mt-0 pt-2"
            @keyup.enter="getConvert"
          />
        </v-col>
        <v-btn
          class="convert-button py-3 px-4 v-picker--full-width"
          @click="getConvert"
          v-text="$t('convert.nameButton')"
        />
        <v-col>
          <v-card-subtitle class="pa-4" v-text="$t('convert.result')" />
          <v-card-text class="pa-4" v-text="convertResult" />
        </v-col>
      </v-row>
    </v-card>
  </v-layout>
</template>

<script>
import config from "assets/config/config";

export default {
  name: 'convert',
  data() {
    return {
      query: '',
    }
  },
  computed: {
    convertResult() {
      return this.$store.getters.CONVERT_VALUE || this.error
    }
  },
  methods: {
    getConvert() {
      const filter = /\w+[^(in )]/gim;
      const query = this.query.match(filter)

      if (!this.query.includes('in') || Object.keys(query).length !== 3) {
        this.$store.dispatch('GET_ERROR', config[this.$i18n.locale].error)
        return false
      }

      this.$store.dispatch('GET_CONVERT', query)
    },
  },
}
</script>

<style scoped lang="scss">
.v-card {
  width: 100%;
}

.row {
  justify-content: center;
  align-items: center;
  margin: 0;
  padding-bottom: 16px;
}

.col {
  max-width: 250px;
  padding: 16px;
}

.convert-button {
  max-width: 180px;
  text-align: center;
}

@media screen and (max-width: 960px) {
  .col {
    padding: 0;
  }
}

@media screen and (max-width: 500px) {
  .row {
    flex-direction: column;
    align-items: flex-start;
  }

  .convert-button {
    margin-left: 16px;
  }
}
</style>
