const fs = require('fs');
const csv = require('csv-parser');
const { PrismaClient } = require('@prisma/client');

// Initialize Prisma Client
const prisma = new PrismaClient();

// Function to parse CSV and insert rows
async function insertFromCSV(filePath, model) {
  try {
    const rows = [];

    // Read the CSV file
    fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', (data) => {
        // Convert string numbers to actual numbers (or null if empty)
        data.earlySecretoryPhase = data.earlySecretoryPhase
          ? parseInt(data.earlySecretoryPhase, 10)
          : null;
        data.midSecretoryPhase = data.midSecretoryPhase
          ? parseInt(data.midSecretoryPhase, 10)
          : null;
        data.lateSecretoryPhase = data.lateSecretoryPhase
          ? parseInt(data.lateSecretoryPhase, 10)
          : null;

        rows.push(data);
      })
      .on('end', async () => {
        console.log(`Read ${rows.length} rows from ${filePath}`);

        for (const row of rows) {
          try {
            // Insert the row into the database
            await prisma[model].create({
              data: row,
            });
            console.log(`Inserted row into ${model}: ${JSON.stringify(row)}`);
          } catch (err) {
            console.error(`Error inserting into ${model}:`, err);
          }
        }

        console.log(`Finished inserting data into ${model}`);
        await prisma.$disconnect();
      });
  } catch (error) {
    console.error('Error processing CSV:', error);
    await prisma.$disconnect();
  }
}

// Main function to handle multiple tables
(async () => {
  const fileMappings = [
    { path: 'All_Datasets - healthy.csv', model: 'Healthy' },
    { path: 'All_Datasets - RIF.csv', model: 'RIF' },
    { path: 'All_Datasets - proliferative.csv', model: 'Proliferative' },
  ];

  for (const { path, model } of fileMappings) {
    console.log(`Starting to process ${path}`);
    await insertFromCSV(path, model);
  }
})();
