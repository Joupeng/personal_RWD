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
    //  取用picture而不是value
    let pictureInput = document.getElementById('picture');

    // 先檢查是否有選擇文件
    if (!pictureInput.files || !pictureInput.files[0]) {
      alert('請選擇一張圖片');
      return; // 如果沒有選擇文件，中斷操作
    }
    if (!name || !country || !viewpoint || !content || !pictureInput.files[0]) {
      alert('請填寫完整資訊');
      return; // 如果有未填寫的欄位，中斷操作
    }


    let picture = pictureInput.files[0]
    // 要再確認有選照片後，才會使用 FileReader 讀取文件
    let reader = new FileReader();

    // 設定當讀取完成時的回調函數
    reader.onload = function (e) {
      // 獲取 Data URL
      // 創建的 URL 可以立即在網頁上展示相應的內容，而不需要等待數據上傳到伺服器並生成實際的 URL。
      let pictureURL = URL.createObjectURL(picture);





      // 創建新的留言板元素
      let newNoteElement = document.createElement('div');
      newNoteElement.className = 'note_picture_container__outside'

      // 添加新留言板的內容到網頁上
      newNoteElement.innerHTML = `
    <div class="note_picture__photo"><img src="${pictureURL}" alt="無法顯示"></div>
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
      // 清空文件選擇框
      document.getElementById('picture').value = '';
      // 清理 URL 對象
      // 是用來釋放先前使用 URL.createObjectURL() 創建的 URL，而不是釋放圖片本身。它的主要目的是釋放瀏覽器在內存中為該 URL 所分配的資源。
      // URL.revokeObjectURL(pictureURL);
    };
    // 讀取文件（圖片）
    reader.readAsDataURL(picture);
  });

}
window.addEventListener('load', doFirst)