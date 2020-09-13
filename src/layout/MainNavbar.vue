<template>
  <navbar
    position="fixed"
    type="primary"
    :transparent="transparent"
    menu-classes="ml-auto"
  >
    <template>
      <router-link v-popover:popover1 class="navbar-brand" to="/">HOME</router-link>
    </template>
    <template slot="navbar-menu">
      <div id="app" style="position:relative; top:7px;">
        <vue-daum-postcode style="visibility:hidden; height:0"/>
      </div>
      <li class="nav-item">
        <a
          class="nav-link"
          rel="tooltip"
          title="상품보기"
          data-placement="bottom"
          @click="sample4_execDaumPostcode()"
          href="javascript:void(0);"
        >
          <i class="now-ui-icons location_pin"></i>
          <p>주소입력 : {{address}}</p>
        </a>
      </li>
      <li class="nav-item">
        <a
          class="nav-link"
          rel="tooltip"
          title="상품보기"
          data-placement="bottom"
          href="/#/moreitem"
        >
          <i class="now-ui-icons design_app"></i>
          <p>상품보기</p>
        </a>
      </li>
      <li class="nav-item"  v-if="!login">
        <a
          class="nav-link"
          rel="tooltip"
          title="회원가입"
          data-placement="bottom"
          href="/#/register"
        >
          <i class="now-ui-icons business_badge"></i>
          <p>회원가입</p>
        </a>
      </li>
      <li class="nav-item" v-if="!login">
        <a
          class="nav-link"
          rel="tooltip"
          title="로그인"
          data-placement="bottom"
          href="/#/login"
        >
          <i class="now-ui-icons users_circle-08"></i>
          <p>로그인</p>
        </a>
      </li>
      <li class="nav-item" v-if="login">
        <a
          class="nav-link"
          rel="tooltip"
          title="내정보"
          data-placement="bottom"
          href="/#/mypage"
        >
          <i class="now-ui-icons users_circle-08"></i>
          <p>내정보</p>
        </a>
      </li>
      <li class="nav-item" v-if="login" @click="logout()">
        <a
          class="nav-link"
          rel="tooltip"
          title="로그아웃"
          data-placement="bottom"
          href="javascript:void(0);"
        >
          <i class="now-ui-icons business_badge"></i>
          <p>로그아웃</p>
        </a>
      </li>
    </template>
  </navbar>
</template>
<script src="http://dmaps.daum.net/map_js_init/postcode.v2.js"></script>
<script src="//cdn.jsdelivr.net/npm/vue@2/dist/vue.js"></script>
<script src="//cdn.jsdelivr.net/npm/vue-daum-postcode/dist/index.js"></script>

<script>
import { DropDown, Navbar, NavLink } from "@/components";
import { Popover } from "element-ui";
import axios from "axios";
const storage = window.sessionStorage;
import VueDaumPostcode from "vue-daum-postcode";
import Vue from "vue"
Vue.use(VueDaumPostcode)

export default {
  name: "main-navbar",
  props: {
    transparent: Boolean,
    colorOnScroll: Number,
  },
  components: {
    //DropDown,
    Navbar,
    //NavLink,
    [Popover.name]: Popover,
  },
  data() {
    return {
      address: "",
      login: true,
    };
  },
  methods: {
    logout() {
      storage.setItem("jwt-auth-token", "");
      storage.setItem("login_id", ""); //storage/setIteim("address, xx동")
      this.isLogin();
      location.reload();
    },
    isLogin() {
      let vm = this;
      axios
        .get("http://127.0.0.1:80/members/" + storage.getItem("login_id"), {
          headers: {
            "jwt-auth-token": storage.getItem("jwt-auth-token"),
          },
        })
        .then((res) => {
          vm.login = true;
        })
        .catch(function () {
          vm.login = false;
        });
      console.log(vm.login);
    },
    sample4_execDaumPostcode:function(){
      let vm = this;
      new daum.Postcode({
        oncomplete: function(data) {
                var roadAddr = data.roadAddress; // 도로명 주소 변수
                var extraRoadAddr = ''; // 참고 항목 변수

                if(data.bname !== '' && /[동|로|가]$/g.test(data.bname)){
                    extraRoadAddr += data.bname;
                }
                if(data.buildingName !== '' && data.apartment === 'Y'){
                  extraRoadAddr += (extraRoadAddr !== '' ? ', ' + data.buildingName : data.buildingName);
                }
                if(extraRoadAddr !== ''){
                    extraRoadAddr = extraRoadAddr ;
                }

                // if(roadAddr !== ''){
                //     document.getElementById("sample4_extraAddress").value = extraRoadAddr;
                // } else {
                //     document.getElementById("sample4_extraAddress").value = '';
                // }
                storage.setItem('address', extraRoadAddr)
                vm.address = extraRoadAddr;
                console.log(storage)
                var guideTextBox = document.getElementById("guide");
                location.reload();
                // 사용자가 '선택 안함'을 클릭한 경우, 예상 주소라는 표시를 해준다.
            }
        }).open();
    },
  },
  mounted() {
    this.isLogin();
    Vue.use(VueDaumPostcode)
    this.address = storage.getItem("address");
  },
};
</script>

<style scoped></style>