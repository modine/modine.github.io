if (!localStorage.palASelected) { localStorage.palASelected = "true"; }
if (!localStorage.palBSelected) { localStorage.palBSelected = "false"; }

if (!localStorage.palA_eq) { localStorage.palA_eq = "#000000"; }
if (!localStorage.palA_btn_txt) { localStorage.palA_btn_txt = "#333333"; }
if (!localStorage.palA_btn_fill) { localStorage.palA_btn_fill = "#EBEBEB"; }
if (!localStorage.palA_bg) { localStorage.palA_bg = "#FFFFFF"; }

if (!localStorage.palB_eq) { localStorage.palB_eq = "#00FFB4"; }
if (!localStorage.palB_btn_txt) { localStorage.palB_btn_txt = "#000000"; }
if (!localStorage.palB_btn_fill) { localStorage.palB_btn_fill = "#00374A"; }
if (!localStorage.palB_bg) { localStorage.palB_bg = "#000000"; }
if (!localStorage.decimals) { localStorage.decimals = 3; }

var history_instances = 0;
var c = Math.pow(10, localStorage.decimals);

const isCharDigit = n => n < 10;
const decimals = document.getElementById("decimals");

const eq_input = document.getElementById("input");
const history = document.getElementById("history");
const morebtns = document.getElementById("morebtns");
const shadow = document.getElementById("shadow");
const settings_icon = document.getElementById("settings_icon")

const palA = document.getElementById("palA");
const palA_eq = document.getElementById("palA-eq");
const palA_btn_txt = document.getElementById("palA-btn-txt");
const palA_btn_fill = document.getElementById("palA-btn-fill");
const palA_bg = document.getElementById("palA-bg");

const palB = document.getElementById("palB");
const palB_eq = document.getElementById("palB-eq");
const palB_btn_txt = document.getElementById("palB-btn-txt");
const palB_btn_fill = document.getElementById("palB-btn-fill");
const palB_bg = document.getElementById("palB-bg");


palA_eq.value = localStorage.palA_eq;
palA_btn_txt.value = localStorage.palA_btn_txt;
palA_btn_fill.value = localStorage.palA_btn_fill;
palA_bg.value = localStorage.palA_bg;

palB_eq.value = localStorage.palB_eq;
palB_btn_txt.value = localStorage.palB_btn_txt;
palB_btn_fill.value = localStorage.palB_btn_fill;
palB_bg.value = localStorage.palB_bg;

decimals.value = localStorage.decimals;
palA.checked = (localStorage.palASelected === "true");
palB.checked = (localStorage.palBSelected === "true");

updatePalette();

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
    a = a.replace(/LOG/g, "Math.log10");
    a = a.replace(/LN/g, "Math.log");
    a = a.replace(/E\^/g, "Math.exp");
    a = a.replace(/SQRT/g, "Math.sqrt");



    
    math_construct("Math.pow","^");

    function math_construct(math_func, sign) {

        let position = a.indexOf(sign);

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

            a = a.slice(0, p) + math_func + "(" + n + "," + d + ")" + a.slice(p2 + 1);
            position = a.indexOf(sign); //Find next

        }
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

palA_eq.addEventListener("input", function () {
    localStorage.palA_eq = this.value;
    updatePalette();
})

palA_btn_txt.addEventListener("input", function () {
    localStorage.palA_btn_txt = this.value;
    updatePalette();
})
palA_btn_fill.addEventListener("input", function () {
    localStorage.palA_btn_fill = this.value;
    updatePalette();
})
palA_bg.addEventListener("input", function () {
    localStorage.palA_bg = this.value;
    updatePalette();
})

//PALETTE B LISTENERS

palB_eq.addEventListener("input", function () {

    localStorage.palB_eq = this.value;
    updatePalette();
})
palB_btn_txt.addEventListener("input", function () {

    localStorage.palB_btn_txt = this.value;
    updatePalette();
})
palB_btn_fill.addEventListener("input", function () {

    localStorage.palB_btn_fill = this.value;
    updatePalette();

})
palB_bg.addEventListener("input", function () {

    localStorage.palB_bg = this.value;
    updatePalette();
})

decimals.addEventListener("input", function () {
    localStorage.decimals = this.value;
    c = Math.pow(10, localStorage.decimals);
})

palA.addEventListener("change", function () {

    localStorage.palASelected = this.checked;
    localStorage.palBSelected = !this.checked;
    palB.checked = (localStorage.palBSelected === "true");
    updatePalette();
})


palB.addEventListener("change", function () {

    localStorage.palBSelected = this.checked;
    localStorage.palASelected = !this.checked;
    palA.checked = (localStorage.palASelected === "true");
    updatePalette();

})

function updatePalette() {

    if (localStorage.palASelected == "true") {


        history.style.color = localStorage.palA_eq;
        document.body.style.color = localStorage.palA_btn_txt;

        let elements = document.getElementsByClassName("grid-item");
        for (var i = 0; i < elements.length; i++) {
            elements[i].style.backgroundColor = localStorage.palA_btn_fill;
            elements[i].style.borderColor = localStorage.palA_bg;
        }
        settings_icon.style.color = localStorage.palA_btn_fill;
        document.body.style.backgroundColor = localStorage.palA_bg;
        eq_input.style.backgroundColor = localStorage.palA_bg;
        eq_input.style.borderColor = settings_icon.style.color = localStorage.palA_btn_fill;
        eq_input.style.color = localStorage.palA_eq;

    } else {

        history.style.color = localStorage.palB_eq;
        document.body.style.color = localStorage.palB_btn_txt;

        let elements = document.getElementsByClassName("grid-item");
        for (var i = 0; i < elements.length; i++) {
            elements[i].style.backgroundColor = localStorage.palB_btn_fill;
            elements[i].style.borderColor = localStorage.palB_bg;
        }
        settings_icon.style.color = localStorage.palB_btn_fill;
        document.body.style.backgroundColor = localStorage.palB_bg;
        eq_input.style.backgroundColor = localStorage.palB_bg;
        eq_input.style.borderColor = settings_icon.style.color = localStorage.palB_btn_fill;
        eq_input.style.color = localStorage.palB_eq;


    }


}
/*
if ("serviceWorker" in navigator) {
    window.addEventListener("load", function () {
        navigator.serviceWorker
            .register("/serviceWorker.js")
            .then(res => console.log("service worker registered"))
            .catch(err => console.log("service worker not registered", err))
    })
}

navigator.serviceWorker.addEventListener('message', event => {
    document.getElementById("version_txt").innerHTML = "Calc! " + event.data.version;
});

*/