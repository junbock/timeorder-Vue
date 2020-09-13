<template>
  <div id="footer" class=container-fluid style="width:1400px; margin:0 auto; display:auto; position:relative; bottom:150px;">
		<div class="utilMenu">
			<div class="inner" style="float:left;">
				<ul>
					<li><a href="/shopinfo/company.html"><strong>회사소개</strong></a></li>
					<li><a href="/member/agreement.html">이용약관</a></li>
					<li><a href="/member/privacy.html">개인정보처리방침</a></li>
					<li><a href="/shopinfo/guide.html">이용안내</a></li>
					<li><a href="/board/index.html">고객센터</a></li>
				</ul>
			</div>
		</div>
		<div class="bottom-info">
			<div class="inner" style="float:left; top:20px;">
				<div>
					<h2>CS CENTER</h2>
          <div>
            <strong>1234-5678</strong>
            <p> 평일 10:00-18:00, 점심 12:00-13:00 <br />주말, 공휴일 휴무</p>
          </div>
				</div>
				<div style="width:400px">
					<h2>BANK INFO</h2>
					<div>
						<strong>0123-456-78901</strong>
					<p>신한은행 <br>
          예금주 : 헤일리
          </p>
          </div>
				</div>
				<div class="footer_notice">
					<h2><a href="/board/free/list.html?board_no=1">NOTICE</a></h2>
					<div style="position:relative; bottom:17px;">
						<ul class="xans-element- xans-board xans-board-list-1 xans-board-list xans-board-1 notice-wrap"
            style="position:relative; right:8px;">
							<li class="xans-record-"><a href="/article/공지사항/1/5/">구매시 평생 펑펑!!</a></li>
							<li class="xans-record-"><a href="/article/공지사항/1/4/">주문/결제시 공지입니다 </a></li>
							<li class="xans-record-"><a href="/article/공지사항/1/3/">안녕하세요. 배송관련 공지사항 입니다 안녕하세</a></li>
							<li class="xans-record-"><a href="/article/공지사항/1/2/">[이벤트] 50,000원 이상구매시 무료배송!</a></li>
						</ul>
					</div>
				</div>
				<div class="footer_sns" style="float:right;">
					<a href="https://section.blog.naver.com/" target="_blank"><img src="/img/bt_sns01.png"
							alt="네이버블로그" /></a>
					<a href="https://ko-kr.facebook.com/" target="_blank"><img src="/img/bt_sns02.png"
							alt="페이스북" /></a>
					<a href="https://www.instagram.com/?hl=ko" target="_blank"><img src="/img/bt_sns03.png"
							alt="인스타그램" /></a>
					<a href="https://www.youtube.com/" target="_blank"><img src="/img/bt_sns04.png" 
              alt="유튜브" /></a>
				</div>
			</div>
		</div>
		<div class="inner" style="height:0">
			<div class="footer-info">
				<div>
					<span class="xans-element- xans-layout xans-layout-logobottom footer-logo "><a href="/"><img
								src="/img/footer_logo.png" alt="타임오더" /></a>
					</span>
				</div>
				<div class="xans-element- xans-layout xans-layout-footer ">
					<p class="address">
						<span><strong>법인명(상호)</strong> 타임오더 </span> <span><strong>대표자(성명)</strong> 타임오더 </span>
						<span><strong>사업자 등록번호 안내</strong> 000000000</span><br /><span><strong>통신판매업 신고</strong>
							000-00-00000</span> <span><a href="#none"
								onclick="window.open('http://www.google.com', 'bizCommPop', 'width=750, height=950;');return false;">[사업자정보확인]</a></span>
						<span><strong>전화</strong> 1644-8198</span> <span><strong>팩스</strong>
							00-000-0000</span><br /><span><strong>주소</strong> 04378 서울특별시 용산구
						</span>
						<span class=""><strong>개인정보보호책임자</strong> <a
								href="/timeorder.html">헤일리(haileye216@gmail.com)</a></span>
					</p>
					<p class="copyright">COPYRIGHT © <strong>타임오더</strong>. ALL RIGHT RESERVED.</p>
				</div>
			</div>
		</div>
	</div>
</template>
<script>

export default {
  components: {
  }
};
</script>

<style>
#footer{
  position: relative;
  bottom:2px;
  border-top:0;
  border-bottom:0;
  margin-top:60px;
}
#footer:before{
  border-bottom:0;
  }
