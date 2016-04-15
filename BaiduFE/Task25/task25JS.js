/**
 * Created by love on 2016/4/14.
 */
window.onload=function(){
    var btn = document.getElementById("btn");
    btn.addEventListener("click",ergodic);
    var divList = document.getElementsByTagName("div");
    for(var i = 0;i<divList.length;i++){
        divList[i].addEventListener("click",choose);
    }
    var aList = document.getElementsByTagName("a");
    for(i = 0;i<aList.length;i++){
        aList[i].addEventListener("click",toggle);
        aList[i].addEventListener("click",changeContent);
    }
    var btn3 = document.getElementById("btn3");
    btn3.addEventListener("click",delDiv);
    var btn4 = document.getElementById("btn4");
    btn4.addEventListener("click",addDiv);
};
function choose(e){
    var divList = document.getElementsByTagName("div");
    for(var i = 0;i<divList.length;i++){
        divList[i].style.backgroundColor = "white";
    }
    choosenDiv=[];
    e.stopImmediatePropagation();
    this.style.backgroundColor="pink";
    //console.log(this);
    //console.log(this.firstChild.textContent.trim());
    choosenDiv.push(this);
}
function toggle(){
    var divList = this.parentNode.parentNode.getElementsByTagName("div");
    for(var i = 0;i<divList.length;i++){
        if(divList[i].style.display=="none"){
            divList[i].style.display = "flex";
        }else{
            divList[i].style.display = "none";
        }
    }
}
function changeContent(){
    var flag = false;
    if(this.parentNode.parentNode.childElementCount!=1){
        var divList = this.parentNode.parentNode.childNodes;
        for(var i = 0;i<divList.length;i++){
            if(divList[i].nodeType!=3&&divList[i].style.display=="none"){
                flag = true;
            }
        }
    }
    if(flag){
        this.innerHTML="展开";
    }else{
        this.innerHTML="收起";
    }
}
labelArr = [];
divContainer = [];
choosenDiv = [];
function ergodic(){
    var divList = document.getElementsByTagName("div");
    for(var i = 0;i<divList.length;i++){
        divList[i].style.backgroundColor = "white";
    }
    divContainer=[];
    labelArr = [];
    var divObj = document.getElementsByClassName("first");
    initLDR(divObj[0]);
    //console.log(labelArr);
    changeDiv(divContainer);
}
function search(){
    //先获得输入查询的词
    if(labelArr.length==0){
        alert("请先遍历目前的元素节点！");
        return;
    }
    var divList = document.getElementsByTagName("div");
    for(var i = 0;i<divList.length;i++){
        divList[i].style.backgroundColor = "white";
    }
    var content = document.getElementById("textId").value;
    var flag = true;
    if(content!=""){
        re = new RegExp("^" + content +"$");
        labelArr.forEach(function(e){
            if(re.test(e.data.trim())){
                e.parentNode.style.backgroundColor = "green";
                flag = false;
            }
        });
    }
    if(flag){
        alert("查询内容为空或者未匹配到！");
    }
}
function initLDR(divObj){
    if(divObj!=null&&typeof(divObj)!="text"){
        //发现有.nodeNma这个属性，很方便
        if(divObj.nodeName=="DIV"){
            divContainer.push(divObj);
        }else{
            labelArr.push(divObj);
        }
        var childList = divObj.childNodes;
        for(var i=0;i<childList.length;i++){
            initLDR(childList[i]);
        }
    }
}
function changeDiv(arr){
    var tempObj = document.getElementsByClassName("first");
    var content = document.getElementById("textId").value;
    tempObj = tempObj[0];
    var foundFlag = false;
    var timer = setInterval(function(){
        tempObj.style.backgroundColor="white";
        var divObj = arr.shift();
        extend(divObj);
        //console.log(divObj.firstChild.textContent.trim());
        divObj.style.backgroundColor="blue";
        tempObj = divObj;
        if(arr.length==0){
            //最后一个要变白的写法
            setTimeout(function(){
                tempObj.style.backgroundColor="white";
                if(content.trim()!=""&&!foundFlag){
                    alert("找不到指定的内容！");
                }
            },400);
            clearInterval(timer);
        }else if(content.trim()!=""&&divObj.firstChild.firstChild.textContent.trim()==content.trim()){
            setTimeout(function(){
                tempObj.style.backgroundColor="lightgreen";
            },400);
            clearInterval(timer);
        }
    },500);
}
function extend(div){
    var flag = false;
    var divList = div.childNodes;
    for(var i = 0;i<divList.length;i++){
        if(divList[i].nodeType!=3){
            //console.log(divList[i]);
            if(divList[i].style.display=="none"){
                divList[i].style.display = "flex";
                flag = true;
            }
        }
    }
    if(flag){
        //console.log(div);
        div.firstElementChild.firstElementChild.innerHTML="收起";
    }
}
function delDiv(){
    if(window.confirm("确定删除"+choosenDiv[0].firstChild.textContent.trim()+"？")){
        choosenDiv[0].parentNode.removeChild(choosenDiv[0]);
    }
}
function addDiv(){
    var textObj = document.getElementById("textId2");
    var content = textObj.value;
    var subDiv = document.createElement("div");
    var subSpan = document.createElement("span");
    subSpan.innerHTML = content;
    subSpan.className="row";
    var subA = document.createElement("a");
    subA.innerHTML = "收起";
    subA.href="#";
    subA.addEventListener("click",toggle);
    subA.addEventListener("click",changeContent);
    subSpan.appendChild(subA);
    subDiv.appendChild(subSpan);
    subDiv.addEventListener("click",choose);
    choosenDiv[0].appendChild(subDiv);
    textObj.value="";
}