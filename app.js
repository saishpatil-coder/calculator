const buttons = document.querySelectorAll(".btn");
const input = document.querySelector(".input");
const output = document.querySelector(".output");
const head = document.querySelector("h1") ;
let isB = false ;


let enable = ()=>{
    output.classList.add("d-none");   
    head.classList.remove("d-none");
    input.classList.remove("inout");
}

let disable = ()=>{
    head.classList.add("d-none");
    output.classList.remove("d-none");
    input.classList.add("inout");
}
let copyResult = ()=>{
    let v = output.value ;
    input.value = v.replace("=","") ;
    enable();
}
let setOut = (v)=>{
    
    if(v === "") output.value =  0 ;
    else {
        let ans  ;
        try {
            ans = "=" + ( isB ? math.evaluate( v + ')' ) : math.evaluate( v )) ;
        } catch (error) {
            ans = v ;
        }
        output.value = ans ;
    }
    input.value = v ;
}

const allowedCharacters = [
    '0', '1', '2', '3', '4', '5', '6', '7', '8', '9',  // Numbers
    '+', '-', '*', '/', '%', '(', ')', '.' ,'x','X','='       // Mathematical operators
];
let calculate = (v)=>{
    let op = "+-/*%";
    lastChar = v.slice(-1);
    message.innerHTML = lastChar + " " + v ;
    isB = (lastChar === '(') ? true : (lastChar === ')' ? false : isB);
    if(lastChar === '=') copyResult();
    else
    {
        disable();
        if(!op.includes(lastChar))setOut(v);
    }
    if(input.value === "") enable();
}

input.addEventListener("input",(event)=>{
    lastChar = event.target.value.slice(-1) ; 
    let d = event.data ;
    let value = event.target.value ;
    if (d === 'x' || d === 'X')  value = value.replace(d , "*");
    if(event.inputType === 'deleteContentBackward' && value.slice(-1) === '('){
        value =  value.replace("(","");
        isB = false ;
    }
    if (!allowedCharacters.includes(lastChar)) value = value.replace(lastChar , "");
    event.target.value = value ;
    calculate( value );
    expression = event.target.value ;
})
document.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        copyResult();
    }
});
document.addEventListener("backpress" , ()=>{

        expression = expression.slice(0, -1);
        input.value = expression;
})
let string = "" ;

let expression = "";

buttons.forEach(button => {
    button.addEventListener("click", () => {
        disable();
        const value = button.textContent.trim();
        if (value === 'AC') {
            enable();
            expression = "";
            input.value = "";
            output.value = "";
        } else if (value === 'DEL') {
            expression = expression.slice(0, -1);
            input.value = expression;
        } else {
            expression += value;
            input.value = expression;
        }
        calculate(expression);
    });
});
