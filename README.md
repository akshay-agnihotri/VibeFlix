# 🎬 MovieFlix – Full Stack Movie Search App

MovieFlix is a full-stack movie search application built with React (frontend) and Express (backend). It fetches trending movies using the TMDB API, passes traffic through the TOR network for anonymity, and tracks searches in Appwrite Database.

## ✨ Features

- 🔍 **Movie Search**: Search for movies using TMDB API
- 📈 **Trending Movies**: Display trending movies and popular content
- 🔐 **Anonymous Browsing**: Routes traffic through TOR network for privacy
- 📊 **Search Tracking**: Logs search queries in Appwrite Database
- 🎨 **Modern UI**: Clean and responsive React interface
- ⚡ **Fast Performance**: Built with Vite for optimal development experience

## 🛠️ Tech Stack

**Frontend:**
- React 18
- Vite
- CSS3/Modern Styling
- Appwrite SDK

**Backend:**
- Node.js
- Express.js
- Axios for API calls
- TOR SOCKS proxy integration
- TMDB API integration

**Database:**
- Appwrite Database

**Privacy:**
- TOR network routing
- CORS handling

## 📁 Project Structure

```
02_movie_app/
│
├── backend/                 # Express backend with TMDB + Appwrite logic
│   └── index.js
│
├── frontend/                # React frontend (Vite-based)
│   └── App.jsx
│
├── cors/                    # CORS Unblocker tool
│   └── cores.exe
│
├── .env                     # Environment variables (TMDB, Appwrite)
├── package.json
└── README.md
```

## 🚀 Installation & Setup

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- TOR installed on your system

### 1. Install TOR on Your System

**Windows users:**
1. Download the **Tor Expert Bundle** from the official Tor website:  
   👉 https://www.torproject.org/download/tor/
2. Extract the ZIP file to a folder (e.g., `C:\tor`)
3. Open Command Prompt and navigate to the folder where you extracted it
4. Start the TOR SOCKS proxy by running:
   ```bash
   tor.exe
   ```
   
✅ **If it's running correctly, you'll see logs like:**
```
Bootstrapped 100% (done): Done
Opened Socks listener connection (ready) on 127.0.0.1:9050
```

**Linux/macOS users:**
```bash
# Ubuntu/Debian
sudo apt-get install tor

# macOS (using Homebrew)
brew install tor

# Start TOR
tor
```

### 2. Get TMDB API Key

1. Create an account on https://developer.themoviedb.org/
2. Navigate to your account settings
3. Go to the "API" section
4. Request an API key (it's free!)
5. Copy your API key for the next step

### 3. Clone and Setup the Project

```bash
# Clone the repository
git clone <your-repo-url>
cd 02_movie_app

# Install backend dependencies
npm install

# Create environment file in root directory
touch .env
```

### 4. Configure Environment Variables

Create a `.env` file in the root directory and add:

```env
TMDB_API_KEY=your_tmdb_api_key_here
PORT=5000
```

### 5. Setup Appwrite

1. Create an account at https://appwrite.io/
2. Create a new project
3. Create a database and collection for storing search data
4. Note down your:
   - Project ID
   - Database ID
   - Collection ID

### 6. Setup Frontend

```bash
# Navigate to frontend directory
cd frontend

# Install frontend dependencies
npm install

# Create environment file for frontend
touch .env.local
```

Add the following to `frontend/.env.local`:

```env
VITE_APPWRITE_PROJECT_ID=your_project_id
VITE_APPWRITE_DATABASE_ID=your_database_id
VITE_APPWRITE_COLLECTION_ID=your_collection_id
VITE_APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1
```

### 7. Run the Application

**Terminal 1 - Start Backend:**
```bash
# From root directory
nodemon ./backend/index.js
```

**Terminal 2 - Start Frontend:**
```bash
# From frontend directory
cd frontend
npm run dev
```

**Terminal 3 - Start TOR (if not already running):**
```bash
# Navigate to your TOR installation folder
tor.exe
```

### 8. Access the Application

Open your browser and navigate to:
```
http://localhost:5173
```

## 🔧 Configuration

### Backend Configuration

The backend runs on port 5000 by default. You can change this in the `.env` file:

```env
PORT=your_preferred_port
```

### CORS Configuration

If you encounter CORS issues, you can use the provided `cores.exe` tool in the `cors/` directory.

### TOR Configuration

The application uses TOR's default SOCKS proxy on `127.0.0.1:9050`. If you need to change this, modify the proxy settings in your backend code.

## 🎯 Usage

1. **Search Movies**: Use the search bar to find movies by title
2. **Browse Trending**: View trending movies on the homepage
3. **View Details**: Click on any movie to see detailed information
4. **Anonymous Browsing**: All API requests are routed through TOR for privacy

## 🐛 Troubleshooting

### Common Issues

**TOR not connecting:**
- Make sure TOR is running on port 9050
- Check if your firewall is blocking the connection
- Try restarting the TOR service

**API requests failing:**
- Verify your TMDB API key is correct
- Check if TOR is properly routing traffic
- Ensure your internet connection is stable

**Frontend not loading:**
- Make sure both backend and frontend are running
- Check if ports 5000 and 5173 are available
- Verify environment variables are set correctly

**Database errors:**
- Confirm Appwrite credentials are correct
- Check if your Appwrite project is active
- Verify database and collection IDs

## 📝 API Endpoints

### Backend Endpoints

- `GET /api/trending` - Get trending movies
- `GET /api/search/:query` - Search movies by title
- `GET /api/movie/:id` - Get movie details by ID

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📜 License

This project is licensed under the MIT License. See the `LICENSE` file for details.

## 🙏 Acknowledgments

- [TMDB](https://www.themoviedb.org/) for providing the movie database API
- [Appwrite](https://appwrite.io/) for backend-as-a-service
- [TOR Project](https://www.torproject.org/) for privacy tools
- [React](https://reactjs.org/) and [Vite](https://vitejs.dev/) for frontend tools

## 📞 Support

If you encounter any issues or have questions, please:
1. Check the troubleshooting section above
2. Search existing issues in the repository
3. Create a new issue with detailed information about your problem

---

**Made with ❤️ by [Akshay Agnihotri]**