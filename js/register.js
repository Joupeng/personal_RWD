document.addEventListener('DOMContentLoaded', function () {
  let btnHamburger = document.getElementById("btn_hamburger");
  let navList = document.querySelector('.header__nav-list');

  btnHamburger.addEventListener("click", function () {
    this.classList.toggle("-on");
    navList.classList.toggle("-open");
  });

  //子選單的功能
  $(document).ready(function () {
    // 收合選單
    $('.dropdown').click(function (e) {
      e.preventDefault();
      // e.preventDefault();/阻止事件的預設行為，這裡防止點擊連結時跳轉到其他頁面。因為它是用a標籤做的，照理說要有頁面跳轉功能/
      $(this).parent().find('.header__sub-ul').slideToggle();
      // 找到被點擊元素（.dropdown）的父層，然後在父層內找到類別為 dropdown-open 的子元素，並使用 slideToggle 效果來切換它的顯示/隱藏狀態。
      $(this).parent().siblings().find('.header__sub-ul').slideUp();
      // 將其他打開的選單收起來
    })
  })

  let data = {
    // 測試使用key:value
    "test@gmail.com": "123",
    "jou@gmail.com": "123"
  };
  function login() {
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    // 一開始是空值
    if (data[email] != undefined) {
      if (data[email] === password) {
        alert("登入成功");
        window.location.href = './register_member.html';
      } else {
        alert("登入失敗");
      }
      event.preventDefault();//送出表單不要重新整理
    }
  }
  // 點擊就呼叫login函式
  document.getElementById("login").addEventListener("click", login);

  // 註冊時要先點選立即註冊，會出現輸入框
  // function register() {
  //   let email = document.getElementById("email").value;
  //   let password = document.getElementById("password").value;
  //   if (email != "" || password != "") {
  //     data[email] = password;
  //     console.log(data);
  //   } else {
  //     alert("請填寫 email 或是 password");
  //   }
  // }
  // document.getElementById("register").addEventListener("click", register);


})
