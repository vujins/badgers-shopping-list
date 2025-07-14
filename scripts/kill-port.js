#!/usr/bin/env node

import { exec } from 'child_process';
import os from 'os';

const ports = [3002, 3000, 9229];

const isWindows = os.platform() === 'win32';

const findAndKillProcesses = async port => {
  return new Promise(resolve => {
    if (isWindows) {
      // Windows: Use netstat to find processes
      exec(`netstat -ano | findstr :${port}`, (error, stdout) => {
        if (error || !stdout) {
          console.log(`No process found on port ${port}`);
          resolve();
          return;
        }

        const lines = stdout.trim().split('\n');
        const pids = new Set();

        lines.forEach(line => {
          const parts = line.trim().split(/\s+/);
          const pid = parts[parts.length - 1];
          if (pid && pid !== '0' && !isNaN(pid)) {
            pids.add(pid);
          }
        });

        if (pids.size === 0) {
          console.log(`No valid processes found on port ${port}`);
          resolve();
          return;
        }

        let killedCount = 0;
        const pidArray = Array.from(pids);

        pidArray.forEach((pid, index) => {
          exec(`taskkill /pid ${pid} /f`, killError => {
            if (!killError) {
              killedCount++;
            }

            if (index === pidArray.length - 1) {
              if (killedCount > 0) {
                console.log(`Killed ${killedCount} process(es) on port ${port}`);
              } else {
                console.log(`No processes could be killed on port ${port}`);
              }
              resolve();
            }
          });
        });
      });
    } else {
      // Unix-like systems: Use lsof
      exec(`lsof -ti:${port}`, (error, stdout) => {
        if (error || !stdout) {
          console.log(`No process found on port ${port}`);
          resolve();
          return;
        }

        const pids = stdout
          .trim()
          .split('\n')
          .filter(pid => pid && pid !== '0');

        if (pids.length === 0) {
          console.log(`No valid processes found on port ${port}`);
          resolve();
          return;
        }

        let killedCount = 0;
        pids.forEach((pid, index) => {
          exec(`kill -9 ${pid}`, killError => {
            if (!killError) {
              killedCount++;
            }

            if (index === pids.length - 1) {
              if (killedCount > 0) {
                console.log(`Killed ${killedCount} process(es) on port ${port}`);
              } else {
                console.log(`No processes could be killed on port ${port}`);
              }
              resolve();
            }
          });
        });
      });
    }
  });
};

const main = async () => {
  console.log('Killing processes on ports:', ports.join(', '));

  for (const port of ports) {
    await findAndKillProcesses(port);
  }

  console.log('Done!');
};

main().catch(console.error);
