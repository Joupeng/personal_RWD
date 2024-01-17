let storage = localStorage


function doFirst() {
  // 一進來就要得到前頁的商品總數跟金額
  // 計算購買數量和小計
  // 取出來用get，給我key，會傳回value
  let itemString = storage.getItem('addItemList')
  // 字串切割成陣列，空白跟,會也被當成一個(共兩個)，所以要先扣除再切成陣列
  let items = itemString.substring(0, itemString.length - 2).split(', ')
  console.log(items);//['A1001', 'A1005', 'A1001']
  // 外層的框要先建，且只會建一次，去對照4_caredit頁面
  newDiv = document.createElement('div')
  newTable = document.createElement('table')

  // 將table放入div,再將div放入cartList
  newDiv.appendChild(newTable)
  // cartList是id所以用get
  document.getElementById('cartList').appendChild(newDiv)

  // 根據這邊內容數量決定建幾個tr
  for (let i = 0; i < items.length; i++) {
    // 我要買的物品的key值，然後他傳回value
    let itemInfo = storage.getItem(items[i])
    // 持續加上迴圈跑的金額
    console.log(itemInfo)
    total += parseInt(itemInfo.split('|')[2])
    // console.log(itemInfo)
    // 呼叫createCartList函式建tr，給id跟value

    createCartList(items[i], itemInfo)
  }

  // //算總金額的位置顯示
  // document.getElementById('total').innerText = total

  let countString = storage.getItem('itemQuantities')
  // 將字串轉換為物件
  let itemQuantities = JSON.parse(countString);
  // 使用迴圈動態處理
  for (let itemId in itemQuantities) {
    if (itemQuantities.hasOwnProperty(itemId)) {
      // 獲取商品數量
      let quantity = itemQuantities[itemId];
      // console.log(`商品 ${itemId} 的數量為: ${quantity}`);
      let inputElement = document.getElementById(itemId + 'input')
      if (inputElement) {
        // 取出在物件裡的數量,放到input
        inputElement.value = quantity;
      }
    }
  }
  // 我應該是取tr做迴圈，然後取price*input的value
  let trList = document.querySelectorAll('tr');
  total = 0
  for (let i = 0; i < trList.length; i++) {
    // 會是陣列所以有索引值
    let tr = trList[i];
    let princeElement = tr.querySelector('.price');
    let quantityInput = tr.querySelector('input[type="number"]');
    if (princeElement && quantityInput) {
      let price = parseInt(princeElement.innerText)
      let quantity = parseInt(quantityInput.value)
      // console.log(price)
      // console.log(quantity)
      total += price * quantity
    }


  }
  // //算總金額的位置顯示
  document.getElementById('total').innerText = total
  // 更新總數量localStorage
  quantityCount = 0
  let upgradeQuantity = document.getElementById('return')
  upgradeQuantity.addEventListener('click', function (e) {
    if (storage['addItemList'] != "") {
      let trList = document.querySelectorAll('tr');
      for (let i = 0; i < trList.length; i++) {
        let tr = trList[i]
        let quantityInput = tr.querySelector('input[type="number"]')
        if (quantityInput) {
          let quantity = parseInt(quantityInput.value)
          quantityCount += quantity
          // console.log(quantityCount)
        }
      }
    }
    // 更新 localStorage 中的總數值，待修正
    storage.setItem('totalQuantity', quantityCount);
    // 更新總金額localStorage

    if (storage['addItemList'] != "") {
      let subtotalText = document.getElementById('total').innerText
      storage.setItem('subtotal', subtotalText)
    }
  })
  let checkOut = document.getElementById('checkout')
  checkOut.addEventListener('click', function (e) {
    let checkOutMessage = document.querySelector('.check_out_list')
    checkOutMessage.style.display = "block"
  })
  // //
  // let clearShooping = document.getElementById('clear')
  // clearShooping.addEventListener('click', function (e) {
  //   storage.removeItem('itemQuantities')
  //   storage.removeItem('addItemList')
  //   storage.removeItem('totalQuantity')
  //   storage.removeItem('subtotal')
  //   // console.log(itemId)
  //   // let itemId = e.target.parentNode.id

  //   storage.removeItem('itemId')
  //   // storage['addItemList'] = storage['addItemList'].replace(new RegExp(`${itemId},\\s*`), '');


  // })
  // 點選返回會員首頁會清空localStorage的項目
  let clearShopping = document.getElementById('clear');
  clearShopping.addEventListener('click', function (e) {
    // 清除每個商品的紀錄，就是根據itemId創出來的key:value
    let itemString = storage.getItem('addItemList');
    let items = itemString.substring(0, itemString.length - 2).split(', ');

    for (let i = 0; i < items.length; i++) {
      let itemId = items[i];
      storage.removeItem(itemId);
    }

    // 清除購物車的商品列表
    storage.removeItem('addItemList');

    // 清除總數量和總金額的資訊
    storage.removeItem('itemQuantities')
    storage.removeItem('subtotal');
  });


}
//建立購買商品
function createCartList(itemId, itemValue) {
  // 呼叫函式
  //使alert確認有正確嗎是否是localstorage的值
  // alert(`${itemId}:${itemValue}`
  let itemTitle = itemValue.split('|')[0]
  // 圖片需要路徑檔
  let itemImage = './images/imgs/' + itemValue.split('|')[1]
  //  let itemImage = 'imgs/' + itemValue.split('|')[1]
  // 金額也要變成數值
  let itemPrice = parseInt(itemValue.split('|')[2])

  // 建立每個商品的清單  --tr
  let trItemList = document.createElement('tr')
  trItemList.className = 'item'
  newTable.appendChild(trItemList)

  // 建立商品圖片 --第一個td
  let tdImage = document.createElement('td')
  tdImage.style.width = "200px"

  let image = document.createElement('img')
  // 路徑檔名，上面已定義好的，html屬性直接用點的
  image.src = itemImage
  image.width = 70
  // image放進td裡
  tdImage.appendChild(image)
  // td放進tr裡
  trItemList.appendChild(tdImage)

  // 建立商品名稱(p標籤)和刪除按鈕(button) --第二個td
  let tdTitle = document.createElement('td')
  tdTitle.style.width = "280px"
  tdTitle.id = itemId
  // p標籤
  let pTitle = document.createElement('p')
  //itemTitle上面有定義的變數
  pTitle.innerText = itemTitle
  // button
  let deleteButton = document.createElement('button')
  deleteButton.innerText = 'Delete'
  // button有方法，點選處發函式搭配事件聆聽功能，deleteItem函式
  deleteButton.addEventListener('click', deleteItem)
  // 放入架構名稱跟button
  tdTitle.appendChild(pTitle)
  tdTitle.appendChild(deleteButton)
  trItemList.appendChild(tdTitle)

  // 建立商品價格 --第三個td
  let tdPrince = document.createElement('td')
  tdPrince.style.width = "170px"
  tdPrince.className = "price"
  // 放入錢
  tdPrince.innerText = itemPrice
  // td放入tr
  trItemList.appendChild(tdPrince)
  // 建立商品數量 --第四個td
  let tdItemCount = document.createElement('td')
  tdItemCount.style.width = "60px"
  let inputItemCount = document.createElement('input')
  // 原本三個屬性，更新數量的方式，input輸入的方式有鍵盤打字(keyup事件)跟點選上下增加或減少(change事件)
  //整個改變叫input事件
  inputItemCount.type = "number"
  inputItemCount.value = 1
  inputItemCount.min = 1
  inputItemCount.id = itemId + 'input'; // 添加唯一的 ID
  //事件的
  inputItemCount.addEventListener('input', changeItemCount)
  // input放入td裡
  tdItemCount.appendChild(inputItemCount)
  // td放入tr
  trItemList.appendChild(tdItemCount)
}
function deleteItem(e) {
  //  1.先找到預刪除的品項
  //id的屬性放在按鈕的父層，所以用parentNode
  let itemId = e.target.parentNode.id
  // alert(itemId)
  // 2.要先扣除總金額才可以刪掉，不然會找不到，數量變動總金額也會變
  // 找到Id就能找到value
  let itemValue = storage.getItem(itemId)
  // console.log(itemValue)
  // 扣除金額
  let itemPrice = parseInt(itemValue.split('|')[2])
  let countString = storage.getItem('itemQuantities')
  // 將字串轉換為物件
  let itemQuantities = JSON.parse(countString);
  let quantity = itemQuantities[itemId];

  total -= quantity * itemPrice

  // total -= parseInt(itemValue.split('|')[2])
  document.getElementById('total').innerText = total

  //3.清除 storage裡的資料(紀錄各品項，紀錄各品項數量)，要想成用空字串去取代原本的位置
  // 要移除的要取得id
  storage.removeItem(itemId)
  // 取得要進行替代的值
  // 使用陣列物件表示法
  // 把要移除的取代成空字串，記得我們的id會搭配,跟一個空白，再寫回去陣列裡
  //陣列寫法是直接代表get
  // 使用正規表達式（Regular Expression）來確保只刪除完整的商品 ID
  // 請注意 \\s* 部分，這表示零個或多個空白字符，以確保在刪除後不會留下多餘的逗號和空格。
  storage['addItemList'] = storage['addItemList'].replace(new RegExp(`${itemId},\\s*`), '');

  // 刪數量統計的local Satorage=====
  // 使用全域變數，轉換成javascript物件，取得 itemQuantities 的值
  itemQuantities = JSON.parse(storage['itemQuantities']);
  // 刪除指定 itemId
  delete itemQuantities[itemId];
  // 更新 localStorage
  storage['itemQuantities'] = JSON.stringify(itemQuantities);
  //4.刪除該筆 <tr>
  // e.target按鈕本身，沿線找上去父層，按鈕=>td=>tr=>table
  //table刪tr
  // e.target.parentNode.parentNode.parentNode.removeChild(e.target.parentNode.parentNode)
  newTable.removeChild(e.target.parentNode.parentNode)

}
// 使用input更改數量
function changeItemCount(e) {
  // 更改input的值
  let newQuantity = parseInt(e.target.value)
  // console.log(newQuantity)
  // 把我們的id=>inputA100，只剩下itemId所以去除input，用空字串代替
  let itemId = e.target.id.replace('input', '')
  // 更新商品總數
  updateLocalStorageQuantity(itemId, newQuantity);
  //更新商品金額
  updateTotal(itemId, newQuantity)
}
// 更新各商品的數量統計位置LocalStorage
function updateLocalStorageQuantity(itemId, newQuantity) {
  let countString = storage.getItem('itemQuantities')
  // 轉換成js的寫法
  let itemQuantities = JSON.parse(countString)
  itemQuantities[itemId] = newQuantity
  // 存回localStorage
  storage.setItem('itemQuantities', JSON.stringify(itemQuantities))

}
function updateTotal() {
  let trList = document.querySelectorAll('tr');
  total = 0;

  for (let i = 0; i < trList.length; i++) {
    let tr = trList[i];
    let priceElement = tr.querySelector('.price');
    let quantityInput = tr.querySelector('input[type="number"]');

    if (priceElement && quantityInput) {
      let price = parseInt(priceElement.innerText);
      let quantity = parseInt(quantityInput.value);
      total += price * quantity;
    }
    document.getElementById('total').innerText = total;
  }
}
window.addEventListener('load', doFirst);