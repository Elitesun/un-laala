"use client";
import { ArrowLeft, Heart, MessageCircle, X, Play, Pause, Volume2, VolumeX } from "lucide-react";
import Image from "next/image";
import { useState, useRef } from "react";
import laala from "@/data/laala.json"
import collection from "@/data/collection.json"

const page = () => {
  // Check if video background exists
  const hasVideoBackground = !!collection.videoBackground;

  // Media viewer state
  const [selectedMedia, setSelectedMedia] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const backgroundVideoRef = useRef<HTMLVideoElement>(null);

  // Function to check if media is video
  const isVideo = (url: string) => {
    return url.match(/\.(mp4|webm|ogg)($|\?)/i);
  };

  // Get current date in YYYY-MM-DD format
  const getCurrentFormattedDate = () => {
    const date = new Date();
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
  };

  // Toggle background video play/pause
  const togglePlayPause = () => {
    if (backgroundVideoRef.current) {
      if (isPlaying) {
        backgroundVideoRef.current.pause();
      } else {
        backgroundVideoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  // Toggle background video mute
  const toggleMute = () => {
    if (backgroundVideoRef.current) {
      backgroundVideoRef.current.muted = !backgroundVideoRef.current.muted;
      setIsMuted(!isMuted);
    }
  };

  // Open media in modal
  const openMedia = (media: string) => {
    setSelectedMedia(media);
  };

  // Close media modal
  const closeMedia = () => {
    setSelectedMedia(null);
  };

  return (
    <main className="mobile-screen dark-blur-background pb-20 relative h-screen overflow-hidden">
      {/* Render video background if it exists, otherwise use image background */}
      {hasVideoBackground ? (
        <div className="absolute inset-0 overflow-hidden z-0 h-screen w-screen">
          <video
            ref={backgroundVideoRef}
            src={collection.videoBackground}
            loop
            muted={isMuted}
            playsInline
            preload="auto"
            className="absolute w-screen h-screen object-cover object-center"
            style={{
              width: '100vw',
              height: '100vh',
              objectFit: 'cover',
              position: 'fixed',
              top: 0,
              left: 0
            }}
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
          />
          <div className="absolute inset-0 bg-black/60 backdrop-blur-[0.01px]"></div>

          {/* Video controls */}
          <div className="absolute bottom-[70px] right-4 flex space-x-3 z-20">
            <button
              onClick={togglePlayPause}
              className="bg-black/50 rounded-full p-2 text-white hover:bg-black/70 transition"
            >
              {isPlaying ? <Pause size={20} /> : <Play size={20} />}
            </button>
            <button
              onClick={toggleMute}
              className="bg-black/50 rounded-full p-2 text-white hover:bg-black/70 transition"
            >
              {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
            </button>
          </div>
        </div>
      ) : (
        <>
          <div
            className="absolute inset-0 z-0"
            style={{
              backgroundImage: `url(${collection.cover})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          ></div>
          <div className="absolute inset-0 bg-black/50 backdrop-blur-[0.01px]"></div>
        </>
      )}

      <div className="relative z-10">
        <div className="flex items-center justify-between w-full px-4 py-3">
          <button className="text-white">
            <ArrowLeft size={24} />
          </button>
          <div className="flex items-center">
            <h1 className="text-white text-lg font-medium">{collection.categorie}</h1>
            <span className="ml-2" style={{ color: "#fe5733" }}>{collection.encours ? "En Cours" : "Terminer"}</span>
          </div>
          <div className="w-6"></div>
        </div>

        {/* Horizontal scrolling cards with hidden scrollbar */}
        <div className="px-4 my-6">
          <div
            className="flex space-x-4 overflow-x-auto pb-4 snap-x scrollbar-hide"
            style={{
              scrollbarWidth: 'none', /* Firefox */
              msOverflowStyle: 'none', /* IE and Edge */
            }}
          >
            {/* Hide scrollbar for Chrome, Safari and Opera */}
            <style jsx>{`
              .scrollbar-hide::-webkit-scrollbar {
                display: none;
              }
            `}</style>

            {laala.fichierAlbum && laala.fichierAlbum.map((media, index) => (
              <div
                key={index}
                className="relative flex-shrink-0 w-[200px] h-[250px] rounded-lg overflow-hidden shadow-lg snap-start cursor-pointer"
                style={{ backgroundColor: 'rgba(0, 0, 0, 0.3)' }}
                onClick={() => openMedia(media)}
              >
                <div className="h-[180px] relative">
                  {isVideo(media) ? (
                    <div className="relative w-full h-full">
                      <video
                        src={media}
                        className="w-full h-full object-cover"
                        playsInline
                        muted
                      />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Play
                          size={40}
                          className="text-white opacity-80"
                          fill="white"
                          stroke="none"
                        />
                      </div>
                    </div>
                  ) : (
                    <Image
                      src={media}
                      alt={`Media ${index + 1}`}
                      width={200}
                      height={180}
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>

                <div className="p-3 text-white">
                  <div className="flex justify-between items-center text-xs mb-1">
                    <span>{getCurrentFormattedDate()} 0:0</span>
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center">
                        <Heart size={14} className="mr-1" fill="#fe5733" stroke="none" />
                        <span>0</span>
                      </div>
                      <div className="flex items-center">
                        <MessageCircle size={14} className="mr-1" />
                        <span>0</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center mt-1">
                    <span className="text-xs">Auteur: </span>
                    <span className="text-xs ml-1 text-[#fe5733]">{collection.nomCrea}</span>
                  </div>
                </div>
              </div>
            ))}

            {/* Add additional cards from collection.contenues if needed */}
            {collection.contenues && collection.contenues.length > 1 && collection.contenues.filter(id => id !== laala.id).map((contentId, index) => (
              <div
                key={`content-${index}`}
                className="relative flex-shrink-0 w-[200px] h-[250px] rounded-lg overflow-hidden shadow-lg snap-start"
                style={{ backgroundColor: 'rgba(0, 0, 0, 0.3)' }}
              >
                <div className="h-[180px] bg-gray-700 flex items-center justify-center">
                  <span className="text-white text-sm">Content {index + 1}</span>
                </div>

                <div className="p-3 text-white">
                  <div className="flex justify-between items-center text-xs mb-1">
                    <span>{getCurrentFormattedDate()} 0:0</span>
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center">
                        <Heart size={14} className="mr-1" />
                        <span>0</span>
                      </div>
                      <div className="flex items-center">
                        <MessageCircle size={14} className="mr-1" />
                        <span>0</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center mt-1">
                    <span className="text-xs">Auteur: </span>
                    <span className="text-xs ml-1">{collection.nomCrea}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ------------Stats------------- */}
        <div className="fixed bottom-[60px] w-full max-w-full px-4 py-3 text-center">
          <h2 className="text-white text-xl font-medium">Just~me 🌹</h2>
          <a href="#" className="text-[#fe5733] text-sm mt-1 inline-block">Lire plus</a>

          <div className="flex justify-between mt-4 text-sm">
            <div>
              <span style={{ color: "#fe5733" }}>3 suiveurs</span>
            </div>
            <div>
              <span className="text-white">20 vues</span>
            </div>
            <div>
              <span style={{ color: "#fe5733" }}>2.0 j'aime</span>
            </div>
          </div>

          <div className="flex justify-between text-sm mt-2">
            <div>
              <span className="text-white">0.0 commentaires</span>
            </div>
            <div>
              <span className="text-white">2025-04-21</span>
            </div>
          </div>
        </div>

        {/* ----------------Bottom------------------- */}
        <div className="fixed bottom-0 w-full max-w-full flex items-center justify-between bg-black/50 backdrop-blur-sm px-4 py-3">
          <div className="flex items-center">
            <img
              src="https://picsum.photos/200"
              alt="Profile"
              className="w-10 h-10 rounded-full object-cover"
            />
            <span className="text-white ml-2 text-sm">Kogon maw...</span>
          </div>

          <div className="flex space-x-4">
            <button className="bg-laala-darkButton text-white px-5 py-1 rounded-full text-sm">
              Suivi
            </button>
            <button className="bg-laala-darkButton text-white px-4 py-1 rounded-full text-sm">
              Forum
            </button>
            <button className="bg-laala-darkButton text-white px-4 py-1 rounded-full text-sm">
              Part...
            </button>
          </div>
        </div>
      </div>

      {/* Modal for viewing media */}
      {selectedMedia && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center">
          <button
            onClick={closeMedia}
            className="absolute top-4 right-4 text-white bg-black/50 rounded-full p-2"
          >
            <X size={24} />
          </button>

          <div className="w-full h-full flex items-center justify-center p-4">
            {isVideo(selectedMedia) ? (
              <video
                src={selectedMedia}
                className="max-w-full max-h-full object-contain"
                controls
                autoPlay
                playsInline
              />
            ) : (
              <div className="relative max-w-full max-h-full">
                <img
                  src={selectedMedia}
                  alt="Selected media"
                  className="max-w-full max-h-[80vh] object-contain"
                />
              </div>
            )}
          </div>
        </div>
      )}
    </main>
  );
}

export default page;