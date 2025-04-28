import { ArrowLeft , Heart , MessageCircle } from "lucide-react";
const page = () => {
  return (
   <main className="mobile-screen dark-blur-background pb-20 "
      style={{
        backgroundImage: `url('https://firebasestorage.googleapis.com/v0/b/la-a-la.appspot.com/o/coverLaaLaImage%2F2025-04-21%2018%3A39%3A10.581522JPEG_20250421_183910_8327017847134772518.jpg?alt=media&token=c9fe07c6-b961-4532-b5d7-5f9670b5fc33')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}>
    <div className="absolute inset-0 bg-black/50 backdrop-blur-[0.01px]"></div>
    <div className="relative z-10">

    
    <div className="flex items-center justify-between w-full px-4 py-3">
      <button className="text-white">
        <ArrowLeft size={24} />
      </button>
      <div className="flex items-center">
        <h1 className="text-white text-lg font-medium">Laala à participation privé</h1>
        <span className="ml-2" style={{ color: "#fe5733" }}>En cours</span>
      </div>
      <div className="w-6"></div> {/* Spacer for alignment */}
    </div>
    <div className="relative mx-4 max-w-1/3 my-6 rounded-lg overflow-hidden shadow-lg">
      <div className="orange-gradient p-3 text-white opacity-70">
        <div className="flex mb-2">
          <img 
            src="https://firebasestorage.googleapis.com/v0/b/la-a-la.appspot.com/o/coverLaaLaImage%2F2025-04-21%2018%3A39%3A10.581522JPEG_20250421_183910_8327017847134772518.jpg?alt=media&token=c9fe07c6-b961-4532-b5d7-5f9670b5fc33" 
            alt="Post thumbnail" 
            className="w-full h-32 rounded-md object-cover"
          />
        </div>
        
        <div className="flex justify-between items-center text-xs mb-1">
          <span>2025-04-21 18:45</span>
          <div className="flex items-center space-x-3">
            <div className="flex items-center">
              <Heart size={16} className="mr-1" />
              <span>2</span>
            </div>
            <div className="flex items-center">
              <MessageCircle size={16} className="mr-1" />
              <span>0</span>
            </div>
          </div>
        </div>
        
        <div className="mt-1">
          <div className="flex">
            <span className="text-white">Auteur :</span>
            <span className="ml-3">Moi</span>
          </div>
          <p className="text-white text-sm mt-1">Moi lors de ma toute pr...</p>
        </div>
      </div>
    </div>

    {/* ------------Stats------------- */}
    <div className="-50 text-center px-4 mt-65">
      <h2 className="text-white text-xl font-medium">Just~me 🌹</h2>
      <a href="#" className="text-laala-orange text-sm mt-1 inline-block">Lire plus</a>
      
      <div className="flex justify-between mt-6 px-2 text-sm">
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
      
      <div className="flex justify-between px-2 text-sm mt-2">
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