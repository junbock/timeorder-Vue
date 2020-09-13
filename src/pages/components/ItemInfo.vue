<template>
  <div style="padding-top:60px">
    <div style="width:1600px; margin: 0 auto; display:block;">
      <a href="#none">
        <img
          v-bind:src="store.uploadFile[store.uploadFile.length-1].fileUri"
          style="position:relative; width:1600px; height:250px; margin:0 auto; display:block;"
          alt="banner"
        />
      </a>
    </div>
    <!-- <div class="page-header page-header-small">
      <img v-bind:src = "store.uploadFile[1].fileUri"/>
    </div>-->
    <div class="container" style="padding-top:20px; width:1600px; margin: 0 auto; display:block;">
      <div class="row col-lg-6 col-md-12" style="margin:8px">
        <h3>
          <i class="now-ui-icons location_pin"></i>
          {{store.detail_address}}
        </h3>
      </div>
      <div class="row">
        <div class="col-lg-6 col-md-12" style="padding-bottom:20px">
          <img
            class="img-raised"
            v-bind:src="item.uploadFile.fileUri"
            alt="Image"
            style="height:480px"
          />
        </div>

        <div class="col-lg-6 col-md-12">
          <h2>
            <strong>{{item.itemName}}</strong>
            <small class="pull-right">잔여수량 : {{item.itemCount}}</small>
            <hr style="border: 1px solid orange;" />
          </h2>

          <h5>
            <i class="now-ui-icons business_bulb-63" style="padding-right:6px"></i>
            {{item.itemInfo}}
          </h5>

          <div class="row ml-auto mr-auto" style="padding-left:30px">
            <h1 style="color:red;">
              <strong>{{Number((item.beforePrice-item.afterPrice)*100/item.beforePrice)}}% sale</strong>
            </h1>
            <div class="row ml-auto mr-auto">
              <h3 class="description">
                <s>{{item.beforePrice}}원</s>
              </h3>
              <h3 style="padding-left:8px;padding-right:8px">-></h3>
              <h3>
                <strong>{{item.afterPrice}}원</strong>
              </h3>
            </div>
          </div>

          <div class="mr-auto ml-auto">
            <n-button type="primary" round simple size="lg" @click="buyItem()">
              <i class="now-ui-icons shopping_credit-card" style="padding-right:8px"></i> 구매하기
            </n-button>
          </div>
        </div>
      </div>
    </div>
    <div class="container" style="padding-top:20px;">
      <div class="col-lg-12 col-md-12">
        <h2>
          {{store.storeName}}
          <hr style="border: 1px solid black;" />
        </h2>
        <div class="row">
          <div class="col-lg-6 col-md-12" style="padding-bottom:20px;">
            <div style="margin-left:50px;margin-right:50px;">
              <h4>
                <i class="now-ui-icons education_paper" style="padding-right:8px"></i>소개
              </h4>
              <p>{{store.storeInfo}}</p>
            </div>
            <div style="margin-left:50px;margin-right:50px;">
              <h4>
                <i class="now-ui-icons shopping_shop" style="padding-right:8px"></i>전화번호
              </h4>
              <p>{{store.storeNum}}</p>
            </div>
            <div style="margin-left:50px;margin-right:50px;">
              <h4>
                <i class="now-ui-icons sport_user-run" style="padding-right:8px"></i>영업시간
              </h4>
              <p>{{store.openTime}}:00 ~ {{store.closeTime}}:00</p>
            </div>
          </div>
          <div class="col-lg-6 col-md-12" style="padding-bottom:20px">
            <div id="app">
              <div id="map" style="width:600px;height:500px;"></div>
            </div>
          </div>
        </div>
        <br />
        <br />
        <hr style="border: 1px solid orange;" />
        <br />
        <el-carousel class="card" height="500px">
          <div v-for="(item, index) in store.items" :key="index">
            <el-carousel-item v-if="item.uploadFile">
              <img
                class="d-block ml-auto mr-auto"
                v-bind:src="item.uploadFile.fileUri"
                alt="First slide"
              />
            </el-carousel-item>
          </div>
        </el-carousel>
      </div>
    </div>
  </div>
</template>

