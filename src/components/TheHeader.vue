<template>
  <SfHeader
    cart-icon="empty_cart"
    :cart-items-qty="cartTotalItems"
    account-icon=""
    @click:cart="$router.push('/cart')"
    @click:wishlist="alert('@click:wishlist')">
    <template #logo>
      <g-link to="/">
        <g-image
          src="@/favicon.png"
          width="40" />
      </g-link>
    </template>
    <template #navigation>
      <SfHeaderNavigationItem
        v-for="item in collections"
        :key="item.id">
        <g-link
          class="sf-link"
          :to="item.slug">
          {{ item.name }}
        </g-link>
      </SfHeaderNavigationItem>
    </template>
    <template #menu>
      <SfHeaderNavigationItem
        v-for="item in []"
        :key="item.id">
        <g-link
          class="sf-link"
          :to="item.connectedObject.uri">
          {{ item.label }}
        </g-link>
      </SfHeaderNavigationItem>
    </template>
    <template #search>
      &nbsp;
    <!-- <SfSearch aria-label="search" /> -->
    </template>
  </SfHeader>
</template>

<script>
// Components
import { SfHeader } from '@storefront-ui/vue'
// import SfSearch from '@/components/Storefront/SfSearchBar'

export default {
  name: 'TheHeader',
  components: { SfHeader },
  computed: {
    metadata () { return this.$static.metadata },
    collections () { return this.$static.elliot.node.collections.edges.map(({ node }) => ({ ...node, slug: `/collection/${node.slug}` })) },
    cartTotalItems () { return this.$store.getters.cartTotalItems.toString() }
  },
  methods: {
    getImage ({ mobile, desktop }) {
      return { mobile: { url: mobile }, desktop: { url: desktop } }
    }
  }
}
</script>

<static-query>
query {
  metadata {
    siteName
  }
  elliot {
    node (id: "RG9tYWluTm9kZTo0OTY") {
      ...on Elliot_DomainNode {
        collections {
          edges {
            node {
              id
              name
              slug
            }
          }
        }
      }
    }
  }
}
</static-query>

<style lang="scss">
.sf-header {
  z-index: 10;
  --search-bar-border-width: 0 0 1px 0;
  --search-bar-border-color: var(--c-dark-variant);
  .sf-link {
    width: max-content;
  }
}
</style>
