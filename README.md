# 🔐 Cryptography & Number Theory Lab

A professional full-stack web application for exploring cryptography and number theory concepts with interactive demonstrations, visualizations, and educational content.

![Application Preview](https://img.shields.io/badge/Status-Live-brightgreen)
![Node.js](https://img.shields.io/badge/Node.js-18+-green)
![React](https://img.shields.io/badge/React-18+-blue)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-green)

## ✨ Features

### 🏠 **Home Page**
- Interactive overview of cryptography and number theory
- Professional navigation to all modules
- Application statistics and feature highlights

### 🔢 **Prime Numbers & Modular Arithmetic**
- **Prime Number Operations:**
  - Prime checking with Miller-Rabin algorithm
  - Next prime number generation
  - Prime factorization
  - Modular inverse calculation
- **Interactive Visualizations:**
  - Modular arithmetic tables
  - Number wheel (mod 7 circle showing remainders)
  - Real-time calculations

### 🔐 **Cipher Demonstration**
- **Three Cipher Types:**
  - **Caesar Cipher:** Simple substitution with shift
  - **Affine Cipher:** Linear transformation (ax + b) mod 26
  - **RSA Encryption:** Public-key cryptography
- **Dual Functionality:**
  - **Encryption Engine:** Encrypt plaintext with keys
  - **Decryption Engine:** Decrypt ciphertext with keys
- **Advanced Features:**
  - Character shift animations
  - Letter frequency analysis (before & after encryption)
  - Verification system for decryption accuracy
  - Professional status badges and feedback

### 🗝️ **RSA Key Generation**
- Step-by-step RSA key generation process
- Mathematical explanations with formulas
- Interactive flowcharts and diagrams
- Animated encryption/decryption demonstrations
- Key pair generation and management

### 📚 **History & Educational Info**
- **Number Theory Concepts:**
  - Greatest Common Divisor (GCD) calculation
  - Extended Euclidean Algorithm
  - Euler's totient function
  - Modular arithmetic principles
- **Interactive Examples:**
  - React math cards with explanations
  - Real-time calculations
  - Educational content and tutorials

## 🎨 Professional UI Design

- **Dark Theme:** GitHub-inspired professional appearance
- **Monospace Typography:** Developer-focused fonts (SF Mono, Monaco)
- **Modern Components:** Gradient buttons, status badges, code blocks
- **Responsive Design:** Works perfectly on all screen sizes
- **Interactive Elements:** Hover effects, smooth transitions, visual feedback

## 🛠️ Technology Stack

### **Frontend**
- **React 18** - Modern UI framework
- **Styled Components** - CSS-in-JS styling
- **React Router** - Client-side routing
- **Chart.js** - Data visualizations
- **Axios** - HTTP client for API calls

### **Backend**
- **Node.js** - Server runtime
- **Express.js** - Web framework
- **MongoDB** - Database (Atlas cloud)
- **Mongoose** - MongoDB object modeling
- **CORS** - Cross-origin resource sharing

### **Cryptography Libraries**
- **node-rsa** - RSA encryption/decryption
- **big-integer** - Large number arithmetic
- **crypto** - Built-in Node.js crypto module
- **bcryptjs** - Password hashing

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ installed
- MongoDB Atlas account (or local MongoDB)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd cryptography-lab
   ```

2. **Install dependencies**
   ```bash
   npm install
   cd client && npm install && cd ..
   ```

3. **Configure MongoDB**
   - The application is pre-configured with MongoDB Atlas
   - Connection string is hardcoded in `server.js`
   - No additional setup required

4. **Start the application**
   ```bash
   npm run dev
   ```

5. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000

## 📁 Project Structure

```
cryptography-lab/
├── client/                 # React frontend
│   ├── public/
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── pages/          # Main application pages
│   │   ├── utils/          # Utility functions
│   │   └── index.js        # React entry point
│   └── package.json
├── routes/                 # Express API routes
│   ├── crypto.js          # Cryptographic operations
│   ├── numberTheory.js    # Number theory functions
│   └── visualization.js   # Data visualization endpoints
├── models/                 # MongoDB schemas
│   └── EncryptionHistory.js
├── server.js              # Express server
├── package.json           # Backend dependencies
└── README.md
```

## 🔧 API Endpoints

### **Cryptography Routes** (`/api/crypto`)
- `POST /rsa/encrypt` - RSA encryption
- `POST /rsa/decrypt` - RSA decryption
- `POST /hash` - Hash functions (SHA-256, SHA-512, MD5)
- `GET /history` - Encryption history

### **Number Theory Routes** (`/api/number-theory`)
- `POST /prime/generate` - Generate prime numbers
- `POST /prime/check` - Check if number is prime
- `POST /modular/power` - Modular exponentiation
- `POST /modular/inverse` - Modular inverse
- `POST /gcd` - Greatest Common Divisor

### **Visualization Routes** (`/api/visualization`)
- `GET /rsa-sizes` - RSA key size data
- `GET /prime-distribution` - Prime number distribution
- `GET /modular-cycles` - Modular arithmetic cycles

## 🎯 Usage Examples

### **Caesar Cipher**
1. Select "Caesar Cipher" from dropdown
2. Enter plaintext: "Hello World"
3. Enter shift key: "3"
4. Click "Encrypt Text"
5. Copy encrypted result and key
6. Use decryption section to verify

### **RSA Encryption**
1. Select "RSA Cipher" from dropdown
2. Enter plaintext: "Secret Message"
3. Click "Encrypt Text" (key generated automatically)
4. Copy encrypted result and private key
5. Use decryption section with private key

### **GCD Calculation**
1. Go to "History & Info" page
2. Enter two numbers: 48 and 18
3. Click "Calculate GCD"
4. View result: GCD(48, 18) = 6

## 🔒 Security Features

- **Input Validation:** All inputs are validated and sanitized
- **Error Handling:** Comprehensive error handling and user feedback
- **Secure Key Generation:** Cryptographically secure random number generation
- **Database Security:** MongoDB Atlas with secure connection strings

## 🎨 UI/UX Features

- **Professional Design:** GitHub-inspired dark theme
- **Status Indicators:** Color-coded badges for success/error states
- **Code Syntax Highlighting:** Professional algorithm explanations
- **Interactive Visualizations:** Real-time charts and animations
- **Responsive Layout:** Mobile-friendly design
- **Loading States:** Professional loading spinners and feedback

## 🧪 Testing

### **Manual Testing**
1. Test all cipher types (Caesar, Affine, RSA)
2. Verify encryption/decryption accuracy
3. Test GCD calculations
4. Check responsive design on different screen sizes

### **API Testing**
```bash
# Test GCD endpoint
curl -X POST http://localhost:5000/api/number-theory/gcd \
  -H "Content-Type: application/json" \
  -d '{"a":48,"b":18}'

# Test RSA encryption
curl -X POST http://localhost:5000/api/crypto/rsa/encrypt \
  -H "Content-Type: application/json" \
  -d '{"message":"Hello World"}'
```

## 🚀 Deployment

### **Production Build**
```bash
npm run build
```

### **Environment Variables**
- MongoDB connection string is hardcoded
- No additional environment setup required

## 📊 Performance

- **Frontend:** Optimized React components with lazy loading
- **Backend:** Efficient algorithms for cryptographic operations
- **Database:** MongoDB Atlas for scalable data storage
- **Caching:** Client-side caching for better performance

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🎓 Educational Value

This application serves as an excellent learning tool for:
- **Computer Science Students:** Understanding cryptographic algorithms
- **Mathematics Students:** Exploring number theory concepts
- **Security Professionals:** Hands-on experience with encryption
- **Developers:** Full-stack development with modern technologies

## 🔮 Future Enhancements

- [ ] Elliptic Curve Cryptography
- [ ] Advanced hash functions (SHA-3, BLAKE2)
- [ ] Digital signatures
- [ ] Key exchange protocols
- [ ] Performance benchmarking
- [ ] User authentication system
- [ ] Advanced visualizations
- [ ] Mobile app version

## 📞 Support

For questions, issues, or contributions, please:
1. Check the existing issues
2. Create a new issue with detailed description
3. Contact the development team

---

**Built with ❤️ for the cryptography and mathematics community**

*Professional-grade cryptographic tools for educational and research purposes*