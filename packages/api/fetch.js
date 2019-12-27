const fetch = require("node-fetch")

/**
 * Goal: fetch slice definitions + metadata
 * Used by: Website, writing room, CLI
 * 
 * 2 ways to implement this:
 *
 * 1/ publisher implements a pre-publish script that bundles the API.
 *    It then becomes accessible at ${unpkgUrl}/slices.json
 * 
 * 2/ when the slice API receives a webhook, it fetches data from sm.config.json
 *    then downloads files from Github, parses them and updates its database/cache
 * 
 */


// Implementing solution 1

const DEFAULT_DEF_FILE = 'slices.json'

async function fetchJson(url) {
  const response = await fetch(url);
  if (response.status !== 200) {
    throw new Error(`Unable to fetch "${url}"`);
  }
  return await response.json()
}

async function fetchSliceDef(params) {
  try {
    const config = await fetchJson(params.config);
    const slicesUrl = `${params.baseURL}/${config.pathToslices || DEFAULT_DEF_FILE}`;
    const jsonDef = fetchJson(slicesUrl);
    console.log(config, slicesUrl, jsonDef);
    return jsonDef;
  } catch(e) {
    throw e
  }
}

module.exports = {
  fetchSliceDef
};