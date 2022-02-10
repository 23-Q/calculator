const warp = document.querySelector(".warp"),
screen = warp.querySelector(".screen"),

rogBtn = warp.querySelector(".log-btn"),
rogArea = warp.querySelector(".log-area"),
log = warp.querySelector(".log"),
scrollTopBtn = warp.querySelector(".scroll-top-btn"),
scrollbottomBtn = warp.querySelector(".scroll-bottom-btn"),
clearBtn = warp.querySelector(".clear-btn"),

screenTop = warp.querySelector(".screen-inner-top"),
screenMain = warp.querySelector(".screen-inner-main"),

btnReset = warp.querySelector(".btn-reset"),
btnDelete = warp.querySelector(".btn-delete"),
btnPercent = warp.querySelector(".btn-percent"),

btnPlus = warp.querySelector(".btn-plus"),
btnMinus = warp.querySelector(".btn-minus"),
btnMultiply = warp.querySelector(".btn-multiply"),
btnDivide = warp.querySelector(".btn-divide"),

btnResult = warp.querySelector(".btn-result"),

btn0 = warp.querySelector(".btn-0"),
btn1 = warp.querySelector(".btn-1"),
btn2 = warp.querySelector(".btn-2"),
btn3 = warp.querySelector(".btn-3"),
btn4 = warp.querySelector(".btn-4"),
btn5 = warp.querySelector(".btn-5"),
btn6 = warp.querySelector(".btn-6"),
btn7 = warp.querySelector(".btn-7"),
btn8 = warp.querySelector(".btn-8"),
btn9 = warp.querySelector(".btn-9"),
btnDot = warp.querySelector(".btn-dot"),

data1 = document.querySelector(".save1"),
data2 = document.querySelector(".save2"),
data3 = document.querySelector(".save3"),
data4 = document.querySelector(".save4"),
data5 = document.querySelector(".save5") //퍼센트 계산

let calcMode = false;
let resultMode = false;

document.addEventListener("keydown", checkKeyPressed, false); //키보드 입력

function checkKeyPressed(e) {
  for(let i=0; i<10; i++){
    if (e.keyCode === 48+i || e.keyCode === 96+i) {numberClick(i);}
  }
	if (e.keyCode === 190 || e.keyCode === 110) {dotClick();}

	if (e.keyCode === 189 || e.keyCode === 109) {calclick(" - ");}
	if (e.keyCode === 191 || e.keyCode === 111) {calclick(" / ");}
	if (e.keyCode === 107) {calclick(" + ");}
	if (e.keyCode === 67 ) {calclick(" * ");}
  
	if (e.keyCode === 27) {resetClick();}
	if (e.keyCode === 13 || e.keyCode === 187) {resultClick();}
	if (e.keyCode === 8 || e.keyCode === 46) {deleteClick();}
};

btn0.addEventListener( "click", ()=>{numberClick(0);} );
btn1.addEventListener( "click", ()=>{numberClick(1);} );
btn2.addEventListener( "click", ()=>{numberClick(2);} );
btn3.addEventListener( "click", ()=>{numberClick(3);} );
btn4.addEventListener( "click", ()=>{numberClick(4);} );
btn5.addEventListener( "click", ()=>{numberClick(5);} );
btn6.addEventListener( "click", ()=>{numberClick(6);} );
btn7.addEventListener( "click", ()=>{numberClick(7);} );
btn8.addEventListener( "click", ()=>{numberClick(8);} );
btn9.addEventListener( "click", ()=>{numberClick(9);} );
btnDot.addEventListener( "click", ()=>{dotClick();} );

btnPlus.addEventListener( "click", ()=>{calclick(" + ");} );
btnMinus.addEventListener( "click", ()=>{calclick(" - ");} );
btnMultiply.addEventListener( "click", ()=>{calclick(" * ");} );
btnDivide.addEventListener( "click", ()=>{calclick(" / ");} );

btnPercent.addEventListener( "click", ()=>{percentClick();} );

btnResult.addEventListener( "click", ()=>{resultClick();} );

btnReset.addEventListener("click", ()=>{resetClick();});
btnDelete.addEventListener("click", ()=>{deleteClick();});

rogBtn.addEventListener( "click", ()=>{logBtnClick();} );

scrollTopBtn.addEventListener( "click", ()=>{scrollTopClick();} );
scrollbottomBtn.addEventListener( "click", ()=>{scrollBottomClick();} );
clearBtn.addEventListener( "click", ()=>{allClear();} );