.utilMenu{
  border-top:1px solid #ededed;
  border-bottom:1px solid #ededed;
}
.utilMenu ul{
  position: relative;
  top: 10px;
  overflow:hidden;
  padding:10px 0;
  line-height:1;
}
.utilMenu ul li{
  float:left;
  padding:0 17px;
  line-height:1;
  position:relative;
}
.utilMenu ul li:first-child{
  padding-left:0;
}
.utilMenu ul li:after{
  content:'';
  position:relative;
  top:2px;
  right:0;
  width:1px;
  height:10px;
  background:#ddd;
}
.utilMenu ul li:last-child:after{
  height:0;
}
.utilMenu ul li a{
  color:#2d2d2d;font-size:14px;
}
.utilMenu ul li a:hover{
  opacity:0.7;
}
.bottom-info{
  border-bottom:1px solid #ededed;
}
.bottom-info 
.inner {
  position: relative;
  display:table;
  width:100%;
  box-sizing:border-box;
  font-size:0;
}
.bottom-info 
.inner > div{
  display:table-cell;
  padding-left:40px;
  border-left:1px solid #e2e2e2;
  font-size:12px;
  vertical-align:top;
  box-sizing:border-box;
}
.bottom-info 
.inner > div:first-child{
  width:260px;
  border-left:0;
  padding-left:0;
}
.bottom-info 
.inner > div:nth-child(2){
  width:273px;
}
.bottom-info 
.inner > div:nth-child(3){
  width:326px;
}
.bottom-info h3{
  padding-bottom:10px;
  color:#43474a;
  font-size:18px;
  line-height:1;
}
.bottom-info h3 a{
  color:#43474a;
}
.bottom-info strong{
  display:block;
  font-size:30px;
  color:#3c3c3c;
  font-weight:800;
}
.bottom-info p {
  margin-top:3px;
  font-size:14px;
  color:#666666;
  line-height:1.5;
}
.bottom-info 
.bank-list{
  display: inline-block;
}
.bottom-info 
.bank-list > li{
  color:#3c3c3c;
  font-size:24px;
  font-weight:700;
}
.bottom-info 
.footer_notice h3{
  padding-bottom:0px;
}
.bottom-info 
.notice-wrap{
  margin:10px;
}
.bottom-info 
.notice-wrap > li{
  font-size:14px;
  line-height:1.5;
}
.bottom-info 
.notice-wrap > li:before {
  position:relative;
  top:9px;
  height:2px;
  border-left:2px solid #808080;
}
.bottom-info 
.notice-wrap > li a {
  display:inline-block;
  width:250px;
  overflow:hidden;
  text-overflow:ellipsis;
  white-space:nowrap;color:#666666;
}
.bottom-info 
.notice-wrap > li a:hover{
  opacity:0.7;
}
.bottom-info 
.inner > div.footer_sns{
  float:right;
  border-left:0;
}
.footer_sns a{
  display:inline-block;
  padding:0 10px;
  vertical-align:middle;
}
.footer_sns a:last-child{
  padding-right:0;
}
.footer-logo{
  float:left;
  padding-left:3px;
}
#footer 
.footer-info{
  position: relative;
  overflow:hidden;
  padding:20px 0 0;
  font-size:0;
}
#footer 
.footer-info > div{
  display:inline-block;
  width:auto;
  height:auto;
  vertical-align:top;
  font-size:12px;
  text-align:left;
}
#footer 
.footer-info 
.xans-layout-footer{
  margin-left:18px;
}
#footer 
.xans-layout-footer 
.address{
  padding:0;
  color:#2d2d2d;
  font-size:14px;
  font-weight:400;
  line-height:1.8;
}
#footer 
.xans-layout-footer 
.address span{
  padding:0 6px 0 0;
  position:relative;
}
#footer 
.xans-layout-footer 
.address span a{
  color:#2d2d2d;
}
#footer 
.xans-layout-footer 
.address span strong{
  font-weight:400;
  color:#a2a2a2;
}
#footer 
.xans-layout-footer 
.copyright{
  position:relative;
  color:#2d2d2d;
  font-size:14px;
  font-weight:400;
  height:auto;
  line-height:1.8;
}
#footer 
.xans-layout-footer 
.copyright strong{
  font-weight:400;
}
</style>
