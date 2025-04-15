import { test, before, after } from 'node:test';
import { Severity, AttackParamLocation, HttpMethod } from '@sectester/scan';
import { SecRunner } from '@sectester/runner';

let runner!: SecRunner;

before(async () => {
  runner = new SecRunner({
    hostname: process.env.BRIGHT_HOSTNAME!,
    projectId: process.env.BRIGHT_PROJECT_ID!
  });

  await runner.init();
});

after(() => runner.clear());

const timeout = 40 * 60 * 1000;
const baseUrl = process.env.BRIGHT_TARGET_URL!;

test('PUT /v3/b/61ba0d0c0ddbee6f8b1e65a1', { signal: AbortSignal.timeout(timeout) }, async () => {
  await runner
    .createScan({
      tests: ['excessive_data_exposure', 'bopla', 'csrf', 'http_method_fuzzing', 'secret_tokens'],
      attackParamLocations: [AttackParamLocation.BODY, AttackParamLocation.HEADER]
    })
    .threshold(Severity.CRITICAL)
    .timeout(timeout)
    .run({
      method: HttpMethod.PUT,
      url: `${baseUrl}/v3/b/61ba0d0c0ddbee6f8b1e65a1`,
      headers: {
        'X-MASTER-KEY': '$2b$10$fRtylPnSgXAXia/G3QOBNexui3G7qN1oWSvbzZmLRIbp8oTLhIRAy',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify([{ "id": 1, "type": "Km", "complitedJobs": [] }])
    });
});