function scrollTopClick(){ rogArea.scrollTop = rogArea.offsetTop; };
function scrollBottomClick(){ rogArea.scrollTop = rogArea.scrollHeight; };

function allClear(){
  while (log.hasChildNodes()) {	// 자식 노드 전체 삭제
    log.removeChild(
    log.firstChild
    );
  }
};

function logBtnClick(){
  if(rogArea.style.display === 'block'){
    rogArea.style.display = 'none';
    rogBtn.classList.remove('on');
  }else{
    rogArea.style.display = 'block';
    rogBtn.classList.add('on');  
    scrollBottomClick();
  }
}

function logRecord(){
  let divP = document.createElement('div');
  let re = screenTop.innerHTML + screenMain.innerHTML;
  if(resultMode == true){
    divP.innerHTML = re
  }else{
    divP.innerHTML = re + " = " + eval(re);
  }
  log.append(divP);
  divP.className = 'log-div';
};

for(let i=0; i<10; i++){
  function numberClick(i){
    if(resultMode == true){
      resetClick();
    }
    if(calcMode == true){
      screenMain.innerHTML="";
      calcMode = false;
    }
    if(screenMain.innerHTML.length > 11){
      return;
    }
    if(screenMain.innerHTML == "0"){
      screenMain.innerHTML="";
    }
    screenMain.innerHTML = screenMain.innerHTML + i;
   }
}

function dotClick(){
  if(resultMode == true){
    resetClick();
  }
  if(calcMode == true){
    screenMain.innerHTML="0";
    calcMode = false;
  }
  if(screenMain.innerHTML.indexOf('.') == -1){
    screenMain.innerHTML = screenMain.innerHTML + ".";
  }
}

function calclick(e){
    calcMode = true;
    data2.innerHTML = e;
    if(resultMode == true){
      screenTop.innerHTML = screenMain.innerHTML + e;
      resultMode = false;
      return;
    }
    if(screenTop.innerHTML !== ""){
      data3.innerHTML = screenTop.innerHTML + screenMain.innerHTML;
      screenTop.innerHTML = eval(data3.innerHTML) + e
    }else{
      screenTop.innerHTML = screenMain.innerHTML;
      data1.innerHTML =  screenTop.innerHTML;
      data3.innerHTML =  screenMain.innerHTML;
      screenTop.innerHTML = data1.innerHTML + e;
    }
    소수점계산();
    logRecord();
  }

function resultClick(){
  if(data5.innerHTML !== ""){
    data5.innerHTML = "";
    screenMain.innerHTML = eval(screenTop.innerHTML);
    screenTop.innerHTML = "";
  }else{
    if(screenMain.innerHTML == ""){ resetClick(); return; } //메인 비어있을때 리셋
    if(data3.innerHTML == data4.innerHTML && resultMode == true){ return; } //수식없이 숫자만 있을때 정지

    if(resultMode == false){
      data3.innerHTML = screenMain.innerHTML;
      data4.innerHTML = screenTop.innerHTML + screenMain.innerHTML;
      screenMain.innerHTML = eval(data4.innerHTML);
      screenTop.innerHTML = data4.innerHTML + " = ";
      resultMode = true;
    }else{
      data1.innerHTML = screenMain.innerHTML;
      screenTop.innerHTML = data1.innerHTML + data2.innerHTML + data3.innerHTML + " = ";
      data4.innerHTML = data1.innerHTML + data2.innerHTML + data3.innerHTML
      screenMain.innerHTML = eval(data4.innerHTML);
    }
  }
  소수점계산();
  logRecord();
}

function percentClick(){
  if(screenTop.innerHTML == ""){
    rscreenMain.innerHTML = "0";
  }else{
    data5.innerHTML = data1.innerHTML + "/100" + '*' + screenMain.innerHTML;
    data5.innerHTML = eval(data5.innerHTML);
  }

  screenTop.innerHTML = data1.innerHTML + data2.innerHTML + data5.innerHTML;
  screenMain.innerHTML = data5.innerHTML;
  data3.innerHTML = screenMain.innerHTML;
}

function resetClick(){
  screenTop.innerHTML = "";
  screenMain.innerHTML = "0";
  data1.innerHTML = "";
  data2.innerHTML = "";
  data3.innerHTML = "";
  data4.innerHTML = "";
  data5.innerHTML = "";
  resultMode = false;
}

function deleteClick(){
  if(resultMode == true){
    resetClick();
  }
    screenMain.innerHTML = "0";
    data5.innerHTML = "";
}

function 소수점계산(){
  screenMain.innerHTML = Math.round((screenMain.innerHTML)*10000000)/10000000
}



// 2.2 - 2.22