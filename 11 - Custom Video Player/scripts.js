// 抓取全部的元素
const player = document.querySelector('.player');
const video =player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');

//讓影片撥放或暫停
console.log(video);
function togglePlay(){
   const method = video.paused? 'play':'pause';
    video[method]();
}

video.addEventListener('click',togglePlay);
toggle.addEventListener('click',togglePlay);

//加入圖示ICON點選邏輯事件變化
function updateButton(){
 const icon = this.paused ? '►' : '❚ ❚';
    console.log(icon);
    toggle.textContent= icon;
}
video.addEventListener ( 'play' , updateButton);
video.addEventListener ( 'pause' , updateButton);

//快退/快進

console.log(skipButtons);
function skip(){
video.currentTime += parseFloat(this.dataset.skip);
}

skipButtons.forEach(button => button.addEventListener('click',skip));


//音量和播放速度

console.log(ranges);
function handleRangeUpdate(){
    video[this.name] = this.value;
};
ranges.forEach(range => range.addEventListener('change', handleRangeUpdate));
ranges.forEach(range => range.addEventListener('mousemove', handleRangeUpdate));

//進度條操作--------------------------------------
console.log(progressBar)
//自動進度條依照撥放時間圖示變化
function handleProgress(){
    const percent = (video.currentTime/video.duration)*100;
    progressBar.style.flexBasis = `${percent}%`;
}
video.addEventListener('timeupdate',handleProgress);
//根據點擊位置設置播放時間
function scrub(e){
    const scrubTime = (e.offsetX/progress.offsetWidth) * video.duration;
    video.currentTime = scrubTime;
}
progress.addEventListener('click',scrub);

//鼠標在progress上移動時更新進度
let mousedown =  false ;
//利用邏輯和操作符&&的短路特性來實現“只有當mousedown為true，或可類型轉換為true時才執行scrub(e)”的判斷操作
progress.addEventListener('mousemove',(e) => mousedown && scrub(e));
// progress . addEventListener ( ' mousemove ' , ( e ) => {

//     //若處於拖拽狀態則執行更新
//     if (mousedown) {
//          scrub (e);
//     }
// });
progress.addEventListener('mousedown',() => mousedown = true);
progress.addEventListener('mouseup',() => mousedown = false);