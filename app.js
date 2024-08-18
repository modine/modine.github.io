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
var buttonMode = 0;

const buttonLabels = {
    btn11: ["sin", "asin"],
    btn12: ["cos", "acos"],
    btn13: ["tan", "atan"],
    btn14: ["CE", "CE"],
    btn15: ["⌫", "⌫"],
    btn21: ["deg", "rad"],
    btn22: ["sqrt", "π"],
    btn23: ["(", "←"],
    btn24: [")", "→"],
    btn25: ["/", ";"],
    btn31: ["e^", "ln"],
    btn32: ["7", "7"],
    btn33: ["8", "8"],
    btn34: ["9", "9"],
    btn35: ["×", "×"],
    btn41: ["10^", "log"],
    btn42: ["4", "4"],
    btn43: ["5", "5"],
    btn44: ["6", "6"],
    btn45: ["-", "-"],
    btn51: ["x", "y"],
    btn52: ["1", "1"],
    btn53: ["2", "2"],
    btn54: ["3", "3"],
    btn55: ["+", "+"],
    btn61: ["⇧", "⇧"],
    btn62: ["x^y", "x^y"],
    btn63: ["0", "0"],
    btn64: [".", ","],
    btn65: ["=", "(=)"],
};

const isCharDigit = n => n < 10;
const decimals = document.getElementById("decimals");
const decimals_txt = document.getElementById("decimals_txt");

const history = document.getElementById("history");
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

const textbox = document.getElementById('input');
const buttons = document.querySelectorAll('.grid-item');

palA_eq.value = localStorage.palA_eq;
palA_btn_txt.value = localStorage.palA_btn_txt;
palA_btn_fill.value = localStorage.palA_btn_fill;
palA_bg.value = localStorage.palA_bg;

palB_eq.value = localStorage.palB_eq;
palB_btn_txt.value = localStorage.palB_btn_txt;
palB_btn_fill.value = localStorage.palB_btn_fill;
palB_bg.value = localStorage.palB_bg;

decimals.value = localStorage.decimals;
decimals_txt.innerHTML = localStorage.decimals;
palA.checked = (localStorage.palASelected === "true");
palB.checked = (localStorage.palBSelected === "true");

updatePalette();
changeButtons();
textbox.focus();

//FUNCTIONS
function handleButtonClick(btn) {

    switch (btn) {
        case "CE":
            CE();
            break;
        case "⌫":
            backspace();
            break;
        case "=":
            handleCalc();
            break;
        case "⇧":
            changeButtons();
            break;
        case "(=)":
            insert_text("=");
            break;
        case "sin":
            insert_text("sin(");
            break;
        case "cos":
            insert_text("cos(");
            break;
        case "tan":
            insert_text("tan(");
            break;
        case "sqrt":
            insert_text("sqrt(");
            break;
        case "ln":
            insert_text("ln(");
            break;
        case "log":
            insert_text("log(");
            break;
        case "x^y":
            insert_text("^");
            break;
        case "asin":
            insert_text("asin(");
            break;
        case "acos":
            insert_text("acos(");
            break;
        case "atan":
            insert_text("atan(");
            break;
        case "e^":
            insert_text("e^(");
            break;
        case "10^":
            insert_text("×10^(");
            break;
        case "rad":
            insert_text(" rad");
            break;
        case "deg":
            insert_text(" deg");
        break;
            case "→":
                move_cursor(1);
                break;
            case "←":
                move_cursor(-1);
            break;
        default:
            insert_text(btn);

    }
}

function move_cursor(step){
    let ss = textbox.selectionStart;
    let se = textbox.selectionEnd;
    textbox.selectionStart = ss+step;
    textbox.selectionEnd = se+step;
    console.log(ss,se);
    textbox.focus();
}

function handleCalc() {

    let eq = textbox.value.toUpperCase();
    let result = calc(eq);
    let para = document.createElement("p");
    para.innerHTML = textbox.value + " &nbsp = &nbsp " + result;

    history_instances++;
    para.id = history_instances;
    para.onclick = function () { this.parentElement.removeChild(this); };
    history.appendChild(para);
    history.scrollTop = history.scrollHeight;
}

function calc(a) {

    let left_brackets_count = 0;
    let right_brackets_count = 0;

    if (a.match(/\(/)) { left_brackets_count = (a.match(/\(/g)).length; }
    if (a.match(/\)/)) { right_brackets_count = (a.match(/\)/g)).length; }
    if (left_brackets_count !== right_brackets_count) { return "Error: parenthese mismatch" }

    a = a.replace(/×/g, "*");
    a = a.replace(/ACOS/g, "Math.acos");
    a = a.replace(/COS/g, "Math.cos");
    a = a.replace(/ASIN/g, "Math.asin");
    a = a.replace(/SIN/g, "Math.sin");
    a = a.replace(/ATAN/g, "Math.atan");
    a = a.replace(/TAN/g, "Math.tan");
    a = a.replace(/DEG/g, "*Math.PI/180");
    a = a.replace(/RAD/g, "*180/Math.PI");
    a = a.replace(/\(/g, "[");
    a = a.replace(/\)/g, "]");
    a = a.replace(/LOG/g, "Math.log10");
    a = a.replace(/LN/g, "Math.log");
    a = a.replace(/E\^/g, "Math.exp");
    a = a.replace(/SQRT/g, "Math.sqrt");
    a = a.replace(/Π/g, "Math.PI");
    a = math_construct(a, "Math.pow", "^");
    a = a.replace(/\[/g, "(");
    a = a.replace(/\]/g, ")");

    if (a == "Error: parenthese mismatch") {
        return a;
    }

    console.log(a);
    let res = [];
    let rounded_res = [];
    let degree_res = [];

    try {
        res = eval(a);
        rounded_res = Math.round(res * c) / c;
    }
    catch (err) {
        return "Syntax error / not supported";
    }

    if (a.includes("asin") | a.includes("acos") | a.includes("atan")) {
        degree_res = res * 180 / Math.PI;
        degree_res = Math.round(degree_res * c) / c;
        rounded_res = rounded_res + " rad" + " = " + degree_res + " deg";
    }

    return rounded_res;
}

