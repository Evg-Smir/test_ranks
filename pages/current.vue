<template>
  <v-layout class="d-block">
    <v-card class="pa-6">
      <v-card-title v-text="$t('current.title')" />
      <v-row class="ma-0 flex--column">
        <v-col class="v-row__item">
          <v-select
            :label="$t('current.currency')"
            :items="listCurrency"
            v-model="defaultValueCurrency"
            hide-details
          />
        </v-col>
        <v-col class="v-row__item">
          <v-card-title>
            <v-text-field
              :label="$t('current.searchPlaceholder')"
              v-model="search"
              append-icon="mdi-magnify"
              single-line
              hide-details
            />
          </v-card-title>
          <v-data-table
            :headers="headers"
            :items="currentArray"
            :search="search.toUpperCase()"
            :loading="!currentArray.length"
            :loading-text="$t('current.loading')"
          />
        </v-col>
      </v-row>
    </v-card>
  </v-layout>
</template>

<script>
import config from "assets/config/config";

export default {
  name: "current",
  data() {
    return {
      defaultValueCurrency: {
        text: 'USD',
        value: 'USD'
      },
      listCurrency: [
        {
          text: 'RUB',
          value: 'RUB'
        },
        {
          text: 'EUR',
          value: 'EUR'
        },
        {
          text: 'USD',
          value: 'USD'
        }
      ],
      search: '',
    }
  },
  computed: {
    currentArray() {
      return this.$store.getters.CURRENT_ARRAY
    },
    headers() {
      const currentWords = config[this.$i18n.locale]

      return [
        {
          text: currentWords.currency,
          align: 'start',
          filterable: true,
          value: 'name',
        },
        {
          text: currentWords.value,
          value: 'value',
          sortable: false,
          filterable: false,
        },
      ]
    }
  },
  watch: {
    defaultValueCurrency() {
      this.$store.dispatch('GET_CURRENCY', this.defaultValueCurrency)
    }
  },
  mounted() {
    this.$store.dispatch('GET_CURRENCY', this.defaultValueCurrency.value)
  }
}
</script>

<style scoped lang="scss">
.v-card {
  width: 100%;
}

.v-row__item {
  padding: 16px;

  &:first-child {
    max-width: 160px;
  }

  &:last-child {
    padding-top: 0;
  }
}

@media screen and (max-width: 960px) {
  .row {
    flex-direction: column;
  }

  .v-row__item:last-child{
    padding: 0;
  }
}
</style>
