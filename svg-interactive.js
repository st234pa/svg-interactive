var vimage = document.getElementById("vimage");
var mv = document.getElementById("mv");
var clr = document.getElementById("clr");
var stp = document.getElementById("stp");
var requestID;

var circleClick = function(e){
    if (this.getAttribute("fill") == "red"){
        this.parentNode.removeChild(this);
        var randx = Math.random() * (vimage.width.animVal.value - 80) + 40;
        var randy = Math.random() * (vimage.height.animVal.value - 80) + 40;
        drawRand(randx, randy);
    }
    else if (this.getAttribute("fill") == "purple"){
        this.setAttribute("fill", "red");
    }
    e.stopPropagation();
};

var makeCircle  = function(x, y){
    var c = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    c.setAttribute("cx", x);
    c.setAttribute("cy", y);
    c.setAttribute("r", 40);
    c.setAttribute("fill", "purple");
    c.setAttribute("stroke", "white");
    c.xv = 1;
    c.yv = 1;
    c.addEventListener("click", circleClick);
    return c;
};

var drawRand = function(x, y){
    var c = makeCircle(x, y);
    vimage.appendChild(c);
}


var drawCircle = function(e){
    var c = makeCircle(e.offsetX, e.offsetY);
    vimage.appendChild(c);
};

var animate = function() {
    window.cancelAnimationFrame(requestID);
    var drawCircles = function() {
        console.log(requestID);
        var circles = vimage.children;
        var len = circles.length;
        for (var i = 0; i < len; i++){
            var c = circles[i];
            var r = parseInt(c.getAttribute("r"));
            if (r === 2) {
                vimage.removeChild(c);
                len = circles.length;
            }
            var x = parseInt(c.getAttribute("cx"));
            var y = parseInt(c.getAttribute("cy"));
            if( x<40 || x>(500 - 40)) c.xv = parseInt(-c.xv);
            if( y<40 || y>(500 - 40)) c.yv = parseInt(-c.yv);
            x += parseInt(c.xv);
            y += parseInt(c.yv);
            c.setAttribute("cx", x);
            c.setAttribute("cy", y);
            if (x === 250) {
                r = r/2;
                c.setAttribute("r", r);
                var newc = makeCircle(x,y);
                newc.setAttribute("r", r);
                newc.xv = parseInt(-c.xv);
                newc.yc = parseInt(-c.yv);
                vimage.appendChild(newc);
            }
        }
        requestID = window.requestAnimationFrame(drawCircles);
    };
    drawCircles();
};



var clearImg = document.getElementById("clr");
clr.addEventListener("click", function() {
    console.clear();
    while (vimage.lastChild) {
        vimage.removeChild(vimage.lastChild);
    }
});

var stopIt = function() {
    console.log("stop initiated")
    //console.log( requestID );
    window.cancelAnimationFrame( requestID );
};

vimage.addEventListener("click", drawCircle);
stp.addEventListener("click", stopIt);
mv.addEventListener("click", animate);
