<template>
  <div class="container" style="padding-top:80px">
    <div class="col-md-12 ml-auto col-xl-12 mr-auto">
      <p class="category" style="font-size:24px">ID : {{member.phone}}</p>
      <!-- Nav tabs -->
      <card>
        <modal
          :show.sync="modals.review"
          class="modal-primary"
          :show-close="false"
          headerClasses="justify-content-center"
        >
          <div class="row">
            <p style="padding-left:20px; padding-right:15px; margin-top:3px">리뷰 이미지 :</p>
            <input type="file" name="file1" accept="image/*" @change="setFileReview" />
          </div>
          <div class="row">
            <div class="col-md-9">
              <fg-input class="no-border input-lg" placeholder="내용" v-model="writeReview.content"></fg-input>
            </div>
            <div class="col-md-3">
              <fg-input
                type="number"
                class="no-border input-lg"
                placeholder="점수"
                min="1"
                max="5"
                v-model="writeReview.score"
              ></fg-input>
            </div>
          </div>
          <template slot="footer">
            <n-button type="neutral" @click="addMyReview()">확인</n-button>
            <n-button
              type="neutral"
              link
              @click.native="modals.review = false; writeReview.content=''; writeRivew.img=null;"
            >닫기</n-button>
          </template>
        </modal>

        <modal
          :show.sync="modals.store"
          class="modal-primary"
          :show-close="false"
          headerClasses="justify-content-center"
        >
          <div slot="header" class="modal-profile">
            <p>가게 등록</p>
          </div>
          <fg-input class="no-border input-lg" placeholder="가게 이름" v-model="addStore.name"></fg-input>
          <fg-input
            class="no-border input-lg"
            type="number"
            placeholder="전화번호"
            v-model="addStore.phone"
          ></fg-input>
          <div class="row">
            <div class="col-lg-6 col-md-12">
              <fg-input
                class="no-border input-lg"
                type="number"
                placeholder="오픈 시간"
                min="0"
                max="24"
                v-model="addStore.open"
              ></fg-input>
            </div>
            <div class="col-lg-6 col-md-12">
              <fg-input
                class="no-border input-lg"
                type="number"
                placeholder="마감시간"
                min="0"
                max="24"
                v-model="addStore.close"
              ></fg-input>
            </div>
          </div>
          <fg-input class="no-border input-lg" placeholder="가게 소개" v-model="addStore.info"></fg-input>
          <fg-input class="no-border input-lg" placeholder="주소" style="color:black;" readonly v-model="addStore.detail_address" @click="sample4_execDaumPostcode"></fg-input>
          <template slot="footer">
            <n-button type="neutral" @click="addMyStore()">확인</n-button>
            <n-button type="neutral" link @click.native="modals.store = false">닫기</n-button>
          </template>
        </modal>

        <modal
          :show.sync="modals.item"
          class="modal-primary"
          :show-close="false"
          headerClasses="justify-content-center"
        >
          <div class="row">
            <p style="padding-left:20px; padding-right:15px; margin-top:3px">상품 이미지 :</p>
            <input type="file" name="file2" accept="image/*" @change="setFileItem" />
          </div>
          <fg-input class="no-border input-lg" placeholder="상품명" v-model="addItem.name"></fg-input>
          <fg-input class="no-border input-lg" placeholder="상품 소개" v-model="addItem.info"></fg-input>
          <div class="row">
            <fg-input
              type="number"
              class="no-border input-lg"
              placeholder="원가"
              v-model="addItem.beforeP"
              style="padding-left:40px; padding-right:20px"
            ></fg-input>
            <fg-input
              type="number"
              class="no-border input-lg"
              placeholder="할인가"
              v-model="addItem.afterP"
            ></fg-input>
          </div>
          <template slot="footer">
            <n-button type="neutral" @click="addMyItem()">확인</n-button>
            <n-button
              type="neutral"
              link
              @click.native="modals.item = false; addItem.name=''; addItem.info=''; addItem.img=null;"
            >닫기</n-button>
          </template>
        </modal>

        <tabs slot="raw-content" tab-content-classes="tab-content-padding text-center">
          <tab-pane>
            <template slot="label">
              <i class="now-ui-icons users_circle-08"></i> 내 정보
            </template>
            <br />
            <el-popover
              ref="popover1"
              popper-class="popover popover-primary"
              placement="right"
              width="200"
              trigger="focus"
            >
              <h3 class="popover-header">비밀번호 규칙</h3>
              <div class="popover-body">영문 숫자 특수문자 모두 적어도 한번를 포함한 8-20자로 만들어주세요.</div>
            </el-popover>

            <el-popover
              ref="popover2"
              popper-class="popover popover-primary"
              placement="right"
              width="200"
              trigger="focus"
            >
              <h3 class="popover-header">닉네임 규칙</h3>
              <div class="popover-body">2-12자로 만들어주세요 (한글, 영어, 숫자, 언더바 허용)</div>
            </el-popover>
            <div class="row mr-auto ml-auto" style="padding-left:40px; padding-bottom:15px">
              <p style="margin:6px">닉네임 :</p>
              <fg-input
                style="position:absolute; left:200px"
                placeholder="Regular"
                v-model="myInfo.newName"
                v-popover:popover2
              ></fg-input>
            </div>
            <div class="row mr-auto ml-auto" style="padding-left:40px; padding-bottom:15px">
              <p style="margin:6px">현재 비밀번호 :</p>
              <fg-input
                type="password"
                style="position:absolute; left:200px"
                placeholder="Regular"
                v-model="myInfo.nowPw"
              ></fg-input>
            </div>
            <div class="row mr-auto ml-auto" style="padding-left:40px; padding-bottom:15px">
              <p style="margin:6px">비밀번호 변경 :</p>
              <fg-input
                type="password"
                style="position:absolute; left:200px"
                placeholder="Regular"
                v-model="myInfo.newPw"
                v-popover:popover1
              ></fg-input>
            </div>
            <div class="row mr-auto ml-auto" style="padding-left:40px; padding-bottom:15px">
              <p style="margin:6px">비밀번호 확인 :</p>
              <fg-input
                type="password"
                style="position:absolute; left:200px"
                placeholder="Regular"
                v-model="myInfo.newConfirmPw"
              ></fg-input>
            </div>
            <n-button type="primary" @click="updateMember()">수정</n-button>
          </tab-pane>
          <tab-pane>
            <template slot="label">
              <i class="now-ui-icons shopping_cart-simple"></i> 구매 목록
            </template>
            <div class="container" style="padding-left:40px; padding-right:40px;">
              <table class="table">
                <thead>
                  <tr>
                    <th scope="col">주문일자</th>
                    <th scope="col">상품</th>
                    <th scope="col">가격</th>
                    <th scope="col">리뷰</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item, index) in member.buyItem" :key="index">
                    <td scope="row">{{item.buyDate.substring(0,10)}}</td>
                    <td>{{item.item.itemName}}</td>
                    <td>{{item.item.afterPrice}}</td>
                    <td v-if="!item.review">
                      <a href="javascript:void(0);" @click="setItemId(item.id);">리뷰 쓰기</a>
                    </td>
                    <td v-else>리뷰 완료</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </tab-pane>
          <tab-pane>
            <template slot="label">
              <i class="now-ui-icons shopping_shop"></i> 내 가게
            </template>
            <div v-if="member.author==0">
              <n-button type="primary" size="lg" @click="updateAuth()">사업자 요청</n-button>
            </div>
            <div
              v-else
              class="container ml-auto mr-auto"
              style="padding-left:40px; padding-right:40px;"
            >
              <div v-if="!member.store">
                <n-button type="primary" size="lg" @click="modals.store = true">가게 추가</n-button>
              </div>
              <div v-else>
                <table class="table">
                  <tr>
                    <th>상호명</th>
                    <td>
                      <input v-model="updateStore.name" style="width:100%; height:100%;" />
                    </td>
                  </tr>
                  <th>가게설명</th>
                  <td>
                    <input v-model="updateStore.content" style="width:100%; height:100%;" />
                  </td>
                  <tr style="background-color:white;">
                    <th>연락처</th>
                    <td>
                      <input v-model="updateStore.phone" style="width:100%; height:100%;" />
                    </td>
                  </tr>
                  <tr>
                    <th>가게주소</th>
                    <td>
                      <input
                        type="text"
                        v-model="updateStore.detail_locate"
                        v-on:click="sample4_execDaumPostcode()"
                        id="sample4_roadAddress"
                        placeholder="도로명주소"
                        readonly
                      />
                      <vue-daum-postcode style="visibility:hidden; height:0" />
                    </td>
                  </tr>
                  <tr>
                    <th>가게 이미지</th>
                    <td>
                      현재 이미지 : {{storeImg}} &nbsp;&nbsp;
                      <input
                        style="padding-left:10px"
                        type="file"
                        name="file3"
                        accept="image/*"
                        @change="setFileStore"
                      />
                    </td>
                  </tr>
                </table>
                <n-button
                  type="primary"
                  v-on:click="updateClick()"
                  size="lg"
                  style="width:16%;  padding:5px;  top:1px;"
                >
                  <strong>수정</strong>
                </n-button>
                <n-button
                  type="primary"
                  v-on:click="reset()"
                  size="lg"
                  style="width:16%; padding:5px;  top:1px;"
                >
                  <strong>취소</strong>
                </n-button>
              </div>
              <tabs
                v-if="member.store"
                slot="raw-content"
                tab-content-classes="tab-content-padding text-center"
              >
                <i
                  class="now-ui-icons shopping_cart-simple"
                  style="float:left; padding-left:40px; padding-bottom:10px; font-size:20px; font-weight:bold;"
                >상품 목록</i>
                <i class="now-ui-icons ui-1_simple-add pull-right">
                  <a
                    href="javascript:void(0);"
                    @click="modals.item = true"
                    style="padding-left:3px;margin:2px"
                  >상품 추가</a>
                </i>
                <div class="container" style="padding-left:40px; padding-right:40px;">
                  <table class="table">
                    <thead>
                      <tr>
                        <th scope="col" style="width:130px;">상품명</th>
                        <th scope="col" style="width:500px">상품소개</th>
                        <th scope="col" style="width:150px">금액</th>
                        <th scope="col" style="width:150px">수량</th>
                        <th scope="col" style="width:250px">업데이트</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-if="!items">
                        <!-- 추가로 로그인한 사람이 가게 업로드 권한이 있는 사람인지 and 연산 추가-->
                        <td colspan="5">등록한 상품이 존재하지 않습니다.</td>
                      </tr>
                      <tr v-else v-for="(item,index) in items" :key="index">
                        <td scope="row">{{item.itemName}}</td>
                        <td>{{item.itemInfo}}</td>
                        <td>{{item.beforePrice}} / {{item.afterPrice}}</td>
                        <td>
                          <a v-if="itemUpdate">{{item.itemCount}}</a>
                          <a v-else>
                            <input v-model="item.itemCount" style="width:50px; text-align:center;" />
                          </a>
                        </td>
                        <td style="font-size:1px;">
                          <n-button
                            type="primary"
                            link
                            size="sm"
                            v-on:click="itemUpdate = !itemUpdate; if(itemUpdate) {updateCnt(index)}"
                            style="margin:auto auto 8px auto; padding:0; position:relative; top:1px;"
                          >
                            <strong>수정</strong>
                          </n-button>/
                          <n-button
                            type="primary"
                            link
                            size="sm"
                            v-on:click="removeRow(index)"
                            style="margin:auto auto 8px auto; padding:0; position:relative; top:1px;"
                          >
                            <strong>삭제</strong>
                          </n-button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </tabs>
            </div>
          </tab-pane>
          <tab-pane>
            <template slot="label">
              <i class="now-ui-icons ui-2_like"></i> 리뷰 목록
            </template>
            <div class="container" style="padding-left:40px; padding-right:40px;">
              <table class="table">
                <thead>
                  <tr>
                    <th scope="col" style="width:130px;">작성일자</th>
                    <th scope="col" style="width:500px">내용</th>
                    <th scope="col" style="width:100px">별점</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-if="member.reviews.length == 0">
                    <td colspan="3">등록한 리뷰가 존재하지 않습니다.</td>
                  </tr>
                  <tr v-else v-for="(item,index) in member.reviews" :key="index">
                    <td scope="row">{{item.writeday}}</td>
                    <td>{{item.contents}}</td>
                    <td>{{item.score}}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </tab-pane>
        </tabs>
      </card>
    </div>
    <!-- End Tabs on plain Card -->
  </div>
