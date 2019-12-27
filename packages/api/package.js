
const SM_CONFIG_FILE = 'sm.config.json'
const UNPKG_URL = 'https://unpkg.com/'
const packagePathnameFormat = /^((?:@[^/@]+\/)?[^/@]+)(?:@([^/]+))?(\/.*)?$/

/**
 * 	Directly adapted from
 * 	https://github.com/mjackson/unpkg/blob/master/modules/utils/parsePackagePathname.js
 *
 * Parses an npm pathname (`--lib` argument of prismic-cli)
 * and checks it can build a valid unpkg url out of it
 *
 * */
function parsePackagePathname(pathname) {
  const match = packagePathnameFormat.exec(pathname);

  if (match == null) {
    return null;
  }

  const packageName = match[1];
  const packageVersion = match[2] || "latest";
  const filename = (match[3] || "").replace(/\/\/+/g, "/");

  return {
    packageName,
    packageVersion,
    packageSpec: `${packageName}@${packageVersion}`,
    filename: filename || "index.js"
  };
}

/** Test validity of a given package name */
function canParsePackagePathname(pathname) {
  const package = parsePackagePathname(pathname);
  if (!package) {
    return false;
  }
  return package;
}

/** 
 * createPackageURLs("@slice-machine/vue-essentials")
 * --> { config: "https://unpkg.com/@slice-machine/vue-essentials@latest/sm.config.json" }
 */

function createPackageURLs(pathname) {
  const package = parsePackagePathname(pathname);
  if (!package) {
    throw new Error(`Cant parse package name "${pathname}"`);
  }
  const baseURL = `${UNPKG_URL}${package.packageSpec}`;

  return {
    baseURL,
    config: `${baseURL}/${SM_CONFIG_FILE}`,
    packageInfo: package // additional package info
  };
}

module.exports = {
  parsePackagePathname,
  canParsePackagePathname,
  createPackageURLs
};
