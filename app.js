const isCharDigit = n => n < 10;
var history_instances = 0;

if (!localStorage.palA_eq) { localStorage.palA_eq = "black"; }
if (!localStorage.palA_btn_txt) { localStorage.palA_btn_txt = "black"; }
if (!localStorage.palA_btn_fill) { localStorage.palA_btn_fill = "blue"; }
if (!localStorage.palA_bg) { localStorage.palA_bg = "white"; }

if (!localStorage.palB_eq) { localStorage.palB_eq = "white"; }
if (!localStorage.palB_btn_txt) { localStorage.palB_btn_txt = "white"; }
if (!localStorage.palB_btn_fill) { localStorage.palB_btn_fill = "blue"; }
if (!localStorage.palB_bg) { localStorage.palB_bg = "black"; }

if (!localStorage.decimals) { localStorage.decimals = 4; }

var c = Math.pow(10, localStorage.decimals);
const eq_input = document.getElementById("input");
const history = document.getElementById("history");
const morebtns = document.getElementById("morebtns");
const shadow = document.getElementById("shadow");
const settings_icon = document.getElementById("settings_icon")
const palA = document.getElementById("palA");
const palB = document.getElementById("palB");


function calc() {

    let a = eq_input.value.toUpperCase();

    a = a.replace(/×/g, "*");
    a = a.replace(/ACOS/g, "Math.acos");
    a = a.replace(/COS/g, "Math.cos");
    a = a.replace(/ASIN/g, "Math.asin");
    a = a.replace(/SIN/g, "Math.sin");
    a = a.replace(/ATAN/g, "Math.atan");
    a = a.replace(/TAN/g, "Math.tan");
    a = a.replace(/DEG/g, "*Math.PI/180");
    a = a.replace(/\(/g, "[");
    a = a.replace(/\)/g, "]");


    //Power handler
    let position = a.indexOf("^");

    while (position > 0) {

        let n = "";
        let d = "";

        let p = position;
        while (isCharDigit(a[p - 1]) || a[p - 1] == ".") {
            n = a[p - 1] + n;
            p--;
        }
        if (a[p - 1] == "]") {
            p--;

            while (a[p - 1] != "[") {
                n = a[p - 1] + n;
                p--;
            }
            p--;
        }

        let p2 = position;

        while (isCharDigit(a[p2 + 1]) || a[p2 + 1] == ".") {
            d = d + a[p2 + 1];
            p2++;
        }

        if (a[p2 + 1] == "[") {

            p2++;

            while (a[p2 + 1] != "]") {
                d = d + a[p2 + 1];
                p2++;

            }
            p2++;
        }

        a = a.slice(0, p) + "Math.pow(" + n + "," + d + ")" + a.slice(p2 + 1);
        position = a.indexOf("^"); //Find next

    }

    a = a.replace(/\[/g, "(");
    a = a.replace(/\]/g, ")");
    console.log(a);


    let res = [];
    let rounded_res = [];
    let degree_res = [];
    try {
        res = eval(a);
        rounded_res = Math.round(res * c) / c;


    }
    catch (err) {
        rounded_res = "error";
    }
    if (a.includes("asin") | a.includes("acos") | a.includes("atan")) {
        degree_res = res * 180 / Math.PI;
        console.log(degree_res);
        degree_res = Math.round(degree_res * c) / c;
        rounded_res = rounded_res + " = " + degree_res + " deg";
    }


    let para = document.createElement("p");
    para.innerHTML = eq_input.value + " &nbsp = &nbsp " + rounded_res;


    history_instances++;
    para.id = history_instances;
    para.onclick = function () { this.parentElement.removeChild(this); };


    history.appendChild(para);
}


eq_input
    .addEventListener("keyup", function (event) {
        event.preventDefault();
        if (event.keyCode === 13) {
            calc();
        }
    });

function keys(key) {

    eq_input.value += key;
    shadow.style.display = "none";
    morebtns.style.display = "none";
}


if ("serviceWorker" in navigator) {
    window.addEventListener("load", function () {
        navigator.serviceWorker
            .register("/serviceWorker.js")
            .then(res => console.log("service worker registered"))
            .catch(err => console.log("service worker not registered", err))
    })
}
    
function hide_boxes() {
    shadow.style.display = "none";
    morebtns.style.display = "none";
    settings_box.style.display = "none";
}

