const bcrypt = require('bcryptjs');
const fs = require('fs');

// Generate a random salt
function generateSalt() {
    return bcrypt.genSaltSync(10);
}

// Generate a hashed password using bcrypt
function generateHashedPassword(password, salt) {
    return bcrypt.hashSync(password, salt);
}

// Verify a password against a hashed password using bcrypt
function verifyPassword(password, hashedPassword) {
    return bcrypt.compareSync(password, hashedPassword);
}

// Generate a password file with 10 passwords
function generatePasswordFile() {
    const passwords = [];

    for (let i = 0; i < 10; i++) {
        const password = Math.random().toString(36).slice(-8);
        passwords.push(password);
    }

    fs.writeFileSync('passwords.txt', passwords.join('\n'));
}

// Store the hashed values of passwords in a file
function storeHashedPasswords() {
    const passwords = fs.readFileSync('passwords.txt', 'utf8').split('\n');
    const hashedPasswords = passwords.map((password) => {
        const salt = generateSalt();
        const hashedPassword = generateHashedPassword(password, salt);
        return hashedPassword;
    });

    fs.writeFileSync('hashed_passwords.txt', hashedPasswords.join('\n'));
}

// Generate a salt file
function generateSaltFile() {
    const salts = [];

    for (let i = 0; i < 10; i++) {
        const salt = generateSalt();
        salts.push(salt);
    }

    fs.writeFileSync('salts.txt', salts.join('\n'));
}

// Store salted and hashed passwords in a file
function storeSaltedHashedPasswords() {
    const passwords = fs.readFileSync('passwords.txt', 'utf8').split('\n');
    const salts = fs.readFileSync('salts.txt', 'utf8').split('\n');

    const saltedHashedPasswords = passwords.map((password, index) => {
        const salt = salts[index];
        const saltedPassword = password + salt;
        const hashedPassword = generateHashedPassword(saltedPassword, salt);
        return hashedPassword;
    });

    fs.writeFileSync('salted_hashed_passwords.txt', saltedHashedPasswords.join('\n'));
}

// Verify a password against the hashed passwords in the file
function verifyPasswordFromFile(password) {
    const hashedPasswords = fs.readFileSync('hashed_passwords.txt', 'utf8').split('\n');

    for (let i = 0; i < hashedPasswords.length; i++) {
        const hashedPassword = hashedPasswords[i];
        if (verifyPassword(password, hashedPassword)) {
            return true;
        }
    }

    return false;
}

// Verify a password against the salted and hashed passwords in the file
function verifySaltedHashedPasswordFromFile(password) {
    const saltedHashedPasswords = fs.readFileSync('salted_hashed_passwords.txt', 'utf8').split('\n');
    const salts = fs.readFileSync('salts.txt', 'utf8').split('\n');

    for (let i = 0; i < saltedHashedPasswords.length; i++) {
        const saltedHashedPassword = saltedHashedPasswords[i];
        const salt = salts[i];
        const saltedPassword = password + salt;
        const hashedPassword = generateHashedPassword(saltedPassword, salt);
        if (verifyPassword(saltedPassword, saltedHashedPassword)) {
            return true;
        }
    }

    return false;
}

// Task 4a: Generate a password file of 10 passwords
generatePasswordFile();


// Task 4b: Store the hashed values of passwords in a file
storeHashedPasswords();

// Task 4c: Generate a salt file and store salted and hashed passwords in a file
generateSaltFile();
storeSaltedHashedPasswords();

const passwordToVerify = 'password123';
const isPasswordValid = verifyPasswordFromFile(passwordToVerify);
console.log('Is password valid (hashed passwords):', isPasswordValid);

// Verify a password against the salted and hashed passwords in the file
const isSaltedHashedPasswordValid = verifySaltedHashedPasswordFromFile(passwordToVerify);
console.log('Is password valid (salted and hashed passwords):', isSaltedHashedPasswordValid);
