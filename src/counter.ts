import { buildResponse } from "./response";

export class Counter implements DurableObject {
  // Store this.state for later access
  constructor(private readonly state: DurableObjectState) {}

  async fetch(request: Request) {
    // Get the current count, defaulting to 0
    let value = (await this.state.storage.get<number>("count")) ?? 0;

    const { pathname } = new URL(request.url);
    let emoji = "➡️";
    if (pathname === "/increment") {
      // Increment, then store the new value
      this.state.storage.put("count", ++value);
      emoji = "⬆️";
    } else if (pathname === "/decrement") {
      // Decrement, then store the new value
      this.state.storage.put("count", --value);
      emoji = "⬇️";
    } else if (pathname !== "/") {
      // If no route matched, return 404 response
      return buildResponse("😢 Not Found", 404);
    }

    // Return response containing new value, potentially after incrementing/decrementing
    return buildResponse(`${emoji} ${value}`);
  }
}
