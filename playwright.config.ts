import { defineConfig, devices } from '@playwright/test';
const external = process.env.BASE_URL;
export default defineConfig({
  testDir:'tests/e2e', fullyParallel:true, retries:process.env.CI?1:0,
  reporter:[['list'],['html',{open:'never'}]],outputDir:'qa/browser-results',
  use:{baseURL:external||'http://127.0.0.1:3100',trace:'retain-on-failure'},
  projects:[{name:'desktop',use:{...devices['Desktop Chrome']}},{name:'mobile',use:{...devices['Pixel 7']}}],
  webServer:external?undefined:{command:'node node_modules/next/dist/bin/next start --hostname 127.0.0.1 --port 3100',url:'http://127.0.0.1:3100',reuseExistingServer:!process.env.CI,timeout:60000}
});
