<template>
  <div class="page-header clear-filter" filter-color="orange">
    <div class="page-header-image" style="background-image: url('img/login_back.jpg')"></div>
    <div class="content">
      <div class="container">
        <div class="col-md-5 ml-auto mr-auto">
          <card type="login" plain>
            <div slot="header" class="logo-container">
              <img v-lazy="'img/login_logo.png'" alt />
            </div>

            <fg-input
              class="no-border input-lg"
              addon-left-icon="now-ui-icons users_circle-08"
              placeholder="전화번호"
              @keydown.enter="login()"
              v-model="phone"
              style="margin:0px; padding-bottom:0px"
            ></fg-input>

            <fg-input
              class="no-border input-lg"
              type="password"
              addon-left-icon="now-ui-icons objects_key-25"
              placeholder="비밀번호"
              @keydown.enter="login()"
              v-model="pw"
              style="margin:0px; padding-bottom:0px"
            ></fg-input>

            <template slot="raw-content" >
              <div class="card-footer text-center" >
                <a
                
                  href="javascript:void(0);"
                  class="btn btn-primary btn-round btn-lg btn-block"
                  @click="login()"
                >로그인</a>
              </div>
              <div class="pull-left">
                <h5>
                  <a href="/#/register" class="link footer-link">회원가입</a>
                </h5>
              </div>
              <div class="pull-right">
                <h5>
                  <a href="javascript:alert('비밀번호 생각난다 생각난다');" class="link footer-link">비밀번호 찾기</a>
                </h5>
              </div>
            </template>
          </card>
        </div>
      </div>
    </div>
    <main-footer></main-footer>
  </div>
</template>
<script>
import axios from "axios";
import { Card, Button, FormGroupInput } from "@/components";
import MainFooter from "@/layout/MainFooter";
const storage = window.sessionStorage;
export default {
  name: "login-page",
  bodyClass: "login-page",
  components: {
    Card,
    MainFooter,
    [Button.name]: Button,
    [FormGroupInput.name]: FormGroupInput,
  },
  data() {
    return {
      phone: "",
      pw: "",
    };
  },
  methods: {
    login() {
      storage.setItem("jwt-auth-token", "");
      storage.setItem("login_id", "");

      if (this.phone.length == 0) {
        alert("전화번호를 입력하세요.");
        return;
      }
      if (this.pw.length == 0) {
        alert("비밀번호를 입력하세요.");
        return;
      }

      axios
        .post("http://127.0.0.1:80/members/signin", {
          phone: this.phone,
          pw: this.pw,
        })
        .then((res) => {
          if (res.data.status) {
            this.phone = "";
            this.pw = "";
            this.message = res.data.data.phone + "로 로그인 되었습니다";
            console.log(res.data.data);

            //토큰 & phone 정보 저장
            storage.setItem("jwt-auth-token", res.data.auth_token);
            storage.setItem("login_id", res.data.data.memberId);
            this.result = true;
            location.href = "/#/";
            location.reload();
          } else {
            alert("아이디와 비밀번호가 일치하지 않습니다.");
          }
        })
        .catch((e) => {
          alert("로그인 실패");
        });
    },
  },
  mounted() {
    axios
      .get("http://127.0.0.1:80/members/" + storage.getItem("login_id"), {
        headers: {
          "jwt-auth-token": storage.getItem("jwt-auth-token"),
        },
      })
      .then((res) => {
        location.reload();
        location.href = "/#/";
      });
  },
};
</script>
<style></style>
