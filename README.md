# Tic-Tac-Toe Game 🎮

A modern, responsive Tic-Tac-Toe game with beautiful UI, animations, and Docker deployment support)

## ✨ Features

- **🎨 Modern Design**: Glassmorphism UI with gradient backgrounds and smooth animations
- **📱 Fully Responsive**: Works perfectly on desktop, tablet, and mobile devices
- **🎭 Interactive Experience**: Smooth animations, particle effects, and visual feedback
- **🏆 Score Tracking**: Keep track of wins, losses, and draws across multiple games
- **⌨️ Keyboard Support**: Play using number keys (1-9) or mouse/touch
- **🔄 PWA Ready**: Service worker for offline functionality and app-like experience
- **🐳 Docker Ready**: Containerized with Nginx for easy deployment anywhere
- **🚀 CI/CD Pipeline**: Complete GitLab CI/CD setup for automated testing and deployment
- **🔒 Security**: Security headers, CSP, and best practices implemented
- **♿ Accessibility**: Support for screen readers, high contrast, and reduced motion

## 🛠️ Technologies Used

- **Frontend**: HTML5, CSS3, Vanilla JavaScript (ES6+)
- **Styling**: Custom CSS with Orbitron font from Google Fonts
- **Server**: Nginx (for Docker deployment)
- **Containerization**: Docker with multi-stage builds
- **CI/CD**: GitLab CI/CD Pipeline with automated testing and security scanning
- **Testing**: Node.js for basic validation tests
- **PWA**: Service Worker for offline functionality

## 💻 Local Development

### Prerequisites
- Node.js 16+ (for local development server)
- Docker (for containerized deployment)
- Git

### Quick Start
```bash
# Clone the repository
git clone https://gitlab.com/winn0101/tic-tac-toe-game.git
cd tic-tac-toe-game

# Install dependencies
npm install

# Start development server
npm run dev
# or
npm start
```

The game will be available at `http://localhost:8080`

### Development Commands
```bash
npm start        # Start development server
npm run dev      # Start dev server with auto-reload
npm test         # Run basic validation tests
npm run build    # Build for production (static files)
```

## 🐳 Docker Deployment

### Local Docker Build and Run
```bash
# Build the Docker image
docker build -t tic-tac-toe-game .

# Run the container
docker run -d -p 80:80 --name tictactoe tic-tac-toe-game

# Check health
docker exec tictactoe curl http://localhost/health
```

The game will be available at `http://localhost`

### Docker Commands
```bash
# View logs
docker logs tictactoe

# Stop container
docker stop tictactoe

# Remove container
docker rm tictactoe

# Clean up images
docker rmi tic-tac-toe-game
```

## 🚀 GitLab CI/CD Pipeline

This project includes a complete CI/CD pipeline with the following stages:

### Pipeline Stages
1. **🧪 Test**: Validates HTML, CSS, and JavaScript files
2. **🏗️ Build**: Creates optimized Docker image
3. **🔍 Security Scan**: Scans Docker image for vulnerabilities using Trivy
4. **📦 Push**: Pushes image to Docker Hub and GitLab Container Registry
5. **🚀 Deploy**: Optional staging and production deployment

### Pipeline Features
- ✅ Automated testing on every commit
- 📊 Artifacts and reports generation
- 🌍 Multi-registry support (Docker Hub + GitLab)
- 🎯 Environment-specific deployments
- 🧹 Automatic cleanup

### Setting Up CI/CD
1. Fork/clone this repository to GitLab
2. Set up the following CI/CD variables in GitLab:
   ```
   DOCKER_HUB_USERNAME = your-docker-hub-username
   DOCKER_HUB_PASSWORD = your-docker-hub-token
   ```
3. Push to trigger the pipeline!

## 🎯 Game Controls

### 🖱️ Mouse/