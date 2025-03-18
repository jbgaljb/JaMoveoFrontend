import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; 
import "./MainPage.scss"; 
import { Search, Music, LogOut } from "lucide-react"; // Added Logout icon
import Button from "../ui/Button/Button"; 

// Mock song data
const mockSongs = [
  { id: 1, title: "Bohemian Rhapsody", artist: "Queen", imageUrl: "/placeholder.jpg" },
  { id: 2, title: "Stairway to Heaven", artist: "Led Zeppelin", imageUrl: "/placeholder.jpg" },
  { id: 3, title: "Hotel California", artist: "Eagles", imageUrl: "/placeholder.jpg" },
  { id: 4, title: "Sweet Child O' Mine", artist: "Guns N' Roses", imageUrl: "/placeholder.jpg" },
  { id: 5, title: "Imagine", artist: "John Lennon", imageUrl: "/placeholder.jpg" },
  { id: 6, title: "Smells Like Teen Spirit", artist: "Nirvana", imageUrl: "/placeholder.jpg" },
  { id: 7, title: "Billie Jean", artist: "Michael Jackson", imageUrl: "/placeholder.jpg" },
  { id: 8, title: "Like a Rolling Stone", artist: "Bob Dylan", imageUrl: "/placeholder.jpg" },
];

export default function MainPage() {
  const [userRole, setUserRole] = useState(null); 
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  // Get user role from localStorage
  useEffect(() => {
    const role = localStorage.getItem("userRole");
    if (!role) {
      navigate("/login");  // Redirect to login if no role found
    } else {
      setUserRole(role);
    }
  }, [navigate]);

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("userRole");
    navigate("/login");
  };

  // Filter songs based on search query
  const filteredSongs = mockSongs.filter(
    (song) =>
      song.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      song.artist.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="main-container">
      {/* Top Bar with Logout Button */}
      <div className="top-bar">
        <h2>Music App Dashboard</h2>
        <Button className="logout-button" onClick={handleLogout}>
          <LogOut className="logout-icon" /> Logout
        </Button>
      </div>

      <div className="dashboard-card">
        <p>{userRole === "admin" ? "Search and select songs for your users" : "View current song selection status"}</p>

        {/* Admin View - Search & Select Song */}
        {userRole === "admin" && (
          <>
            {/* Search Bar */}
            <div className="search-bar">
              <Search className="search-icon" />
              <input
                type="text"
                placeholder="Search for a song..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="custom-input"
              />
            </div>

            {/* Song List */}
            <div className="song-results">
              {filteredSongs.map((song) => (
                <div 
                  key={song.id} 
                  className="song-card" 
                  onClick={() => navigate(`/live?song=${encodeURIComponent(song.title)}&artist=${encodeURIComponent(song.artist)}`)}
                >
                  <img src={song.imageUrl} alt={song.title} className="song-image" />
                  <div className="song-info">
                    <h3>{song.title}</h3>
                    <p>{song.artist}</p>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Player View - Waiting for Song */}
        {userRole === "player" && (
          <div className="user-view">
            <div className="waiting-message">
              <Music className="music-icon" />
              <h3>Waiting for next song...</h3>
              <p>The admin hasn't selected a song yet. Please wait.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
