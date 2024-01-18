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
                '<input type="text" placeholder="請輸入前往國家">' +
                '<input type="date" placeholder="請選擇日期">';
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
                breakfastDiv.innerHTML = '<input type="text" placeholder="請輸入早餐地點">' +
                    '<input type = "text" placeholder = "請輸入交通工具" >' +
                    '<input type="time" placeholder="請選擇抵達時間">'

                // 午餐
                let lunchDiv = document.createElement('div')
                lunchDiv.className = 'create_lunch'
                lunchDiv.innerHTML = '<input type="text" placeholder="請輸入午餐地點">' +
                    '<input type = "text" placeholder = "請輸入交通工具" >' +
                    '<input type="time" placeholder="請選擇抵達時間">'

                // 晚餐
                let dinnerDiv = document.createElement('div')
                dinnerDiv.className = 'create_dinner'
                dinnerDiv.innerHTML = '<input type="text" placeholder="請輸入晚餐地點">' +
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
            submitButton.addEventListener('click', checkForm)
        }
    } else {
        alert('請輸入有效的天數（1 到 7 之間的數字）')
    }
}

function checkForm() {
    let checkForm = document.getElementById('myForm_create')
    //取得所有輸入欄位，他在'myForm_create裡面
    let inputFields = checkForm.querySelectorAll('input,textarea')
    //檢查是否有值
    for (let i = 0; i < inputFields.length; i++) {
        let fileValue = inputFields[i].value.trim()
        //如果有欄位沒有值要警告
        if (!fileValue) { }
        alert('請填寫所有欄位')
        //    阻止表單提交
        return false
    }
    alert('表單提交成功')
    return true

}
let submitButton = document.getElementById('button_create1')


