
function power(a, b, p) {
    if (b == 1)
        return a;
    else
        return ((Math.pow(a, b)) % p);
}

var P, G, x, a, y, b, ka, kb;

P = 23;
console.log("The value of P:" + P);

G = 9;
console.log("The value of G:" + G );

a = 4;
console.log("The private key a for Alice:" + a);

x = power(G, a, P);

b = 3;
console.log("The private key b for Bob:" + b);

y = power(G, b, P);

ka = power(y, a, P);
kb = power(x, b, P);

console.log("Secret key for the Alice is:" + ka);
console.log("Secret key for the Bob is:" + kb);

