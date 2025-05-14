/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import { ArrowLeft, Heart, MessageCircle, Play, Pause, Volume2, VolumeX, ExternalLink, Share2, User, Calendar, ChevronUp } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import collection from "@/data/collection.json";
import laala from "@/data/laala.json";

const page = () => {
  // Media viewer state
  const [selectedMedia, setSelectedMedia] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const backgroundVideoRef = useRef<HTMLVideoElement>(null);
  const [activeTab, setActiveTab] = useState('media');
  const [showScrollTop, setShowScrollTop] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  // Function to check if media is video
  const isVideo = (url: string) => {
    return url.match(/\.(mp4|webm|ogg)($|\?)/i);
  };

  // Format the date nicely
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    };
    return new Date(dateString).toLocaleDateString('fr-FR', options);
  };

  // Background video controls
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

  // Scroll to top function
  const scrollToTop = () => {
    if (contentRef.current) {
      contentRef.current.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  };

  // Handle scroll events
  const handleScroll = () => {
    if (contentRef.current) {
      // Show scroll-to-top button when user scrolls down 300px
      setShowScrollTop(contentRef.current.scrollTop > 300);
    }
  };

  // Initialize video if present
  useEffect(() => {
    if (backgroundVideoRef.current) {
      // Auto-play background video with mute
      backgroundVideoRef.current.muted = true;
      backgroundVideoRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(error => {
        console.error("Autoplay failed:", error);
      });
    }

    // Add scroll event listener
    const currentContentRef = contentRef.current;
    if (currentContentRef) {
      currentContentRef.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (currentContentRef) {
        currentContentRef.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  const hasVideoBackground = !!collection.videoBackground;

  return (
    <div className="mobile-screen flex flex-col">
      {/* Background Video with Minimal Overlay */}
      {hasVideoBackground && (
        <div className="fixed inset-0 -z-10">
          <video
            ref={backgroundVideoRef}
            src={collection.videoBackground}
            loop
            muted={isMuted}
            playsInline
            preload="auto"
            className="w-full h-full object-cover"
          />
        </div>
      )}

      {/* Header transparent et élégant */}
      <header className="sticky top-0 z-40 px-4 py-3 bg-transparent">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button className="p-2 rounded-full bg-black/20 backdrop-blur-sm hover:bg-black/30 transition">
              <ArrowLeft size={20} className="text-white" />
            </button>
            <h1 className="text-white font-medium text-shadow">{collection.categorie}</h1>
          </div>

          <div className="px-3 py-1 rounded-full laala-gradient text-white text-xs font-medium shadow-sm">
            {collection.encours ? "En Cours" : "Terminé"}
          </div>
        </div>
      </header>

      {/* Content Container with enhanced scrolling - with flex-1 to push footer to bottom */}
      <div
        ref={contentRef}
        className="flex-1 px-4 pt-2 pb-20 overflow-y-auto content-scroll"
        onScroll={handleScroll}
      >
        {/* Collection Banner */}
        <div className="relative rounded-xl overflow-hidden mb-6 card-hover">
          <img
            src={collection.cover}
            alt={collection.nom}
            className="w-full h-40 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
          <div className="absolute bottom-0 left-0 right-0 p-4 flex items-end gap-3">
            <div className="w-16 h-16 rounded-full border-2 border-white overflow-hidden">
              <img src={collection.avatarCrea} alt="Profile" className="w-full h-full object-cover" />
            </div>
            <div>
              <h2 className="text-white font-bold text-lg">{collection.nom}</h2>
              <p className="text-white/90 text-sm">{collection.description}</p>
            </div>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="flex justify-between mb-7 bg-black/60 backdrop-blur-md rounded-xl p-3">
          <div className="text-center px-2">
            <div className="text-laala-primary font-bold">{collection.tablikes ? collection.tablikes.length : 3}</div>
            <div className="text-xs text-white/70">Suiveurs</div>
          </div>
          <div className="text-center px-2">
            <div className="text-white font-bold">{collection.vues || 20}</div>
            <div className="text-xs text-white/70">Vues</div>
          </div>
          <div className="text-center px-2">
            <div className="text-laala-primary font-bold">{collection.likes || 2.0}</div>
            <div className="text-xs text-white/70">J&apos;aime</div>
          </div>
          <div className="text-center px-2">
            <div className="text-white font-bold flex items-center justify-center">
              <Calendar size={14} className="mr-1 text-laala-primary" />
              {new Date(collection.date).getFullYear()}
            </div>
            <div className="text-xs text-white/70">Année</div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="mb-6">
          <div className="flex gap-2 border-b border-white/20">
            <button
              onClick={() => setActiveTab('media')}
              className={`px-4 py-2 text-sm font-medium relative ${activeTab === 'media' ? 'text-laala-primary' : 'text-white/60'} hover:text-laala-primary transition-colors`}
            >
              Media
              {activeTab === 'media' && <div className="absolute bottom-0 left-0 right-0 h-0.5 laala-gradient"></div>}
            </button>
            <button
              onClick={() => setActiveTab('info')}
              className={`px-4 py-2 text-sm font-medium relative ${activeTab === 'info' ? 'text-laala-primary' : 'text-white/60'} hover:text-laala-primary transition-colors`}
            >
              Info
              {activeTab === 'info' && <div className="absolute bottom-0 left-0 right-0 h-0.5 laala-gradient"></div>}
            </button>
          </div>
        </div>

        {/* Media Grid - Professionally Styled Cards */}
        {activeTab === 'media' && (
          <div className="grid grid-cols-2 gap-3">
            {laala.fichierAlbum && laala.fichierAlbum.map((media, index) => {
              const metadata = laala.albumMetadata && laala.albumMetadata[index];
              return (
                <div
                  key={index}
                  onClick={() => openMedia(media)}
                  className="group relative bg-black/60 rounded-lg overflow-hidden card-hover cursor-pointer opacity-0 animate-fade-in-up"
                  style={{ animationDelay: `${index * 100}ms`, animationFillMode: 'forwards' }}
                >
                  <div className="relative aspect-[3/4]">
                    {isVideo(media) ? (
                      <div className="h-full">
                        <video
                          src={media.startsWith("/") ? media : media}
                          className="w-full h-full object-cover"
                          playsInline
                          muted
                        />
                        <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/40 transition">
                          <div className="w-12 h-12 flex items-center justify-center rounded-full bg-laala-primary/30 backdrop-blur-md">
                            <Play className="w-6 h-6 text-white" />
                          </div>
                        </div>
                      </div>
                    ) : (
                      <img
                        src={media}
                        alt={metadata?.title || `Media ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    )}

                    {/* Subtle Info Overlay */}
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-1.5">
                          <Heart size={14} className="text-laala-primary" />
                          <span className="text-white text-xs">{metadata?.likes || 0}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <MessageCircle size={14} className="text-laala-primary" />
                          <span className="text-white text-xs">{metadata?.comments || 0}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-3 bg-black/40">
                    <div className="mb-1 line-clamp-1">
                      <h3 className="text-white text-sm font-medium">{metadata?.title || "Sans titre"}</h3>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-white/60 text-xs">{formatDate(metadata?.date || laala.date)}</span>
                      <span className="text-laala-primary text-xs font-medium">{collection.nomCrea}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Info Tab Content */}
        {activeTab === 'info' && (
          <div className="bg-black/60 backdrop-blur-md rounded-lg p-4 opacity-0 animate-fade-in" style={{ animationFillMode: 'forwards' }}>
            <h3 className="text-laala-primary font-medium mb-3">À propos</h3>
            <p className="text-white/80 text-sm mb-4">{collection.description || "Aucune description disponible."}</p>

            <div className="space-y-4">
              <div className="flex items-center gap-3 p-2 bg-black/40 rounded-lg hover-opacity">
                <div className="w-10 h-10 rounded-full bg-laala-primary/30 flex items-center justify-center">
                  <Calendar size={18} className="text-laala-primary" />
                </div>
                <div>
                  <div className="text-white/60 text-xs">Date de création</div>
                  <div className="text-white text-sm">{formatDate(collection.date)}</div>
                </div>
              </div>

              <div className="flex items-center gap-3 p-2 bg-black/40 rounded-lg hover-opacity">
                <div className="w-10 h-10 rounded-full bg-laala-primary/30 flex items-center justify-center">
                  <User size={18} className="text-laala-primary" />
                </div>
                <div>
                  <div className="text-white/60 text-xs">Créateur</div>
                  <div className="text-white text-sm">{collection.nomCrea}</div>
                </div>
              </div>

              <div className="flex items-center gap-3 p-2 bg-black/40 rounded-lg hover-opacity">
                <div className="w-10 h-10 rounded-full bg-laala-primary/30 flex items-center justify-center">
                  <Share2 size={18} className="text-laala-primary" />
                </div>
                <div>
                  <div className="text-white/60 text-xs">Partages</div>
                  <div className="text-white text-sm">{laala.vues || 0} partages</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Scroll to top button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-20 right-5 z-20 p-3 rounded-full laala-gradient opacity-0 animate-fade-in shadow-lg hover:opacity-85 transition-transform duration-300 hover:scale-105"
          style={{ animationFillMode: 'forwards' }}
        >
          <ChevronUp size={20} className="text-white" />
        </button>
      )}

      {/* Footer fixé en bas du mobile-screen */}
      <footer className="sticky bottom-0 z-30 bg-black/80 backdrop-blur-md border-t border-white/10 mt-auto">
        <div className="flex justify-between items-center px-6 py-3">
          <button className="flex flex-col items-center gap-1 hover-opacity">
            <User size={20} className="text-laala-primary" />
            <span className="text-white text-xs">Suivi</span>
          </button>
          <button className="flex flex-col items-center gap-1 hover-opacity">
            <MessageCircle size={20} className="text-laala-primary" />
            <span className="text-white text-xs">Forum</span>
          </button>
          <button className="flex flex-col items-center gap-1 hover-opacity">
            <Share2 size={20} className="text-laala-primary" />
            <span className="text-white text-xs">Partager</span>
          </button>
        </div>
      </footer>

      {/* Elegant Media Viewer Modal */}
      {selectedMedia && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-lg flex flex-col">
          <div className="flex items-center justify-between p-4 border-b border-white/10">
            <div className="flex items-center gap-3">
              <button
                onClick={closeMedia}
                className="p-2 rounded-full bg-laala-primary/20 hover:bg-laala-primary/30 transition hover-opacity"
              >
                <ArrowLeft size={20} className="text-white" />
              </button>
              <h3 className="text-white font-medium text-sm">Media Viewer</h3>
            </div>

            <div className="flex gap-2">
              <button className="p-2 rounded-full bg-laala-primary/20 hover:bg-laala-primary/30 transition hover-opacity">
                <Heart size={20} className="text-laala-primary" />
              </button>
              <button className="p-2 rounded-full bg-laala-primary/20 hover:bg-laala-primary/30 transition hover-opacity">
                <ExternalLink size={20} className="text-white" />
              </button>
            </div>
          </div>

          <div className="flex-1 flex items-center justify-center p-4">
            {isVideo(selectedMedia) ? (
              <video
                src={selectedMedia}
                className="max-w-full max-h-[calc(100vh-120px)] rounded-lg shadow-2xl"
                controls
                autoPlay
                playsInline
              />
            ) : (
              <img
                src={selectedMedia}
                alt="Selected media"
                className="max-w-full max-h-[calc(100vh-120px)] rounded-lg shadow-2xl object-contain"
              />
            )}
          </div>

          {/* Controls in modal for videos */}
          {isVideo(selectedMedia) && (
            <div className="p-4 border-t border-white/10 flex justify-between">
              <button
                onClick={togglePlayPause}
                className="p-2 rounded-full bg-laala-primary/20 hover:bg-laala-primary/30 transition hover-opacity"
              >
                {isPlaying ?
                  <Pause size={20} className="text-laala-primary" /> :
                  <Play size={20} className="text-laala-primary" />
                }
              </button>

              <button
                onClick={toggleMute}
                className="p-2 rounded-full bg-laala-primary/20 hover:bg-laala-primary/30 transition hover-opacity"
              >
                {isMuted ?
                  <VolumeX size={20} className="text-laala-primary" /> :
                  <Volume2 size={20} className="text-laala-primary" />
                }
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default page;