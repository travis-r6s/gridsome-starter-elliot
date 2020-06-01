<template>
  <Layout>
    <SfSection title-heading="Checkout" />
    <div class="container">
      <SfSteps
        v-model="activeStep"
        :steps="steps"
        can-go-back>
        <SfStep
          v-for="(step, key) in steps"
          :key="key"
          :name="step">
          <SfHeading
            :title="step"
            :level="3" />
        </SfStep>
      </SfSteps>
    </div>
  </Layout>
</template>

<script>
// Components
import { SfHeading, SfSection, SfSteps } from '@storefront-ui/vue'

export default {
  name: 'Checkout',
  components: { SfHeading, SfSection, SfSteps },
  data: () => ({
    activeStep: 0,
    steps: [
      'Details',
      'Shipping',
      'Payment',
      'Review'
    ]
  })
}
</script>
