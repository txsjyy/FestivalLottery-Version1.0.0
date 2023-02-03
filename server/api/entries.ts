const { API_URL, API_TOKEN } = process.env

export default defineEventHandler(async () => {
  const data = await fetch(API_URL as string, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ token: API_TOKEN })
  })

  return await data.json()
})