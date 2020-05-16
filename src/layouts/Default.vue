<template>
  <div class="layout">
    <TheHeader />
    <slot />
    <TheFooter />
  </div>
</template>

<script>
// Components
import TheHeader from '@/components/TheHeader'
import TheFooter from '@/components/TheFooter'

export default {
  name: 'MainLayout',
  components: { TheHeader, TheFooter }
}
</script>
