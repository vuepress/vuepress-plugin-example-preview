<template>
  <div>
    The counter is at {{ counter }}
    <br>
    <button @click="counter++">Increment</button>
    <button @click="counter--">Decrement</button>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        counter: 0
      }
    },
  }
</script>
