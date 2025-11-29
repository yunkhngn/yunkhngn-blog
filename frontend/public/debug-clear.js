// Debug script to completely clear all cache and storage
console.log('🧹 Starting complete cache clear...');

// Clear all caches
if ('caches' in window) {
  caches.keys().then(function(names) {
    console.log('📦 Clearing caches:', names);
    for (let name of names) {
      caches.delete(name);
    }
  });
}

// Unregister all service workers
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.getRegistrations().then(function(registrations) {
    console.log('🔧 Unregistering service workers:', registrations.length);
    for(let registration of registrations) {
      registration.unregister();
    }
  });
}

// Clear all storage
try {
  localStorage.clear();
  sessionStorage.clear();
  console.log('💾 Cleared localStorage and sessionStorage');
} catch (e) {
  console.log('❌ Could not clear storage:', e);
}

// Clear IndexedDB
if ('indexedDB' in window) {
  indexedDB.databases().then(function(databases) {
    console.log('🗄️ Clearing IndexedDB:', databases);
    databases.forEach(function(database) {
      indexedDB.deleteDatabase(database.name);
    });
  });
}

// Clear cookies for this domain
document.cookie.split(";").forEach(function(c) {
  document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
});

console.log('✅ Cache clear complete! Reload the page.');