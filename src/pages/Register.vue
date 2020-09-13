<template>
  <div class="page-header clear-filter" filter-color="orange">
    <div class="page-header-image" style="background-image: url('img/login_back.jpg')"></div>
    <div class="content">
      <div class="container">
        <div id="recaptcha-container"></div>
        <div class="col-md-5 ml-auto mr-auto">
          <card type="login" plain>
            <div slot="header" class="logo-container">
              <img v-lazy="'img/login_logo.png'" alt />
            </div>
            <el-popover
            ref="popover1"
            popper-class="popover popover-primary"
            placement="right"
            width="200"
            trigger="focus"
          >
            <h3 class="popover-header">비밀번호 규칙</h3>
            <div class="popover-body">
              영문 숫자 특수문자 모두 적어도 한번를 포함한 8-20자로 만들어주세요.
            </div>
          </el-popover>

          <el-popover
            ref="popover2"
            popper-class="popover popover-primary"
            placement="right"
            width="200"
            trigger="focus"
          >
            <h3 class="popover-header">닉네임 규칙</h3>
            <div class="popover-body">
              2-12자로 만들어주세요 (한글, 영어, 숫자, 언더바 허용)
            </div>
          </el-popover>

            <fg-input
              class="no-border input-lg"
              addon-left-icon="now-ui-icons users_circle-08"
              placeholder="전화번호"
              v-model="phone"
              @click.native="modals.mini = true"
              readonly
              style="margin:0px; padding-bottom:0px"
            ></fg-input>

            <fg-input
              v-popover:popover1
              class="no-border input-lg"
              type="password"
              addon-left-icon="now-ui-icons objects_key-25"
              placeholder="비밀번호"
              v-model="pw"
              style="margin:0px; padding-bottom:0px"
              @keydown.enter="register()"
            ></fg-input>

            <fg-input
              class="no-border input-lg"
              type="password"
              addon-left-icon="now-ui-icons objects_key-25"
              placeholder="비밀번호 확인"
              v-model="confirm_pw"
              style="margin:0px; padding-bottom:0px"
              @keydown.enter="register()"
            ></fg-input>

            <fg-input
            v-popover:popover2
              class="no-border input-lg"
              addon-left-icon="now-ui-icons emoticons_satisfied"
              placeholder="닉네임"
              v-model="name"
              style="margin:0px; padding-bottom:0px"
              @keydown.enter="register()"
            ></fg-input>

            <template slot="raw-content">
              <div class="card-footer text-center">
                <a
                  href="javascript:void(0);"
                  class="btn btn-primary btn-round btn-lg btn-block"
                  @click="register()"
                >회원가입</a>
              </div>
              <div class="pull-left">
                <h6>
                  <a href="/#/login" class="link footer-link">로그인</a>
                </h6>
              </div>
              <div class="pull-right">
                <h6>
                  <a href="javascript:alert('비밀번호 생각난다 생각난다');" class="link footer-link">비밀번호 찾기</a>
                </h6>
              </div>
            </template>
          </card>
        </div>
      </div>
    </div>

    <modal
      :show.sync="modals.mini"
      class="modal-primary"
      :show-close="false"
      headerClasses="justify-content-center"
      type="mini"
    >
      <div slot="header" class="modal-profile">
        <i class="now-ui-icons users_circle-08"></i>
      </div>
      <p>전화번호 인증</p>
      <fg-input class="no-border input-lg" type="number" placeholder="전화번호" v-model="confirm_phone"></fg-input>
      <fg-input class="no-border input-lg" placeholder="인증번호" v-model="otp"></fg-input>
      <template slot="footer">
        <n-button v-if="confirm_button" type="neutral" @click="sendOtp()">인증번호 요청</n-button>
        <n-button v-else type="neutral" @click="verifyOtp">확인</n-button>
        <n-button type="neutral" link @click.native="modals.mini = false">닫기</n-button>
      </template>
    </modal>
    <main-footer></main-footer>
  </div>
</template>
<script>
import axios from "axios";
import { Card, Button, FormGroupInput, Modal } from "@/components";
import MainFooter from "@/layout/MainFooter";
import { Popover, Tooltip, DatePicker } from "element-ui";
import firebase from "firebase";

