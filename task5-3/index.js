function myFunction() {
    var arr = ["a", "x", "x", "x", "m", "a", "k", "m", "p", "j", "a"];

    var count = {};
    var list = {};

    arr.forEach(function(value, index) {
        if (count[value]) {
            count[value]++;
            list[value] += "," + index;
        } else {
            count[value] = 1;
            list[value] = "" + index;
        }
    });

    //console.log(count);
    //console.log(list);

    var max = 0;
    var letter = [];
    for (i in count) {
        if (count[i] >= max) {
            max = count[i];
            letter.push(i);
        }
    }

    //console.log(letter);

    var txt = '';
    for (var i = 0; i < letter.length; i++) {
        txt += "最多的是 : " + letter[i] + " ; 个数 : " + max + "; 位置分布 : " + list[letter[i]] + "<br/>";
    }

    document.getElementById("demo").innerHTML = txt;
}
