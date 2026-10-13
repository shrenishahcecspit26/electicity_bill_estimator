function calculateBill() {
    const unitsInput = document.getElementById("units");
    const units = Number(unitsInput.value);
    const consumerType = document.getElementById("consumerType").value;

    if (!Number.isInteger(units) || units < 1) {
        document.getElementById("result").textContent = "Please enter a whole number of units greater than 0.";
        document.getElementById("breakdown").textContent = "No calculation available until the input is corrected.";
        unitsInput.focus();
        return;
    }

    const rate = chooseRate(units);
    const baseAmount = calculateBase(units, rate);
    const surchargePercent = consumerType === "Commercial" ? 10 : 0;
    const surcharge = calculateSurcharge(baseAmount, surchargePercent);
    const fixedCharge = 50;
    const total = baseAmount + surcharge + fixedCharge;

    document.getElementById("result").textContent =
        "Rate: ₹" + rate + "/unit | Base: ₹" + baseAmount +
        " | Surcharge: ₹" + surcharge + " | Fixed: ₹" + fixedCharge +
        " | Total: ₹" + total;
    document.getElementById("breakdown").textContent = buildExamples();
}

function calculateSurcharge(amount, percentage) {
    return amount * percentage / 100;
}

function chooseRate(units) {
    if (units <= 100) {
        return 5;
    } else if (units <= 300) {
        return 7;
    } else {
        return 9;
    }
}

function calculateBase(units, rate) {
    return units * rate;
}

function buildExamples() {
    const examples = [];
    for (let units = 100; units <= 500; units += 100) {
        const rate = chooseRate(units);
        const base = calculateBase(units, rate);
        examples.push(units + " units = ₹" + base + " (base bill)");
    }
    return examples.join("\n");
}
