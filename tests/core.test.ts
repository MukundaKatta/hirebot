import { describe, it, expect } from "vitest";
import { Hirebot } from "../src/core.js";
describe("Hirebot", () => {
  it("init", () => { expect(new Hirebot().getStats().ops).toBe(0); });
  it("op", async () => { const c = new Hirebot(); await c.process(); expect(c.getStats().ops).toBe(1); });
  it("reset", async () => { const c = new Hirebot(); await c.process(); c.reset(); expect(c.getStats().ops).toBe(0); });
});
