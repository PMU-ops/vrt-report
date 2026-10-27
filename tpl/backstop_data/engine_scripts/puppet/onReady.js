module.exports = async (page, scenario, vp, isReference) => {

  // Authenticate
  // Configuration
  var authenticatedPaths = [
    '/wp-admin/index.php'
  ]
  
  // Credentials come from the environment (never commit them).
  // Locally, put TPL_USER / TPL_PASS in the repo-root .env (gitignored, shared
  // by all sites). Run from the site folder; ./.env is also honoured. Existing
  // variables are never overridden.
  // In GitHub Actions, map them from the TPL_USER / TPL_PASS repo secrets.
  for (const envFile of ['.env', '../.env']) {
    try { process.loadEnvFile(envFile) } catch (e) {}
  }
  var pmuUserName = process.env.TPL_USER
  var pmuUserPass = process.env.TPL_PASS
  var siteLoginUrl = '/wp-login.php'
  // END of Configuration

  if (!pmuUserName || !pmuUserPass) {
    throw new Error('Missing TPL_USER / TPL_PASS environment variables.')
  }
  
    const testUrl = new URL(scenario.url)
  const referenceUrl = new URL(scenario.referenceUrl)
  console.log('Test ENV: ' + testUrl.origin)
  console.log('Reference ENV: ' + referenceUrl.origin)

  var testUrlLoginSuccess = 0
  var referenceUrlLoginSuccess = 0
  
  //authenticatedPaths.forEach(pmuAuth)
  for (let i = 0; i < authenticatedPaths.length; i++) {
    await pmuAuth(authenticatedPaths[i], i, authenticatedPaths)
  }

  async function pmuAuth(value, index, array){
    if (isReference) {
      if (value == referenceUrl.pathname) {
        console.log("Authenticating for: " + value + " path.")
        referenceUrlLoginSuccess = await pmuLogin(referenceUrl.origin + siteLoginUrl, pmuUserName, pmuUserPass)
        console.log("Reference URL login: " + referenceUrlLoginSuccess)
      }
    } else {
      if (value == testUrl.pathname) {
        console.log("Authenticating for: " + value + " path.")
        testUrlLoginSuccess = await pmuLogin(testUrl.origin + siteLoginUrl, pmuUserName, pmuUserPass)
        console.log("Test URL login: " + testUrlLoginSuccess)
      }
    }
  }

  async function pmuLogin(loginUrl, userName, userPass, fieldUserSel = '#user_login', fieldPassSel = '#user_pass', btSubmitSel = '#wp-submit'){
    console.log("Loading login page: " + loginUrl)
    await page.goto(loginUrl, {timeout: 60000, waitUntil: 'networkidle2'})
    console.log("Submitting username and password...")
    await page.type(fieldUserSel, userName)
    await page.type(fieldPassSel, userPass)
    const [response] = await Promise.all([
      page.click(btSubmitSel),
      page.waitForNavigation({timeout: 60000, waitUntil: 'networkidle2'}),
    ]);
    console.log("response: " + response)
    return true
  }
  
  
  await page.reload({ waitUntil: ['networkidle0', 'domcontentloaded'] });
};
