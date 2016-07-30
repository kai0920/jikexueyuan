function myFunction() {
    var y;
    var x = document.getElementById("score").value;

    if (isNaN(x) || x < 0 || x > 100) {
        document.getElementById('demo').innerHTML = "请输入0-100有效的分数!";
        return false;
    }

    switch (true) {
        case x <= 100 && x > 90:
            y = "恭喜！您是本学期的一等生！";
            break;
        case x <= 90 && x > 80:
            y = "恭喜！您是本学期的二等生！";
            break;
        case x <= 80 && x > 70:
            y = "恭喜！您是本学期的三等生！";
            break;
        case x <= 70 && x >= 60:
            y = "恭喜！您是本学期的四等生！";
            break;
        default:
            y = "对不起，您的成绩未及格。请努力！";
            break;
    }

    document.getElementById('demo').innerHTML = y;
}
