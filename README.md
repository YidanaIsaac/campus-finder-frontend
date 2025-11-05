cat > README.md << 'EOF'
# 🎯 Campus Finder - Lost & Found System

![React](https://img.shields.io/badge/React-18.0-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.0-38bdf8)
![Vite](https://img.shields.io/badge/Vite-5.0-646cff)

A modern, responsive web application for managing lost and found items on campus.

## ✨ Features

- 🔐 Multi-user authentication (Student, Staff, Security, Visitor)
- 📝 Report lost and found items with photos
- 🔍 Advanced search and filtering
- 📱 Responsive mobile-first design
- 💬 Direct contact via message, call, or email
- 🔔 Notifications system
- 📊 User profile with statistics
- ❓ Help & Support with WhatsApp integration

## 🛠️ Tech Stack

- **React 18** - UI Framework
- **React Router v6** - Navigation
- **Tailwind CSS** - Styling
- **Vite** - Build tool
- **Lucide React** - Icons

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- Backend server running (see [Backend Repository](https://github.com/YidanaIsaac/campus-finder-backend))

### Installation
```bash
git clone https://github.com/YidanaIsaac/campus-finder-frontend.git
cd campus-finder-frontend
npm install
```

### Environment Setup
Create a `.env` file in the root directory:
```env
VITE_API_BASE_URL=http://localhost:5000/api
```

### Running the Application
```bash
# Development mode
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

**Important:** Make sure the backend server is running before starting the frontend!

Open http://localhost:5173 in your browser.

## 🧪 Test Credentials

- **Student**: STU001 / student123
- **Staff**: STAFF001 / staff123
- **Security**: SEC001 / security123
- **Visitor**: visitor@email.com / visitor123

## 📂 Project Structure
```
src/
├── components/     # Reusable components
├── layouts/        # Layout components
├── pages/          # All page components
├── utils/          # Utilities and mock data
└── App.jsx         # Main app with routing
```

## 🔮 Roadmap

### ✅ Phase 1: Frontend (Complete)
- [x] User authentication
- [x] Lost & Found reporting
- [x] Search and filtering
- [x] Notifications
- [x] User profiles

### ✅ Phase 2: Backend Integration (Complete)
- [x] Node.js/Express API connected
- [x] MongoDB database integrated
- [x] JWT authentication implemented
- [x] Real-time data fetching
- [x] API error handling

### 🚧 Phase 3: Advanced Features (Coming Soon)
- [ ] Real-time notifications (Socket.io)
- [ ] Email integration
- [ ] Image upload with Cloudinary
- [ ] Push notifications

## 👨‍💻 Author

**Yidana Isaac**
- GitHub: [@YidanaIsaac](https://github.com/YidanaIsaac)
- WhatsApp: +233 502 908 603

## 📞 Support

- Email: support@campusfinder.edu
- WhatsApp: +233 502 908 603

## 📄 License

MIT License - Free to use for learning!

---

⭐ Star this repo if you find it helpful!

Made with ❤️ by Yidana Isaac
EOF