/**
 * Created by love on 2016/4/14.
 */
window.onload=function(){
    var btn = document.getElementById("btn");
    btn.addEventListener("click",ergodic);
    var btn2 = document.getElementById("btn2");
    btn2.addEventListener("click",search);
};
labelArr = [];
divContainer = [];
function ergodic(){
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
    tempObj = tempObj[0];
    var timer = setInterval(function(){
        tempObj.style.backgroundColor="white";
        var divObj = arr.shift();
        divObj.style.backgroundColor="blue";
        tempObj = divObj;
        if(arr.length==0){
            //最后一个要变白的写法
            setTimeout(function(){
                tempObj.style.backgroundColor="white";
            },500);
            clearInterval(timer);
        }
    },500);
}