const storage = window.sessionStorage;
export default {
  name: "login-page",
  bodyClass: "login-page",
  components: {
    Card,
    MainFooter,
    Modal,
    [Popover.name]: Popover,
    [Tooltip.name]: Tooltip,
    [Button.name]: Button,
    [FormGroupInput.name]: FormGroupInput,
  },
  data() {
    return {
      modals: {
        classic: false,
        mini: false,
      },
      phone: "",
      confirm_phone: "",
      pw: "",
      confirm_pw: "",
      name: "",
      header: "",
      confirm_button: true,
      appVerifier: "",
      otp: "",
    };
  },
  methods: {
    register() {
      let vm = this;
      if (vm.phone.length == 0) {
        alert("전화번호를 입력하세요.");
        return;
      }
      if (
        !vm.pw.match(
          new RegExp(
            "^(?=.*[A-Za-z])(?=.*\\d)(?=.*[$@$!%*#?&])[A-Za-z\\d$@$!%*#?&]{8,20}$"
          )
        )
      ) {
        alert("비밀번호 형식이 맞지 않습니다.");
        return;
      }
      if (vm.pw != vm.confirm_pw) {
        alert("비밀번호가 서로 일치하지 않습니다");
        return;
      }
      if (!vm.name.match(new RegExp("^[a-zA-Z가-힣0-9_]{2,12}$"))) {
        alert("닉네임 형식이 맞지 않습니다.");
        return;
      }
      axios
        .post(
          "http://127.0.0.1:80/members",
          {
            phone: this.phone,
            pw: this.pw,
            name: this.name,
          },
          {
            headers: {
              "phone-auth": vm.header,
            },
          }
        )
        .then(function (response) {
          alert("회원가입 성공");
          location.href = "/#/login";
          console.log(response.data);
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    sendOtp() {
      let vm = this;
      if (this.confirm_phone.length < 10) {
        alert("10자 이상의 전화번호를 입력하세요.");
      } else {
        //
        let countryCode = "+82";
        let phoneNumber = countryCode + this.confirm_phone;
        //
        let appVerifier = this.appVerifier;
        //
        console.log(phoneNumber);
        firebase
          .auth()
          .signInWithPhoneNumber(phoneNumber, appVerifier)
          .then(function (confirmationResult) {
            window.confirmationResult = confirmationResult;
            vm.confirm_button = false;
            alert("인증번호 요청 성공!");
          })
          .catch(function () {
            alert("인증번호 요청 실패!");
          });
      }
    },
    //
    verifyOtp() {
      if (this.confirm_phone.length < 10 || this.otp.length != 6) {
        alert("인증번호 6자를 입력하세요.");
      } else {
        //
        let vm = this;
        let code = this.otp;
        //
        window.confirmationResult
          .confirm(code)
          .then(function () {
            vm.phone = vm.confirm_phone;
            vm.header = "injoongwanryo";
            vm.modals.mini = false;
             firebase
              .auth()
              .signOut()
              .then(function () {
                  alert(1);
                // Sign-out successful.
              })
              .catch(function (error) {
                  console.log(error);
                // An error happened.
              });
          })
          .catch(function () {
            alert("잘못된 인증번호입니다.");
          });
      }
    },
    initReCaptcha() {
      setTimeout(() => {
        window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
          "recaptcha-container",
          {
            size: "invisible",
            callback: function () {
              // reCAPTCHA solved, allow signInWithPhoneNumber.
              // ...
            },
            "expired-callback": function () {
              // Response expired. Ask user to solve reCAPTCHA again.
              // ...
            },
          }
        );
        //
        this.appVerifier = window.recaptchaVerifier;
      }, 1000);
    },
  },
  created() {
    axios
      .get("http://127.0.0.1:80/members/" + storage.getItem("login_id"), {
        headers: {
          "jwt-auth-token": storage.getItem("jwt-auth-token"),
        },
      })
      .then((res) => {
        location.href = "/#/";
    });
    this.initReCaptcha();
  },
};
</script>
<style lang="scss">
#javascriptComponents {
  .modal-buttons,
  .popover-buttons,
  .tooltip-buttons {
    .btn + .btn {
      margin-left: 3px;
    }
  }
}
</style>
