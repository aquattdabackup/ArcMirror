import assert from 'node:assert/strict';
const base = new URL(process.argv[2] ?? 'http://127.0.0.1:3000');
const request = async (path) => {
  const response = await fetch(new URL(path, base), {signal: AbortSignal.timeout(55000)});
  return {response, data: await response.json()};
};
const health = await request('/api/health');
assert.equal(health.response.status, 200);
assert.equal(health.data.chainId, 5042);
assert.equal(health.response.headers.get('x-content-type-options'), 'nosniff');
assert.match(health.response.headers.get('content-security-policy') ?? '', /frame-ancestors 'none'/);
const examples = await request('/api/examples');
assert.equal(examples.response.status, 200);
assert.equal(examples.data.length, 3);
for (const example of examples.data) {
  const value = await request('/api/analyze/' + example.hash);
  assert.equal(value.response.status, 200);
  assert.equal(value.data.ok, true);
  assert.equal(value.data.source, 'snapshot');
  assert.equal(value.data.report.status, 'confirmed_success');
  assert.match(value.data.report.digest, /^0x[0-9a-f]{64}$/);
}
const pages = [
  ['/tools', 'From numbers'], ['/tools/reconcile', 'Expected. Observed.'],
  ['/tools/inspect', 'Trust starts'], ['/tools/dust', 'Every last digit'],
];
for (const [path, content] of pages) {
  const response = await fetch(new URL(path, base), {signal: AbortSignal.timeout(30000)});
  assert.equal(response.status, 200, path);
  assert.ok((await response.text()).includes(content), path + ' expected heading');
}
const invalid = await request('/api/analyze/not-a-hash');
assert.equal(invalid.response.status, 400);
assert.equal(invalid.data.report.status, 'unsupported_format');
const unknown = await request('/api/analyze/0x' + '0'.repeat(64));
assert.equal(unknown.response.status, 404);
assert.equal(unknown.data.report.status, 'not_found');
console.log(JSON.stringify({base:base.origin,health:'pass',snapshots:3,invalidHash:'pass',unknownHash:'pass',securityHeaders:'pass',toolPages:pages.length},null,2));
