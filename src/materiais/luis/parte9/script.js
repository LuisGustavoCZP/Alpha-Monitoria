function soma (a, b) {
    const okA = Number.isInteger(a) && a > 0;
    const okB = Number.isInteger(b) && b > 0;
    if(!okA || !okB) throw Error(`[sum] Impossible to sum ${a} + ${b}`);
    return a + b;
}
function subtracao (a, b) {
    if(a < b) throw Error(`[sub] Impossible to subtract ${a} - ${b}`);
    try {
        if(soma(b, 1) === a) return 1;
        else return soma(1, subtracao(a, soma(b, 1)));
    } catch (error) {
        throw Error(`[sub] Impossible to subtract ${a} - ${b}`);
    }
}
function multiplicacao (a, b) {
    if(b === 1) return a;
    try {
        return soma(a, multiplicacao(a, subtracao(b, 1)));
    } catch (e) {
        throw Error(`[mul] Impossible to multiply ${a} * ${b}`);
    }
}
function exponenciacao (a, b) {
    if(b === 1) return a;
    if(b === 0) return 1;
    try {
        return multiplicacao(a, exponenciacao(a, subtracao(b, 1)));
    }
    catch(e) {
        throw Error(`[exp] Impossible to exponentiate ${a} ^ ${b}`);
    }
}
function divisao (a, b) {
    if(b === 0) throw Error(`[div] Impossible to divide ${a} / ${b}`);
    if(b === 1) return a;
    if(a <= b) return 0;
    try {
        const d = divisao(subtracao(a, b), b);
        if(d === 0) return 1;
        return soma(1, d);
    }
    catch(e) {
        throw Error(`[div] Impossible to divide ${a} / ${b}`);
    }
}

console.log(soma(6, 2));
console.log(subtracao(6, 2));
console.log(multiplicacao(6, 2));
console.log(exponenciacao(6, 2));
console.log(divisao(6, 2));