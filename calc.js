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

	// install event handlers
	for (var idx = 0; idx < keys.length; idx += 1) {
		keys[idx].onclick = function (e) {
			var me = this;
			return (function () {

				var mem, input, isOperator;
				input = me.innerHTML;

				calc.processInput(input);
				mem = calc.getMem();
				isOperator = mem.operators.indexOf(input) !== -1;

				highlightOperator(isOperator ? input : null);

				clearBtn.innerHTML = mem.clear;
				screen.innerHTML = calc.getScreenValue();

			})();
		}
	}

})();
