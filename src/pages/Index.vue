<template>
  <Layout>
    <SfHero>
      <SfHeroItem
        v-for="(item, i) in heroItems"
        :key="i"
        :title="item.title"
        :subtitle="item.subtitle"
        :image="item.image"
        :background="item.background">
        <template #call-to-action>
          <g-link :to="item.buttonLink">
            <SfButton>
              {{ item.buttonText }}
            </SfButton>
          </g-link>
        </template>
      </SfHeroItem>
    </SfHero>
    <br>
    <br>
    <div class="container-fluid">
      <SfBannerGrid :banner-grid="1">
        <template
          v-for="item in bannerItems"
          v-slot:[item.slot]>
          <SfBanner
            :key="item.slot"
            :title="item.title"
            :subtitle="item.subtitle"
            :description="item.description"
            :button-text="item.buttonText"
            :image="item.image"
            :class="item.class"
            :style="item.style">
            <template #call-to-action>
              <g-link :to="item.buttonLink">
                <SfButton>
                  {{ item.buttonText }}
                </SfButton>
              </g-link>
            </template>
          </SfBanner>
        </template>
      </SfBannerGrid>
      <br>
      <br>
      <SfCallToAction
        title="Subscribe to Newsletters"
        description="Be aware of upcoming sales and events. Receive gifts and special offers!"
        button-text="Subscribe"
        background="var(--c-dark-variant)" />
      <SfSection title-heading="Featured Products">
        <div class="container grid">
          <SfProductCard
            v-for="product in featuredProducts"
            :key="product.id"
            :image="product.image"
            :image-width="300"
            :image-height="400"
            badge-label="Featured"
            :title="product.name"
            :link="product.link"
            link-tag="g-link"
            :wishlist-icon="false"
            :is-on-wishlist-icon="null"
            :show-add-to-cart-button="false" />
        </div>
      </SfSection>
    </div>
  </Layout>
</template>

<script>
// Components
import { SfHero, SfButton, SfBannerGrid, SfBanner, SfCallToAction, SfSection, SfProductCard } from '@storefront-ui/vue'

export default {
  name: 'Home',
  metaInfo: {
    title: 'Hey!'
  },
  components: { SfHero, SfButton, SfBannerGrid, SfBanner, SfCallToAction, SfSection, SfProductCard },
  data: () => ({
    heroItems: [
      {
        title: 'Summer Essentials',
        subtitle: 'Summer Collection 2020',
        buttonText: 'View Collection',
        buttonLink: '/collection/all',
        image: {
          mobile: 'https://ik.imagekit.io/travis/Stock/clark-street-mercantile-qnKhZJPKFD8-unsplash__1__compressed_26TghN84Gj.jpg',
          desktop: 'https://ik.imagekit.io/travis/Stock/clark-street-mercantile-qnKhZJPKFD8-unsplash__1__compressed_26TghN84Gj.jpg'
        },
        background: '#ECEFF1'
      },
      {
        title: 'Home Boutiques',
        subtitle: 'View our summer boutique range',
        buttonText: 'Explore Range',
        buttonLink: '/collection/all',
        image: {
          mobile: 'https://ik.imagekit.io/travis/Stock/alexandra-gorn-JIUjvqe2ZHg-unsplash_compressed_qdLG9DXpE.jpg',
          desktop: 'https://ik.imagekit.io/travis/Stock/alexandra-gorn-JIUjvqe2ZHg-unsplash_compressed_qdLG9DXpE.jpg'
        },
        background: '#ECEFF1'
      }
    ],
    bannerItems: [
      {
        slot: 'banner-A',
        subtitle: 'Dresses',
        title: 'Cocktail & Party',
        description: "Find stunning women's cocktail dresses and party dresses. Stand out in lace and metallic cocktail dresses from all your favorite brands.",
        buttonText: 'Shop now',
        buttonLink: '/collection/women',
        image: 'https://ik.imagekit.io/travis/Stock/priscilla-du-preez-dlxLGIy-2VU-unsplash__1__compressed_tCjrt5NP82.jpg',
        class: 'sf-banner--slim'
      },
      {
        slot: 'banner-B',
        subtitle: 'Dresses',
        title: 'Linen Dresses',
        description: "Find stunning women's cocktail dresses and party dresses. Stand out in lace and metallic cocktail dresses from all your favorite brands.",
        buttonText: 'Shop now',
        buttonLink: '/collection/girls',
        image: 'https://ik.imagekit.io/travis/Stock/drew-coffman-V1w1tQC5Wk0-unsplash__1__compressed_cNlNzUXfxB.jpg',
        class: 'sf-banner--slim',
        style: '--banner-color: var(--c-light);'
      },
      {
        slot: 'banner-C',
        subtitle: 'T-Shirts',
        title: 'The Office Life',
        buttonText: 'Shop now',
        buttonLink: '/collection/unisex',
        image: 'https://ik.imagekit.io/travis/Stock/clark-street-mercantile-qnKhZJPKFD8-unsplash__1__compressed_26TghN84Gj.jpg',
        class: 'sf-banner--slim',
        style: '--banner-color: var(--c-light-variant);'
      },
      {
        slot: 'banner-D',
        subtitle: 'Summer Sandals',
        title: 'Eco Sandals',
        buttonText: 'Shop now',
        buttonLink: '/collection/men',
        image: 'https://ik.imagekit.io/travis/Stock/andrew-neel-HqtYwlY9dxs-unsplash__1__compressed_fCUu-J8qUZ.jpg',
        class: 'sf-banner--slim',
        style: '--banner-color: var(--c-light);'
      }
    ]
  }),
  computed: {
    featuredProducts () {
      return this.$page.elliot.node.products.edges.map(({ node }) => {
        const [{ node: image }] = node.images.edges
        return {
          ...node,
          link: `/product/${node.slug}`,
          image: {
            mobile: { url: image.mobile },
            desktop: { url: image.desktop }
          }
        }
      })
    }
  }
}
</script>

<page-query>
query Products {
  elliot {
    node (id: "RG9tYWluTm9kZTo0OTY") {
      __typename
      ...on Elliot_DomainNode {
        products (last: 4) {
          edges {
            node {
              id
              name
              slug
              images (first: 1) {
                edges {
                  node {
                    id
                    mobile: url(height: 100, width: 150)
                    desktop: url(height: 400, width: 300)
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}

</page-query>
