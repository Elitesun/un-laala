import { ArrowLeft, Heart, MessageCircle } from "lucide-react";
import Image from "next/image";
import laala from "@/data/laala.json"
import collection from "@/data/collection.json"

const page = () => {
  // Check if video background exists
  const hasVideoBackground = !!collection.videoBackground;

  return (
    <main className="mobile-screen dark-blur-background pb-20 relative h-screen overflow-hidden">
      {/* Render video background if it exists, otherwise use image background */}
      {hasVideoBackground ? (
        <div className="absolute inset-0 overflow-hidden z-0 h-screen w-screen">
          <video
            src={collection.videoBackground}
            autoPlay
            muted
            loop
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
          />
          <div className="absolute inset-0 bg-black/60 backdrop-blur-[0.01px]"></div>
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
        <div className="relative mx-4 max-w-1/3 my-6 rounded-lg overflow-hidden shadow-lg">
          <div className="orange-gradient p-3 text-white opacity-70">
            <div className="flex mb-2">
              <Image
                src={laala.fichierAlbum[0]}
                alt="Post thumbnail"
                width={400}
                height={128}
                className="w-full h-32 rounded-md object-cover"
              />
            </div>

            <div className="flex justify-between items-center text-xs mb-1">
              <span>{laala.date}{laala.heure}</span>
              <div className="flex items-center space-x-3">
                <div className="flex items-center">
                  <Heart size={16} className="mr-1" />
                  <span>{laala.likes}</span>
                </div>
                <div className="flex items-center">
                  <MessageCircle size={16} className="mr-1" />
                  <span>{laala.commentaires}</span>
                </div>
              </div>
            </div>

            <div className="mt-1">
              <div className="flex">
                <span className="text-white">Auteur :</span>
                <span className="ml-3">{laala.nomCrea}</span>
              </div>
              <p className="text-white text-sm mt-1 truncate">{laala.nom_l}.</p>
            </div>
          </div>
        </div>

        {/* ------------Stats------------- */}
        <div className="fixed bottom-[60px] w-full max-w-full px-4 py-3 text-center">
          <h2 className="text-white text-xl font-medium">Just~me 🌹</h2>
          <a href="#" className="text-laala-orange text-sm mt-1 inline-block">Lire plus</a>

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
    </main>
  );
}

export default page;