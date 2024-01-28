function doFirst() {
  // 輪播
  let divWidth;
  let imgCount = $('#content li').length
  // alert(imgCount)
  // 根據圖片個數產生圓點個數

  // 在初始時獲取視窗寬度
  catchWindowWidth();

  for (let i = 0; i < imgCount; i++) {
    $('#contentButton').append(`<li></li>`)
  }
  // 第一個li會是深色，因為象徵點選位置
  $('#contentButton li:first').addClass('clicked')
  // 寫上寬度
  // div的寬就是li的寬
  $('#content li').width(divWidth) // li的寬
  $('#content').width(divWidth * imgCount)  //ul的寬度(就是寬乘上個數)
  // 點選的功能
  let index = 0
  // 5秒會換圖
  let timer = setInterval(moveToNext, 5000)
  $('#contentButton li').click(function () {
    // 有點選進來就清掉倒數計時
    clearInterval(timer)
    // 被點的index
    // alert($(this).index())
    // alert(index)
    // 往左移會根據點的index，第二個點就是1，移一個寬度，向左為-1
    index = $(this).index()
    $('#content').animate({
      left: divWidth * index * -1,
    })
    //被點到的要加class
    $(this).addClass('clicked')
    // 其他的要移除
    $('#contentButton li').not(this).removeClass('clicked')
    // 做完後5秒才動
    timer = setInterval(moveToNext, 5000)
  })
  // 各功能設定
  //沒有按的時候5秒自己會移下一個
  function moveToNext() {
    //控制index的範圍，只能介於0~7，因為目前是8張圖片
    //當是第7張，就會回到第一頁=>index=0
    if (index < imgCount - 1) {
      index += 1
    } else {
      index = 0
    }
    $('#content').animate({
      left: divWidth * index * -1,
    })
    // 要找到當下出現的要深色的圓的index，eq找那個index
    // 選擇集合中與指定索引相等的元素。
    $(`#contentButton li:eq(${index})`).addClass('clicked')
    // 其他的要移除
    $('#contentButton li').not(`:eq(${index})`).removeClass('clicked')
  }
  // 當視窗變更取得寬度也要重新計算
  $(window).resize(function () {
    // 取得寬度
    catchWindowWidth();
    $('#content li').width(divWidth);
    $('#content').width(divWidth * imgCount);
  });
  function catchWindowWidth() {
    // 取得視窗寬度並存儲在 divWidth 中
    divWidth = $('#sliderBoard').width();
  }

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
    let content_box = document.getElementById('content_box').value;
    //  取用picture而不是value
    let pictureInput = document.getElementById('picture');

    // 先檢查是否有選擇文件
    if (!pictureInput.files || !pictureInput.files[0]) {
      alert('請選擇一張圖片');
      return; // 如果沒有選擇文件，中斷操作
    }
    // if (!name || !country || !viewpoint || !content || !pictureInput.files[0]) {
    //   alert('請填寫完整資訊');
    //   return; // 如果有未填寫的欄位，中斷操作
    // }
    if (!name || !country || !viewpoint || !content_box || !pictureInput.files[0]) {
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
    <span>${content_box}</span>
    <p>${name}</p>
    </div>
    `
      // 將新的留言板元素插入到留言板區域中，插回父層
      document.getElementById('noteContainer').appendChild(newNoteElement);
      //清空輸入框
      document.getElementById('name').value = '';
      document.getElementById('country').value = '';
      document.getElementById('viewpoint').value = '';
      document.getElementById('content_box').value = '';
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