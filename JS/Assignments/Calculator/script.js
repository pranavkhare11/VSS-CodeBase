function calculate(a, b, operator) {
    const left = Number(a);
    const right = Number(b);

    if (!Number.isFinite(left) || !Number.isFinite(right)) {
        return 'Error';
    }

    switch (operator) {
        case '+':
            return left + right;
        case '-':
            return left - right;
        case '*':
            return left * right;
        case '/':
            return right === 0 ? 'Error' : left / right;
        case '%':
            return right === 0 ? 'Error' : left % right;
        default:
            return 'Error';
    }
}

// Handle command-line arguments
const args = process.argv.slice(2);
if (args.length === 3) {
    const [num1, num2, op] = args;
    const result = calculate(num1, num2, op);
    console.log(result);
} else {
    console.log('Usage: node script.js <number1> <number2> <operator>');
    console.log('Operators: +, -, *, /, %');
}