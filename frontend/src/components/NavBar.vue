<template>
  <nav>
    <div class="full-width">
      <router-link to="/">{{linkNames.home}}</router-link>
      <router-link to="/getting-started">{{linkNames.gettingStarted}}</router-link>
      <router-link to="/router">{{linkNames.router}}</router-link>
      <router-link to="/vuex-store">{{linkNames.store}}</router-link>
      <router-link to="/vue-tagmanager">{{linkNames.gtm}}</router-link>
      <router-link to="/translations">{{linkNames.translations}}</router-link>
    </div>
  </nav>
</template>

<script>

export default {
  name: 'NavBar',
  computed: {
    linkNames() {
      return this.$store.getters['translations/getGlobalTranslation']('links');
    }
  }
}
</script>

<style lang="scss" scoped>
nav {
  padding: 24px 0;

  a {
    margin-right: 16px;
    font-family: 'Barlow';
    font-weight: 700;
    color: black;
    text-decoration: none;

    &.router-link-exact-active {
      text-decoration: underline;
    }

    &:hover {
      text-decoration: underline;
    }
  }

  &.inverted {
    a {
      color: white;
    }
  }
}
</style>
