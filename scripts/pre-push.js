#!/usr/bin/env node

import { execSync, spawn } from 'child_process';
import readline from 'readline';

// Colors for console output
const colors = {
  yellow: '\x1b[33m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  cyan: '\x1b[36m',
  white: '\x1b[37m',
  reset: '\x1b[0m',
};

function log(message, color = colors.white) {
  console.log(`${color}${message}${colors.reset}`);
}

function runCommand(command, description) {
  log(`🔨 ${description}...`, colors.yellow);
  try {
    execSync(command, { stdio: 'inherit' });
    log(`✅ ${description} passed`, colors.green);
    return true;
  } catch (error) {
    log(`❌ ${description} failed! Push to ${branch_to_check} rejected.`, colors.red);
    return false;
  }
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function verifyServerStartup() {
  log('🖥️ Verifying server startup...', colors.yellow);

  return new Promise(resolve => {
    const serverProcess = spawn('node', ['server.js'], {
      stdio: 'pipe',
      detached: false,
    });

    const timeout = 10; // seconds
    const startTime = Date.now();
    let serverStarted = false;

    // Listen for output from the server
    serverProcess.stdout.on('data', data => {
      const output = data.toString();
      if (output.includes('!!! Storage path')) {
        serverStarted = true;
        log('✅ Server started successfully (detected startup message)', colors.green);

        // Optional: Test if server is responding on port 3002
        setTimeout(async () => {
          try {
            const response = await fetch('http://localhost:3002');
            if (response.ok) {
              log('✅ Server is responding to requests', colors.green);
            } else {
              log('⚠️ Server started but not responding as expected', colors.yellow);
            }
          } catch (error) {
            log(`⚠️ Server started but health check failed: ${error.message}`, colors.yellow);
          }

          // Clean up - kill the server process
          serverProcess.kill();
          resolve(true);
        }, 1000);
      }
    });

    serverProcess.stderr.on('data', data => {
      // Server might output startup info to stderr
      const output = data.toString();
      if (output.includes('!!! Storage path')) {
        serverStarted = true;
        log('✅ Server started successfully (detected startup message)', colors.green);

        // Clean up - kill the server process
        setTimeout(() => {
          serverProcess.kill();
          resolve(true);
        }, 1000);
      }
    });

    serverProcess.on('close', code => {
      if (!serverStarted) {
        log(`❌ Server process exited unexpectedly! Push to ${branch_to_check} rejected.`, colors.red);
        resolve(false);
      }
    });

    // Timeout check
    const timeoutId = setTimeout(() => {
      if (!serverStarted) {
        log(
          `❌ Server startup timed out (didn't see '!!! Storage path' within ${timeout}s)! Push to ${branch_to_check} rejected.`,
          colors.red
        );
        serverProcess.kill();
        resolve(false);
      }
    }, timeout * 1000);

    // Clean up timeout if server starts
    if (serverStarted) {
      clearTimeout(timeoutId);
    }
  });
}

const branch_to_check = 'deploy_msit';

async function processInput() {
  log(`🔍 Pre-push hook: Checking push to ${branch_to_check} branch...`, colors.yellow);

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  let shouldRunChecks = false;

  rl.on('line', line => {
    const parts = line.trim().split(/\s+/);
    if (parts.length >= 4) {
      const [localRef, localSha, remoteRef, remoteSha] = parts;

      // Extract branch name from remote ref
      const branchName = remoteRef.replace('refs/heads/', '');

      // Only run checks when pushing to deploy_msit branch
      if (branchName === branch_to_check) {
        shouldRunChecks = true;
      } else {
        log(`📝 Pushing to ${branchName} branch - skipping build/test verification`, colors.yellow);
      }
    }
  });

  rl.on('close', async () => {
    if (shouldRunChecks) {
      log(`📋 Pushing to ${branch_to_check} branch - running build and test verification...`, colors.yellow);

      // Run build
      if (!runCommand('npm run build', 'Running build')) {
        process.exit(1);
      }

      // Run tests
      if (!runCommand('npm test', 'Running tests')) {
        process.exit(1);
      }

      //Verify server startup
      const serverStarted = await verifyServerStartup();
      if (!serverStarted) {
        process.exit(1);
      }

      log(`🚀 All checks passed! Proceeding with push to ${branch_to_check}...`, colors.green);
    }

    process.exit(0);
  });
}

// Start processing
processInput();
