function getConfigValue(key: string): string {
  let value: string = "";
  if (process.env && process.env[`${key}`] !== undefined) {
    // get env var value
    value = process.env[`${key}`];
  } else {
    // get value from meta tag
    return getMetaValue(key);
  }
  return value;
}

/**
 * Get value from HTML meta tag
 */
function getMetaValue(key: string): string {
  let value: string = "";
  const node: any = document.querySelector(`meta[property=${key}]`);
  if (node !== null) {
    value = node.getAttribute("content");
  }
  return value;
}

export default { getConfigValue, getMetaValue };
