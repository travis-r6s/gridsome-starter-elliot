<template>
  <div class="layout">
    <TheHeader />
    <slot />
  </div>
</template>

<script>
// Components
import TheHeader from '@/components/TheHeader'

export default {
  name: 'MainLayout',
  components: { TheHeader }
}
</script>
