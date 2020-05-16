<template>
  <div class="sf-search-bar">
    <div
      class="search-results"
      :class="{'active': searchQuery && searchResults.length}">
      <g-link
        v-for="result in searchResults"
        :key="result.id"
        class="result sf-link"
        :to="result.path">
        {{ result.name }}
      </g-link>
    </div>
    <input
      v-model="searchQuery"
      v-click-outside="clearResults"
      aria-label="Search"
      name="search"
      class="sf-search-bar__input"
      type="search"
      placeholder="Search for a product"
      @keyup.esc="searchQuery = ''">
    <!-- @slot -->
    <slot name="icon">
      <span class="sf-search-bar__icon">
        <SfIcon
          color="#737680"
          icon="M19.6679 18.1085L16.0788 14.5457C18.8811 10.9579 18.5864 5.84813 15.3652 2.62884C13.6692 0.933843 11.4063 0 8.99786 0C6.5882 0 4.32646 0.933892 2.63049 2.62884C0.934428 4.32384 0 6.58526 0 8.99222C0 11.4004 0.934477 13.6607 2.63049 15.3556C4.32656 17.0506 6.58938 17.9844 8.99786 17.9844C10.9897 17.9844 12.9568 17.3212 14.5298 16.0677L18.0948 19.6804C18.3157 19.9011 18.5865 20 18.8814 20C19.1762 20 19.4471 19.8771 19.6679 19.6804C20.1107 19.2629 20.1107 18.5507 19.6679 18.1082L19.6679 18.1085ZM15.784 8.99222C15.784 10.8101 15.0714 12.5061 13.7921 13.7836C12.5138 15.061 10.7928 15.7742 8.99779 15.7742C7.20274 15.7742 5.4817 15.062 4.20345 13.7836C2.92516 12.5061 2.21157 10.7861 2.21157 8.99222C2.21157 7.17437 2.92418 5.47833 4.20345 4.20089C5.48174 2.9234 7.20274 2.21025 8.99779 2.21025C10.8168 2.21025 12.5139 2.92242 13.7921 4.20089C15.0704 5.47934 15.784 7.17447 15.784 8.99222Z"
          view-box="0 0 20 20" />
      </span>
    </slot>
  </div>
</template>
<script>
// Components
import { SfIcon } from '@storefront-ui/vue'

// Packages
import ClickOutside from 'vue-click-outside'

export default {
  name: 'SfSearchBar',
  components: { SfIcon },
  directives: { ClickOutside },
  inheritAttrs: false,
  data: () => ({ searchQuery: '' }),
  computed: {
    searchResults () {
      const query = this.searchQuery
      if (!query.length) return []
      const results = this.$search.search({ query, suggest: true, limit: 5, boost: 5, depth: 3 })
      console.log(results)
      return results.map(result => {
        if (result.index === 'Product') return { ...result, path: result.node.link.replace(process.env.GRIDSOME_SOURCE_URL, '') }
        return { ...result, path: result.node.uri }
      })
    }
  },
  methods: {
    clearResults () {
      this.searchQuery = ''
    }
  }
}
</script>

<style lang="scss">
@import "~@storefront-ui/shared/styles/components/molecules/SfSearchBar.scss";

.search-results {
  position: absolute;
  bottom: 0;
  width: 100%;
  transform: translateY(100%);
  display: none;
  flex-direction: column;
  background-color: var(--c-light-variant);
  padding: 1rem 0;
  box-shadow: 0px 1px 5px -1px rgba(0, 0, 0, 0.55);
  &.active {
    display: flex;
  }
  .result {
    padding: 0.5rem;
    --link-font-size: var(--font-base);
    &:hover {
      background-color: var(--c-light);
    }
  }
}
</style>
