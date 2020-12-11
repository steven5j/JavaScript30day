// 取得所有 buttons //data-time 是所有需要使用的button
const buttons = document.querySelectorAll('[data-time]');
// 倒數計時的標題
const timeDisplay = document.querySelector('.display__time-left');
// 結束時間的顯示元素
const endTime = document.querySelector('.display__end-time');

//顯示倒數計時
function displayTimeLeft(seconds){
    // 計算幾分鐘
    const minutes = Math.floor(seconds/60);
    // 計算剩餘秒數
    const remainderSeconds = seconds % 60;
    // 組合顯示文字(剩餘時間)
    const display = `${minutes}：${remainderSeconds < 10 ? '0':''}${remainderSeconds}`;
    // 變更網頁的標題
    document.title = display;
    // 顯示倒數計時的區塊
    timeDisplay.textContent = display;
}

//顯示結束時刻
function displayEndTime(timestamp){
    //轉換為時間
    const end =   new Date(timestamp);
    const minutes = end.getMinutes();
    const seconds = end .getSeconds();
    //顯示結束時間
    endTime.textContent = `Be Back At ${end.getHours()}：${minutes<10 ? '0':''}${minutes}：${seconds < 10 ? '0':''}${seconds}`;
}

// 建立計時器
let countdown;

//按鈕事件，啟動計時器
function startTimer () {
    //data 轉換
    const seconds = parseInt(this.dataset.time); //dataset.time就是抓取自定義屬性data-time
    //執行倒數計時器
    timer(seconds);
}

function timer(seconds){
    // 先清除其他計時器，避免相互影響
    clearInterval(countdown);
    // 計算倒數計時完成的時刻(使用毫秒)
    const then = Date.now() + seconds * 1000;
    // 顯示倒數計時
    displayTimeLeft(seconds);
    // 顯示完成時刻
    displayEndTime(then);
    
    //計時器迴圈
    countdown = setInterval(()=>{
    // 每秒鐘執行，所以直接每次減 1 就好
    seconds--;
    // 小於 0 時，清除計時器 並跳出迴圈
    if(seconds < 0 ){
        clearInterval(countdown);
        return;
    }
    //顯示到計時器的地方
    displayTimeLeft(seconds);
    },1000);//每1000毫秒迴圈跑一次
}
//設置事件，每個button按鈕，只要點選，即開始計時器
buttons.forEach(button => button.addEventListener("click",startTimer));

//輸入時間的功能部分
document.customForm.addEventListener('submit',function(e){ //文件中name名稱為customForm的物件增加事件
    //取消預設功能**重要
    e.preventDefault();
    const mins = this.minutes.value; //表單內neme為minutes的值
    timer(mins * 60);//開始計時 分鐘*60
    //表單清空
    this.reset();
})