import { defineEventHandler } from 'h3';

const { API_URL, API_TOKEN } = process.env;
const entries = defineEventHandler(async () => {
  const data = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ token: API_TOKEN })
  });
  return await data.json();
});

export { entries as default };
//# sourceMappingURL=entries.mjs.map
