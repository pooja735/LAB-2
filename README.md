# Cryptography & Number Theory Lab

A comprehensive web application demonstrating advanced cryptographic algorithms and number theory concepts through interactive tools and visualizations.

## 🚀 Features

### Cryptographic Algorithms
- **RSA Encryption/Decryption**: Generate key pairs, encrypt/decrypt messages
- **Hash Functions**: SHA-256, SHA-512, MD5 with collision analysis
- **Elliptic Curve Cryptography**: Point operations and curve visualization

### Number Theory Tools
- **Prime Number Generation**: Cryptographically secure prime generation
- **Prime Testing**: Miller-Rabin primality testing with factorization
- **Modular Arithmetic**: Exponentiation, multiplicative inverse, GCD calculations
- **Extended Euclidean Algorithm**: Bézout coefficients calculation

### Interactive Visualizations
- **RSA Key Size Analysis**: Security level comparisons
- **Prime Distribution Charts**: Visual prime number distribution
- **Modular Power Cycles**: Periodicity visualization
- **Hash Collision Analysis**: Birthday paradox demonstrations
- **Elliptic Curve Plots**: Interactive curve point visualization

### Additional Features
- **Operation History**: Track all cryptographic operations
- **Responsive Design**: Works on desktop, tablet, and mobile
- **Real-time Calculations**: Instant results with loading indicators
- **Copy to Clipboard**: Easy data sharing and reuse

## 🛠️ Technology Stack

### Backend
- **Node.js** with Express.js
- **MongoDB** for data persistence
- **Big Integer** library for large number calculations
- **Node-RSA** for RSA operations
- **Crypto** module for hash functions

### Frontend
- **React.js** with modern hooks
- **React Router** for navigation
- **Chart.js** with React-ChartJS-2 for visualizations
- **Styled Components** for responsive styling
- **Axios** for API communication

## 📋 Prerequisites

- Node.js (v14 or higher)
- MongoDB (v4.4 or higher)
- npm or yarn package manager

## 🚀 Installation & Setup

### 1. Clone the Repository
```bash
git clone <repository-url>
cd cryptography-lab
```

### 2. Install Backend Dependencies
```bash
npm install
```

### 3. Install Frontend Dependencies
```bash
cd client
npm install
cd ..
```

### 4. Start MongoDB
Make sure MongoDB is running on your system:
```bash
# On Windows
net start MongoDB

# On macOS/Linux
sudo systemctl start mongod
# or
brew services start mongodb-community
```

### 5. Run the Application

#### Development Mode (Recommended)
```bash
npm run dev
```
This will start both the backend server (port 5000) and frontend development server (port 3000) concurrently.

#### Production Mode
```bash
# Build the frontend
npm run build

# Start the server
npm start
```

### 6. Access the Application
Open your browser and navigate to:
- **Development**: http://localhost:3000
- **Production**: http://localhost:5000

## 📖 Usage Guide

### RSA Encryption
1. Navigate to the RSA page
2. Generate a key pair
3. Enter a message to encrypt
4. Use the public key for encryption
5. Use the private key for decryption

### Number Theory Calculator
1. Go to the Number Theory page
2. Generate prime numbers of specified bit length
3. Test numbers for primality
4. Perform modular arithmetic operations
5. Calculate GCD and modular inverses

### Hash Functions
1. Visit the Hash Functions page
2. Enter text to hash
3. Select algorithm (SHA-256, SHA-512, MD5)
4. Compare hash outputs across algorithms

### Elliptic Curves
1. Access the Elliptic Curves page
2. Set curve parameters (a, b, p)
3. Generate curve points
4. Visualize the elliptic curve
5. Perform point addition operations

### Visualizations
1. Go to the Visualizations page
2. View interactive charts and graphs
3. Analyze cryptographic relationships
4. Understand mathematical concepts visually

### Operation History
1. Check the History page
2. View all performed operations
3. Filter by algorithm or operation type
4. Copy data for reuse

## 🔧 Configuration

### Environment Variables
Create a `.env` file in the root directory:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/cryptography-lab
NODE_ENV=development
```

### MongoDB Configuration
The application connects to MongoDB at `mongodb://localhost:27017/cryptography-lab` by default. Modify the connection string in `server.js` if needed.

## 📚 Mathematical Concepts Covered

### Cryptography
- **RSA Algorithm**: Public-key cryptosystem based on integer factorization
- **Hash Functions**: One-way functions for data integrity
- **Elliptic Curves**: Public-key cryptography based on elliptic curve discrete logarithm

### Number Theory
- **Prime Numbers**: Fundamental building blocks of cryptography
- **Modular Arithmetic**: Operations in finite fields
- **Greatest Common Divisor**: Euclidean algorithm and extensions
- **Modular Exponentiation**: Efficient computation of large powers

### Security Concepts
- **Key Sizes**: Relationship between key length and security
- **Collision Resistance**: Hash function security properties
- **Cryptographic Strength**: Comparing different algorithms

## 🎯 Educational Value

This application is designed for:
- **Computer Science Students**: Understanding cryptographic algorithms
- **Mathematics Students**: Exploring number theory applications
- **Security Professionals**: Learning about cryptographic implementations
- **General Learners**: Interactive exploration of mathematical concepts

## 🔒 Security Considerations

- **Educational Purpose**: This application is for learning and demonstration
- **Not Production Ready**: Do not use for actual cryptographic operations
- **Key Management**: Generated keys are for demonstration only
- **Hash Security**: MD5 is included for educational purposes but is cryptographically broken

## 🐛 Troubleshooting

### Common Issues

1. **MongoDB Connection Error**
   - Ensure MongoDB is running
   - Check connection string in `server.js`
   - Verify MongoDB is accessible on port 27017

2. **Port Already in Use**
   - Change the port in `server.js`
   - Kill existing processes on the port
   - Use `npm run dev` for automatic port management

3. **Frontend Build Errors**
   - Clear node_modules and reinstall: `rm -rf node_modules && npm install`
   - Check Node.js version compatibility
   - Ensure all dependencies are installed

4. **Large Number Calculations**
   - Some operations may take time for very large numbers
   - Use reasonable bit lengths for demonstrations
   - Consider browser limitations for client-side calculations

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📞 Support

For support or questions, please open an issue in the repository.

---

**Note**: This application is designed for educational purposes and demonstrates cryptographic concepts. It should not be used for production security applications without proper security review and hardening.