<script>
import {
  Parallax,
  Button,
  Checkbox,
  Radio,
  FormGroupInput,
  Slider,
  Switch,
} from "@/components";
import { Carousel, CarouselItem } from "element-ui";
import axios from "axios";
const storage = window.sessionStorage;

export default {
  components: {
    //Parallax,
    [Carousel.name]: Carousel,
    [CarouselItem.name]: CarouselItem,
    [Button.name]: Button,
    [Checkbox.name]: Checkbox,
    [Radio.name]: Radio,
    [FormGroupInput.name]: FormGroupInput,
    [Switch.name]: Switch,
    [Option.name]: Option,
  },
  data() {
    return {
      locate: "",
      item: "",
      store: "",
      map: "",
      infowindow: "",
    };
  },
  mounted() {
    let id = storage.getItem("item");
    if (id == null) {
      location.href = "/#";
    } else {
      let vm = this;
      axios
        .get("http://127.0.0.1:80/items/" + id)
        .then((res) => {
          vm.item = res.data;
          console.log(vm.item);
        })
        .catch((e) => {
          alert("상품 불러오기 실패");
          location.href = "/#";
        });
      axios
        .get("http://127.0.0.1:80/stores/item/" + id)
        .then((res) => {
          vm.store = res.data;
          console.log(vm.store);
        })
        .catch((e) => {
          alert("가게 불러오기 실패");
          location.href = "/#";
        });
        if (window.kakao && window.kakao.maps) {
      this.initMap();
    } else {
      const script = document.createElement("script");
      /* global kakao */
      script.src =
        "http://dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=35697232dca026f5f07df33e2990f371&libraries=services,clusterer,drawing";
      script.onload = () => kakao.maps.load(this.initMap);
      document.head.appendChild(script);
    }
    }
  },
  methods: {
    buyItem() {
      let vm = this;
      axios
        .get("http://127.0.0.1:80/members/" + storage.getItem("login_id"), {
          headers: {
            "jwt-auth-token": storage.getItem("jwt-auth-token"),
          },
        })
        .then((res) => {
          axios
            .post(
              "http://127.0.0.1:80/buyitems/item/" + storage.getItem("item"),
              {},
              {
                headers: {
                  "jwt-auth-token": storage.getItem("jwt-auth-token"),
                },
              }
            )
            .then((res) => {
              alert("구매 성공");
              location.reload();
            })
            .catch(function () {
              alert("구매 실패");
            });
        })
        .catch(function () {
          alert("로그인 해주세요.");
          return;
        });
    },
    initMap() {
      this.infowindow = new kakao.maps.InfoWindow({ zIndex: 1 });
      var mapContainer = document.getElementById("map"),
        mapOption = {
          center: new kakao.maps.LatLng(37.3968027500691, 126.920941421328), //고객이 등록한 정보가 default
          level: 6,
        };

      this.map = new kakao.maps.Map(mapContainer, mapOption);
      var geocoder = new kakao.maps.services.Geocoder();
      geocoder.addressSearch(this.store.detail_address, this.placesSearchCB);
    },

    placesSearchCB: function (position, status) {
      if (status === kakao.maps.services.Status.OK) {
        console.log(position, "여기서 데이터 뽑으면 됨")
        this.coords = new kakao.maps.LatLng(position[0].y, position[0].x);

        var marker = new kakao.maps.Marker({
          map: this.map,
          position: this.coords,
        });
        var infowindow = new kakao.maps.InfoWindow({
          content:
            '<div style="width:150px;text-align:center;padding:6px 0;">' + this.store.storeName + '</div>',
        });
        infowindow.open(this.map, marker);
        this.map.setCenter(this.coords);
      }
    },

    displayMarker: function (place) {
      console.log(place);
      var window = this.infowindow;
      var map = this.map;
      var marker = new kakao.maps.Marker({
        map: this.map,
        position: new kakao.maps.LatLng(place.y, place.x),
      });

      kakao.maps.event.addListener(marker, "click", function () {
        window.setContent(
          '<div style="padding:5px;font-size:12px;">' +
            place.place_name +
            "</div>"
        );
        window.open(map, marker);
      });
    },
  },
};
</script>