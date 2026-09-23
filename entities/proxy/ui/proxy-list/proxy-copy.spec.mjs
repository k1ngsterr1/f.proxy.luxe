import assert from "node:assert/strict";
import test from "node:test";

import { getProxyCopyLines } from "./proxy-copy.ts";

const baseProxy = {
  login: "user",
  password: "pass",
  port_http: 11364,
  port_socks: 11365,
  type: "ipv6",
};

test("does not duplicate a provider port already included in the IPv6 product endpoint", () => {
  assert.deepEqual(
    getProxyCopyLines(
      {
        ...baseProxy,
        ip: "203.0.113.10:11364",
      },
      "http"
    ),
    ["203.0.113.10:11364:user:pass"]
  );
});

test("brackets a raw IPv6 endpoint before appending the selected port", () => {
  assert.deepEqual(
    getProxyCopyLines(
      {
        ...baseProxy,
        ip: "2001:db8::10",
      },
      "socks5"
    ),
    ["[2001:db8::10]:11365:user:pass"]
  );
});

test("reuses the host from an already bracketed IPv6 endpoint", () => {
  assert.deepEqual(
    getProxyCopyLines(
      {
        ...baseProxy,
        ip: "[2001:db8::10]:9000",
      },
      "http"
    ),
    ["[2001:db8::10]:11364:user:pass"]
  );
});

test("keeps the existing IPv4 copy format", () => {
  assert.deepEqual(
    getProxyCopyLines(
      {
        ...baseProxy,
        ip: "203.0.113.10",
        type: "ipv4",
      },
      "http"
    ),
    ["203.0.113.10:11364:user:pass"]
  );
});

test("keeps resident port expansion intact", () => {
  assert.deepEqual(
    getProxyCopyLines(
      {
        ...baseProxy,
        export: { ports: 2 },
        ip: "203.0.113.10",
        type: "resident",
      },
      "http"
    ),
    [
      "203.0.113.10:10000:user:pass",
      "203.0.113.10:10001:user:pass",
    ]
  );
});
