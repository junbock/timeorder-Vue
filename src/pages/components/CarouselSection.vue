<template>
  <div class="main">
    <div class="inner" style="margin:0 auto; display:block; text-align:center;">
      <div class="section" id="carousel" style="margin:0 auto; display:block; width:1628px;">
        <div class=container-fluid>
          <div class="row justify-content-center">
            <div class=col-12>
              <el-carousel>
                <el-carousel-item>
                  <img class="d-block" src="img/main_image00.jpg" alt="First slide" />
                  <div class="carousel-caption d-none d-md-block">
                  </div>
                </el-carousel-item>
                <el-carousel-item>
                  <img class="d-block" src="img/main_image01.jpg" alt="Second slide" />
                  <div class="carousel-caption d-none d-md-block">
                  </div>
                </el-carousel-item>
                <el-carousel-item>
                  <img class="d-block" src="img/main_image02.jpg" alt="Third slide" />
                  <div class="carousel-caption d-none d-md-block">
                  </div>
                </el-carousel-item>
              </el-carousel>
            </div>
          </div>
        </div>
      </div>
        <div style="width:1600px; margin: 0 auto; display:block;">
          <a href="#none"><img src="/img/timeorder.png" style="position:relative; width:1600px; height:250px; margin:0 auto; display:block;" alt="banner"/></a>
        </div> <!-- 타임특가 로고 작성 -->       
        <div class="main-box01" style="height:600px; margin: 0 auto 220px; width:1200px; position:relative; bottom:50px;" >
          <div class="xans-element- xans-product xans-product-listmain-1 xans-product-listmain xans-product-1 ec-base-product main-motion">
            <h2 class="main-tit main-motion">
              <a href="/#/moreitem" style="font-size:23px; text-align:right; top:-30px; right:15px;">더보기</a>
            </h2>
            <ul class="prdList grid3 main-motion" style="position:relative; padding-top:20px">
              <li v-for="(item, index) in itemfilter" :key="index">
                <div class="thumbnail">
                  <div class="prdImg">
                    <a href="javascript:void(0);" name="anchorBoxName_9" @click="selectItem(item.itemId);">
                    <img v-if="!item.uploadFile" src="img/noimg.gif"
                      id="eListPrdImage9_2" 
                      alt="건강에 좋은 그린 샐러드" 
                      style="height:250px"/>
                      <img v-else v-bind:src="item.uploadFile.fileUri"
                      id="eListPrdImage9_2"
                      alt="건강에 좋은 그린 샐러드" 
                      style="height:250px"/>
                    </a>
                  </div>
                </div>
                <div class="description">
                  <div>
                    <strong class="name">
                      <a href="javascript:void(0);" @click="selectItem(item.itemId);">
                      <span style="font-size:18px;color:#000000;">
                        {{item.itemName}}
                      </span></a>
                    </strong>
                    <ul class="xans-element- xans-product xans-product-listitem-1 xans-product-listitem xans-product-1 spec">
                      <li class=" xans-record-">
                        <span style="font-size:16px;color:#999999;">
                          {{item.itemInfo}}
                        </span>
                      </li>
                      <li class=" xans-record-">
                        <strong >
                          <span style="font-size:20px;color:#000000;font-weight:bold;">판매가:</span>
                        </strong> 
                        <span style="font-size:20px;color:#000000;font-weight:bold;">{{item.afterPrice}}원</span>
                        <span id="span_product_tax_type_text" /></li>
                          <li class=" xans-record-">
                            <strong >
                              <span style="font-size:15px;color:#848484;">소비자가:</span>
                            </strong> 
                            <span style="font-size:15px;color:#848484;text-decoration:line-through;">{{item.beforePrice}}</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </li>
            </ul>
          </div>
      </div>
    </div>
  </div>
</template>
<script>

import { Carousel, CarouselItem } from 'element-ui';
import axios from "axios";
const storage = window.sessionStorage;

