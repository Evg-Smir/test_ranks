<template>
  <v-app-bar
    height="fit-content"
    class="v-toolbar"
  >
    <v-app-bar-title class="text-h4" v-text="$t('appTitle')"/>
    <div class="flex-grow-1"/>
    <v-list flat>
      <v-list-item-group class="d-flex">
        <v-list-item
          v-for="(item, i) in listLinks"
          :key="i"
          class="pa-0"
        >
          <nuxt-link
            exact
            class="nuxt-link white--text"
            :to="item.link"
            v-text="item.label"
            :disabled="item.disabled"
          />
        </v-list-item>
      </v-list-item-group>
    </v-list>
    <div class="flex-grow-1"/>
    <v-list flat>
      <v-list-item-group class="d-flex">
        <v-list-item
          v-for="locale in availableLocales"
          :key="locale.code"
          class="pa-0"
        >
          <nuxt-link
            exact
            active-class="nuxt-link_active"
            class="nuxt-link white--text"
            :to="switchLocalePath(locale.code)"
            v-text="locale.name"
          />
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-app-bar>
</template>

<script>
import config from "assets/config/config";

export default {
  name: "app-navbar",
  data() {
    return {
      disabled: true,
      defaultValueLang: {
        text: 'English',
        value: 'en'
      },
      listLanguages: [
        {
          text: 'Russian',
          value: 'ru'
        },
        {
          text: 'English',
          value: 'en'
        }
      ],
    }
  },
  computed: {
    availableLocales() {
      return this.$i18n.locales
    },
    listLinks() {
      const currentWords = config[this.$i18n.locale]
      return [
        {
          label: currentWords.convert,
          link: `/${this.$i18n.locale}`,
        },
        {
          label: currentWords.current,
          link: `/${this.$i18n.locale}/current`,
        },
      ]
    },
  },
}
</script>

<style lang="scss">

.v-toolbar {
  padding: 20px 15px;
}

.v-toolbar__title {
  min-width: 150px;
}

.v-list {
  padding: 0;
}

.v-list-item {
  min-height: auto;
}

.nuxt-link {
  padding: 12px 16px;
  min-width: 150px;
  text-decoration: none;
  text-align: center;
  white-space: nowrap;
  height: 100%;
  width: 100%;
  transition: background .2s linear;
  text-transform: uppercase;

  &:hover {
    background: #343434;
    transition: background .2s linear;
  }
}

.nuxt-link_active {
  background: rgba(101, 101, 101, 0.4);
}

@media screen and (max-width: 1263px) {
  .nuxt-link {
    font-size: 14px;
    min-width: 132px;
    padding: 8px 12px;
    height: auto;
  }
}

@media screen and (max-width: 960px) {

  .v-toolbar {
    padding: 6px 8px;
  }

  .v-toolbar__title {
    margin-bottom: 15px;
  }

  .v-toolbar__content {
    flex-direction: column;
    align-items: flex-start;
  }

  .v-list:not(:last-child) {
    margin-bottom: 10px;
  }

  .nuxt-link {
    min-width: 120px;
    font-size: 14px;
  }
}
</style>
