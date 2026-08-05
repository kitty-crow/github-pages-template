import { expect, test } from "bun:test";
import { inject, redirect } from "../src/html.ts";

test("injects at explicit markers", () => {
  const html = "<head><!-- pages:head --></head><body><!-- pages:body --></body>";
  const result = inject(html, {
    head: ['<link rel="stylesheet" href="shared.css">'],
    body: ['<script src="runtime.js"></script>']
  });
  expect(result).toContain("shared.css");
  expect(result).toContain("runtime.js");
  expect(result).not.toContain("pages:head");
});

test("creates a redirect without hidden application content", () => {
  const html = redirect("/project/about/");
  expect(html).toContain("location.replace");
  expect(html).toContain("/project/about/");
});
