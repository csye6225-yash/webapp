const db = require('../models/index');
const fs = require('fs');
const csv = require('fast-csv');
const path = require('path');
const baseDir = path.resolve(__dirname, '../opt/users.csv');
const bcrypt = require('bcrypt');

const csvtojson = () => {
    return new Promise((resolve, reject) => {
        let csvData = [];
        fs.createReadStream(baseDir)
            .pipe(csv.parse({ headers: true }))
            .on('error', error => reject(error))
            .on('data', row => {
                csvData.push(row);
            })
            .on('end', () => {
                resolve(csvData);
            });
    });
}

const addCSVtoDB = async () => {
    try {
      let csvData = await csvtojson();
      // Iterate over each CSV row and process it
      for (const row of csvData) {
        const { email, password } = row;
        // Check if an account with the same email exists
        const existingAccount = await db.Account.findOne({ where: { email } });
        if (!existingAccount) {
          // If the account doesn't exist, hash the password and create a new account
          const hashedPassword = await bcrypt.hash(password, 10); // Hash the password
          await db.Account.create({
            email,
            password: hashedPassword, // Store the hashed password
            first_name: row.first_name,
            last_name: row.last_name,
          });
        }
        // If the account already exists, do nothing
      }
    } catch (error) {
      console.log(error);
    }
};
  
addCSVtoDB();

module.exports = addCSVtoDB;