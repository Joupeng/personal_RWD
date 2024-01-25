document.addEventListener('DOMContentLoaded', function () {
    //監聽點選確認事件
    document.getElementById('confirmButton').addEventListener('click', generateList)
    //監聽輸入框keydown事件，所以要找到輸入框的id，使用的是DOM屬性
    document.getElementById('day_choose').addEventListener('keydown', function (e) {
        //如果按下的是enter鍵為13
        if (event.keyCode == 13) {
            generateList();
        }
    })
})
let pdfGenerated = false;
function generateList() {
    // 獲取輸入框的值
    let inputValue = document.getElementById('day_choose').value
    // 驗證是否為數字且介於1~7
    if (!isNaN(inputValue)) {
        if (inputValue >= 1 && inputValue <= 7) {
            // alert('是正確的')
            document.getElementById('day_choose').value = ''
            // 先要建立表單的外框位置
            formContainer = document.getElementById('formContainer')
            // 會清空之前產出的列表
            if (formContainer.firstChild) {
                formContainer.innerHTML = ''
            }
            //生成表單元素
            let form = document.createElement('form')
            form.id = 'myForm_create'
            form.innerHTML = '<legend>創立自己的行程表</legend>'
            let tripDiv = document.createElement('div')
            tripDiv.className = 'trip_news'
            //    一次插入多個
            tripDiv.innerHTML = '<input type="text" placeholder="請輸入行程名稱">' +
                '<input type="text" placeholder="請輸入前往國家">';
            //創建日期
            // 獲取當前日期並轉成格式字串格式，日期部分前10個字符
            let currentDate = new Date().toISOString().slice(0, 10)
            let dateInput = document.createElement('input')
            dateInput.type = 'date'
            dateInput.placeholder = '請選擇日期'
            //日期要限制只能選擇當日即之後日期
            dateInput.setAttribute('min', currentDate)

            tripDiv.appendChild(dateInput)
            form.appendChild(tripDiv)
            formContainer.appendChild(form)

            // 然後迴圈產生輸入值相應的數量
            for (let i = 0; i < inputValue; i++) {
                let dayDiv = document.createElement('div')
                dayDiv.className = 'myForm_create'
                dayDiv.innerHTML = '<h3>' + '第' + (i + 1) + '天' + '<h3>'
                // 天數標題放入表單中
                // 早餐
                let breakfastDiv = document.createElement('div')
                breakfastDiv.className = 'create_breakfast'
                breakfastDiv.innerHTML = '<input type="text" placeholder="請輸入早餐">' +
                    '<input type = "text" placeholder = "請輸入交通工具" >' +
                    '<input type="time" placeholder="請選擇抵達時間">'

                // 午餐
                let lunchDiv = document.createElement('div')
                lunchDiv.className = 'create_lunch'
                lunchDiv.innerHTML = '<input type="text" placeholder="請輸入午餐">' +
                    '<input type = "text" placeholder = "請輸入交通工具" >' +
                    '<input type="time" placeholder="請選擇抵達時間">'

                // 晚餐
                let dinnerDiv = document.createElement('div')
                dinnerDiv.className = 'create_dinner'
                dinnerDiv.innerHTML = '<input type="text" placeholder="請輸入晚餐">' +
                    '<input type = "text" placeholder = "請輸入交通工具" >' +
                    '<input type="time" placeholder="請選擇抵達時間">'

                //行程表
                let listDiv = document.createElement('div')
                listDiv.className = 'create_list'
                let listTextarea = document.createElement('textarea')
                listTextarea.type = "text"
                listTextarea.setAttribute('placeholder', '請輸入行程清單'); // 設置 placeholder 屬性
                listDiv.appendChild(listTextarea)

                form.appendChild(dayDiv)
                form.appendChild(breakfastDiv)
                form.appendChild(lunchDiv)
                form.appendChild(dinnerDiv)
                form.appendChild(listDiv)
                formContainer.appendChild(form)

            }
            // 生成提交鈕
            let buttonDiv = document.createElement('div')
            buttonDiv.className = 'button_create1'
            let submitButton = document.createElement('button')
            submitButton.type = 'submit';
            submitButton.id = 'button_create1_submit'
            submitButton.innerHTML = '提交'
            buttonDiv.appendChild(submitButton)
            form.appendChild(buttonDiv)
            // 產生後才監聽
            // submitButton.addEventListener('click', checkForm)
            // 為表單添加事件監聽器以防止默認表單提交行為
            form.addEventListener('submit', function (event) {
                event.preventDefault(); // 阻止默認的表單提交行為
                submitForm(); // 調用submitForm 函數
            });

            //先生成download鈕，隱藏再讓他顯示
            let DownLoadDiv = document.createElement('div')
            DownLoadDiv.className = 'button_create2'
            // DownLoadDiv.style.display = 'none'
            let DownLoadButton = document.createElement('button')
            DownLoadButton.type = 'button';
            DownLoadButton.id = 'button_create2_download'
            DownLoadButton.innerHTML = '下載'
            DownLoadButton.style.borderRadius = '#FFDB9D'
            DownLoadButton.style.display = 'none'
            DownLoadDiv.appendChild(DownLoadButton)
            form.appendChild(DownLoadDiv)

        } else {
            alert('請填入旅遊天數，僅提供7日之內短期旅遊規劃')
        }
    } else {
        alert('請輸入有效的天數（1 到 7 之間的數字）')
    }
}

