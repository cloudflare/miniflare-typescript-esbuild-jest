import { Registry } from "promjs/registry";

const reg = new Registry();
const counter = reg.create('counter','test');
export async function handleRequest(request: Request, env: Bindings) {
  counter.inc();
  // Match route against pattern /:name/*action
  const url = new URL(request.url);
  const match = /\/(?<name>[^/]+)(?<action>.*)/.exec(url.pathname);
  if (!match?.groups) {
    // If we didn't specify a name, default to "test"
    return Response.redirect(`${url.origin}/test/increment`, 302);
  }

  // Forward the request to the named Durable Object...
  const { COUNTER } = env;
  const id = COUNTER.idFromName(match.groups.name);
  const stub = COUNTER.get(id);
  // ...removing the name prefix from URL
  url.pathname = match.groups.action;
  return stub.fetch(url.toString());
}

const worker: ExportedHandler<Bindings> = { fetch: handleRequest };

// Make sure we export the Counter Durable Object class
export { Counter } from "./counter";
export default worker;
