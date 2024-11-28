"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.unformatCurrency = exports.formatCurrencyOnChange = exports.formatCurrency = void 0;
function formatCurrency(value) {
    // Converter o valor para número de ponto flutuante
    let valueNumber = parseFloat(value);
    // Garantir que o valor tenha duas casas decimais
    let valueFormat = valueNumber.toFixed(2).replace('.', ',');
    // Adicionar pontos para separar os milhares
    valueFormat = valueFormat.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    // Adicionar o símbolo de moeda
    valueFormat = `R$ ${valueFormat}`;
    return valueFormat;
}
exports.formatCurrency = formatCurrency;
function unformatCurrency(value) {
    // Remover o símbolo de moeda e os pontos de separação de milhares
    let cleanedValue = value
        .replace('R$', '')
        .replace(/\./g, '')
        .replace(',', '.')
        .trim();
    return parseFloat(cleanedValue);
}
exports.unformatCurrency = unformatCurrency;
function formatCurrencyOnChange(value) {
    let valueFormat = value.replace(/[^0-9]/g, '');
    if (valueFormat.length > 2) {
        valueFormat = valueFormat.slice(0, -2) + ',' + valueFormat.slice(-2);
    }
    valueFormat = valueFormat.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    valueFormat = `R$ ${valueFormat}`;
    return valueFormat;
}
exports.formatCurrencyOnChange = formatCurrencyOnChange;