function submitForm() {
    let checkForm = document.getElementById('myForm_create')
    //取得所有輸入欄位，他在'myForm_create裡面
    let inputFields = checkForm.querySelectorAll('input,textarea')
    //檢查是否有值
    // 是否檢查到空值的標誌
    let hasEmptyValue = false;
    for (let i = 0; i < inputFields.length; i++) {
        let fileValue = inputFields[i].value.trim()
        //如果有欄位沒有值要警告
        if (fileValue == "") {
            alert('請填寫所有欄位')
            hasEmptyValue = true;
            //    阻止表單提交
            break;  // 有空值時立即跳出迴圈
        }
    }
    // 因為只有在沒有空值下才會出現true，所以這邊代表就是沒有空值
    if (!hasEmptyValue) {
        // 呼叫提交完成訊息
        showMessage()
        // alert('表單提交成功')

        // 提交完成不可以再被編輯，鎖住input跟出現底色
        let formInputs = document.querySelectorAll('#myForm_create input ,textarea');
        formInputs.forEach(input => {
            input.readOnly = true;
            input.style.backgroundColor = '#f0f0f0'
        });

        //監聽是否點選下載
        document.getElementById('button_create2_download').addEventListener('click', handDownLoad);
        let submitButton = document.getElementById('button_create1_submit')
        submitButton.disabled = true;

    }



}
// 成功遞交表單訊息
function showMessage() {
    let messageBox = document.createElement('div');
    messageBox.style.position = 'fixed';
    messageBox.style.top = '50%';
    messageBox.style.left = '50%';
    messageBox.style.transform = 'translate(-50%,-50%)';
    messageBox.style.width = '280px'
    messageBox.style.borderRadius = '8px'
    messageBox.style.backgroundColor = '#fff';
    messageBox.style.color = '#8ECFD2'
    messageBox.style.border = '3px solid #8ECFD2';
    messageBox.style.zIndex = '10';

    // 文字建立
    let text = document.createElement('p')
    text.innerText = '表單填寫完成，可以點選下載'
    text.style.textAlign = 'center'
    text.style.color = '#8ECFD2'
    messageBox.appendChild(text)
    // 放入父層
    document.body.appendChild(messageBox);

    // 設定提交鈕失效
    let submitButton = document.getElementById('button_create1_submit');
    submitButton.disabled = true;
    submitButton.style.border = '3px solid #f0f0f0';
    submitButton.style.color = '#f0f0f0';
    submitButton.style.backgroundColor = '#fff';

    //計時關閉
    setTimeout(function () {
        messageBox.remove();
    }, 1000);
    //顯現下載按鈕parentNode就是指他的div
    document.getElementById('button_create2_download').style.display = 'block';

}
//handDownLoad的邏輯，要強制只能下載一次
function handDownLoad() {
    // 檢查是否已經生成過 PDF，避免重複生成，
    if (!pdfGenerated) {
        // 使用 html2pdf 將當前頁面內容轉換為 PDF
        let element = document.getElementById('myForm_create');
        html2pdf(element);
        // console.log('123');
        pdfGenerated = true;  // 設置標誌為已生成
        // 更改下載按鈕的顏色
        let downloadButton = document.getElementById('button_create2_download');
        downloadButton.disabled = true;  // 禁用按鈕
    }
}

