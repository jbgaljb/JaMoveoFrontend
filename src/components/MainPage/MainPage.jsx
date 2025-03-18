import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "./MainPage.scss"; 
import { Search, Music } from "lucide-react";
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
  const [userRole, setUserRole] = useState("User"); // Admin or User
  const [searchQuery, setSearchQuery] = useState("");

  const navigate = useNavigate(); // Initialize navigation

  const filteredSongs = mockSongs.filter(
    (song) =>
      song.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      song.artist.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="main-container">
      {/* Role Toggle Button */}
      <div className="role-toggle">
        <Button onClick={() => setUserRole(userRole === "Admin" ? "User" : "Admin")}>
          Switch to {userRole === "Admin" ? "User" : "Admin"} View
        </Button>
      </div>

      <div className="dashboard-card">
        <h2>Music App Dashboard</h2>
        <p>{userRole === "Admin" ? "Search and select songs for your users" : "View current song selection status"}</p>

        {userRole === "Admin" && (
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

        {userRole === "User" && (
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
