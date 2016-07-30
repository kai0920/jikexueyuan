var res = 0; //记录运算结果
var oper = "+"; //记录上一次操作符
var isClickOper = false; //是否点击了+ - x ÷
var input = document.getElementById('input'); //数字输入框


if(!document.getElementsByClassName){
  document.getElementsByClassName = function(className, element){
    var children = (element || document).getElementsByTagName('*');
    var elements = new Array();
    for (var i=0; i<children.length; i++){
      var child = children[i];
      var classNames = child.className.split(' ');
      for (var j=0; j<classNames.length; j++){
        if (classNames[j] == className){ 
          elements.push(child);
          break;
        }
      }
    } 
    return elements;
  };
}


var numDom = document.getElementsByClassName("num"); //1 2 3 4 5 6 7 8 9 0 .
var operDom = document.getElementsByClassName("oper"); //+ - x ÷
var selfOperDom = document.getElementsByClassName("self_oper"); //+/- 1/x % √￣
var equalOperDom = document.getElementById("equal_oper"); //=
var clearOperDom = document.getElementsByClassName("clear_oper"); //删除 全清 清屏

//绑定数字点击事件
for (var i = 0; i < numDom.length; i++) {
    if (numDom[i].addEventListener) {
        numDom[i].addEventListener("click", myNum);
    } else if (numDom[i].attachEvent) {
        numDom[i].attachEvent("onclick", myNum);
    }

}

// 绑定+ - x ÷点击事件
for (var i = 0; i < operDom.length; i++) {
    if (operDom[i].addEventListener) {
        operDom[i].addEventListener("click", myOper);
    } else if (operDom[i].attachEvent) {
        operDom[i].attachEvent("onclick", myOper);
    }

}

//绑定+/- 1/x % √￣点击事件
for (var i = 0; i < selfOperDom.length; i++) {
    if (selfOperDom[i].addEventListener) {
        selfOperDom[i].addEventListener("click", mySelfOper);
    } else if (selfOperDom[i].attachEvent) {
        selfOperDom[i].attachEvent("onclick", mySelfOper);
    }

}

//绑定=点击事件
if (equalOperDom.addEventListener) {
    equalOperDom.addEventListener("click", myEqualOper);
} else if (equalOperDom.attachEvent) {
    equalOperDom.attachEvent("onclick", myEqualOper);
}


//绑定 删除 全清 清屏点击事件
for (var i = 0; i < clearOperDom.length; i++) {
    if (clearOperDom[i].addEventListener) {
        clearOperDom[i].addEventListener("click", myClearOper);
    } else if (clearOperDom[i].attachEvent) {
        clearOperDom[i].attachEvent("onclick", myClearOper);
    }

}

/**
 * 点击数字操作
 * @param  e
 * @return {[type]}
 */
function myNum(e) {
    if(e.target){
    	var num = e.target.value;
    }else if(e.srcElement){
    	var num = e.srcElement.value;
    }

    if (num == '.') {
        input.setAttribute('dir', '');
        if (input.value.indexOf(".") > -1) { //只能允许一个点输入
            return false;
        }
    }

    if (!isClickOper) {
        if (input.value != 0) {
            input.value += num;
        } else {
            input.value = num;
        }
    } else {
        input.value = num;
        isClickOper = false;
    }
}

/**
 * + - x ÷ 运算
 * @return {[type]}
 */
function myCount() {
    if (oper == '+') {
        res = parseFloat(res) + parseFloat(input.value);
    } else if (oper == '-') {
        res = parseFloat(res) - parseFloat(input.value);
    } else if (oper == 'x') {
        res = parseFloat(res) * parseFloat(input.value);
    } else if (oper == '÷') {
        if (input.value == 0) {
            alert("除数不能为0");
            return false;
        }
        res = parseFloat(res) / parseFloat(input.value);
    }

    isClickOper = true;
    input.value = res;

    return true;
}

/**
 * + - x ÷ 操作
 * @param  {[type]}
 * @return {[type]}
 */
function myOper(e) {
    myCount();
    if(e.target){
    	oper = e.target.value;
    }else if(e.srcElement){
    	oper = e.srcElement.value;
    }
}

/**
 * +/- 1/x % √￣操作
 * @param  {[type]}
 * @return {[type]}
 */
function mySelfOper(e) {
    if(e.target){
    	var selfOper = e.target.value;
    }else if(e.srcElement){
    	var selfOper = e.srcElement.value;
    }

    if (selfOper == '+/-') {
        input.setAttribute('dir', '');
        input.value = -input.value;
    } else if (selfOper == '1/x') {
        input.value = 1 / input.value;
    } else if (selfOper == '%') {
        input.value = input.value / 100;
    } else if (selfOper == '√￣') {
        if (input.value < 0) {
            alert("无效输入");
            return false;
        }
        input.value = Math.sqrt(input.value);
    }
}

/**
 * = 操作
 * @param  {[type]}
 * @return {[type]}
 */
function myEqualOper(e) {
    myCount();
    oper = "+";
    res = 0;
}

/**
 * 删除 全清 清屏 操作
 * @param  {[type]}
 * @return {[type]}
 */
function myClearOper(e) {
    if(e.target){
    	var clearOper = e.target.value;
    }else if(e.srcElement){
    	var clearOper = e.srcElement.value;
    }

    if (clearOper == '删除') {
        var length = input.value.length;
        if (length == 1) {
            input.value = 0;
        } else {
            input.value = input.value.substring(0, length - 1);
        }
    } else if (clearOper == '全清') {
        input.value = 0;
    } else if (clearOper == '清屏') {
        input.value = 0;
        res = 0;
        oper = "+";
        isClickOper = false;
    }
}
