import './output.css';
import { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoginComponent from './routes/LoginComponent';
import SignUpComponent from './routes/SignUpComponent';
import HomeComponent from './routes/HomeComponent';
import UploadSongComponent from './routes/UploadSongComponent';
import MySongsComponent from './routes/MySongsComponent';
import SearchComponent from './routes/SearchComponent';
import DashboardComponent from './routes/DashboardComponent';
import CreatePlaylistComponent from './routes/CreatePlaylistComponent';
import { useCookies } from 'react-cookie';
import songContext from './contexts/songContext';
import { ThemeProvider } from './contexts/ThemeContext';
import Footer from './components/shared/Footer';

function App() {
  const [currentSong, setCurrentSong] = useState(null);
  const [isPaused, setIsPaused] = useState(true);
  const [soundPlayed, setSoundPlayed] = useState(null);
  const [cookie, setCookie, removeCookie] = useCookies(['token', 'user']);

  const logout = () => {
    removeCookie('token', { path: '/' });
    removeCookie('user', { path: '/' });
  };

  const user = cookie.user
    ? (typeof cookie.user === 'string' ? JSON.parse(cookie.user) : cookie.user)
    : null;

  return (
    <div className="min-h-screen flex flex-col w-screen font-sans">
      <ThemeProvider>
        <BrowserRouter>
          {
            cookie.token ? (
              <songContext.Provider value={{ currentSong, setCurrentSong, cookie, isPaused, setIsPaused, soundPlayed, setSoundPlayed, user, logout }}>
                <Routes>

                  <Route path="/dashboard" element={<DashboardComponent />} />
                  <Route path="/my-music" element={<MySongsComponent />} />
                  <Route path="/home" element={<Navigate to="/dashboard" />} />
                  <Route path="/search" element={<SearchComponent />} />
                  <Route path="/uploadsong" element={<UploadSongComponent />} />
                  <Route path="/create-playlist" element={<CreatePlaylistComponent />} />
                  <Route path="/" element={<Navigate to="/dashboard" />} />
                  <Route path="*" element={<Navigate to="/dashboard" />} />

                </Routes>
              </songContext.Provider>


            ) : (

              <Routes>
                <Route path="/" element={<Navigate to="/home" />} />
                <Route path="/home" element={<HomeComponent />} />
                <Route path="/login" element={<LoginComponent />} />
                <Route path="/signup" element={<SignUpComponent />} />
                <Route path="*" element={<Navigate to="/home" />} />
              </Routes>
            )
          }
        </BrowserRouter>
        <Footer />
      </ThemeProvider>
    </div>
  )
};


export default App;