textbox
    .addEventListener("keyup", function (event) {
        event.preventDefault();
        if (event.keyCode === 13) {
            handleCalc();
        }
    });

function hide_boxes() {
    shadow.style.display = "none";
    settings_box.style.display = "none";
}


function settings_show() {
    shadow.style.display = "block";
    settings_box.style.display = "grid";

}

function CE() {
    textbox.value = "";
}

function backspace() {
    let ss = textbox.selectionStart;
    let se = textbox.selectionEnd;
    let ln = textbox.value.length;

    let textbefore = textbox.value.substring(0, ss);
    let textafter = textbox.value.substring(se, ln);

    if (ss == se) // if no text is selected
    {
        textbox.value = textbefore.slice(0,-1) + textafter;
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

function insert_text(txt) {

    let ss = textbox.selectionStart;
    let se = textbox.selectionEnd;
    let ln = textbox.value.length;

    let textbefore = textbox.value.substring(0, ss);

    let textafter = textbox.value.substring(se, ln);
    textbox.value = textbefore + txt + textafter;
    textbox.focus();
    textbox.selectionStart = ss+txt.length;
    textbox.selectionEnd = ss+txt.length;


}


function updatePalette() {

    if (localStorage.palASelected == "true") {


        history.style.color = localStorage.palA_eq;
        document.body.style.color = localStorage.palA_btn_txt;

        let elements = document.getElementsByClassName("grid-item");
        for (var i = 0; i < elements.length; i++) {
            elements[i].style.backgroundColor = localStorage.palA_btn_fill;

        }
        settings_icon.style.color = localStorage.palA_btn_fill;
        document.body.style.backgroundColor = localStorage.palA_bg;
        textbox.style.backgroundColor = localStorage.palA_bg;
        textbox.style.borderColor = settings_icon.style.color = localStorage.palA_btn_fill;
        textbox.style.color = localStorage.palA_eq;

    } else {

        history.style.color = localStorage.palB_eq;
        document.body.style.color = localStorage.palB_btn_txt;

        let elements = document.getElementsByClassName("grid-item");
        for (var i = 0; i < elements.length; i++) {
            elements[i].style.backgroundColor = localStorage.palB_btn_fill;

        }
        settings_icon.style.color = localStorage.palB_btn_fill;
        document.body.style.backgroundColor = localStorage.palB_bg;
        textbox.style.backgroundColor = localStorage.palB_bg;
        textbox.style.borderColor = settings_icon.style.color = localStorage.palB_btn_fill;
        textbox.style.color = localStorage.palB_eq;


    }
}

function changeButtons() {

    for (let row = 1; row <= 6; row++) {
        for (let i = 1; i <= 5; i++) {
            document.getElementById(`btn${row}-${i}`).textContent = buttonLabels[`btn${row}${i}`][buttonMode];
        }
    }
    buttonMode = 1 - buttonMode;
}

function math_construct(a, math_func, sign) {

    let position = a.indexOf(sign);

    while (position > 0) {

        let n = "";
        let d = "";
        let bracket_count = 0;
        let p = position;
        while (isCharDigit(a[p - 1]) || a[p - 1] == ".") {
            n = a[p - 1] + n;
            p--;
        }
        if (a[p - 1] == "]") {
            p--;
            bracket_count = 1;
            while (bracket_count > 0) {
                n = a[p - 1] + n;
                p--;
                if (a[p - 1] == "]") { bracket_count++; }
                if (a[p - 1] == "[") { bracket_count--; }
                if (a[p - 1] === undefined) { return "Error: parenthese mismatch"; }
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


            bracket_count = 1;

            while (bracket_count > 0) {

                d = d + a[p2 + 1];
                p2++;
                if (a[p2 + 1] == "[") { bracket_count++; }
                if (a[p2 + 1] == "]") { bracket_count--; }
                if (a[p2 + 1] === undefined) { return "Error: parenthese mismatch"; }

            }
            p2++;
        }

        a = a.slice(0, p) + math_func + "(" + n + "," + d + ")" + a.slice(p2 + 1);
        position = a.indexOf(sign); //Find next

    }
    return a;
}

//EVENT LISTENERS

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
    decimals_txt.innerHTML = this.value;
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

buttons.forEach(button => {
    button.addEventListener('click', function () {
        handleButtonClick(this.textContent);
    });
});

//SERVICE WORKER
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/serviceWorker.js')
        .then(registration => {
            console.log('Service Worker registered with scope:', registration.scope);
        })
        .catch(error => {
            console.error('Service Worker registration failed:', error);
        });
    });
}
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.ready.then(swRegistration => {
        swRegistration.active.postMessage({
            type: 'GET_VERSION'
        });
    });

    navigator.serviceWorker.addEventListener('message', event => {
        if (event.data && event.data.type === 'VERSION') {
            document.getElementById("version_txt").innerHTML = "Calc! " + event.data.version;
        }
    });
}
