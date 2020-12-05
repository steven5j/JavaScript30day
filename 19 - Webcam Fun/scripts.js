
//抓取每個物件
const video = document.querySelector('.player');
console.log(video)
const canvas = document.querySelector('.photo');
const ctx = canvas.getContext('2d'); //canvas 2D繪製
const strip = document.querySelector('.strip');
const snap = document.querySelector('.snap');
type = 0
//抓取video 並讓他可以撥放
function getViedo(){
    navigator.mediaDevices.getUserMedia({video:true,audio:false}).then(localMediaStream => {
        console.log(localMediaStream);
        video.srcObject =localMediaStream;
        video.play();
    }).catch(err =>{
        console.log(`OH!! NO!!`,err);
    })
}

function switchType(num){
    type = num;
    if(type==3){
        document.querySelector('.rgb').setAttribute('style','display:block;');
    }
}

function paintToCanvas() {
    const width = video.videoWidth;
    const height = video.videoHeight;
    canvas.width = width;
    canvas.height = height;
//回傳每16毫秒執行圖畫
return setInterval (() =>{
    //Canvas 2D 畫圖 4個參數
    ctx.drawImage(video,0,0,width,height);
    //抓取Canvas 2D 的像素
    let piexls = ctx.getImageData(0,0,width,height);
    switch (type) {
        case 0:
    //原始模式
   // piexls = original(piexls);
        break;
        case 1:
    //R G B 分離殘影模式
    piexls = rgbSplit(piexls);
        break;
        case 2:
    //RED 效果模式
    piexls = redEffect(piexls);
       break;
       case 3:
    //去背模式
    piexls = greenScreen(piexls);
        break;
    }
   

    //輸出圖像資料到Canvas 2D
    ctx.putImageData(piexls,0,0);
},16);
}
//takePhoto按鈕 拍照事件
function takePhoto(){
    //撥放音效
    snap.currentTime = 0;
    snap.play();

    //把canvas的資料轉成圖檔URL 的可下載連結並產生圖片再頁面下方
    const data = canvas.toDataURL('image/jpeg');
    const link = document.createElement('a');
    link.href = data;
    link.setAttribute('download','pretty');
    link.innerHTML =`<img src='${data}' alt='pretty gril' />`;
    strip.insertBefore(link, strip.firstChild);
}


//R G B 分離殘影模式
function rgbSplit(pixels){
    for(let i = 0 ;i < pixels.data.length; i += 4){//因為 R G B A 所以迴圈要跳四
        pixels.data[i - 150] = pixels.data[i + 0]; //RED紅
        pixels.data[i + 500] = pixels.data[i + 1]; //GREEN綠
        pixels.data[i - 550] = pixels.data[i + 2]; //BLUE藍
        //pixels.data[i + 3];//A 透明度
    };
    return pixels;
}
//RED 效果模式
function redEffect(pixels) {
    for (let i = 0; i < pixels.data.length; i+=4) {
      pixels.data[i + 0] = pixels.data[i + 0] + 200; // RED
      pixels.data[i + 1] = pixels.data[i + 1] - 50; // GREEN
      pixels.data[i + 2] = pixels.data[i + 2] * 0.5; // Blue
    }
    return pixels;
  }

//去背模式
  function greenScreen(pixels) {
    const levels = {};
  
    document.querySelectorAll('.rgb input').forEach((input) => {
      levels[input.name] = input.value;
    });
  
    for (i = 0; i < pixels.data.length; i = i + 4) {
      red = pixels.data[i + 0];
      green = pixels.data[i + 1];
      blue = pixels.data[i + 2];
      alpha = pixels.data[i + 3];
  
      if (red >= levels.rmin
        && green >= levels.gmin
        && blue >= levels.bmin
        && red <= levels.rmax
        && green <= levels.gmax
        && blue <= levels.bmax) {
        // take it out!
        pixels.data[i + 3] = 0;
      }
    }
    return pixels;
}

//執行getViedo
getViedo();

video.addEventListener('canplay',paintToCanvas);