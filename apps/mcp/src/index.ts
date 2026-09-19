import { createStorybookMcpHandler } from "@storybook/mcp";

const mcpHandler = await createStorybookMcpHandler();

async function loadManifest(origin: string, path: string): Promise<string> {
  if (!path.startsWith("./manifests/") || path.includes("..")) {
    throw new Error(`Unsupported manifest path: ${path}`);
  }

  const manifestUrl = new URL(path.slice(2), `${origin}/`);
  const response = await fetch(manifestUrl, {
    headers: {
      Accept: "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`Manifest request failed with status ${response.status}`);
  }

  const contentType = response.headers.get("content-type");
  if (!contentType?.includes("application/json")) {
    throw new Error(`Manifest response was not JSON: ${path}`);
  }

  return response.text();
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    if (url.pathname !== "/mcp" && url.pathname !== "/mcp/") {
      return new Response("Not found", { status: 404 });
    }

    try {
      return await mcpHandler(request, {
        manifestProvider: (_request, path) =>
          loadManifest(env.STORYBOOK_ORIGIN, path),
      });
    } catch (error) {
      console.error(
        JSON.stringify({
          message: "Storybook MCP request failed",
          error: error instanceof Error ? error.message : String(error),
        }),
      );

      return Response.json({ error: "MCP request failed" }, { status: 500 });
    }
  },
} satisfies ExportedHandler<Env>;
