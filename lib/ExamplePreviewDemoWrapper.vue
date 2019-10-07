<template>
  <div>
    <component :is="component"/>
  </div>
</template>

<script>
  export default {
    props: {
      component: {
        required: true,
        type: Object
      }
    }
  }
</script>
