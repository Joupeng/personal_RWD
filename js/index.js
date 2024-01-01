function doFirst() {
  // 漢堡功能
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

  // 翻牌功能
  $("#card").flip();

  //留言板功能
  document.getElementById('buttom_submit').addEventListener('click', function (event) {
    event.preventDefault(); // 防止表單的默認提交行為
    // 獲取每個欄位的值
    let name = document.getElementById('name').value;
    let country = document.getElementById('country').value;
    let viewpoint = document.getElementById('viewpoint').value;
    let content = document.getElementById('content').value;
    let picture = document.getElementById('picture').value;

    // 創建新的留言板元素
    let newNoteElement = document.createElement('div');
    newNoteElement.className = 'note_picture_container__outside'

    // 添加新留言板的內容到網頁上
    newNoteElement.innerHTML = `
    <div class="note_picture__photo"><img src="${picture}" alt="無法顯示"></div>
    <div class="note_picture__text">
    <p>${new Date().toLocaleDateString()}</p>
    <p>${country}  ${viewpoint}</p>
    </div>
    <div class="note_picture__think">
    <span>${content}</span>
    <p>${name}</p>
    </div>
    `
    // 將新的留言板元素插入到留言板區域中，插回父層
    document.getElementById('noteContainer').appendChild(newNoteElement);
    //清空輸入框
    document.getElementById('name').value = '';
    document.getElementById('country').value = '';
    document.getElementById('viewpoint').value = '';
    document.getElementById('content').value = '';
    document.getElementById('picture').value = '';

  });
}


window.addEventListener('load', doFirst)