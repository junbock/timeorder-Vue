<template>
  <div class="index_vue" style="height:2900px;">
    <carousel-section></carousel-section>
    <navigation></navigation>
    <progress-pagination></progress-pagination>
    <tabs-section></tabs-section><br><br>
  </div>
    <!-- <notifications></notifications>
    <typography></typography>
    <javascript-components></javascript-components>
    <nucleo-icons-section></nucleo-icons-section>
    
    <signup-form></signup-form>
    <examples-section></examples-section>
    <download-section></download-section> -->
</template>
<script>
import CarouselSection from './components/CarouselSection';
import Navigation from './components/Navigation';
import ProgressPagination from './components/ProgressPagination';
import TabsSection from './components/Tabs';
// import Notifications from './components/Notifications';
// import Typography from './components/Typography';
// import JavascriptComponents from './components/JavascriptComponents';
// import NucleoIconsSection from './components/NucleoIconsSection';
// import SignupForm from './components/SignupForm';
// import ExamplesSection from './components/ExamplesSection';
// import DownloadSection from './components/DownloadSection';

export default {
  name: 'index',
  bodyClass: 'index-page',
  components: {
    CarouselSection,
    Navigation,
    ProgressPagination,
    TabsSection,
    // Notifications,
    // Typography,
    // JavascriptComponents,
    // NucleoIconsSection,
    // SignupForm,
    // ExamplesSection,
    // DownloadSection
  }
};
</script>
<style>
.index_vue {
  position:relative;
  min-width: 1480px;
  
}
</style>