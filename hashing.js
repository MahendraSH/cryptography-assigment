const crypto = require('crypto');

const restToken = crypto.randomBytes(Number(20)).toString('hex');
const hashValue = crypto.createHash('SHA256').update(restToken).digest('hex');


console.log(hashValue);

const varifycationToken = crypto.createHash("SHA256").update(restToken).digest('hex');

console.log(varifycationToken);

if (varifycationToken.localeCompare(hashValue)) {
    console.log('token is not valid');
} else {
    console.log('token is valid');
}



const hashValue2 = hashValue.replace(hashValue[0], '1')


console.log(hashValue2);

const varifycationToken2 = crypto.createHash("SHA256").update(restToken).digest('hex');

console.log(varifycationToken);

if (varifycationToken2.localeCompare(hashValue2)) {
    console.log('token is not valid');
} else {
    console.log('token is valid ');
}




