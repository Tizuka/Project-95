function generateNextValue(previousValue, config, trend = "STABLE") {

    let variation = (Math.random() - 0.5) * config.step;

    if (trend === "RISING") {
        variation += config.step * 0.5;
    }

    if (trend === "FALLING") {
        variation -= config.step * 0.5;
    }

    let value = previousValue + variation;

    // Não deixa o valor ultrapassar os limites da simulação
    value = Math.max(config.min, value);
    value = Math.min(config.max, value);

    return Number(value.toFixed(1));
}


function generateInitialValue(config) {

    const value =
        config.min +
        Math.random() * (config.max - config.min);

    return Number(value.toFixed(1));
}


module.exports = {
    generateNextValue,
    generateInitialValue
};