# Performance Optimizations

## 🚀 Các tối ưu hóa đã thực hiện

### 1. **Static Generation với ISR**
- ✅ Chuyển từ `getServerSideProps` sang `getStaticProps`
- ✅ Thêm `getStaticPaths` cho dynamic routes
- ✅ Implement Incremental Static Regeneration (ISR)
- ✅ Cache GitHub API và Contentful data

### 2. **Bundle Optimization**
- ✅ Bật Bundle Analyzer để phân tích
- ✅ Code splitting với webpack
- ✅ Optimize package imports cho framer-motion và react-markdown
- ✅ Compression với gzip

### 3. **Image Optimization**
- ✅ Cấu hình Next.js Image component
- ✅ Thêm raw.githubusercontent.com vào remotePatterns
- ✅ Support AVIF và WebP formats
- ✅ Responsive images với deviceSizes

### 4. **Webpack Optimizations**
- ✅ Split chunks cho vendor và common code
- ✅ Compression plugin cho production
- ✅ Tree shaking và minification

### 5. **Security Headers**
- ✅ X-Content-Type-Options
- ✅ X-Frame-Options
- ✅ X-XSS-Protection
- ✅ Cache headers cho static assets

## 📊 Scripts mới

```bash
# Analyze bundle size
npm run analyze

# Production build
npm run build:prod

# Development với Turbopack
npm run dev
```

## 🔧 Cấu hình Environment Variables

Tạo file `.env` với các biến sau:

```env
# Contentful
CONTENTFUL_SPACE_ID=your_space_id
CONTENTFUL_ENVIRONMENT=master
CONTENTFUL_ACCESS_TOKEN=your_access_token

# GitHub
GITHUB_TOKEN=your_github_token

# EmailJS
SERVICE_ID=your_service_id
TEMPLATE_ID=your_template_id
PUBLIC_KEY=your_public_key

# Analytics
TRACKING_ID=your_tracking_id
```

## 📈 Performance Metrics

### Before Optimization:
- SSR cho tất cả pages
- No caching
- Large bundle sizes
- Slow image loading

### After Optimization:
- Static generation với ISR
- 1-hour cache cho GitHub API
- 30-minute cache cho Contentful
- Optimized images với WebP/AVIF
- Code splitting và compression

## 🎯 Next Steps

1. **Monitor Performance**
   - Sử dụng Bundle Analyzer: `npm run analyze`
   - Check Core Web Vitals
   - Monitor Lighthouse scores

2. **Further Optimizations**
   - Implement service worker cho offline support
   - Add preloading cho critical resources
   - Optimize third-party scripts
   - Implement lazy loading cho components

3. **Caching Strategy**
   - CDN configuration
   - Browser caching headers
   - Service worker caching

## 🛠 Troubleshooting

### Common Issues:
1. **Build manifest errors**: Clear `.next` folder
2. **GitHub API rate limiting**: Check token validity
3. **Image optimization errors**: Verify remotePatterns config

### Commands:
```bash
# Clear build cache
rm -rf .next

# Reinstall dependencies
npm install

# Check bundle size
npm run analyze
```
