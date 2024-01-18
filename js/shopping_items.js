// 要把點選後的東西丟在上方左框
//總金額
//在另一頁看到前一頁的資料，在總計頁面出現剛剛存的storage頁面
let storage = localStorage

// 追蹤每個商品的數量
// doFirst就是按重新整理
//有初值才可以開始使用，若是在程式手動清，就要重新整理再次取得初值是空的，不然會抱錯
//一開始進來就有這個然後是空字串storage['addItemList']，因為我們是字串串接
function doFirst() {
  // 若是重新整理已有挑選物件，為避免被清空我們一開是給空值，需要先進行判斷是否已經key值
  if (storage['addItemList'] == null) {
    storage['addItemList'] = ''
  }
  // 檢查 itemQuantities 是否已經被定義
  if (storage['itemQuantities'] == null) {
    // 如果尚未定義，給它一個初始值，他是一個物件
    storage['itemQuantities'] = JSON.stringify({});
  }
  // 先判斷 totalQuantity 和 subtotal 是否為空，若為空才進行賦值
  if (storage['totalQuantity'] == null || storage['subtotal'] == null) {
    // 賦予初值，這裡的值可以根據你的需求來設定
    storage['totalQuantity'] = 0;
    storage['subtotal'] = 0;
  } else {
    // 若不為空，則直接將值放入頁面
    document.getElementById('itemCount').innerText = storage['totalQuantity']
    document.getElementById('subtotal').innerText = storage['subtotal']
  }


  // 取得 itemQuantities 的值
  itemQuantities = JSON.parse(storage['itemQuantities']);

  // 需要一個陣列幫忙紀錄買的順序
  // addItemList是key值，value是空字串
  //storage['addItemList'] = ''       // 第二種寫進local的方式 storage.setItem(key, value)   =>storage.setItem('addItemList', '') 

  // 在畫面load進來把剛剛紀錄值放回來
  let storedTotalQuantity = storage.getItem('totalQuantity')
  let storedSubtotal = storage.getItem('subtotal')
  // 如果有存儲值，則將值放回到對應的位置
  if (storedTotalQuantity !== null) {
    document.getElementById('itemCount').innerText = storedTotalQuantity
  }
  if (storedSubtotal !== null) {
    document.getElementById('subtotal').innerText = storedSubtotal
  }



  //先幫每一個Add Cart 建立事件聆聽功能
  // 從網頁使用document，找所有的標籤querySelectorAll
  let list = document.querySelectorAll('.addButton') //list 是陣列，等號右邊是複數所以左邊變數就是陣列
  //    初始值;條件判斷;條件為真更新條件
  for (let i = 0; i < list.length; i++) {
    // target是事件的屬性，有使用物件或事件的屬性及方法就帶入內建物件e
    list[i].addEventListener('click', function (e) {
      // e.target就是那個span整個
      // 要找id跟value(input的)
      // alert(e.target.id)
      // 找id的input小孩， 空一格是跨階層
      // 寫死測試
      //   let teddyInfo = document.querySelector(`#A1001 input`).value
      //就是他的資料內容
      let teddyInfo = document.querySelector(`#${e.target.id} input`).value
      // alert(teddyInfo);
      //呼叫這個函式
      addItem(e.target.id, teddyInfo)
    })
  }
  // 是否能點選查看購物車，要是在有東西的情況下才能點選

  let cartItem = document.getElementById('cartLink')
  cartItem.addEventListener('click', function (e) {
    if (storage['addItemList'] != "") {
      // 本機端
      // window.location.href = "../register_shopping.html"
      window.location.href = "/register_shopping.html"
      //存取總數量跟總金額
      let totalQuantityText = document.getElementById('itemCount').innerText
      let subtotalText = document.getElementById('subtotal').innerText
      // 將文字轉換成數字
      let totalQuantity = parseInt(totalQuantityText)
      let subtotal = parseInt(subtotalText)

      storage.setItem('totalQuantity', totalQuantity);
      storage.setItem('subtotal', subtotal);

    } else {
      e.preventDefault(); // 防止點擊連結時跳轉
      alert("購物車是空的，請先加入商品！")
    }
  })
}
//兩個參數要帶入 id跟資料
function addItem(itemId, itemValue) {
  // console.log(itemValue);
  if (storage[itemId]) {
    // 計算數量物件+1
    let quantity = getItemQuantity(itemId) + 1;
    // console.log(quantity)
    updateItemQuantity(itemId, quantity);
  } else {
    // 計算數量物件+1
    let quantity = getItemQuantity(itemId) + 1;
    updateItemQuantity(itemId, quantity);
    // 確認資料有進來
    // A1001就是id，itemValue就是隱藏在input的資料
    // alert(`${itemId}:${itemValue}`)
    // 先建標籤 圖片
    let image = document.createElement('img')
    // 給他的屬性
    // 圖片 切割字串使用split，切割為馬上變成陣列，就可以使用索引值，加上imgs/湊成完整路徑
    image.src = './images/imgs/' + itemValue.split('|')[1]
    // span
    let title = document.createElement('span')
    title.innerText = itemValue.split('|')[0]
    //金額
    let price = document.createElement('span')
    price.innerText = itemValue.split('|')[2]
    // 找到要的位置的爸爸，我們要放最上面的位置
    let newItem = document.getElementById('newItem')
    // 如果爸爸有小孩要先刪除再加入
    //先判斷是否有物件，如果有要先刪除
    //作法1
    //可以確認小孩個數，在未開始前是0
    // alert(newItem.childNodes.length);
    // while (newItem.childNodes.length >= 1) {
    //     newItem.removeChild(newItem.firstChild)
    // }

    //做法2
    // 每次進來都先清空
    newItem.innerHTML = ''

    //在顯示新的物件
    // 把圖片加進去
    newItem.appendChild(image)
    //把title加進去
    newItem.appendChild(title)
    newItem.appendChild(price)


  }
  //存入 storage，存id,加上空白
  // 如果有買過id已有紀錄
  if (storage[itemId]) {
    alert(`已經買過了，是否重複購買`)

    // storage['addItemList'] += `${itemId}, `
    // // 傳來的key跟value
    // storage.setItem(itemId, itemValue)
  } else {

    storage['addItemList'] += `${itemId}, `
    // 傳來的key跟value
    storage.setItem(itemId, itemValue)
  }
  // 取出物件itemQuantities
  let countString = storage.getItem('itemQuantities')
  // 將字串轉換為物件
  let itemQuantities = JSON.parse(countString);

  let totalQuantity = 0
  for (let itemId in itemQuantities) {
    if (itemQuantities.hasOwnProperty(itemId)) {
      // 通過 itemQuantities 物件中的 itemId 這個 key 取得對應的值，即該商品的數量
      totalQuantity += itemQuantities[itemId];
    }
  }
  // console.log('總數量:', totalQuantity);
  document.getElementById('itemCount').innerText = totalQuantity


  // // 計算購買數量和小計
  // // 取出來用get，給我key，會傳回value
  let itemString = storage.getItem('addItemList')
  // console.log(itemString)
  // // 字串切割成陣列，空白跟,會也被當成一個，所以要先扣除再切成陣列
  let items = itemString.substring(0, itemString.length - 2).split(', ')
  // console.log(items);
  // //['A1001', 'A1005', 'A1001']

  subtotal = 0
  // // 全部的金額加起來，迴圈根據買的數量跑，剛剛的陣列
  for (let i = 0; i < items.length; i++) {
    let itemId = items[i];
    //我要買的物品的key值，然後他傳回value

    let itemInfo = storage.getItem(itemId)
    // 我要被|隔開的第二個也就是金額
    //剛剛都是字串串接，要當數字做加總要改回

    // console.log(itemInfo)
    //   subtotal += parseInt(itemInfo.split('|')[2])

    // let prince = parseInt(itemInfo.split('|')[2])
    // console.log(prince)
    let prince;
    if (itemInfo && itemInfo.includes('|')) {
      prince = parseInt(itemInfo.split('|')[2]);
      subtotal += prince * itemQuantities[itemId]
    } else {
      // 適當的處理，例如設置一個默認值或顯示錯誤信息
    }

  }
  console.log(subtotal);
  // document.getElementById('itemCount').innerText = items.length
  document.getElementById('subtotal').innerText = subtotal
}
// 得到商品數量物件計算
function getItemQuantity(itemId) {
  return itemQuantities[itemId] || 0;
}
//更新商品各個數量物件計算
function updateItemQuantity(itemId, quantity) {
  // 根據追蹤數量中根據id來更新quantity，物件轉成字串
  itemQuantities[itemId] = quantity
  storage.setItem('itemQuantities', JSON.stringify(itemQuantities));
}

window.addEventListener('load', doFirst);


// 要先把資料存到storage，再從原本的網站送到另一個
//買的順序不一定固定，所以需要有一個欄位進行記錄順序 addItemList
//