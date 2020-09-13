<template>
  <footer
    class="footer"
    :class="{ [`footer-${type}`]: type }"
    :data-background-color="backgroundColor">
    <div class="container">
      <div class="copyright">
        &copy; {{ year }}, Copyright(c)
        <a href="https://www.google.com/" target="_blank" rel="noopener"
          ><strong>TimeOrder.</strong></a>
        All right reserved
      </div>
    </div>
  </footer>
</template>
<script>
export default {
  props: {
    backgroundColor: String,
    type: String
  },
  data() {
    return {
      year: new Date().getFullYear()
    };
  }
};
</script>
<style></style>