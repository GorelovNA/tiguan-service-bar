import { test, before, after } from 'node:test';
import { SecRunner } from '@sectester/runner';
import { Severity, AttackParamLocation, HttpMethod } from '@sectester/scan';

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

test('GET /v3/b/61ba0d0c0ddbee6f8b1e65a1/latest', { signal: AbortSignal.timeout(timeout) }, async () => {
  await runner
    .createScan({
      tests: ['excessive_data_exposure', 'secret_tokens', 'csrf', 'http_method_fuzzing'],
      attackParamLocations: [AttackParamLocation.HEADER]
    })
    .threshold(Severity.CRITICAL)
    .timeout(timeout)
    .run({
      method: HttpMethod.GET,
      url: `${baseUrl}/v3/b/61ba0d0c0ddbee6f8b1e65a1/latest`,
      headers: {
        'X-MASTER-KEY': '$2b$10$fRtylPnSgXAXia/G3QOBNexui3G7qN1oWSvbzZmLRIbp8oTLhIRAy'
      }
    });
});
