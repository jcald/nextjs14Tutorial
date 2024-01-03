const { db } = require('@vercel/postgres');

const {
  invoices,
  customers,
  revenue,
  users,
} = require('../app/lib/placeholder-data.js');
const bcrypt = require('bcrypt');

async function invoicesList(client) {
  try {
    const likes = 100;
    const invoi = await client.sql`SELECT * FROM invoices order by date desc;`;
    // await sql`SELECT * FROM posts WHERE likes > ${likes} LIMIT 5;`;
    // Insert data into the "invoices" table
    console.log(`invoi:\n${JSON.stringify(invoi.rows, null, 2)}`);
    console.log(`invoi largo: ${invoi.rows.count}`);
    return {
      resp: invoi.rows[0],
    };
  } catch (error) {
    console.error('Error lists invoices:', error);
    throw error;
  }
}

async function main() {
  const client = await db.connect();
  await invoicesList(client);
  await client.end();
}

main().catch((err) => {
  console.error(
    'An error occurred while attempting to seed the database:',
    err,
  );
});
