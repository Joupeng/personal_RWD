// 為了收藏照片的上傳功能

function doFirst() {
    document.getElementById('theFile').onchange = fileChange
}
function fileChange() {
    let file = document.getElementById('theFile').files[0]

    let message = ``
    message += `File name:${file.name}\n`
    message += `File name:${file.type}\n`
    message += `File name:${file.size}byte\n`
    message += `Last modified${file.lastModifiedDate}\n`
    document.getElementById('fileInfo').value = message



    let readFile = new FileReader()
    readFile.readAsDataURL(file)
    readFile.addEventListener('load', () => {
        let image = document.getElementById('image')
        image.src = readFile.result
        image.style.maxHeight = '400px'
        image.style.maxWidth = '400px'
    })
}



window.addEventListener('load', doFirst)