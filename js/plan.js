function doFirst() {
    document.getElementById('myForm_create').onsubmit = calculate
    //跟HTML畫面產生關聯，在建立事件聆聽功能()
}
function calculate(e) {
    e.preventDefault()
}

window.addEventListener('load', doFirst)