</template>
<script>
import {
  Card,
  Tabs,
  TabPane,
  FormGroupInput,
  Button,
  Modal,
} from "@/components";
import { Popover, Tooltip, DatePicker } from "element-ui";
import axios from "axios";
import VueDaumPostcode from "vue-daum-postcode";
import Vue from "vue";
Vue.use(VueDaumPostcode);

const storage = window.sessionStorage;

export default {
  components: {
    Modal,
    [Popover.name]: Popover,
    [Tooltip.name]: Tooltip,
    [Button.name]: Button,
    Card,
    Tabs,
    TabPane,
    [FormGroupInput.name]: FormGroupInput,
  },
  data() {
    return {
      storeImg: "",
      modals: {
        store: false,
        review: false,
        item: false,
      },
      member: null,
      items: [],
      myInfo: {
        newName: null,
        nowPw: "",
        newPw: "",
        newConfirmPw: "",
      },
      writeReview: {
        score: "",
        id: "",
        img: null,
        content: "",
      },
      addStore: {
        name: "",
        phone: "",
        info: "",
        open: null,
        close: null,
        detail_address: "",
        address_name: "",
      },
      updateStore: {
        name: "",
        content: "",
        phone: "",
        locate: "",
        detail_locate: "",
        img: "",
      },
      addItem: {
        name: "",
        info: "",
        beforeP: "",
        afterP: "",
        img: null,
      },
      itemUpdate: true,
    };
  },
  methods: {
    setItemId(id) {
      let vm = this;
      vm.modals.review=true;
      console.log(id);
      vm.writeReview.id=id;
    },
    sample4_execDaumPostcode: function () {
      let vm = this;
      new daum.Postcode({
        oncomplete: function (data) {
          var roadAddr = data.roadAddress; // 도로명 주소 변수
          var extraRoadAddr = ""; // 참고 항목 변수

          if (data.bname !== "" && /[동|로|가]$/g.test(data.bname)) {
            extraRoadAddr += data.bname;
          }
          if (data.buildingName !== "" && data.apartment === "Y") {
            extraRoadAddr +=
              extraRoadAddr !== ""
                ? ", " + data.buildingName
                : data.buildingName;
          }
          if (extraRoadAddr !== "") {
            extraRoadAddr = extraRoadAddr;
          }
          vm.addStore.detail_address = roadAddr;
          vm.addStore.address_name = extraRoadAddr;
          vm.updateStore.detail_locate = roadAddr; //얘가 입력되는 데이터(도로명 주소 기준)
          vm.updateStore.locate = extraRoadAddr;
        },
      }).open();
    },
    addMyReview() {
      let vm = this;
      console.log(vm.addItem.name);
      console.log(vm.addItem.info);
      axios
        .post(
          "http://127.0.0.1:80/reviews/" + vm.writeReview.id,
          {
            contents: vm.writeReview.content,
            score: vm.writeReview.score,
          },
          {
            headers: {
              "jwt-auth-token": storage.getItem("jwt-auth-token"),
            },
          }
        )
        .then((res) => {
          console.log(res.data.itemId);
          var formData = new FormData();
          formData.append("file", vm.writeReview.img);
          axios({
            method: "post",
            url: "http://127.0.0.1:80/upload/review/" + res.data.reviewId,
            data: formData,
          })
            .then(function (response) {
              alert("이미지 추가");
              console.log(response);
            })
            .catch(function (response) {
              console.log(response);
            });
          alert("리뷰 추가 완료");
          location.reload();
        })
        .catch(function () {
          alert("리뷰 추가 실패");
        });
    },
    addMyItem() {
      let vm = this;
      console.log(vm.addItem.name);
      console.log(vm.addItem.info);
      axios
        .post(
          "http://127.0.0.1:80/items/store/" + vm.member.store.storeId,
          {
            itemName: vm.addItem.name,
            itemInfo: vm.addItem.info,
            beforePrice: vm.addItem.beforeP,
            afterPrice: vm.addItem.afterP,
          },
          {
            headers: {
              "jwt-auth-token": storage.getItem("jwt-auth-token"),
            },
          }
        )
        .then((res) => {
          console.log(res.data.itemId);
          var formData = new FormData();
          formData.append("file", vm.addItem.img);
          axios({
            method: "post",
            url: "http://127.0.0.1:80/upload/item/" + res.data.itemId,
            data: formData,
          })
            .then(function (response) {
              alert("이미지 추가");
              console.log(response);
            })
            .catch(function (response) {
              console.log(response);
            });
          alert("추가 되었습니다.");
          location.reload();
        })
        .catch(function () {
          alert("추가 실패");
        });
    },
    updateCnt(index) {
      let vm = this;
      if (vm.items[index].itemCount < 0) {
        return;
      }
      axios
        .put(
          "http://127.0.0.1:80/items/" + vm.member.store.items[index].itemId,
          {
            itemCount: vm.items[index].itemCount,
          },
          {
            headers: {
              "jwt-auth-token": storage.getItem("jwt-auth-token"),
            },
          }
        )
        .then((res) => {
          console.log(res.data);
          location.reload();
          alert("수정 되었습니다.");
        })
        .catch(function () {
          alert("수정 실패");
        });
    },
    changeName($event) {
      this.itemData = $event.target.value;
    },
    removeRow(index) {
      // this.itemData.splice(index, 1);
      console.log(1);
      let vm = this;
      axios
        .delete("http://127.0.0.1:80/items/" + vm.items[index].itemId, {
          headers: {
            "jwt-auth-token": storage.getItem("jwt-auth-token"),
          },
        })
        .then((res) => {
          console.log(res.data);
          location.reload();
          alert("삭제 되었습니다.");
        })
        .catch(function () {
          alert("삭제 실패");
        });
    },

    updateClick: function () {
      let vm = this;
      if (this.updateStore.name != this.member.store.storeName) {
        this.member.store.storeName = this.updateStore.name;
      }
      if (this.updateStore.content != this.member.store.storeInfo) {
        this.member.store.storeInfo = this.updateStore.content;
      }
      if (this.updateStore.phone != this.member.store.storeNum) {
        this.member.store.storeNum = this.updateStore.phone;
      }
      // if (this.updateStore.locate != this.store.locate) {
      //   this.store.locate = this.updateStore.locate;
      // }
      console.log(vm.updateStore.locate);
      console.log(vm.updateStore.detail_locate);
      axios
        .put(
          "http://127.0.0.1:80/stores/" + vm.member.store.storeId,
          {
            storeName: this.member.store.storeName,
            storeInfo: this.member.store.storeInfo,
            storeNum: this.member.store.storeNum,
            address_name: vm.updateStore.locate,
            detail_address: vm.updateStore.detail_locate,
          },
          {
            headers: {
              "jwt-auth-token": storage.getItem("jwt-auth-token"),
            },
          }
        )
        .then((res) => {
          alert("수정되었습니다.");
          console.log(res.data);
          location.reload();
        })
        .catch(function () {});

      var formData = new FormData();
      formData.append("file", vm.updateStore.img);
      axios({
        method: "post",
        url: "http://127.0.0.1:80/upload/store/" + vm.member.store.storeId,
        data: formData,
      })
        .then(function (response) {
          alert("이미지 추가되었습니다.");
          console.log(response);
        })
        .catch(function (response) {
          console.log(response);
        });
    },
    reset: function () {
      this.updateStore.name = this.member.store.storeName;
      this.updateStore.content = this.member.store.storeInfo;
      this.updateStore.phone = this.member.store.storeNum;
      // this.updateStore.locate = this.store.locate;
    },
    setFileReview(event) {
      //console.log(event.target.files[0]);
      this.writeReview.img = event.target.files[0];
    },
    setFileItem(event) {
      //console.log(event.target.files[0]);
      this.addItem.img = event.target.files[0];
    },
    setFileStore(event) {
      //console.log(event.target.files[0]);
      this.updateStore.img = event.target.files[0];
    },
    updateMember() {
      let vm = this;
      if (vm.myInfo.nowPw != vm.member.pw) {
        alert("비밀번호가 틀렸습니다.");
        return;
      }
      if (
        vm.myInfo.newPw.length > 0 &&
        !vm.myInfo.newPw.match(
          new RegExp(
            "^(?=.*[A-Za-z])(?=.*\\d)(?=.*[$@$!%*#?&])[A-Za-z\\d$@$!%*#?&]{8,20}$"
          )
        )
      ) {
        alert("비밀번호 형식이 맞지 않습니다.");
        return;
      }
      if (vm.myInfo.newPw != vm.myInfo.newConfirmPw) {
        alert("두 비밀번호가 일치하지 않습니다.");
        return;
      }
      axios
        .put(
          "http://127.0.0.1:80/members/" + storage.getItem("login_id"),
          {
            pw: vm.myInfo.newPw,
            name: vm.myInfo.newName,
            //address: vm.newAddress
          },
          {
            headers: {
              "jwt-auth-token": storage.getItem("jwt-auth-token"),
            },
          }
        )
        .then((res) => {
          console.log(res.data);
          location.reload();
          alert("수정 되었습니다.");
        })
        .catch(function () {
          alert("수정 실패");
        });
    },
    updateAuth() {
      let vm = this;
      alert("신청 되었습니다. 사업자 등록증을 abc@naver.com에 보내주세요");
      axios
        .put(
          "http://127.0.0.1:80/members/" + storage.getItem("login_id"),
          {
            author: 1,
          },
          {
            headers: {
              "jwt-auth-token": storage.getItem("jwt-auth-token"),
            },
          }
        )
        .then((res) => {
          console.log(res.data);
          location.reload();
          //vm.newAddress = vm.member.address.address_name
        })
        .catch(function () {
          location.href = "/";
        });
    },
    addMyStore() {
      let vm = this;
      if (
        !vm.addStore.name.match(
          new RegExp("^[a-zA-Z가-힣0-9][a-zA-Z가-힣0-9 ]{1,16}$")
        )
      ) {
        alert("가게 이름 1-16자를 적어주세요, 특수문자 불가");
        return;
      }
      if (!vm.addStore.phone.match(new RegExp("^[0-9]{10,20}$"))) {
        alert("전화번호 9-20자를 입력하세요.");
        return;
      }
      if (vm.addStore.open == null || vm.addStore.close == null) {
        alert("오픈, 마감시간을 적어주세요");
        return;
      }
      axios
        .post(
          "http://127.0.0.1:80/stores",
          {
            storeName: vm.addStore.name,
            storeInfo: vm.addStore.info,
            storeNum: vm.addStore.phone,
            openTime: vm.addStore.open,
            closeTime: vm.addStore.close,
            detail_address: vm.addStore.detail_address,
            address_name: vm.addStore.address_name
          },
          {
            headers: {
              "jwt-auth-token": storage.getItem("jwt-auth-token"),
            },
          }
        )
        .then((res) => {
          console.log(res.data);
          vm.modals.store = false;
          location.reload();
          alert("추가 되었습니다.");
        })
        .catch(function () {
          alert("추가 실패");
        });
    },
  },
  mounted() {
    let vm = this;
    axios
      .get("http://127.0.0.1:80/members/" + storage.getItem("login_id"), {
        headers: {
          "jwt-auth-token": storage.getItem("jwt-auth-token"),
        },
      })
      .then((res) => {
        console.log(res.data);
        vm.member = res.data;
        vm.myInfo.newName = vm.member.name;
        if (this.member.store) {
          this.updateStore.name = this.member.store.storeName;
          this.updateStore.content = this.member.store.storeInfo;
          this.updateStore.phone = this.member.store.storeNum;
          this.items = this.member.store.items;
          this.updateStore.detail_locate = this.member.store.detail_address;
          this.updateStore.locate = this.member.store.address_name;
          if (this.member.store.uploadFile.length > 0) {
            vm.storeImg = vm.member.store.uploadFile[vm.member.store.uploadFile.length-1].fileName;
          }
          console.log(this.member.store.items);
          //this.updateStore.locate = this.member.store.locate;
        } else {
          vm.items = [];
        }
        //vm.newAddress = vm.member.address.address_name
      })
      .catch(function () {
        location.href = "/";
      });
    console.log("item : ", this.items);
  },
};
</script>
<style>
.tab-content.tab-content-padding {
  padding: 20px;
}
</style>
