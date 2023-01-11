let storageData = null

export function initStorage() {
  return new Promise((resolve) => {
    chrome.storage.local.get(null, result => {
      storageData = result
      resolve()
    })
  })
}

export function getStorage(key, defaultValue = null) {
  checkStorage()
  return getDefaultValue(storageData[key], defaultValue)
}

export function setStorage(key, val) {
  checkStorage()
  storageData[key] = val
  chrome.storage.local.set({ [key]: val })
}

export function removeStorage(key) {
  checkStorage()
  delete storageData[key]
  chrome.storage.local.remove([key])
}

export function clearStorage() {
  checkStorage()
  storageData = {}
  chrome.storage.local.clear()
}

function checkStorage() {
  if (!storageData) {
    throw new Error('Storage wasn\'t initialized with \'init()\'')
  }
}

function getDefaultValue(value, defaultValue) {
  if (value == null) {
    return defaultValue
  }
  return value
}
