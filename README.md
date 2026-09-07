# 🚗 SmartPark - Hệ Thống Quản Lý Bãi Đỗ Xe Thông Minh

Hệ thống quản lý bãi đỗ xe thông minh tích hợp AI nhận diện biển số xe qua Camera, quản lý vị trí ô đỗ, điều khiển barie tự động, tính tiền theo thời gian thực và cung cấp Web Dashboard quản trị toàn diện.

---

## 📁 Cấu Trúc Dự Án

```
KiroSA/
├── backend/                  # API Server (Node.js + Express + Knex + PostgreSQL)
│   ├── src/
│   │   ├── controllers/      # Xử lý logic API (Auth, Parking, Revenue, User, ...)
│   │   ├── routes/           # Định tuyến API
│   │   ├── middlewares/      # Xác thực JWT Token (authMiddleware)
│   │   ├── migrations/       # 5 bảng cơ sở dữ liệu Knex Migrations
│   │   ├── seeds/            # Dữ liệu mẫu (Ô đỗ, Cài đặt giá, Tài khoản Admin)
│   │   ├── db.js             # Khởi tạo kết nối PostgreSQL
│   │   └── server.js         # Entrypoint server & Cron job dọn dẹp ô đỗ quá hạn
│   ├── knexfile.js           # Cấu hình Knex kết nối DB
│   ├── package.json          # Thư viện Backend
│   ├── .env.example          # Mẫu biến môi trường
│   └── .env                  # Cấu hình môi trường nội bộ
│
├── frontend/                 # Giao diện Quản trị Web Admin (React + Vite)
│   ├── src/
│   │   ├── components/       # Layout, Sidebar
│   │   ├── pages/            # Dashboard, Login, Revenue, Settings, UserManagement
│   │   ├── App.jsx           # Điều hướng React Router & Quản lý Auth State
│   │   ├── main.jsx          # Entrypoint React
│   │   └── index.css         # Style giao diện chung (Dark Mode hiện đại)
│   ├── index.html            # Trang HTML gốc
│   ├── vite.config.js        # Cấu hình Vite & API Proxy
│   └── package.json          # Thư viện Frontend
│
├── package.json              # Script điều khiển chạy cả Frontend & Backend
├── .gitignore
└── README.md
```

---

## ⚙️ Hướng Dẫn Cài Đặt & Chạy Hệ Thống

### 1. Yêu Cầu Môi Trường
* **Node.js**: Phiên bản 18+ trở lên.
* **PostgreSQL**: Đang chạy trên máy (mặc định cổng `5432`).

### 2. Cài Đặt Dependencies
Tại thư mục gốc dự án:
```powershell
# Cài đặt dependencies cho cả Backend và Frontend
npm run install:all
```

---

### 3. Cấu Hình Cơ Sở Dữ Liệu PostgreSQL

1. Mở công cụ quản lý PostgreSQL (như pgAdmin hoặc psql) và tạo một database tên là `smartpark`:
   ```sql
   CREATE DATABASE smartpark;
   ```
2. Kiểm tra file `backend/.env` để đảm bảo thông tin đăng nhập PostgreSQL khớp với máy của bạn:
   ```env
   PORT=5000
   DB_HOST=localhost
   DB_PORT=5432
   DB_NAME=smartpark
   DB_USER=postgres
   DB_PASSWORD=mật_khẩu_postgres_của_bạn
   JWT_SECRET=supersecretjwtkey_smartpark_2026
   BOOKING_EXPIRE_MINUTES=30
   ```
3. Chạy Migrations để tạo đầy đủ các bảng:
   ```powershell
   npm run migrate
   # hoặc: cd backend; npm run migrate
   ```
4. Chạy Seeder để nạp dữ liệu ô đỗ xe và tài khoản Admin mặc định:
   ```powershell
   npm run seed
   # hoặc: cd backend; npm run seed
   ```

---

### 4. Khởi Động Dự Án

#### Cách 1: Chạy đồng thời cả Frontend và Backend (Khuyên dùng)
```powershell
npm run dev
```
* **Frontend Web Admin:** [http://localhost:5173](http://localhost:5173)
* **Backend API Server:** [http://localhost:5000](http://localhost:5000)

#### Cách 2: Chạy riêng từng phân hệ
* **Chạy riêng Backend:**
  ```powershell
  npm run dev:backend
  # hoặc: cd backend; npm run dev
  ```
* **Chạy riêng Frontend:**
  ```powershell
  npm run dev:frontend
  # hoặc: cd frontend; npm run dev
  ```

---

## 🔑 Tài Khoản Đăng Nhập Quản Trị Mặc Định

Sau khi chạy `npm run seed`, hệ thống đã tạo sẵn tài khoản quản trị:
* **Số điện thoại:** `0988888888`
* **Mật khẩu:** `admin123`
* **Vai trò (Role):** `Admin` (Có quyền truy cập vào Dashboard, Doanh thu, Cài đặt và Quản lý người dùng).

---

## 🛡️ Danh Sách Bảng Cơ Sở Dữ Liệu (Migrations)
1. `Users`: Thông tin người dùng, số điện thoại, mật khẩu, phân quyền (`Admin`, `VIP`, `Guest`), ví `wallet_balance`.
2. `Vehicles`: Quản lý biển số xe và loại xe (`Car`, `Motorbike`, `Truck`).
3. `Parking_Slots`: Sơ đồ các ô đỗ (`A1`, `A2`, `B1`, ...) và trạng thái (`Available`, `Occupied`, `Reserved`).
4. `Parking_Sessions`: Lịch sử phiên đỗ xe, giờ vào, giờ ra, số tiền thu thực tế, trạng thái phiên.
5. `Transactions`: Sổ giao dịch tài chính (Nạp tiền, Đặt cọc, Thanh toán vé tháng).
6. `Settings`: Bảng biểu phí đỗ xe theo giờ, ngày, đêm cho từng loại xe.
7. `Monthly_Tickets`: Danh sách vé tháng dành cho khách hàng VIP.
