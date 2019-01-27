//calculator keyword contain all the numbers, oprends, commands and operators
let calculator = {

    // Select the calculator's display
    input: document.querySelector('#my-input'),

    // Select the all number button value
    numbers: document.querySelectorAll('.number'),

    // Select the operator
    operators: document.querySelectorAll('.operator'),
    
    // Select the operator
    commands: document.querySelectorAll('.command'),

    //calculation variables 
    // Globa variable
    numberA: "",
    operator: "",
    numberB: "",
    isNumberADecimal: false,
    isNumberBDecimal: false,

    addToCalculation : function(value) {
        //for positive numberA        
        if(!isNaN(value) && this.operator == ""){
            this.numberA += value;  
        }

        // for negative numberA
        else if(!isNaN(value) && this.numberA == "" && (this.operator == "" || this.numberB == "")){
            this.numberA = -value;
            this.operator = "";
        }
        
        // for operator
        else if(isNaN(value)){
            this.operator = value;
        }
        
        // for numberB 
        else if(!isNaN(value) && this.numberA != ""){
            this.numberB  += value;
        }   
    }, 

    // called the function by EventListener to get valye
    getNumber: function(){

        // condition to initialize the single place value is
        if(this.input.value == 0){
            this.input.value = event.target.value;  
            
        }
        // if not the value will be added at multiple places value
        else{
            this.input.value += event.target.value; 

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

        if(this.numberA == "")
        {
            if(this.operator != ' - '){
                return this.operator = "";
            }
            else{

            }
        }
        // display operator
        if(this.operator != " √ "){
            this.input.value = this.operator;
            this.input.value = this.numberA + this.operator;
        }
        // define square operator
        else if (this.operator != " s ") {
            this.input.value = this.numberA + this.operator;
        }

        return this.operator;
    },
 // add decimal dot 
    addDecimalDot : function(){
        if(this.numberA != "" && this.operator == ""){
            if(this.numberA.includes('.')){ 
                return; 
            }
            else{
                this.isNumberADecimal = true;
                this.input.value += '.';
                this.numberA += '.';
            }
        }
        else if(this.operator != "" && this.numberB != ""){
            if(this.numberB.includes('.')){ 
                return; 
            }
            else{
                this.isNumberBDecimal = true;
                this.input.value += '.';
                this.numberB += '.';
            }
        }
    },
    // delete last one digit from display
    deleteLastOne: function(){
        
        //checks display value is zero it will return back
        if(this.input.value == '0') { return; }

        // check display is not empty i.e it may contain numbers and operators
        if(this.numberA != "" && this.operator == "" && this.numberB == ""){
            let calc = this.numberA + "";

            //length of the string
            let last = calc.length;

            // slice one number from last
            this.numberA = calc.slice(0, last - 1);
            
            // does not contain single value will show 0 or null
            if(this.numberA / this.numberA != 1){
                this.input.value = 0;
                this.numberA = "";
                return;
            }
        }
        // check numberA and operator is not empty but numberB is empty 
        else if(this.numberA != "" && this.operator != "" && this.numberB == ""){
            this.operator = "";
        
            // return remaining value
            this.input.value = this.numberA;
            return;
        }

        // check operator and numberB not empty
        else if(this.operator != "" && this.numberB != ""){
            let calc = this.numberB + "";
            let last = calc.length;

            // slice numberB  
            this.numberB = calc.slice(0, last - 1);

            if(this.numberB / this.numberB != 1) { 
                this.numberB = "";
            }
        }

        let calc = this.input.value + "";
        let last = calc.length;

        // remove last digit from total length of string
        if(this.input.value[last - 1] == " "){
            this.input.value = calc.slice(0, last - 3);    
        }
        else{
            this.input.value = calc.slice(0, last - 1);    
        }
    },
    // convert into decimal
    convertinToDecimal: function(number){
        let point = number.indexOf('.');
        let last = number.length;
        
        let leftPoint = number.slice(0, point);
        let rightPoint = number.slice(point, last);

        return (leftPoint * 1.0) + (rightPoint / 1);
    },
    // for non decimal value
    NoDecimal : function(){
        this.isNumberADecimal = false;
        this.isNumberBDecimal = false;
    },
    
    // SquareRoot
    squareRoot : function(numA){
        if(this.numberA != "" && this.numberB == ""){
            let result = Math.sqrt(numA);

            this.numberA = result;
            this.operator = "";
            this.numberB = "";
            return this.input.value = result;
        }
    },
    // function to get square
    Square : function(numA){
        if(this.numberA != "" && this.numberB == ""){
            let result = numA * numA;

            this.numberA = result;
            this.operator = "";
            this.numberB = "";
            return this.input.value = result;
        }
    },

    // function to clear all
    cleanAll: function(){
        this.input.value = 0;
        this.numberA = this.numberB = this.operator = "";
    },
    // addition 
    sum: function(numA, numB){
        return numA + numB;
    },
    // subtraction
    subtract: function(numA, numB){
        return numA - numB;
    },
    //multiplicaton
    multiply: function(numA, numB){
        return numA * numB;
    },
    // Division
    divide: function(numA, numB){
        return numA / numB;
    },
    // percentage
    getPercent: function(numA, numB){
        return (numA / 100) * numB;
    }
}

// EventListener on onclick event
document.addEventListener('click', function (event) {

    if(event.target.classList.contains('number')){

        let number = calculator.getNumber();
        // get number to calculate
        calculator.addToCalculation(number);
        // console.log(number);
    }
    // event to get operator
    else if(event.target.classList.contains('operator')){
        let operator = calculator.getOperator(event);
        // get operator to calculate
        calculator.addToCalculation(operator);
        if(event.target.value == "√"){
            calculator.squareRoot(calculator.numberA);
        }
        // get square root operatoe to calculate
        else if(event.target.value == "p"){
            calculator.Square(calculator.numberA);
        }
    }
     // event to Delete last one digit 
    else if(event.target.classList.contains('command')){
        if(event.target.value == 'del'){
            calculator.deleteLastOne();
        }
        // Clear all 
        if(event.target.value == 'AC'){
            calculator.cleanAll();
        }
    }
    else if(event.target.classList.contains('punctuation')){
        calculator.addDecimalDot();
    }
    // event to operate operation
    if((calculator.numberA != "" && 
        calculator.operator != "" && 
        calculator.numberB != "") && 
        (event.target.classList.contains('operator') || (event.target.value === 'equals'))){
    
        calculator.numberA += "";            
        calculator.numberB += ""; 
            // condition for nondecimal value
        if(!calculator.numberA.includes('.') || !calculator.numberB.includes('.')){
            calculator.NoDecimal();
        }
        // condition to convert into decimal value
            if(calculator.isNumberADecimal || calculator.isNumberBDecimal){
            if(calculator.isNumberADecimal){
                var tempA = calculator.convertinToDecimal(calculator.numberA);
            }    
            if(calculator.isNumberBDecimal){
                var tempB = calculator.convertinToDecimal(calculator.numberB);
            }
        }
        else {

         // parses a string and returns a floating point number.
            var tempA = parseFloat(calculator.numberA);
            var tempB = parseFloat(calculator.numberB);
            var result = ""; 
        } 
            // checks switch statement condition to perform operation
            switch(calculator.operator.trim()){
                case "+": result = calculator.sum(tempA, tempB); break;
                case "-": result = calculator.subtract(tempA, tempB); break;
                case "x": result = calculator.multiply(tempA, tempB); break;
                case "/": result = calculator.divide(tempA, tempB); break;
                case "%": result = calculator.getPercent(tempA, tempB); break;
                default: result = "";
            }
    // get result om equals to
            if(event.target.value === 'equals'){
                calculator.numberA = result;
                calculator.operator = "";
                calculator.numberB = "";
                let vre = calculator.input.value = result;
                // console.log(vre);
            }
            else if(event.target.classList.contains('operator')){
            // return square root
                if(event.target.value == "√"){
                    calculator.numberA = result;
                    calculator.numberB = "";
                    calculator.squareRoot(calculator.numberA);
                    return;
                }
                // return square
                else if(event.target.value == "p"){
                    calculator.numberA = result;
                    calculator.numberB = "";
                    calculator.Square(calculator.numberA);
                    return;
                }
            // get result after clicking operator
            calculator.numberA = result;
            calculator.operator = calculator.getOperator(event);
            calculator.numberB = "";
            calculator.input.value = result + calculator.operator;
    }
        }


}, false);