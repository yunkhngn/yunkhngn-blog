// Clear cache script
function clearAllCaches() {
  if ('caches' in window) {
    caches.keys().then(function(names) {
      for (let name of names) {
        caches.delete(name);
      }
    });
  }
  
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.getRegistrations().then(function(registrations) {
      for(let registration of registrations) {
        registration.unregister();
      }
    });
  }
  
  // Clear localStorage and sessionStorage
  localStorage.clear();
  sessionStorage.clear();
  
  // Clear browser cache
  if ('indexedDB' in window) {
    indexedDB.databases().then(function(databases) {
      databases.forEach(function(database) {
        indexedDB.deleteDatabase(database.name);
      });
    });
  }
  
  console.log('All caches cleared!');
  alert('Cache cleared! Please refresh the page.');
}

// Auto-clear cache on version mismatch
function checkAndClearCache() {
  const currentVersion = 'v2.0.0';
  const storedVersion = localStorage.getItem('app-version');
  
  if (storedVersion !== currentVersion) {
    clearAllCaches();
    localStorage.setItem('app-version', currentVersion);
  }
}

// Run on page load
if (typeof window !== 'undefined') {
  checkAndClearCache();
  
  // Expose function globally
  window.clearAllCaches = clearAllCaches;
}
