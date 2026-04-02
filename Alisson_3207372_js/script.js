function showTool(toolId) {
    const tools = document.querySelectorAll('.tool-container');
    tools.forEach(tool => {
        tool.classList.remove('active');
        tool.style.display = 'none';
    });
    const selectedTool = document.getElementById(toolId);
    if (selectedTool) {
        selectedTool.classList.add('active');
        selectedTool.style.display = 'block';
    }
}
function convertTemperature() {
    const val = parseFloat(document.getElementById('temp-input').value);
    const fromUnit = document.getElementById('temp-from').value;
    const toUnit = document.getElementById('temp-to').value;
    const resultDiv = document.getElementById('temp-result');

    if (isNaN(val)) {
        resultDiv.textContent = "Please enter a valid number.";
        return;
    }
    let celsius;
    if (fromUnit === "C") celsius = val;
    else if (fromUnit === "F") celsius = (val - 32) * 5 / 9;
    else if (fromUnit === "K") celsius = val - 273.15;
    let finalValue;
    if (toUnit === "C") finalValue = celsius;
    else if (toUnit === "F") finalValue = (celsius * 9 / 5) + 32;
    else if (toUnit === "K") finalValue = celsius + 273.15;
    resultDiv.textContent = `${val}°${fromUnit} is equal to ${finalValue.toFixed(2)}°${toUnit}`;
    resultDiv.className = 'result-display';
    if (celsius <= 10) resultDiv.classList.add('temp-cold');
    else if (celsius > 30) resultDiv.classList.add('temp-hot');
    else resultDiv.classList.add('temp-warm');
}
let currencyFrom = 'USD';
let currencyTo = 'EUR';
function selectCurrency(code, element, type) {
    const parent = element.parentElement;
    parent.querySelectorAll('.currency-btn').forEach(btn => btn.classList.remove('selected'));
    element.classList.add('selected');
    if (type === 'from') currencyFrom = code;
    else currencyTo = code;
}
function convertCurrency() {
    const amount = parseFloat(document.getElementById('curr-input').value);
    const resultDiv = document.getElementById('curr-result');
    if (isNaN(amount) || amount <= 0) {
        resultDiv.textContent = "Please enter a valid amount.";
        return;
    }
    const rates = {
        USD: 1,
        EUR: 0.92,
        GBP: 0.78,
        BRL: 5.05
    };
    const converted = (amount / rates[currencyFrom]) * rates[currencyTo];
    resultDiv.textContent = `${amount} ${currencyFrom} is equal to ${converted.toFixed(2)} ${currencyTo}`;
}
function convertBinary() {
    const input = document.getElementById('binary-input').value.trim();
    const type = document.getElementById('binary-type').value;
    const resultDiv = document.getElementById('binary-result');

    if (input === "") {
        resultDiv.textContent = "Please enter a value.";
        return;
    }

    if (type === "DecToBin") {
        const num = Number(input);
        if (isNaN(num)) {
            resultDiv.textContent = "Invalid decimal number.";
            return;
        }
        let result = num.toString(2);
        resultDiv.textContent = `${num} is equal to ${result} (binary)`;
    } else {
        if (!/^[01]+$/.test(input)) {
            resultDiv.textContent = "Binary must contain only 0s and 1s.";
            return;
        }
        let result = parseInt(input, 2);
        resultDiv.textContent = `${input} is equal to ${result} (decimal)`;
    }
}
//clear button function for all tools 
function clearTool(toolPrefix) {
    const input = document.getElementById(`${toolPrefix}-input`);
    const result = document.getElementById(`${toolPrefix}-result`);

    if (input) input.value = '';
    if (result) {
        result.textContent = '';
        result.className = 'result-display'; // Reset temperature collor
    }
}