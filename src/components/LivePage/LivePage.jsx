import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom"; 
import "./LivePage.scss";
import { Music, Play, Pause } from "lucide-react";
import Button from "../ui/Button/Button";

const fullSong = [
  { lyrics: "Imagine there's no heaven", chords: "[C] Imagine there's no heaven" },
  { lyrics: "It's easy if you try", chords: "[F] It's easy if you try" },
  { lyrics: "No hell below us", chords: "[C] No hell below us" },
  { lyrics: "Above us only sky", chords: "[F] Above us only sky" },
  { lyrics: "Imagine all the people", chords: "[C] Imagine all the people" },
  { lyrics: "Living for today", chords: "[F] Living for today" },
  { lyrics: "——", chords: "——" },
  { lyrics: "Imagine there's no countries", chords: "[C] Imagine there's no countries" },
  { lyrics: "It isn't hard to do", chords: "[F] It isn't hard to do" },
  { lyrics: "Nothing to kill or die for", chords: "[C] Nothing to kill or die for" },
  { lyrics: "And no religion too", chords: "[F] And no religion too" },
  { lyrics: "Imagine all the people", chords: "[C] Imagine all the people" },
  { lyrics: "Living life in peace", chords: "[F] Living life in peace" },
  { lyrics: "——", chords: "——" },
  { lyrics: "You may say I'm a dreamer", chords: "[Am] You may say I'm a dreamer" },
  { lyrics: "But I'm not the only one", chords: "[D] But I'm not the only one" },
  { lyrics: "I hope someday you'll join us", chords: "[G] I hope someday you'll join us" },
  { lyrics: "And the world will be as one", chords: "[C] And the world will be as one" },
];

const LivePage = () => {
  const [isSingerView, setIsSingerView] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [userRole, setUserRole] = useState(null); 
  const lyricsRef = useRef(null);
  const scrollIntervalRef = useRef(null);
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

  // Auto-scroll functionality
  const handleScroll = (direction) => {
    if (lyricsRef.current) {
      const scrollAmount = 60;
      if (direction === "up") {
        lyricsRef.current.scrollBy({ top: -scrollAmount, behavior: "smooth" });
      } else if (direction === "down") {
        lyricsRef.current.scrollBy({ top: scrollAmount, behavior: "smooth" });
      } else {
        lyricsRef.current.scrollTo({ top: 0, behavior: "smooth" });
      }
    }
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
    if (!isPlaying) {
      scrollIntervalRef.current = setInterval(() => {
        if (lyricsRef.current) {
          lyricsRef.current.scrollBy({ top: 2, behavior: "smooth" });
        }
      }, 100);
    } else {
      clearInterval(scrollIntervalRef.current);
    }
  };

  useEffect(() => {
    return () => clearInterval(scrollIntervalRef.current);
  }, []);

  return (
    <div className="live-page">
      <div className="top-bar">
        <div className="singer-toggle">
          <label>
            <input type="checkbox" checked={isSingerView} onChange={() => setIsSingerView(!isSingerView)} />
            <Music /> Singer View
          </label>
        </div>
      </div>

      <div className="song-header">
        <h1>Imagine</h1>
        <p>by John Lennon</p>
        {userRole === "admin" && (
          <button className="quit-button" onClick={() => navigate("/main")}>
            Quit
          </button>
        )}
      </div>

      <div className="lyrics-container">
        <div className="lyrics-box" ref={lyricsRef}>
          {fullSong.map((line, index) => (
            <p key={index}>{isSingerView ? line.lyrics : line.chords}</p>
          ))}
        </div>

        <div className="scroll-controls">
          <button className="scroll-btn" onClick={() => handleScroll("reset")}>🔄</button>
          <button className="scroll-btn" onClick={() => handleScroll("up")}>🔼</button>
          <button className="scroll-btn" onClick={() => handleScroll("down")}>🔽</button>
          <button className="play-btn" onClick={togglePlay}>{isPlaying ? <Pause /> : <Play />}</button>
        </div>
      </div>
    </div>
  );
};

export default LivePage;
