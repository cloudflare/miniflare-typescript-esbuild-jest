export function buildResponse(text: string, status = 200) {
  // Build a HTML response containing the text
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
        <title>Example</title>
        <style>
        body {
          font-family: sans-serif;
          text-align: center;
        }
        h1 {
          font-size: 7.5rem;
        }
        p {
          color: #555555;
          font-size: 2rem;
        }
        code:not(:last-child) {
          margin-right: 2rem;
        }
        </style>
        <link rel="icon" href="data:,">
    </head>
    <body>
        <h1>${text}</h1>
        <p><code>/:id/</code><code>/:id/increment</code><code>/:id/decrement</code></p>
    </body>
    </html>
  `;

  return new Response(html, {
    status,
    headers: {
      // Content-Type must include text/html for live reload to work
      "Content-Type": "text/html; charset=UTF-8",
    },
  });
}
