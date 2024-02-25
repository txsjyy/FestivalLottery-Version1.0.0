import { defineEventHandler } from 'h3';
import { google } from 'googleapis';

// Assuming you have some way to parse the body, the actual implementation might vary
async function parseBody(request: any): Promise<any> {
  return new Promise((resolve, reject) => {
    let body = '';
    request.on('data', (chunk: string) => {
      body += chunk;
    });
    request.on('end', () => {
      try {
        resolve(JSON.parse(body));
      } catch (error) {
        reject(error);
      }
    });
  });
}

// Handler to read data
const readData = async () => {
  const auth = await google.auth.getClient({
    credentials: {
      client_id: process.env.GOOGLE_CLIENT_ID!,
      client_email: process.env.GOOGLE_CLIENT_EMAIL!,
      private_key: process.env.GOOGLE_PRIVATE_KEY!.replace(/\\n/g, '\n'),
    },
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });

  const sheets = google.sheets({ version: 'v4', auth });
  const range = 'I2:J500';
  try {
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.SHEET_ID!,
      range,
    });
    return { data: response.data.values };
  } catch (error) {
    console.error('The API returned an error: ', error);
    throw new Error('Failed to fetch data from Google Sheets');
  }
};

// Handler to write data
const writeData = async (request: any) => {
  const auth = await google.auth.getClient({
    credentials: {
      client_id: process.env.GOOGLE_CLIENT_ID!,
      client_email: process.env.GOOGLE_CLIENT_EMAIL!,
      private_key: process.env.GOOGLE_PRIVATE_KEY!.replace(/\\n/g, '\n'),
    },
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });

  const sheets = google.sheets({ version: 'v4', auth });
  const body = await parseBody(request); // This is where you parse the incoming request body

  const range = 'Sheet1'; // Adjust the range as needed
  try {
    await sheets.spreadsheets.values.update({
      spreadsheetId: process.env.SHEET_ID!,
      range,
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: body.values,
      },
    });
    return { success: true };
  } catch (error) {
    console.error('Failed to write to Google Sheets:', error);
    throw new Error('Failed to write data to Google Sheets');
  }
};

// Define the event handler to handle both read and write based on the request method
export default defineEventHandler(async (event) => {
  if (event.req.method === 'GET') {
    return await readData();
  } else if (event.req.method === 'POST') {
    return await writeData(event.req);
  }
});

