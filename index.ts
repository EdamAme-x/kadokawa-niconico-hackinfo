import { Hono } from "@hono/hono";
import { serveStatic } from "@hono/hono/deno";

const app = new Hono();
app.get("/favicon.ico", serveStatic({
    root: "./static",
}))

app.all("*", async (c) => {
    const html = await  Deno.readTextFileSync("./document/translated.html");

    return c.html(html, {
        status: 200,
        headers: {
            "x-writed-by": "https://twitter.com/amex2189",
        }
    });
});

Deno.serve({ port: 3000, handler: app.fetch });