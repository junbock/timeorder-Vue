<template>
  <div>
    <div class="page-header clear-filter" >
      <parallax
        class="page-header-image"
        style="background-image:url('img/profile1.png')">
      </parallax>
      <div class="container">
    <!-- 이미지 노이해 -->
        <div class="photo-container">
          <img src="img/smile.png" alt="마이페이지얼굴" />
        </div>
        <h3 class="title">닉네임</h3>
        <p class="category">ID</p>
        <div class="content">
          <div class="social-description">
            <h2>26</h2>
            <p>누적 주문 수</p>
          </div>
          <div class="social-description">
            <h2>26</h2>
            <p>사용후기</p>
          </div>
          <div class="social-description">
            <h2>4</h2>
            <p>찜한가게</p>
          </div>
        </div>
      </div>
    </div>
    <div class="section">
      <div class="container">
        <div class="button-container">
        </div>
        <br><br><br>

        <h3 class="title" style="padding-top: 30px">마이페이지</h3>


  <!-- 주문내역 테이블-->
  <!-- 주문번호 : 주문일자-숫자증가 -->    
  <h5 class="description">
  <div class="Myorder">
  <table>
  <tr>
    <th>주문일자</th>
    <th>주문번호</th>
    <th>매장정보</th>
    <th>수량</th>
    <th>주문처리상태</th>
  </tr>
  <tr>
    <td>2020-09-03</td>
    <td>20200903-01</td>
    <td>무적의 돈가츠</td>
    <td>블록치즈 1개</td>
    <td>준비중</td>
  </tr>
  <tr>
    <td>2020-09-04</td>
    <td>20200904-02</td>
    <td>디저트39 강남점</td>
    <td>크로칸슈 커스터드 외 2개</td>
    <td>준비중</td>

  </tr>
  <tr>
    <td>2020-09-05</td>
    <td>20200905-03</td>
    <td>청년피자</td>
    <td>바삭바삭 1개</td>
    <td>준비중</td>
  </tr>
  <tr>
    <td>2020-09-06</td>
    <td>20200906-04</td>
    <td>호니도니</td>
    <td>치즈돈가츠 4개</td>
    <td>준비중</td>
  </tr>
  <tr>
    <td>2020-09-07</td>
    <td>20200907-05</td>
    <td>분짜라붐</td>
    <td>하노이 쌀국수 외 2개</td>
    <td>준비중</td>
  </tr>
  <tr>
    <td>2020-09-08</td>
    <td>20200908-06</td>
    <td>안동찜닭</td>
    <td>순살 고구마찜닭 1개</td>
    <td>준비중</td>
  </tr>
</table>
</div>  
</h5>   

<!-- 링크 연결 수정 필요 -->
  <h5 class="description">
  <div class="Myorder">
  <table>
  <tr>
    <td align="center"><h5 class="title">찜한가게</h5><a href link to="/profile"><img src="img/store.png" width="250px"></a></td>
    <td align="center"><h5 class="title">이용후기</h5><a href link to="/profile"><img src="img/review.png" width="250px"></a></td>
  </tr>
  </table>
    </div>
      </h5>
    
    
 
  <!-- 페이지 하단 부분 -->
  <!-- ?? -->
          <tabs
            pills
            class="nav-align-center"
            tab-content-classes="odderList">
            <tab-pane title="Profile">
              <div class="col-md-10 ml-auto mr-auto">
             
                <div class="row collections">
                  <div class="col-md-6">
                    <img src="img/main_image00.jpg" class="img-raised" />
                    가게이름
                    <img src="img/main_image00.jpg" alt="" class="img-raised" />
                    가게이름
                  </div>
                  <div class="col-md-6">
                    <img src="img/main_image00.jpg" alt="" class="img-raised" />
                    가게이름
                    <img src="img/main_image00.jpg" alt="" class="img-raised" />
                    가게이름
                  </div>
                </div>
              </div>
            </tab-pane>
          </tabs>
        </div>
      </div>
    </div>

</template>
<script>
import { Tabs, TabPane } from '@/components';

export default {
  name: 'profile',
  bodyClass: 'profile-page',
  components: {
    Tabs,
    TabPane

  }
};
 

</script>
<style>
table {
  font-family: Montserrat, arial, sans-serif;
  border-collapse: collapse;
  width: 100%;
  text-align: center;
  border-top: 3px solid;
  border-bottom: 1px solid #dddddd;
 
}

td, th {
  
  text-align: center;
  padding: 8px;
}

tr:nth-child(even) {
  background-color: #dddddd;
}
.title{
  text-align: center;
}

h5, h3 {
  color: #fcbe32 
}

img { display: block; margin: 0px auto; }


</style>