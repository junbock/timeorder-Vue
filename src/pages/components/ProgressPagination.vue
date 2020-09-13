<template>
  <div class="main-box05" style="position:relative; bottom:240px; height:500px;">
    <div class="inner">
      <div style="width:1300px; margin:0 auto; display:block; position:relative; bottom:60px;"> 
        <div class="event-bn main-motion" style="float:left; display:block;">
          <h2 class="main-tit">
            <strong>이달의 이벤트!</strong>
          </h2>
          <a href="#none"><img src="/img/main_event_bn.jpg" alt="banner" /></a>
        </div>
        <div class="main-review main-motion" style="float:right; display:block;">
          <h2 class="main-tit ">
            <strong>고객후기</strong>
          </h2>
          <div
            class="xans-element- xans-board xans-board-listpackage-4 xans-board-listpackage xans-board-4 review">
            <div
              class="xans-element- xans-board xans-board-list-4 xans-board-list xans-board-4">
              <ul style="position:relative; line-height:40px;">
                <li class="xans-record-" v-for="review in reviewfilter" :key="review">
                  <a href="javascript:void(0);">
                    <div class="img"><img
                        v-bind:src="review.uploadFile.fileUri"
                        border="0"/></div>
                  </a>
                  <a href="javascript:void(0);">
                    <p style="color:black">{{review.contents}}</p>
                    <div class="writer">타임오더 | {{review.writeday}}</div>
                    <div class="star" style="color:black"><img v-bind:src=iconfilter(review.score) style="height:26px" alt="4점" />
                    &nbsp;&nbsp;{{review.score}} / 5
                    </div>
                  </a>
                </li>
              </ul>
            </div>
          </div>
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
      reviews:[],
    }
  },
  methods: {
    iconfilter(n) {
      return `/img/ico_point${n}.png`;
    },
    
  },
  computed: {
    reviewfilter() {
      console.log(this.reviews.slice(0,3));
      return this.reviews.slice(0,3);
    }
  },
  mounted() {
    let vm = this;
    axios
        .get("http://127.0.0.1:80/reviews")
        .then((res) => {
          vm.reviews = res.data;
          console.log(vm.items);
        })
        .catch((e) => {
          alert("리뷰 불러오기 실패");
        });
  }
};
</script>

<style>
.main-box05{
  padding:30px 0 60px;
  background:#f7f7f7;
  }
.main-box05 
.inner{
  overflow:hidden;
}
.main-box05 
.main-tit{
  text-align:left;
}
.main-box05 
.main-tit strong{
  color:#222222;
  font-size:22px;
}
.main-box05 
.event-bn{
  float:left;
  width:525px;
}
.main-box05 
.event-bn a{
  display:block;
}
.main-box05 
.event-bn a > img{
  max-width:100%;
  border-radius:20px;
}
.main-box05 
.main-review{
  float:right;
  width:655px;
}
.main-box05 
.main-review 
.main-tit{
  border-bottom:2px solid #343434;
}
.main-box05 
.main-review 
.review li{
  position:relative;
  overflow:hidden;
  border-bottom:1px solid #eeeeee;
}
.main-box05 
.main-review 
.review li > a{
  float:left;
}
.main-box05 
.main-review 
.review li > a 
.img{
  margin-right:30px;
}
.main-box05 
.main-review 
.review li > a 
.img img{
  width:auto;
  height:70px;
}
.main-box05 
.main-review 
.review 
.title{
  font-size:16px;
  position:relative;
  color:#080808;
}
.main-box05 
.main-review 
.review 
.content{
  width:360px;
  overflow:hidden;
  text-overflow:ellipsis;
  white-space:nowrap;
  font-size:14px;
  color:#8a8a8a;
  position: relative;
  bottom: 20px;
}
.main-box05 
.main-review 
.review 
.writer{
  position:absolute;
  top:12px;
  right:0;
  font-size:13px;
  color:#8a8a8a;
  font-weight:300;
}
.main-box05 
.main-review 
.review 
.star{
  position: relative;
  left:0;
  bottom:18px;
}
.main-box05 .main-review .review li {
    position: relative;
    overflow: hidden;
    padding: 15px 0px;
    border-bottom: 1px solid rgb(238, 238, 238);
}
</style>
