# Khoa Nguyễn personal website

![image](https://www.khoanguyen.codes/favicon/wall.png)

Đây là mã nguồn cho trang web portfolio cá nhân của Khoa Nguyễn, được xây dựng để hiển thị thông tin về các dự án, blog, và hoạt động cá nhân. Website này được phát triển sử dụng Nextjs nhằm tối ưu hóa hiệu suất và SEO.

## Mục lục

- [Giới thiệu](#giới-thiệu)
- [Cài đặt](#cài-đặt)
- [Cách sử dụng](#cách-sử-dụng)
- [Thư mục dự án](#thư-mục-dự-án)
- [Các tính năng](#các-tính-năng)
- [Cải thiện và Sửa lỗi](#cải-thiện-và-sửa-lỗi)
- [Đóng góp](#đóng-góp)

## Giới thiệu

Website portfolio cá nhân của Khoa Nguyễn được phát triển nhằm mục đích giới thiệu bản thân, công việc và các dự án đã thực hiện. Trang web này bao gồm một blog, danh sách các dự án, thông tin liên hệ và các bài viết liên quan đến công nghệ và thiết kế.

## Cài đặt

1. **Yêu cầu**:
   - Node.js >= 14.x
   - NPM hoặc Yarn

2. **Clone dự án**:
```bash
git clone https://github.com/yunkhngn/next-project.git
cd next-project
```
3. **Cài đặt các package**
```bash
npm install
# hoặc sử dụng yarn
yarn install
```
4. **Chạy web**
```bash
npm run dev
# hoặc sử dụng yarn
yarn dev
```
5. **Build ứng dụng**
```bash
npm run build
# hoặc sử dụng yarn
yarn build
```
## Cách sử dụng

- Chạy development: Truy cập http://localhost:3000.

- Deloy: Sử dụng các nền tảng như Vercel, Netlify, hoặc các dịch vụ cloud khác để triển khai website.

## Thư mục dự án
> Dùng cho mục đích bảo trì.

- `/components/Hooks`: Chứa các tags để dùng

- `/components/Post`: Chứa các element con trong trang

- `/lib`: Chứa content của dự án

- `/pages`: Chứa các page route

- `/public`: Chứa các file static và ảnh

- `/styles`: Chứa các file css

## Các tính năng
> NOTE: Các feature đang và sẽ được xây dựng.
- [X] Tạo trang ảnh
- [X] Làm modal khi click vào ảnh trong photo
- [ ] Làm Navigation.
- [ ] Skeleton cho ảnh
- [ ] Tạo genre và làm search
- [ ] Tạo preview page cho contentful


## Cải thiện và sửa lỗi
> NOTE: Updating thêm
- [X] Cải thiện SEO và loading trang web.
- [X] Fix getStaticProps ở các trang
- [X] Fix darkmode có lưu vào
- [X] Move favicon ra ngoài
- [X] Redesign lại trang ảnh
- [X] Cải thiện thêm trang github
- [X] Tối ưu load ảnh
- [X] Sửa lại trang about
- [X] Bỏ www ở domain 
- [X] Fix google console k hiển thị favicon
- [ ] Làm tooltip cho các icon
- [ ] Chuyển icon sang react-icon
- [ ] Fix meta tag image nhiều lúc k hiển thị ở photo
- [ ] Sửa tối ưu lại source
- [ ] Cải thiện hiệu suất

## Đóng góp
@yunkhngn

