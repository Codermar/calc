
    (function (){

        var keys,screen,tracker,operElms;

        keys = document.querySelectorAll('#keypad div');
        screen = document.querySelector('.input-screen');
        operElms = document.querySelectorAll('.key-orange');
        tracker = {
            leftOperand: null,
            rightOperand: null,
            operator: null,
            operators: ['+', '-', 'x', '÷'],
            resetScreen: false
        };

        var setOperator = function(e) {
            var border;

            if(!e) { tracker.operator = null;}

            // some dom manipulation here for a necessary evil
            for(var elm=0;elm < operElms.length; elm+=1){
                if(operElms[elm].innerHTML===e) {
                    tracker.operator = operElms[elm].innerHTML;
                    border = "2px solid #000000";
                } else {
                    border = "1px solid #808080";
                }
                operElms[elm].style.border = border;
            }
        };

        var getScreenValue = function(){
            return screen.innerHTML;
        };

        var setScreenValue = function(value){
            screen.innerHTML = value;
        };

        var hasDecimal = function(num) {
         return num % 1 ? true : false;
        };

        var processInput = function (e) {
            var val = getScreenValue(),
                isOperator,
                input = e.innerHTML,
                parsedVal = parseInt(input);

            if(input==='AC') {
                setScreenValue(0);
                setOperator(false);

                tracker.leftOperand = null;
                tracker.rightOperand = null;
                tracker.resetScreen = false;

            } else {

                if(!isNaN(input) || input==='.') {
                   if(hasDecimal(getScreenValue()) && input === '.') { return; }

                   if(tracker.operator &&  !tracker.resetScreen) {
                       setScreenValue(input);
                       tracker.resetScreen = true;
                   } else {
                       setScreenValue(getScreenValue() + input);
                   }
                }

                // determine if it's an operator
                isOperator = tracker.operators.indexOf(input) !== -1 ? input : null;

                if(isOperator) {
                    setOperator(input);
                    tracker.leftOperand = getScreenValue();
                    //setScreenValue(0);
                }
                if(tracker.operator){
                    tracker.rightOperand = getScreenValue();
                }

                if(input==='=') {
                    var equation = tracker.leftOperand + tracker.operator + tracker.rightOperand;
                    equation = equation.replace(/x/g, '*').replace(/÷/g, '/');
                    var result = eval(equation);

                    setScreenValue(result);
                    setOperator(false);

                    tracker.leftOperand = result;
                    tracker.rightOperand = result;
                    console.log('Evaluating...: ', result );
                }

            }

            console.log('currval: ', val, ' input: ', input, ' isNaN: ', isNaN(input), ' isOper: ', isOperator );
            console.log('tracker: ', tracker);


        };



        // install event handlers
        for(var idx = 0; idx < keys.length; idx+=1) {
            keys[idx].onclick = function(e){
                var me=this;
                return (function() {
                    processInput(me);
                })();
            }
        }


    })();