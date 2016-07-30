
/* 两数字加减乘除计算 */
function count() {
    var x = document.getElementById("txt1").value,
        y = document.getElementById("txt2").value,
        opt = document.getElementById("sel").value;

    if(!x || !y){
        alert("输入不能为空");
        return false;
    }

    if (isNaN(x) || isNaN(y)) {
        alert('输入的非数字');
        return false;
    }

    x = parseFloat(x);
    y = parseFloat(y);

    var z = '';
    if (opt == '+') {
        z = x + y;
    } else if (opt == '-') {
        z = x - y;
    } else if (opt == '*') {
        z = x * y;
    } else if (opt == '/') {
        if (y == 0) {
            alert('除数不能为0');
            return false;
        }
        z = x / y;
    }

    z = parseFloat(z.toFixed(4));

    document.getElementById("txt3").value = z;
}
