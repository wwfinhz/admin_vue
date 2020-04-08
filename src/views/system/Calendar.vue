<template>
  <div class="calenarcss">
      <el-calendar v-model="value">
      </el-calendar>
  </div>
</template>

<script>
export default {
    data() {
      return {
        value: new Date()
      }
    }
}
</script>

<style>
    .calenarcss{
        margin-top: 5%;
    }
</style>