function morebtns_show() {
    shadow.style.display = "block";
    morebtns.style.display = "block";
}

function settings_show() {
    shadow.style.display = "block";
    settings_box.style.display = "grid";

}

var textbox = document.getElementById('input');

function backspace() {
    var ss = textbox.selectionStart;
    var se = textbox.selectionEnd;
    var ln = textbox.value.length;

    var textbefore = textbox.value.substring(0, ss);    //text in front of selected text
    var textselected = textbox.value.substring(ss, se); //selected text
    var textafter = textbox.value.substring(se, ln);    //text following selected text

    if (ss == se) // if no text is selected
    {
        textbox.value = textbox.value.substring(0, ss - 1) + textbox.value.substring(se, ln);
        textbox.focus();
        textbox.selectionStart = ss - 1;
        textbox.selectionEnd = ss - 1;
    }
    else // if some text is selected
    {
        textbox.value = textbefore + textafter;
        textbox.focus();
        textbox.selectionStart = ss;
        textbox.selectionEnd = ss;
    }
}
//PALETTE A LISTENERS
document.getElementById("palA-eq").addEventListener("input", function () {

    history.style.color = this.value;
    localStorage.palA_eq = this.value;
})
document.getElementById("palA-btn-txt").addEventListener("input", function () {

    document.body.style.color = this.value;
    localStorage.palA_btn_txt = this.value;
})
document.getElementById("palA-btn-fill").addEventListener("input", function () {

    let elements = document.getElementsByClassName("grid-item");
    for (var i = 0; i < elements.length; i++) {
        elements[i].style.backgroundColor = this.value;
    }
    settings_icon.style.color = this.value;

    localStorage.palA_btn_fill = this.value;
})
document.getElementById("palA-bg").addEventListener("input", function () {

    document.body.style.backgroundColor = this.value;
    input.style.backgroundColor = this.value;

    localStorage.palA_bg = this.value;
})

//PALETTE B LISTENERS
document.getElementById("palB-eq").addEventListener("input", function () {

    history.style.color = this.value;
    localStorage.palB_eq = this.value;
})
document.getElementById("palB-btn-txt").addEventListener("input", function () {

    document.body.style.color = this.value;
    localStorage.palB_btn_txt = this.value;
})
document.getElementById("palB-btn-fill").addEventListener("input", function () {

    let elements = document.getElementsByClassName("grid-item");
    for (var i = 0; i < elements.length; i++) {
        elements[i].style.backgroundColor = this.value;
    }
    settings_icon.style.color = this.value;
    localStorage.palB_btn_fill = this.value;

})
document.getElementById("palB-bg").addEventListener("input", function () {

    document.body.style.backgroundColor = this.value;
    input.style.backgroundColor = this.value;
    localStorage.palB_bg = this.value;
})

document.getElementById("decimals").addEventListener("input", function () {
    localStorage.decimals = this.value;
    c = Math.pow(10, localStorage.decimals);
})

document.getElementById("palA").addEventListener("change", function () {
    updatePalette()
    document.getElementById("palB").checked = !this.value;
})


document.getElementById("palB").addEventListener("change", function () {
    
    document.getElementById("palA").checked = !this.value;
    updatePalette()

})

function updatePalette() {

    if (document.getElementById("palA").checked) {
        
        history.style.color = localStorage.palA_eq;
        document.body.style.color = localStorage.palA_btn_txt;

        let elements = document.getElementsByClassName("grid-item");
        for (var i = 0; i < elements.length; i++) {
            elements[i].style.backgroundColor = localStorage.palA_btn_fill;
        }
        settings_icon.style.color = localStorage.palA_btn_fill;

        document.body.style.backgroundColor = localStorage.palA_bg;
        input.style.backgroundColor = localStorage.palA_bg;

    } else {

        history.style.color = localStorage.palB_eq;
        document.body.style.color = localStorage.palB_btn_txt;

        let elements = document.getElementsByClassName("grid-item");
        for (var i = 0; i < elements.length; i++) {
            elements[i].style.backgroundColor = localStorage.palB_btn_fill;
        }
        settings_icon.style.color = localStorage.palB_btn_fill;

        document.body.style.backgroundColor = localStorage.palB_bg;
        input.style.backgroundColor = localStorage.palB_bg;

    }


}