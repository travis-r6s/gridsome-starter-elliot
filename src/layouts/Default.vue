<template>
  <div class="layout">
    <TheHeader />
    <TheSidebar />
    <slot />
    <TheFooter />
  </div>
</template>

<script>
// Components
import TheHeader from '@/components/TheHeader'
import TheSidebar from '@/components/TheSidebar'
import TheFooter from '@/components/TheFooter'

export default {
  name: 'MainLayout',
  components: { TheHeader, TheSidebar, TheFooter }
}
</script>
