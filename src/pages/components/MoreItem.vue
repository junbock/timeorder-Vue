<template>
    <div style="padding:70px;">
        <div class="function">
            <span class="prdCount" style="font-size:20px">총 <strong>{{items.length}}</strong>건</span>
            <ul id="type" style="display:block; margin-top:55px;">
                <li class="xans-record-">
                    <a href="javascript:void(0);" @click="sortByPrice">가격 순</a> |
                </li>
                <li class="xans-record-">
                    <a href="javascript:void(0);" @click="sortByPercent">할인율 순</a> |
                </li>
                <li class="xans-record-">
                    <a href="javascript:void(0);" @click="sortByScore">가게점수 순</a>
                </li>
            </ul>
        </div>
        <br><br>
        <!-- 상품명 ~ 제조사 -->

        <div>
            <div class="xans-element- xans-product xans-product-normalmenu ">
                <div class="xans-element- xans-product xans-product-listnormal ec-base-product" style="width:1200px; margin:0 auto;" >
                    <ul class="prdList grid4" style="border-top: 1px solid #d9d9d9;">
                        <li v-for="(item,index) in items" :key="index" id="anchorBoxId" class="xans-record-">
                            <div class="thumbnail">
                                <div class="prdImg">
                                    <a href="javascript:void(0)" @click="selectItem(items[index].itemId)" name="anchorBoxName_29"><img v-if="item.uploadFile" v-bind:src="item.uploadFile.fileUri" id="eListPrdImage9_2" alt="비비고 매운왕교자 385g*2EA" style="height:220px"> 
                                    <img v-else src="img/noimg.gif" id="eListPrdImage9_2" alt="비비고 매운왕교자 385g*2EA" style="height:220px"></a>
                                </div>
                                <div class="sale_rate" style="background: rgb(51, 51, 51);">
                                    {{Math.ceil((1-(item.afterPrice/item.beforePrice))*100)}}<span>%</span>
                                </div>
                            </div>
                            <div class="description" style="margin-left:24px;">
                                <strong class="name"><a href="javascript:void(0)" @click="selectItem(items[index].itemId)" class=""><span class="title displaynone"><span style="font-size:16px;color:#000000;">상품명</span> :</span> <span style="font-size:16px;color:#000000;">{{item.itemName}}</span></a></strong>
                                <ul class="xans-element- xans-product xans-product-listitem spec">
                                    <li class=" xans-record-">
                                        <strong class="title displaynone"><span style="font-size:14px;color:#999999;">상품요약정보</span> :</strong> 
                                        <span style="font-size:14px;color:#999999;">{{item.itemInfo}}</span>
                                    </li>
                                    <li class=" xans-record-">
                                        <strong class="title displaynone"><span style="font-size:20px;color:#000000;font-weight:bold;">판매가</span> :</strong> 
                                        <span style="font-size:20px;color:#000000;font-weight:bold;">{{item.afterPrice.toLocaleString()}}원</span>
                                        <span id="span_product_tax_type_text" style=""> </span>
                                    </li>
                                    <li class=" xans-record-">
                                        <strong class="title displaynone"><span style="font-size:15px;color:#888888;">소비자가</span> :</strong> 
                                        <span style="font-size:15px;color:#888888;text-decoration:line-through;">{{item.beforePrice.toLocaleString()}}원</span>
                                    </li>
                                </ul>
                            </div>
                        <a v-if="(index+1)%4==0">
                        <hr style="position:relative; right:920px; width:430%;">
                        </a>
                        </li>
                    </ul>
                </div>
                <div>
                    <tabs-section style="position:relative; top:100px; height:300px;"/>
                </div>
            </div>
        </div>
    </div>
</template>

<script src="http://dmaps.daum.net/map_js_init/postcode.v2.js"></script>
<script>
import TabsSection from './Tabs';
import VueDaumPostcode from "vue-daum-postcode";
import axios from "axios";
const storage = window.sessionStorage;

import Vue from "vue"
Vue.use(VueDaumPostcode)

export default {
    data(){
        return{
            items:"",
        }
    },
    components: {
        TabsSection,
    },
    mounted() {
        let vm = this;
        let url = "";
        if (storage.getItem("address").length==0) {
            url = "http://127.0.0.1:80/items";
        } else {
            url = "http://127.0.0.1:80/items-price/" + storage.getItem("address");
        }
        console.log(url);
        axios
            .get(url)
            .then((res) => {
            vm.items = res.data;
            console.log(this.items);
            })
            .catch((e) => {
            alert("상품 불러오기 실패");
            });
  },
  methods: {
      selectItem(id) {
      storage.setItem("item", id);
      location.href="/#/iteminfo"
    },
    sortByPercent() {
        let vm = this;
        let url = "";
        if (storage.getItem("address").length==0) {
            url = "http://127.0.0.1:80/items-percent";
        } else {
            url = "http://127.0.0.1:80/items-percent/" + storage.getItem("address");
        }
        console.log(url);
        axios
            .get(url)
            .then((res) => {
            vm.items = res.data;
            console.log(this.items);
            })
            .catch((e) => {
            alert("상품 불러오기 실패");
            });
    },
    sortByPrice() {
        let vm = this;
        let url = "";
        if (storage.getItem("address").length==0) {
            url = "http://127.0.0.1:80/items-price";
        } else {
            url = "http://127.0.0.1:80/items-price/" + storage.getItem("address");
        }
        console.log(url);
        axios
            .get(url)
            .then((res) => {
            vm.items = res.data;
            console.log(this.items);
            })
            .catch((e) => {
            alert("상품 불러오기 실패");
            });
    },
    sortByScore() {
        let vm = this;
        let url = "";
        if (storage.getItem("address").length==0) {
            url = "http://127.0.0.1:80/items-score";
        } else {
            url = "http://127.0.0.1:80/items-score/" + storage.getItem("address");
        }
        console.log(url);
        axios
            .get(url)
            .then((res) => {
            vm.items = res.data;
            console.log(this.items);
            })
            .catch((e) => {
            alert("상품 불러오기 실패");
            });
    },

  }
};
</script>
<style>
#anchorBoxId {
    width:300px;
    height: 400px;
    box-sizing: border-box;
    padding-left: 20px;
}
#type {
    float: right;
}
#type li{
    float: left;
    margin-right: 10px;
}
#type li a {
    color: #000000;
}
.function{
    width: 1200px;
    height: 50px;
    margin: 0 auto;
    position:relative;

}

</style>