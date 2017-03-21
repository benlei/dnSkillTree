function storageAvailable() {
  try {
    const storage = window.localStorage;
    const x = '__storage_test__';

    storage.setItem(x, x);
    storage.removeItem(x);

    return true;
  } catch (ex) {
    return false;
  }
}

function getPrefix() {
  const appVersion = process.env.VERSION;
  const buildVersion = process.env.BUILD_VERSION;

  // "The following snippet accesses the current domain's local Storage...."
  // this mean that no prefix is necessary, just app version + build version prefix.
  return `${appVersion}_${buildVersion}`;
}

export function put(key, value) {
  if (process.env.NODE_ENV !== 'production' || !storageAvailable()) {
    return;
  }

  // if (!storageAvailable()) {
  //   return;
  // }

  const prefix = getPrefix();

  window.localStorage.setItem(`${prefix}_${key}`, JSON.stringify(value));
}

export function get(key) {
  if (process.env.NODE_ENV !== 'production' || !storageAvailable()) {
    return null;
  }

  // if (!storageAvailable()) {
  //   return null;
  // }

  const prefix = getPrefix();

  return JSON.parse(window.localStorage.getItem(`${prefix}_${key}`));
}

export function contains(key) {
  const val = get(key);
  return val !== null;
}

export default {
  put,
  get,
  contains,
};
