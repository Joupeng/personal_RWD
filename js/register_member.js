// 為了收藏照片的上傳功能
// 第一個餐廳
function doFirst() {
    document.getElementById('theFile').onchange = fileChange


}
// 處理函數有使用事件或物件的屬性或方法則可以帶入事件物件，ex:任意取名此處為e
// 這裡需要找到要放入的圖片檔案
function fileChange(e) {
    // 原本的寫法
    // let file =document.getElementById('theFile').file[0]
    let file = e.target.files[0]


    let readFile = new FileReader()
    readFile.readAsDataURL(file)
    readFile.addEventListener('load', () => {
        // 此處Image是內建物件所以可以直接使用它的型態
        //    可以直接用new也可以用createElement，建立標籤並寫好屬性及方法
        // let image = new Image()
        let image = document.createElement('img')
        image.src = readFile.result
        image.style.width = '100%'
        image.style.height = '100%'

        // 要先找到這個我們要加入圖片的框，這裡我們的id是photo_box 
        let box = document.getElementById('photo_box')
        //   先判斷此處是否有物件，如果有要先刪除
        // alert(photo_box.childNodes.length)

        // 作法1
        // while (photo_box.childNodes.length >= 1) {
        //     photo_box.removeChild(photo_box.firstChild)
        // }

        // 作法2 字串要在中間空格，直接取代成空字串的意思
        photo_box.innerHTML = ' '


        // 要把圖片加入到我們的框
        photo_box.appendChild(image)
    })
}
window.addEventListener('load', doFirst)
