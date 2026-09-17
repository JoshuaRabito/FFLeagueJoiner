const fs = require('fs');
const readline = require('readline');
const { chromium } = require('playwright');

function waitForEnter(message) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  return new Promise(resolve => {
    rl.question(message, () => {
      rl.close();
      resolve();
    });
  });
}

async function getCookies(accountNumber) {
  const browser = await chromium.launch({
    headless: false
  });

  const context = await browser.newContext();
  const page = await context.newPage();

  console.log(`\n=== ESPN Account ${accountNumber} ===`);
  console.log('Login to ESPN in the browser window.');

  await page.goto('https://www.espn.com/login');

  await waitForEnter(
      `Press ENTER after ESPN Account ${accountNumber} is fully logged in... `
  );

  const cookies = await context.cookies();

  const swid =
      cookies.find(cookie => cookie.name === 'SWID')?.value || '';

  const espnS2 =
      cookies.find(cookie => cookie.name === 'espn_s2')?.value || '';

  console.log(`SWID ${accountNumber}:`, swid);
  console.log(`espn_s2 ${accountNumber}:`, espnS2.substring(0, 25) + '...');

  await browser.close();

  return {
    swid,
    espnS2
  };
}

(async () => {
  try {
    const account1 = await getCookies(1);
    const account2 = await getCookies(2);

    const envContents = `ESPN_SWID_1=${account1.swid}
ESPN_S2_1=${account1.espnS2}

ESPN_SWID_2=${account2.swid}
ESPN_S2_2=${account2.espnS2}
`;

    fs.writeFileSync('.env', envContents);

    console.log('\n✅ .env file created successfully');
    console.log('\n' + envContents);
  } catch (error) {
    console.error(error);
  }
})();