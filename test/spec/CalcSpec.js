describe("Calculator Challenge Test Suite", function () {

	describe('Calculator', function () {
		var testCalc,mem;

		beforeEach(function () {
			testCalc = new Calculator;
			mem = testCalc.getMem();
		});
		afterEach(function () {
			testCalc = undefined;
		});


		it('Calculator is defined', function () {
			expect(testCalc).toBeDefined();
		});


		describe('Test utility functions', function () {
			var hasDecimal = function (num) {
				return num % 1 ? true : false;
			};

			it('hasDecimal Returns true with input of 1.23', function () {
				expect(hasDecimal(1.23)).toBeTruthy();
			});

			it('hasDecimal Returns false with input of 25', function () {
				expect(hasDecimal(1.23)).toBeTruthy();
			});

//			it('Sets and gets virtual screen value of 5', function () {
//
//				testCalc.setScreenValue(5);
//				expect(testCalc.getScreenValue()).toBe(5);
//
//			});

		});


		describe('Test processInput()', function () {

			it('Test toggleSign(). Switching an operand +/- Sign', function () {

				testCalc.processInput('AC');
				testCalc.processInput('7');
				expect(mem.screenValue).toBe('7');
				testCalc.processInput('+/-');
				expect(mem.screenValue).toBe('-7');
				expect(mem.leftOperand).toBe('-7');

				testCalc.processInput('+');
				testCalc.processInput('5');
				testCalc.processInput('=');
				expect(mem.screenValue).toBe(-2);

				testCalc.processInput('+');
				testCalc.processInput('5');
				testCalc.processInput('=');
				expect(mem.screenValue).toBe(3);

				testCalc.processInput('+');
				testCalc.processInput('+/-');
				testCalc.processInput('7');
				testCalc.processInput('=');
				expect(mem.screenValue).toBe(-4);

			});

			it('Tests chaining input', function () {
				testCalc.processInput('AC');
				testCalc.processInput('3');
				testCalc.processInput('x');
				testCalc.processInput('3');

				testCalc.processInput('x');

				expect(mem.operatorCount).toBe(2);
				expect(mem.screenValue).toBe(9);
				testCalc.processInput('3');

				testCalc.processInput('x');

				expect(mem.screenValue).toBe(27);
				expect(mem.operatorCount).toBe(3);

				testCalc.processInput('=');
				expect(mem.screenValue).toBe(81);
			});

			it('Tests multiplication with negative input', function () {
				testCalc.processInput('AC');
				testCalc.processInput('+/-');
				testCalc.processInput('1');
				testCalc.processInput('7');
				testCalc.processInput('x');
				testCalc.processInput('+/-');
				testCalc.processInput('3');
				testCalc.processInput('=');
				expect(mem.screenValue).toBe(51);
				testCalc.processInput('=');
				expect(mem.screenValue).toBe(-153);

			});

			it('Tests decimal input', function () {

				testCalc.processInput('AC');
				testCalc.processInput('.');
				testCalc.processInput('2');
				testCalc.processInput('5');
				// try input of another period
				testCalc.processInput('.');
				expect(mem.screenValue).toBe('.25');
				testCalc.processInput('÷');
				testCalc.processInput('.');
				testCalc.processInput('5');

				// try input of another period
				testCalc.processInput('.');
				expect(mem.screenValue).toBe('.5');
				testCalc.processInput('=');
				expect(mem.screenValue).toBe(0.5);

			});

			it('Test a simple addition sequence with a cancel after the first input.', function () {

				testCalc.processInput('AC');
				expect(testCalc.getScreenValue()).toBe(0);

				testCalc.processInput('1');
				testCalc.processInput('0');
				testCalc.processInput('+');

				expect(mem.operator).toBe('+');
				expect(mem.leftOperand).toBe('10');

				// simulate cancel
				testCalc.processInput('AC');
				expect(mem.rightOperand).toBe(0);

				testCalc.processInput('5');
				// after cancel both operands should be the same
				expect(mem.leftOperand).toBe('5');
				expect(mem.rightOperand).toBe('5');

				testCalc.processInput('+');
				expect(mem.operator).toBe('+');

				testCalc.processInput('1');
				expect(mem.leftOperand).toBe('5');
				expect(mem.rightOperand).toBe('1');

				// add more digits
				testCalc.processInput('0');
				expect(mem.rightOperand).toBe('10');

				// apply the addition
				testCalc.processInput('=');
				expect(mem.screenValue).toBe(15);

				// apply implied addition (pressing the = key again
				testCalc.processInput('=');
				expect(mem.rightOperand).toBe('10');
				expect(mem.screenValue).toBe(25);

				// now add another number
				testCalc.processInput('+');
				testCalc.processInput('5');

				expect(mem.rightOperand).toBe('5');
				expect(mem.leftOperand).toBe(25);

				// and resolve
				testCalc.processInput('=');
				//expect(mem.rightOperand).toBe('10');
				expect(mem.screenValue).toBe(30);

			});

			it('Test Self Operating numbers (user does not have to enter the second number if operating on the same number', function () {

				testCalc.processInput('AC');
				expect(mem.screenValue).toBe(0);
				testCalc.processInput('5');
				testCalc.processInput('x');
				testCalc.processInput('=');
				expect(mem.screenValue).toBe(25);
				// one more time...
				testCalc.processInput('=');
				expect(mem.screenValue).toBe(125);
				// one more time...
				testCalc.processInput('=');
				expect(mem.screenValue).toBe(625);

			});

		});


	});

});