/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import { ArrowLeft, Heart, MessageCircle, Play, Pause, Volume2, VolumeX, ExternalLink, Share2, User, Calendar, ChevronUp, Grid, Info, X, Bookmark, Clock } from "lucide-react";
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
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  // Handle scroll events
  const handleScroll = () => {
    setShowScrollTop(window.scrollY > 300);
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
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const hasVideoBackground = !!collection.videoBackground;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Background Video with Overlay */}
      {hasVideoBackground && (
        <div className="fixed inset-0 -z-10 opacity-10">
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

      {/* Header - Responsive Navbar */}
      <header className="sticky top-0 z-40 bg-white shadow-md">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button className="p-2 rounded-full bg-gray-100 hover:bg-orange-100 transition-colors duration-300 group">
              <ArrowLeft size={20} className="text-gray-700 group-hover:text-orange-500 transition-colors duration-300" />
            </button>
            <h1 className="text-gray-800 font-medium">{collection.categorie}</h1>
          </div>

          <div className="px-4 py-1 rounded-full bg-gradient-to-r from-orange-400 to-orange-600 text-white text-sm font-medium shadow-sm">
            {collection.encours ? "En Cours" : "Terminé"}
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        {/* All-in-One Profile Card - Eliminates need for footer */}
        <div className="bg-transparent rounded-xl transition-all duration-300 mb-8">
          
          {/* Main content section with improved layout */}
          <div className="px-4 md:px-6 py-6">
            <div className="md:flex md:gap-8">
              {/* Left column with avatar and actions */}
              <div className="md:w-1/3 flex flex-col items-center">
                {/* Avatar section */}
                <div className="relative mb-4">
                  <div className="w-28 h-28 md:w-32 md:h-32 rounded-full border-4 border-white bg-orange-50 overflow-hidden shadow-md group">
                    <img 
                      src={collection.avatarCrea} 
                      alt={`Photo de profil de ${collection.nomCrea}`} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-all duration-500"
                    />
                  </div>
                </div>
                
                {/* Action Buttons - Stacked */}
                <div className="flex flex-col w-full gap-2">
                  <button className="w-full py-2.5 bg-gradient-to-r from-orange-400 to-orange-600 text-white rounded-full hover:shadow-md transition-all duration-300 flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-orange-300">
                    <User size={16} />
                    <span>Suivre</span>
                  </button>
                  <button className="w-full py-2.5 bg-white/10 backdrop-blur-[1px] border border-white/20 text-gray-700 rounded-full hover:bg-white/20 transition-all duration-300 flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-gray-300">
                    <Share2 size={16} />
                    <span>Partager</span>
                  </button>
                </div>
                
                {/* Quick stats badges */}
                <div className="flex flex-wrap justify-center gap-2 mt-4">
                  <div className="flex items-center gap-1.5 bg-white/10 backdrop-blur-[1px] py-1 px-3 rounded-full border border-white/20">
                    <Heart size={14} className="text-orange-500" />
                    <span className="text-sm font-medium">{collection.likes || 3}</span>
                  </div>
                  <div className="flex items-center gap-1.5 bg-white/10 backdrop-blur-[1px] py-1 px-3 rounded-full border border-white/20">
                    <User size={14} className="text-orange-500" />
                    <span className="text-sm font-medium">{collection.tablikes ? collection.tablikes.length : 3}</span>
                  </div>
                  <div className="flex items-center gap-1.5 bg-white/10 backdrop-blur-[1px] py-1 px-3 rounded-full border border-white/20">
                    <MessageCircle size={14} className="text-orange-500" />
                    <span className="text-sm font-medium">{collection.vues || 20}</span>
                  </div>
                </div>
              </div>
              
              {/* Right column with profile details and description */}
              <div className="md:w-2/3 mt-6 md:mt-0">
                <div className="text-center md:text-left">
                  <h1 className="text-2xl md:text-3xl font-bold text-gray-800 flex items-center gap-1.5 justify-center md:justify-start">
                    {collection.nom}
                  </h1>
                  <div className="flex items-center gap-1 justify-center md:justify-start text-gray-600 mt-1">
                    <User size={14} className="text-orange-500" />
                    <span className="font-medium">{collection.nomCrea}</span>
                    <span className="text-gray-400 text-xs ml-2 flex items-center">
                      <Clock size={12} className="mr-1" /> 
                      <span>Membre depuis {formatDate(collection.date)}</span>
                    </span>
                  </div>
                </div>
                
                {/* Description with elegant styling */}
                <div className="relative bg-gradient-to-tr from-white/5 to-white/15 backdrop-blur-[2px] p-6 rounded-xl mt-6 border-l-4 border-orange-500 border-t border-r border-b border-white/30">
                  <div className="absolute -top-3 -left-3 text-orange-400/30 text-6xl font-serif">&ldquo;</div>
                  <div className="relative z-10">
                    <p className="italic text-gray-700 leading-relaxed">
                      {collection.description || "Ici seront toutes mes photos 😍"}
                    </p>
                    <div className="mt-3 flex justify-end">
                      <div className="h-px w-16 bg-gradient-to-r from-transparent to-orange-300"></div>
                    </div>
                  </div>
                  <div className="absolute -bottom-5 -right-3 text-orange-400/30 text-6xl font-serif transform rotate-180">&ldquo;</div>
                </div>
                
                {/* Additional profile info */}
                <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-gradient-to-tr from-white/5 to-white/15 backdrop-blur-[2px] p-4 rounded-xl border border-white/30 hover:border-orange-200/30 transition-all duration-300 group">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gradient-to-r from-orange-400/20 to-orange-500/20 text-orange-500 group-hover:from-orange-400/30 group-hover:to-orange-500/30 transition-all duration-300">
                        <Calendar size={18} />
                      </div>
                      <div>
                        <div className="text-gray-700 font-medium">Date d&apos;inscription</div>
                        <div className="text-sm text-gray-600 mt-0.5">
                          {formatDate(collection.date)}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-tr from-white/5 to-white/15 backdrop-blur-[2px] p-4 rounded-xl border border-white/30 hover:border-orange-200/30 transition-all duration-300 group">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gradient-to-r from-orange-400/20 to-orange-500/20 text-orange-500 group-hover:from-orange-400/30 group-hover:to-orange-500/30 transition-all duration-300">
                        <User size={18} />
                      </div>
                      <div>
                        <div className="text-gray-700 font-medium">Créé par</div>
                        <div className="text-sm text-gray-600 mt-0.5">
                          {collection.nomCrea}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tab Navigation - Responsive */}
        <div className="mb-8 bg-gradient-to-b from-white/20 to-white/30 backdrop-blur-[2px] rounded-lg border border-white/30 p-1 shadow-sm">
          <div className="flex gap-4 border-b border-gray-200/30">
            <button
              onClick={() => setActiveTab('media')}
              className={`px-6 py-3 text-sm font-medium relative flex items-center gap-2 ${activeTab === 'media' ? 'text-orange-500' : 'text-gray-500'} hover:text-orange-500 transition-colors duration-300`}
            >
              <Grid size={16} className={activeTab === 'media' ? 'text-orange-500' : 'text-gray-400'} />
              Media
              {activeTab === 'media' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-orange-400 to-orange-600"></div>}
            </button>
            <button
              onClick={() => setActiveTab('info')}
              className={`px-6 py-3 text-sm font-medium relative flex items-center gap-2 ${activeTab === 'info' ? 'text-orange-500' : 'text-gray-500'} hover:text-orange-500 transition-colors duration-300`}
            >
              <Info size={16} className={activeTab === 'info' ? 'text-orange-500' : 'text-gray-400'} />
              Info
              {activeTab === 'info' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-orange-400 to-orange-600"></div>}
            </button>
          </div>
        </div>

        {/* Media Grid - Responsive with Masonry-like Layout */}
        {activeTab === 'media' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {laala.fichierAlbum && laala.fichierAlbum.map((media, index) => {
              const metadata = laala.albumMetadata && laala.albumMetadata[index];
              return (
                <div
                  key={index}
                  onClick={() => openMedia(media)}
                  className="group relative bg-gradient-to-b from-white/20 to-white/40 backdrop-blur-[2px] rounded-xl overflow-hidden border border-white/30 shadow-sm hover:shadow-md transition-all duration-500 cursor-pointer opacity-0 animate-fade-in-up transform hover:-translate-y-2"
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
                        <div className="absolute inset-0 flex items-center justify-center bg-black/10 group-hover:bg-orange-500/20 transition-colors duration-500">
                          <div className="w-16 h-16 flex items-center justify-center rounded-full bg-orange-500/80 backdrop-blur-sm transform group-hover:scale-110 transition-transform duration-500 shadow-lg">
                            <Play className="w-7 h-7 text-white" />
                          </div>
                        </div>
                      </div>
                    ) : (
                      <img
                        src={media}
                        alt={metadata?.title || `Media ${index + 1}`}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                    )}

                    {/* Info Overlay */}
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-1.5">
                          <Heart size={16} className="text-orange-400" />
                          <span className="text-white text-xs">{metadata?.likes || 0}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <MessageCircle size={16} className="text-orange-400" />
                          <span className="text-white text-xs">{metadata?.comments || 0}</span>
                        </div>
                      </div>
                    </div>

                    {/* Bookmark Button Overlay */}
                    <button className="absolute top-3 right-3 p-2 rounded-full bg-white/80 opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-orange-400 hover:text-white">
                      <Bookmark size={16} className="group-hover:scale-110 transition-transform" />
                    </button>
                  </div>

                  <div className="p-4 backdrop-blur-sm bg-white/5">
                    <div className="mb-2 line-clamp-1">
                      <h3 className="text-gray-800 text-sm font-medium group-hover:text-orange-500 transition-colors duration-300">
                        {metadata?.title || "Sans titre"}
                      </h3>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center text-gray-500 text-xs">
                        <Clock size={12} className="mr-1 text-orange-400" />
                        <span>{formatDate(metadata?.date || laala.date)}</span>
                      </div>
                      <span className="text-orange-500 text-xs font-medium">{collection.nomCrea}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Info Tab Content - Responsive Design */}
        {activeTab === 'info' && (
          <div className="md:grid md:grid-cols-2 md:gap-8">
            <div className="bg-gradient-to-b from-white/20 to-white/40 backdrop-blur-[2px] rounded-xl border border-white/30 p-6 shadow-sm hover:shadow transition-all duration-300 opacity-0 animate-fade-in mb-6 md:mb-0" style={{ animationFillMode: 'forwards' }}>
              <h3 className="text-orange-500 font-medium mb-4 flex items-center gap-2 text-lg">
                <Info size={20} />
                Détails supplémentaires
              </h3>
              <p className="text-gray-700 mb-8 leading-relaxed">Cette collection contient des médias variés qui représentent un moment important. Explorez et découvrez le contenu unique de cette collection.</p>
              
              <div className="flex items-center gap-4 mb-6 p-4 bg-white/10 backdrop-blur-[1px] rounded-lg border border-white/20 hover:bg-white/20 transition-colors duration-300">
                <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center shadow-sm">
                  <Clock size={20} className="text-orange-500" />
                </div>
                <div>
                  <div className="text-gray-500 text-xs uppercase tracking-wider">Durée</div>
                  <div className="text-gray-800 font-medium mt-1">
                    {(() => {
                      const date1 = new Date(collection.date);
                      const date2 = new Date();
                      const diffTime = Math.abs(date2.getTime() - date1.getTime());
                      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                      return `${diffDays} jours`;
                    })()}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4 mb-6 p-4 bg-white/10 backdrop-blur-[1px] rounded-lg border border-white/20 hover:bg-white/20 transition-colors duration-300">
                <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center shadow-sm">
                  <Grid size={20} className="text-orange-500" />
                </div>
                <div>
                  <div className="text-gray-500 text-xs uppercase tracking-wider">Nombre de médias</div>
                  <div className="text-gray-800 font-medium mt-1">
                    {laala.fichierAlbum ? laala.fichierAlbum.length : 0} médias
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 bg-white/10 backdrop-blur-[1px] rounded-lg border border-white/20 hover:bg-white/20 transition-colors duration-300">
                <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center shadow-sm">
                  <ExternalLink size={20} className="text-orange-500" />
                </div>
                <div className="flex-1">
                  <div className="text-gray-500 text-xs uppercase tracking-wider">Disponibilité</div>
                  <div className="text-gray-800 font-medium mt-1">Accès public</div>
                </div>
                <div className="bg-green-500 text-white px-3 py-1 rounded-full text-xs">
                  En ligne
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-b from-white/20 to-white/40 backdrop-blur-[2px] rounded-xl border border-white/30 p-6 shadow-sm hover:shadow transition-all duration-300 opacity-0 animate-fade-in" style={{ animationDelay: '200ms', animationFillMode: 'forwards' }}>
              <h3 className="text-orange-500 font-medium mb-6 flex items-center gap-2 text-lg">
                <Share2 size={20} />
                Statistiques
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="p-5 bg-white/10 backdrop-blur-[1px] rounded-lg border border-white/20 hover:bg-white/20 transition-colors duration-300 hover:shadow-sm group">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-gray-600 group-hover:text-gray-800 transition-colors duration-300">Vues</span>
                    <span className="text-orange-500 font-bold text-lg group-hover:text-orange-600 transition-colors duration-300">
                      {collection.vues || 0}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200/60 h-3 rounded-full overflow-hidden">
                    <div className="bg-orange-500 h-full rounded-full transition-all duration-500 group-hover:bg-orange-600" style={{ width: `${Math.min(100, ((collection.vues || 0) / 100) * 100)}%` }}></div>
                  </div>
                </div>
                
                <div className="p-5 bg-white/10 backdrop-blur-[1px] rounded-lg border border-white/20 hover:bg-white/20 transition-colors duration-300 hover:shadow-sm group">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-gray-600 group-hover:text-gray-800 transition-colors duration-300">J&apos;aime</span>
                    <span className="text-orange-500 font-bold text-lg group-hover:text-orange-600 transition-colors duration-300">
                      {collection.likes || 0}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200/60 h-3 rounded-full overflow-hidden">
                    <div className="bg-orange-500 h-full rounded-full transition-all duration-500 group-hover:bg-orange-600" style={{ width: `${Math.min(100, ((collection.likes || 0) / 5) * 100)}%` }}></div>
                  </div>
                </div>
                
                <div className="p-5 bg-white/10 backdrop-blur-[1px] rounded-lg border border-white/20 hover:bg-white/20 transition-colors duration-300 hover:shadow-sm group">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-gray-600 group-hover:text-gray-800 transition-colors duration-300">Partages</span>
                    <span className="text-orange-500 font-bold text-lg group-hover:text-orange-600 transition-colors duration-300">
                      {laala.vues || 0}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200/60 h-3 rounded-full overflow-hidden">
                    <div className="bg-orange-500 h-full rounded-full transition-all duration-500 group-hover:bg-orange-600" style={{ width: `${Math.min(100, ((laala.vues || 0) / 10) * 100)}%` }}></div>
                  </div>
                </div>
                
                <div className="p-5 bg-white/10 backdrop-blur-[1px] rounded-lg border border-white/20 hover:bg-white/20 transition-colors duration-300 hover:shadow-sm group">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-gray-600 group-hover:text-gray-800 transition-colors duration-300">Activité</span>
                    <span className="text-orange-500 font-bold text-lg group-hover:text-orange-600 transition-colors duration-300">
                      {Math.floor(Math.random() * 100)}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200/60 h-3 rounded-full overflow-hidden">
                    <div className="bg-orange-500 h-full rounded-full transition-all duration-500 group-hover:bg-orange-600" style={{ width: `${Math.floor(Math.random() * 100)}%` }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Scroll to top button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-20 p-3 rounded-full bg-gradient-to-r from-orange-400 to-orange-600 opacity-0 animate-fade-in shadow-lg hover:opacity-90 transition-all duration-300 hover:scale-110"
          style={{ animationFillMode: 'forwards' }}
        >
          <ChevronUp size={20} className="text-white" />
        </button>
      )}

      {/* Media Viewer Modal - Responsive */}
      {selectedMedia && (
        <div className="fixed inset-0 z-50 bg-white/90 backdrop-blur-md flex flex-col">
          <div className="p-4 border-b border-gray-200/70 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                onClick={closeMedia}
                className="p-2 rounded-full bg-orange-100/80 hover:bg-orange-200/80 transition-colors duration-300"
              >
                <X size={20} className="text-orange-600" />
              </button>
              <h3 className="text-gray-800 font-medium">Media Viewer</h3>
            </div>

            <div className="flex gap-3">
              <button className="p-2 rounded-full bg-orange-100/80 hover:bg-orange-200/80 transition-colors duration-300">
                <Heart size={20} className="text-orange-600" />
              </button>
              <button className="p-2 rounded-full bg-orange-100/80 hover:bg-orange-200/80 transition-colors duration-300">
                <Share2 size={20} className="text-orange-600" />
              </button>
              <button className="p-2 rounded-full bg-orange-100/80 hover:bg-orange-200/80 transition-colors duration-300">
                <ExternalLink size={20} className="text-orange-600" />
              </button>
            </div>
          </div>

          <div className="flex-1 flex items-center justify-center p-4 bg-gradient-to-b from-orange-50/30 to-white/30">
            {isVideo(selectedMedia) ? (
              <video
                src={selectedMedia}
                className="max-w-full max-h-[calc(100vh-120px)] rounded-lg shadow-md"
                controls
                autoPlay
                playsInline
              />
            ) : (
              <img
                src={selectedMedia}
                alt="Selected media"
                className="max-w-full max-h-[calc(100vh-120px)] rounded-lg shadow-md object-contain"
              />
            )}
          </div>

          {/* Controls in modal for videos */}
          {isVideo(selectedMedia) && (
            <div className="p-5 border-t border-gray-200/70 flex justify-between">
              <button
                onClick={togglePlayPause}
                className="p-3 rounded-full bg-orange-100/80 hover:bg-orange-200/80 transition-colors duration-300"
              >
                {isPlaying ?
                  <Pause size={20} className="text-orange-600" /> :
                  <Play size={20} className="text-orange-600" />
                }
              </button>

              <button
                onClick={toggleMute}
                className="p-3 rounded-full bg-orange-100/80 hover:bg-orange-200/80 transition-colors duration-300"
              >
                {isMuted ?
                  <VolumeX size={20} className="text-orange-600" /> :
                  <Volume2 size={20} className="text-orange-600" />
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