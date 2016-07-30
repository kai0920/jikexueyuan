//兼容ie
if (!document.getElementsByClassName) {
    document.getElementsByClassName = function(className, element) {
        var children = (element || document).getElementsByTagName('*');
        var elements = new Array();
        for (var i = 0; i < children.length; i++) {
            var child = children[i];
            var classNames = child.className.split(' ');
            for (var j = 0; j < classNames.length; j++) {
                if (classNames[j] == className) {
                    elements.push(child);
                    break;
                }
            }
        }
        return elements;
    };
}

var key = "backgroundColor";
var btnDom = document.getElementsByClassName("bg-btn");

//绑定点击事件
for (var i = 0; i < btnDom.length; i++) {
    if (btnDom[i].addEventListener) {
        btnDom[i].addEventListener("click", updateBackgroundColor);
    } else if (btnDom[i].attachEvent) {
        btnDom[i].attachEvent("onclick", updateBackgroundColor);
    }
}

/**
 * 点击按钮 设置背景颜色
 * @param  {[type]} e [description]
 * @return {[type]}   [description]
 */
function updateBackgroundColor(e) {
    if (e.target) {
        var value = e.target.value;
    } else if (e.srcElement) {
        var value = e.srcElement.value;
    }

    if (value == '红色') {
        var backgroundColor = 'red';
    } else if (value == '灰色') {
        var backgroundColor = 'gray';
    } else if (value == '白色') {
        var backgroundColor = 'white';
    }

    document.body.style.backgroundColor = backgroundColor;

    if (window.localStorage) {
        window.localStorage.setItem(key, backgroundColor);
    } else if (document.cookie) {
        var Days = 30;
        var exp = new Date();
        exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
        document.cookie = key + "=" + backgroundColor + ";expires=" + exp.toGMTString();
    }
}

/**
 * onload事件  页面加载完成 设置背景颜色 支持并设置了localStorge则从localStorage里面读取 否则从cookie里面读取 最后才读取默认值
 */
window.onload = function() {
    if (window.localStorage && window.localStorage.getItem(key)) {
        var backgroundColor = window.localStorage.getItem(key);
    } else if (document.cookie) {
        var backgroundColor = document.cookie.split(";")[0].split("=")[1];
    } else {
        var backgroundColor = "#eff0f0";
    }

    document.body.style.backgroundColor = backgroundColor;
};
