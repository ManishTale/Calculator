//calculator keyword contain all the numbers, oprends, commands and operators
let calculator = {

    // Select the calculator's display
    input: document.querySelector('#my-input'),

    // Select the all number button value
    numbers: document.querySelectorAll('.number'),

    // Select the operator
    operators: document.querySelectorAll('.operator'),

    // called the function by EventListener to get valye
    getNumber: function(){

        // condition to initialize the single place value is
        if(this.input.value == 0){
            this.input.value = event.target.value;  
            
        }
        // if not the value will be added at multiple places value
        else{
            this.input.value += event.target.value; 

            // console.log(this.input.value);
        }
        // add number multiple times or repete
        number = event.target.value + "";

        // console.log(number);
        return number;
    },
    // function to get operator on screen 
    getOperator: function(event){
        // switch case statement
        switch(event.target.value){
            case "+": this.operator = " + "; break;
            case "-": this.operator = " - "; break;
            case "x": this.operator = " x "; break;
            case "/": this.operator = " / "; break;
            case "%": this.operator = " % "; break;
        }
        // display operator
        this.input.value = this.operator;
        return this.operator;
    },
}

// EventListener on onclick event
document.addEventListener('click', function (event) {

    if(event.target.classList.contains('number')){

        let number = calculator.getNumber();
        // console.log(number);
    }
    // event to get operator
    else if(event.target.classList.contains('operator')){
        let operator = calculator.getOperator(event);

    }
}, false);