export default {
  components: {
    [Carousel.name]: Carousel,
    [CarouselItem.name]: CarouselItem
  },
  data() {
    return {
      address:[],
      items:[],

    }
  },
  methods: {
    selectItem(id) {
      storage.setItem("item", id);
      location.href="/#/iteminfo"
    }
  },
  computed: {
    itemfilter() {
      console.log(this.items.slice(0,4));
      return this.items.slice(0,4);
    }
  },
  mounted() {
    let vm = this;
    axios
        .get("http://127.0.0.1:80/items")
        .then((res) => {
          vm.items = res.data;
          console.log(vm.items);
        })
        .catch((e) => {
          alert("상품 불러오기 실패");
        });
  }
};
</script>
<style>
.main-box01 {
  padding-top: 30px;
}
.main-box01 .main-tit {
  text-align: left;
}
.main-box01 .ec-base-product ul.grid3 > li {
  width: 260px;
  margin: 0 45px 55px 0;
}
.main-box01 .ec-base-product ul.grid3 > li:nth-child(4n) {
  margin-right: 0;
}
.main-box01 .ec-base-product .prdList .thumbnail {
  margin: 0 0 20px;
}
.main-box01 .ec-base-product .prdList .thumbnail .prdImg {
  overflow: hidden;
}
.main-box01 .ec-base-product .prdList .prdImg > a > img {
  -khtml-transition: all 0.3s ease;
  -moz-transition: all 0.3s ease;
  -ms-transition: all 0.3s ease;
  -o-transition: all 0.3s ease;
  transition: all 0.3s ease;
}
.main-box01 .ec-base-product .prdList > li:hover .prdImg > a > img {
  -moz-transform: scale(1.1);
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
.main-box01 .ec-base-product .spec li:nth-child(2) span {
  font-size: 30px !important;
  letter-spacing: -1.5px;
}
html,
body,
div,
dl,
dt,
dd,
ul,
ol,
li,
h1,
h2,
h3,
h4,
h5,
h6,
pre,
code,
form,
fieldset,
legend,
input,
textarea,
p,
blockquote,
th,
td,
img {
  margin: 0;
  padding: 0;
}
html {
  width: 100%;
  height: 100%;
}
body,
code {
  font: 0.75em Verdana, Dotum, AppleGothic, sans-serif;
  color: #353535;
  background: #fff;
}
body#popup {
  min-width: 0;
}
li {
  list-style: none;
}
ul li a:hover {
  opacity: 0.7;
}
.ec-base-product .title {
  margin: 0 0 17px;
}
.ec-base-product img {
  vertical-align: middle;
}
.ec-base-product .prdList > li {
  position: relative;
  display: inline-block;
  margin: 30px 0 20px;
  color: #757575;
  vertical-align: top;
}
.ec-base-product .prdList .chk {
  position: absolute;
  top: -10px;
  left: 0;
  right: 0;
  display: block;
  margin: 0 0 10px;
}
.ec-base-product .prdList .thumbnail {
  position: relative;
  margin: 10px 7px;
  text-align: center;
}
.ec-base-product .prdList .thumbnail .prdImg {
  position: relative;
}
.ec-base-product .prdList .thumbnail a img {
  max-width: 100%;
  box-sizing: border-box;
}
.ec-base-product .prdList .thumbnail .wish {
  position: absolute;
  right: 3px;
  bottom: 4px;
  z-index: 1;
  cursor: pointer;
}
.ec-base-product .prdList .thumbnail .prdIcon {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-repeat: no-repeat;
}
.ec-base-product ul.grid2 > li {
  width: 50%;
}
.ec-base-product ul.grid3 > li {
  width: 33.33%;
}
.ec-base-tab.grid2 .menu li {
  width: 50.5%;
}
.ec-base-tab.grid3 .menu li {
  width: 34%;
}
.ec-base-product .prdList .thumbnail {
  overflow: hidden;
  margin: 10px 9px 20px;
  border-radius: 20px;
}
.ec-base-product .prdList .thumbnail .icon {
  border-bottom: 0;
}
.ec-base-product .prdList > li:hover .thumbnail .wish,
.ec-base-product .prdList > li:hover .thumbnail .basket {
  display: inline-block;
}
.ec-base-product .prdList .thumbnail .wish {
  display: none;
  position: absolute;
  bottom: 70px;
  right: 20px;
}
.ec-base-product .prdList .thumbnail .basket {
  display: none;
  position: absolute;
  bottom: 20px;
  right: 20px;
  cursor: pointer;
}
.ec-base-product .prdList .thumbnail .sale_rate {
  position: absolute;
  top: 0;
  right: 0;
  width: 46px;
  height: 46px;
  border-radius: 0 20px 0 0;
  color: #fff;
  font-size: 20px;
  line-height: 46px;
}
.boardMain td img {
  vertical-align: middle;
  margin: 1px;
}
[class^="btn"] img {
  margin: -2px 1px 0;
  vertical-align: middle;
}
#quick .xans-layout-productrecent .player img {
  float: none;
}
div.ec-base-help ol .item1 {
  background-position: -484px 0;
}
div.ec-base-help ol .item2 {
  background-position: -434px -100px;
}
.main-motion {
  position: relative;
  top: 40px;
  opacity: 0;
}
@-webkit-keyframes TransY {
  0% {
    opacity: 0;
    -webkit-transform: translateY(60px);
    transform: translateY(60px);
  }
  100% {
    opacity: 1;
    -webkit-transform: translateY(0);
    transform: translateY(0);
  }
}
@keyframes TransY {
  0% {
    opacity: 0;
    -webkit-transform: translateY(60px);
    transform: translateY(60px);
  }
  100% {
    opacity: 1;
    -webkit-transform: translateY(0);
    transform: translateY(0);
  }
}
.main-slide {
  position: relative;
  height: 500px;
  overflow: hidden;
}
.main-slide .cycle-slideshow {
  position: absolute;
  top: 0;
  left: 50%;
  margin-left: -1000px;
  width: 2000px;
}
.main-slide .main-slide-btn {
  position: relative;
  max-width: 1400px;
  width: 100%;
  height: 500px;
  margin: auto;
}
.main-slide .main-slide-btn > a {
  position: absolute;
  top: 50%;
  z-index: 70;
}
.main-slide .main-slide-btn #mTprev {
  left: 10px;
}
.main-slide .main-slide-btn #mTnext {
  right: 10px;
}
.main-slide .main-slide-pager {
  position: absolute;
  bottom: 35px;
  text-align: center;
  width: 100%;
  z-index: 51;
  cursor: pointer;
}
.main-slide .main-slide-pager > span {
  display: inline-block;
  margin: 0 6px;
  width: 12px;
  height: 12px;
  border-radius: 100%;
  text-indent: -9999px;
  background: #c0c0c0;
  opacity: 0.7;
  vertical-align: top;
}
.main-slide .main-slide-pager .cycle-pager-active {
  width: 6px;
  height: 6px;
  background: none;
  border: 3px solid #717171;
  opacity: 1;
}
.main-slide .pause-btn {
  position: absolute;
  bottom: 27px;
  left: 50%;
  z-index: 51;
  margin-left: 45px;
  cursor: pointer;
}
.main-slide .pause-btn #resume {
  display: none;
}
.main-slide .cycle-slideshow > div ul {
  position: absolute;
  top: 138px;
  left: 456px;
}
.main-slide .cycle-slideshow > div ul > li {
  position: relative;
  top: 0;
  opacity: 0;
}
.main-slide .cycle-slideshow > div.cycle-slide-active ul > li {
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  -webkit-animation: TransY 1s ease-out both;
  animation: TransY 1s ease-out both;
}
.main-slide .cycle-slideshow > div.cycle-slide-active ul > li:first-child {
  -webkit-animation-delay: 0.25s;
  animation-delay: 0.25s;
}
.main-slide .cycle-slideshow > div.cycle-slide-active ul > li:nth-child(2) {
  -webkit-animation-delay: 0.65s;
  animation-delay: 0.65s;
}
.main-slide .cycle-slideshow > div.cycle-slide-active ul > li:nth-child(3) {
  -webkit-animation-delay: 1.05s;
  animation-delay: 1.05s;
}
.main-slide .cycle-slideshow > div.cycle-slide-active ul > li:nth-child(4) {
  -webkit-animation-delay: 1.45s;
  animation-delay: 1.45s;
}
.main-slide .cycle-slideshow ul > li:nth-child(2) {
  padding-top: 16px;
}
.main-slide .cycle-slideshow ul > li:nth-child(3) {
  padding-top: 24px;
}
.main-tit {
  position: relative;
  color: #2b2b2b;
  text-align: center;
  line-height: 1.2;
}
.main-tit strong {
  display: block;
  padding: 30px 0 20px;
  font-size: 32px;
}
.main-tit span {
  display: block;
  padding: 20px 0 55px;
  font-size: 30px;
  color: #fff;
  font-weight: 300;
  letter-spacing: 3px;
}
.main-tit span:before {
  content: "";
  position: absolute;
  top: 0;
  left: 50%;
  display: block;
  width: 38px;
  height: 2px;
  margin-left: -19px;
  background: #fff;
}
.main-tit a {
  position: absolute;
  top: 40px;
  right: 0;
  padding-right: 15px;
  background: url("/images/main_more.png") no-repeat right center;
  font-size: 18px;
  font-weight: 300;
  color: #888888;
}
.main .ec-base-product {
  margin: 0;
}

</style>
