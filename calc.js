(function () {
	var keys, screen, clearBtn, operElms, calc;

	keys = document.querySelectorAll('#keypad div');
	screen = document.querySelector('.input-screen');
	clearBtn = document.querySelector('#clear-btn');
	operElms = document.querySelectorAll('.key-orange');
	calc = new Calculator();


	var highlightOperator = function (oper) {
		var border;
		for (var elm = 0; elm < operElms.length; elm += 1) {
			if (operElms[elm].innerHTML === oper) {
				border = "2px solid #000000";
			} else {
				border = "1px solid #808080";
			}
			operElms[elm].style.border = border;
		}
	};

	var resizeScreenFont = function(len) {

		var fontSize;

		if(len > 9 && len <= 12) {
			fontSize = '40px';
		} else if(len > 12 && len <= 25) {
			fontSize = '20px';
		} else if (len > 25 && len < 35) {
			fontSize = '15px';
		} else if (len > 25) {
			fontSize = '13px';
			screen.style.overflowY = 'scroll';
		} else {
			fontSize = '60px';
			screen.style.overflowY = 'hidden';
		}
		screen.style.fontSize = fontSize;
	};
	
	// install event handlers
	for (var idx = 0; idx < keys.length; idx += 1) {
		keys[idx].onclick = function (e) {
			var me = this;
			return (function () {

				var mem, input, isOperator,screenValue;
				input = me.innerHTML;

				calc.processInput(input);
				mem = calc.getMem();
				isOperator = mem.operators.indexOf(input) !== -1,
				screenValue = calc.getScreenValue();

				highlightOperator(isOperator ? input : null);

				clearBtn.innerHTML = mem.clear;
				resizeScreenFont(screenValue.toString().length);
				screen.innerHTML = screenValue;

			})();
		}
	}

})();
