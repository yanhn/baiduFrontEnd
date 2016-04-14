/**
 * Created by Johnny on 2016/4/14.
 */
window.onload=function(){
    var btnObj = document.getElementById("btnId");
    btnObj.addEventListener("click",addHabbit);
    var inputObj = document.getElementById("tagId");
    inputObj.addEventListener("keydown",addTag);
};
tagArr = [];
habbitArr = [];
function addTag(e){
    var inputObj = document.getElementById("tagId");
    var tagContent = document.getElementById("tagId").value.trim();
    if(e.keyCode==188||e.keyCode==32||e.keyCode==13||e.keyCode==229){
        e.preventDefault();         //原来按下去输入的功能都没有了。
        if(tagArr.indexOf(tagContent)==-1&&tagContent!=""){
            if(tagArr.length>=10){
                tagArr.pop();
            }
            tagArr.unshift(tagContent);
            inputObj.value="";
            inputObj.focus();
        }else{
            inputObj.value="";
            inputObj.focus();
        }
        showTag(tagArr);
    }
}
function showTag(que){
    var divObj = document.getElementById("tagContainer");
    divObj.innerHTML="";
    console.log(que);
    for(var i=0;i<que.length;i++){
        var subDiv = document.createElement("div");
        subDiv.innerHTML = que[i];
        subDiv.addEventListener("mouseover",changeContent);
        subDiv.addEventListener("mouseout",changeContentBack);
        subDiv.addEventListener("click",delDiv);
        divObj.appendChild(subDiv);
    }
}
function changeContent(){
    this.innerHTML = "点击删除 "+this.innerHTML;
}
function changeContentBack(){
    this.innerHTML = this.innerHTML.slice(5);
}
function delDiv(){
    tagArr.splice(tagArr.indexOf(this.innerHTML.slice(5)),1);
    showTag(tagArr);
}
function addHabbit(){
    //去重，分割
    var textObj = document.getElementById("habbitId");
    var arr = textObj.value.split(/ |,|，|=|\n/);
    //var arr = textObj.value.split(" |,|，|=|\n");
    //这里用“”不可以，还是得用类似于re的正则写法。估计内部是用re实现的。
    for (var i=0;i<arr.length;i++){
        if(arr[i].trim()!=""&&habbitArr.indexOf(arr[i].trim())==-1){
            if(habbitArr.length>=10){
                habbitArr.pop();
            }
            habbitArr.unshift(arr[i].trim());
            textObj.value="";
            textObj.focus();
        }else{
            textObj.value="";
            textObj.focus();
        }
        showHabbit(habbitArr);
    }
}
function showHabbit(que){
    var divObj = document.getElementById("habbitContainer");
    divObj.innerHTML="";
    console.log(que);
    for(var i=0;i<que.length;i++){
        var subDiv = document.createElement("div");
        subDiv.innerHTML = que[i];
        //subDiv.addEventListener("mouseover",changeContent);
        //subDiv.addEventListener("mouseout",changeContentBack);
        //subDiv.addEventListener("click",delDiv);
        divObj.appendChild(subDiv);
    }
}