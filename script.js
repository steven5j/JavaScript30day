// get post data
const postDatas = [];
// blog url
const blogUrl = "https://steven5j.github.io/";
// github url
const githubUrl = "https://github.com/steven5j/JavaScript30day/tree/main/";

const couseList = document.querySelector(".courseList");

fetch("https://steven5j.github.io/JavaScript30day/postData.json")
  .then(blob => blob.json())
  .then(data => {
    postDatas.push(...data);
    createView();
    Steven_createView();
  });

/** 畫面建立 */
function createView() {
  let view = [];
  postDatas.forEach(data => {
    view.push(`<li>
                <div class="course">
                  <h2 class="course__title">第 ${data.no} 天 - ${
      data.title
    }</h2>
                  <div class="course__desc">${data.desc}</div>
                  <a class="course__btn" href="${blogUrl}JavaScript30day/${data.github}" target="_blank" >Demo</a>
                  <a class="course__btn" href="${blogUrl +
                    data.blog}" target="_blank" >筆記</a>
                  <a class="course__btn" href="${githubUrl +
                    data.github}" target="_blank">Source Code</a>
                </div>
              </li>`);
  });
  document.querySelector(".courseList").innerHTML = view.join("");
}


function Steven_createView() {
  let view = [];
  postDatas.forEach(data => {
    view.push(`   <a href="${blogUrl}">
                    <li class="steven-card">
                      <img src="${data.img}" alt="">
                      <h3>[Day${data.no}] ${data.title}</h3>
                      <p>${data.desc}</p>
                      <a class="steven_course_btn" href="${blogUrl}JavaScript30day/${data.github}" target="_blank" >Demo</a>
                      <a class="steven_course_btn" href="${blogUrl +
                    data.blog}" target="_blank" >筆記</a>
                    </li>
                  </a>
                  `);
  });
  document.querySelector(".steven_card_box").innerHTML = view.join("");
}
