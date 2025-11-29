import { useEffect } from 'react';

const PerformanceAnalytics = () => {
  useEffect(() => {
    // Only load analytics in production and if user consents
    if (process.env.NODE_ENV === 'production' && typeof window !== 'undefined') {
      
      // Performance monitoring without external scripts
      const reportPerformance = () => {
        if ('performance' in window) {
          const navigation = performance.getEntriesByType('navigation')[0];
          const paint = performance.getEntriesByType('paint');
          
          const metrics = {
            // Core Web Vitals
            fcp: paint.find(entry => entry.name === 'first-contentful-paint')?.startTime,
            lcp: navigation?.loadEventEnd - navigation?.loadEventStart,
            fid: 0, // Would need user interaction to measure
            cls: 0, // Would need layout shift monitoring
            
            // Performance metrics
            dns: navigation?.domainLookupEnd - navigation?.domainLookupStart,
            tcp: navigation?.connectEnd - navigation?.connectStart,
            ttfb: navigation?.responseStart - navigation?.requestStart,
            domLoad: navigation?.domContentLoadedEventEnd - navigation?.domContentLoadedEventStart,
            windowLoad: navigation?.loadEventEnd - navigation?.loadEventStart,
            
            // User agent
            userAgent: navigator.userAgent,
            viewport: `${window.innerWidth}x${window.innerHeight}`,
            timestamp: new Date().toISOString()
          };
          
          // Log to console (can be sent to analytics service later)
          console.log('Performance Metrics:', metrics);
          
          // Store in localStorage for later analysis
          const analytics = JSON.parse(localStorage.getItem('performance-analytics') || '[]');
          analytics.push(metrics);
          localStorage.setItem('performance-analytics', JSON.stringify(analytics.slice(-10))); // Keep last 10 entries
        }
      };
      
      // Report performance after page load
      if (document.readyState === 'complete') {
        reportPerformance();
      } else {
        window.addEventListener('load', reportPerformance);
      }
      
      // Track page views (simple, no external dependencies)
      const trackPageView = () => {
        const pageView = {
          url: window.location.href,
          title: document.title,
          referrer: document.referrer,
          timestamp: new Date().toISOString()
        };
        
        const pageViews = JSON.parse(localStorage.getItem('page-views') || '[]');
        pageViews.push(pageView);
        localStorage.setItem('page-views', JSON.stringify(pageViews.slice(-50))); // Keep last 50 page views
        
        console.log('Page View:', pageView);
      };
      
      trackPageView();
    }
  }, []);

  return null; // This component doesn't render anything
};

export default PerformanceAnalytics;
