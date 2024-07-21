const isCharDigit = n => n < 10;

var decimals = 4;
var history_instances = 0;
var c = Math.pow(10,decimals);

function calc(){
    
    let input = document.getElementById("input").value;
    let a = input.toUpperCase();
    
    a = a.replace(/×/g,"*");
    a = a.replace(/ACOS/g,"Math.acos");
    a = a.replace(/COS/g,"Math.cos");
    a = a.replace(/ASIN/g,"Math.asin");
    a = a.replace(/SIN/g,"Math.sin");
    a = a.replace(/TAN/g,"Math.tan");
    a = a.replace(/DEG/g,"*Math.PI/180");
    a = a.replace(/\(/g,"[");
    a = a.replace(/\)/g,"]");

    
    //Power handler
    let position = a.indexOf("^");
    
    while (position>0) {
    
        let n = "";
        let d = "";

        let p = position;
        while ( isCharDigit(a[p-1]) || a[p-1] == "." ){
            n = a[p-1]+n;
            p--;
        }
        if (a[p-1] == "]"){
            p--;

            while (a[p-1] != "["){
                n = a[p-1]+n;
                p--;
            }
            p--;
        }

        let p2 = position;

        while ( isCharDigit(a[p2+1]) || a[p2+1] =="." ){
            d = d + a[p2+1];
            p2++;
        }

        if (a[p2+1] == "["){

            p2++;

            while (a[p2+1] != "]"){
                d = d + a[p2+1];
                p2++;

            }  
            p2++;
        }
        
        a = a.slice(0,p) + "Math.pow("+n+","+d+")" + a.slice(p2+1);
        position = a.indexOf("^"); //Find next
    
        }
    
        a = a.replace(/\[/g,"(");
        a = a.replace(/\]/g,")");
        console.log(a);

        let res = eval(a);
        res = Math.round(res * c)/c;


        let para = document.createElement("p");
        para.innerHTML = input + " &nbsp = &nbsp " + res;
        history_instances++;
        para.id=history_instances;
        para.onclick = function () { this.parentElement.removeChild(this); };

        
        document.getElementById("history").appendChild(para);
    }


document.getElementById("input")
    .addEventListener("keyup", function(event) {
    event.preventDefault();
    if (event.keyCode === 13) {
        calc();
    }
});

function keys(key){
      const input = document.querySelector('input');
      if (key == undefined){
        input.value = input.value.slice(0, -1);
      } else if (key == "C") {
        input.value = "";
      } else {
        input.value += key;
      }
  }


if ("serviceWorker" in navigator) {
    window.addEventListener("load", function () {
        navigator.serviceWorker
            .register("/serviceWorker.js")
            .then(res => console.log("service worker registered"))
            .catch(err => console.log("service worker not registered", err))
    })
}