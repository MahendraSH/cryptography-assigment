// number to  char

// for( i =0;i< 26;i ++){
//     console.log(i,String.fromCharCode(65+i));
// }

// char to number
// let a ='A'
// console.log(a.charCodeAt(0))


let a = 17;
let b = 20;

function encryptMessage(msg) {
    let cipher = "";
    for (let i = 0; i < msg.length; i++) {
        if (msg[i] != ' ')
            cipher = cipher + String.fromCharCode((((a * (msg[i].charCodeAt(0) - 65)) + b) % 26) + 65);
        else
            cipher += msg[i];
    }
    return cipher;
}

function decryptCipher(cipher) {
    let msg = "";
    let a_inv = 0;
    let flag = 0;

    for (let i = 0; i < 26; i++) {
        flag = (a * i) % 26;

        if (flag == 1) {
            a_inv = i;
        }
    }
    for (let i = 0; i < cipher.length; i++) {
        if (cipher[i] != ' ')
            msg = msg + String.fromCharCode(((a_inv * ((cipher[i].charCodeAt(0) + 65 - b)) % 26)) + 65);
        else
            msg += cipher[i];
    }

    return msg;
}

let msg = "AFFINE CIPHER";

console.log("message :"+msg);

let cipherText = encryptMessage(msg);
console.log("Encrypted Message is : " + cipherText);

console.log("Decrypted Message is: " + decryptCipher(cipherText));

