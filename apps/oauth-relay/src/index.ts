const APP_CALLBACK = "orangecloud://oauth/callback";

function redirectToApp(url: URL): Response {
  const target = new URL(APP_CALLBACK);
  for (const key of ["code", "state", "error", "error_description", "error_uri"]) {
    const value = url.searchParams.get(key);
    if (value) target.searchParams.set(key, value);
  }
  return Response.redirect(target.toString(), 302);
}

export default {
  async fetch(request: Request): Promise<Response> {
    const url = new URL(request.url);
    if (url.pathname !== "/oauth/callback") return new Response("Orange Cloud OAuth relay", { status: 404 });
    if (request.method !== "GET") return new Response("Method Not Allowed", { status: 405, headers: { allow: "GET" } });
    return redirectToApp(url);
  },
} satisfies ExportedHandler;
