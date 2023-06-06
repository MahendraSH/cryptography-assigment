
function gcdExtended(a, b,
    x, y) {
    // Base Case
    if (a == 0) {
        x = 0;
        y = 1;
        return b;
    }

    let gcd = gcdExtended(b % a,
        a, x, y);

    x = y - (b / a) * x;
    y = x;

    return gcd;
}

// Driver Code
let x = 0;
let y = 0;
let a = 35;
let b = 15;
let g = gcdExtended(a, b, x, y);
console.log("gcd(" + a);
console.log(", " + b + ")");
console.log(" = " + g);


