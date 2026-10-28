#!/usr/bin/env bun
import { mkdirSync, readFileSync, rmSync } from 'node:fs';
import { join } from 'node:path';
import { $ } from 'bun';

type PackageResult = {
  name: string;
  ok: boolean;
  files: number;
  tests: number;
  passed: number;
  failed: number;
  skipped: number;
  durationMs: number;
};

type VitestJson = {
  numTotalTestSuites?: number;
  numPassedTestSuites?: number;
  numFailedTestSuites?: number;
  numTotalTests?: number;
  numPassedTests?: number;
  numFailedTests?: number;
  numPendingTests?: number;
  numTodoTests?: number;
  success?: boolean;
  startTime?: number;
  testResults?: Array<{
    assertionResults?: unknown[];
    status?: string;
  }>;
};

const packages = [
  { name: '@torba/shared', cwd: 'packages/shared' },
  { name: '@torba/api', cwd: 'apps/api' },
  { name: '@torba/web', cwd: 'apps/web' },
] as const;

const outDir = join(process.cwd(), '.torba-test-results');

function parseJson(path: string): VitestJson | null {
  try {
    return JSON.parse(readFileSync(path, 'utf8')) as VitestJson;
  } catch {
    return null;
  }
}

function statsFromJson(
  json: VitestJson | null,
  ok: boolean,
): Omit<PackageResult, 'name' | 'durationMs'> {
  if (!json) {
    return { ok, files: 0, tests: 0, passed: 0, failed: ok ? 0 : 1, skipped: 0 };
  }

  const tests = json.numTotalTests ?? 0;
  const passed = json.numPassedTests ?? 0;
  const failed = json.numFailedTests ?? 0;
  const skipped = (json.numPendingTests ?? 0) + (json.numTodoTests ?? 0);
  const files = json.testResults?.length ?? json.numTotalTestSuites ?? 0;

  return {
    ok: json.success ?? ok,
    files,
    tests,
    passed,
    failed,
    skipped,
  };
}

function pad(value: string | number, width: number) {
  return String(value).padStart(width, ' ');
}

async function runPackage(pkg: (typeof packages)[number]): Promise<PackageResult> {
  const outFile = join(outDir, `${pkg.name.replace(/[@/]/g, '_')}.json`);
  const started = Date.now();

  console.log(`\n› ${pkg.name}`);

  const result = await $`bunx vitest run --reporter=default --reporter=json --outputFile=${outFile}`
    .cwd(pkg.cwd)
    .nothrow();

  const durationMs = Date.now() - started;
  const json = parseJson(outFile);
  const stats = statsFromJson(json, result.exitCode === 0);

  return {
    name: pkg.name,
    durationMs,
    ...stats,
    ok: result.exitCode === 0 && stats.failed === 0,
  };
}

function printSummary(results: PackageResult[]) {
  const total = results.reduce(
    (acc, row) => ({
      files: acc.files + row.files,
      tests: acc.tests + row.tests,
      passed: acc.passed + row.passed,
      failed: acc.failed + row.failed,
      skipped: acc.skipped + row.skipped,
      durationMs: acc.durationMs + row.durationMs,
    }),
    { files: 0, tests: 0, passed: 0, failed: 0, skipped: 0, durationMs: 0 },
  );

  const allOk = results.every((row) => row.ok) && total.failed === 0;

  console.log('\n════════════════════════════════════════════════════════════');
  console.log(' Test summary');
  console.log('════════════════════════════════════════════════════════════');
  console.log(
    `${'Package'.padEnd(18)} ${pad('Files', 5)} ${pad('Tests', 5)} ${pad('Pass', 5)} ${pad('Fail', 5)} ${pad('Skip', 5)}  Status`,
  );
  console.log('────────────────────────────────────────────────────────────');

  for (const row of results) {
    console.log(
      `${row.name.padEnd(18)} ${pad(row.files, 5)} ${pad(row.tests, 5)} ${pad(row.passed, 5)} ${pad(row.failed, 5)} ${pad(row.skipped, 5)}  ${row.ok ? 'PASS' : 'FAIL'}`,
    );
  }

  console.log('────────────────────────────────────────────────────────────');
  console.log(
    `${'TOTAL'.padEnd(18)} ${pad(total.files, 5)} ${pad(total.tests, 5)} ${pad(total.passed, 5)} ${pad(total.failed, 5)} ${pad(total.skipped, 5)}  ${allOk ? 'PASS' : 'FAIL'}`,
  );
  console.log(`Duration: ${(total.durationMs / 1000).toFixed(2)}s`);
  console.log('════════════════════════════════════════════════════════════\n');

  if (!allOk) {
    process.exitCode = 1;
  }
}

mkdirSync(outDir, { recursive: true });

const results: PackageResult[] = [];
for (const pkg of packages) {
  results.push(await runPackage(pkg));
}

printSummary(results);

try {
  rmSync(outDir, { recursive: true, force: true });
} catch {
  // ignore cleanup errors
}
