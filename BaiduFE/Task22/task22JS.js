/**
 * Created by love on 2016/4/14.
 */
window.onload=function(){
    var btn = document.getElementById("btn");
    btn.addEventListener("click",search);
};
LDR = [];
DLR = [];
LRD = [];
function search(){
    var selectObj = document.getElementById("selectId");
    var divObj = document.getElementsByClassName("first");
    switch(selectObj.selectedOptions[0].value){
        case("LDR"):
            initLDR(divObj[0]);
            changeDiv(LDR);
            break;
        case("DLR"):
            initDLR(divObj[0]);
            changeDiv(DLR);
            break;
        case("LRD"):
            initLRD(divObj[0]);
            changeDiv(LRD);
            break;
    }
    //alert(selectObj.selectedOptions[0].value);
    //initDLR(divObj[0]);
}
function initLDR(divObj){
    if(divObj!=null){
        initLDR(divObj.firstElementChild);
        LDR.push(divObj);
        initLDR(divObj.lastElementChild);
    }
}
function initDLR(divObj){
    if(divObj!=null){
        DLR.push(divObj);
        //console.log(DLR);
        initDLR(divObj.firstElementChild);
        initDLR(divObj.lastElementChild);
    }
}
function initLRD(divObj){
    if(divObj!=null){
        initLRD(divObj.firstElementChild);
        initLRD(divObj.lastElementChild);
        LRD.push(divObj);
    }
}
function changeDiv(arr){
    var tempObj = document.getElementsByClassName("first");
    tempObj = tempObj[0];
    var timer = setInterval(function(){
        tempObj.style.backgroundColor="white";
        var divObj = arr.shift();
        divObj.style.backgroundColor="blue";
        //console.log(arr.length);
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