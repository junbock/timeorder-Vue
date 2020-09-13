<template>
  <div style="padding-top:100px">
   <h2> 타이틀</h2>
   <p><img v-bind:src="postData[0].img"></p>
   <p>글쓴이{{postData[0].author}}></p>
   <p>{{postData[0].caption}}></p>
  </div>
</template>
<script>
export default {
  name : 'post',
  data() {
    return {
      postData: Object
    }
  }
}
</script>
<style>

</style>
