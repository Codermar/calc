function Calculator() {

	var me = this, operElms;
	var mem = {
		screenValue: 0,
		leftOperand: 0,
		rightOperand: 0,
		operator: null,
		operators: ['+', '-', 'x', '÷'],
		clear: 'AC',
		isLeftOperand: true,
		resetNegInput: true,
		appendInput: false,
		isNegative: false
	};


	var hasDecimal = function (num) {
		return num % 1 ? true : false;
	};

	var toggleSign = function () {

		mem.isNegative = !mem.isNegative;

		//console.log('------isNeg: ', mem.isNegative, ' screen val: ', me.getScreenValue(), ' appendInput: ', mem.appendInput, ' left: ', mem.isLeftOperand, ' ** reset: ', mem.resetNegInput);

		if (mem.operator !== null && mem.isNegative && !mem.resetNegInput) {
			me.setScreenValue(-0);
			mem.resetNegInput = true;
		}

		if (mem.isNegative) {
			me.setScreenValue('-' + me.getScreenValue());
		} else {
			var num = me.getScreenValue();
			me.setScreenValue(num *= -1);
		}

		if (mem.isLeftOperand) {
			mem.leftOperand = me.getScreenValue();
		} else {
			mem.rightOperand = me.getScreenValue();
		}


	};

	var setClearBtnValue = function (val) {
		mem.clear = val;
	};

	var resolveEquation = function () {
		var equation = mem.leftOperand + mem.operator + mem.rightOperand;
		equation = equation.replace(/x/g, '*').replace(/÷/g, '/');
		var result = eval(equation);

		//console.log('result: ', result, ' eq: ', equation);
		me.setScreenValue(result);
		//mem.operator = getOperator(null);

		mem.leftOperand = result;
		//mem.rightOperand = result;
		mem.appendInput = false;
		mem.resetNegInput = false;
		mem.isLeftOperand = true;
	};

	me.getScreenValue = function () {
		return mem.screenValue;
	};

	me.setScreenValue = function (val) {
		mem.screenValue = val;
	};

	me.getMem = function () {
		return mem;
	};

	// public methods
	me.processInput = function (input) {
		var result, isOperator;

		if (input === 'AC') {

			me.setScreenValue(0);
			// TODO: deal with testing and no dom elements. Remove highlight from button.
			mem.operator = null;
			//getOperator(null);
			setClearBtnValue('AC');

			mem.leftOperand = 0;
			mem.rightOperand = 0;
			mem.appendInput = false;
			mem.resetNegInput = true;
			mem.isNegative = false;
			mem.isLeftOperand = true;

		} else if (input === 'C') {

			me.setScreenValue(0);
			mem.rightOperand = 0;
			setClearBtnValue('AC');

		} else if (input === '%') {

			console.log('percent ');


		} else if (input === '+/-') {

			toggleSign();

		} else if (mem.operators.indexOf(input) !== -1) {

			// TODO: button value reset
			setClearBtnValue('C');
			mem.operator = input;
			mem.leftOperand = me.getScreenValue();
			mem.rightOperand = me.getScreenValue();

			mem.isNegative = false;
			mem.appendInput = false;
			mem.resetNegInput = false;
			mem.isLeftOperand = false;

		} else if (input === '=') {

			resolveEquation();

		} else {

			if (!isNaN(input) || input === '.') { // it's a number or a period


				if (!mem.appendInput) {


					if (mem.isNegative) {
						me.setScreenValue('-' + input);
					} else {
						me.setScreenValue(input);
					}
					mem.appendInput = true;


				} else {

					if (hasDecimal(me.getScreenValue()) && input === '.') { // ignore dup period entry
						return;
					}

					me.setScreenValue(me.getScreenValue() + input);
				}

				if (mem.operator === null) {
					mem.leftOperand = me.getScreenValue();
					mem.rightOperand = me.getScreenValue();
				} else {
					mem.rightOperand = me.getScreenValue();
				}
			}

		}

		// TODO: temp remove after testing
		if (!isNaN(input)) {
			var isLeft = ' ** isLeftOperand: ' + mem.isLeftOperand;
		} else {
			var isLeft = '';
		}

		console.log('input: ', input, ' ** currval: ', me.getScreenValue(), isLeft, ' ** append: ', mem.appendInput, ' reset: ', mem.resetNegInput, 'mem: ', mem);


		return me.getScreenValue();
	};

}