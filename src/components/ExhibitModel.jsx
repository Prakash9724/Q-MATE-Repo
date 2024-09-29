import React from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaTimes,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";

function ExhibitModal({ exhibit, onClose }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-2 sm:p-4">
  <div className="bg-white rounded-lg w-full max-w-3xl max-h-[90vh] overflow-y-auto">
    <div className="p-4 sm:p-6 flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl sm:text-2xl font-bold">{exhibit.name}</h2>
        <button
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700"
        >
          <FaTimes size={20} />
        </button>
      </div>
      <div className="aspect-w-16 aspect-h-9 mb-4 rounded-md overflow-hidden">
        <iframe
          src={`https://www.youtube.com/embed/${exhibit.youtubeId}`}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="w-full h-full"
        ></iframe>
      </div>
      <p className="text-gray-700 mb-4 text-sm sm:text-base">{exhibit.description}</p>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <h3 className="font-semibold mb-1 text-sm sm:text-base">Artist</h3>
          <p className="text-sm">{exhibit.artist}</p>
        </div>
        <div>
          <h3 className="font-semibold mb-1 text-sm sm:text-base">Year</h3>
          <p className="text-sm">{exhibit.year}</p>
        </div>
        <div>
          <h3 className="font-semibold mb-1 text-sm sm:text-base">Medium</h3>
          <p className="text-sm">{exhibit.medium}</p>
        </div>
        <div>
          <h3 className="font-semibold mb-1 text-sm sm:text-base">Dimensions</h3>
          <p className="text-sm">{exhibit.dimensions}</p>
        </div>
      </div>
      <div className="flex flex-col sm:flex-row justify-between items-center mt-4">
        <div className="mb-4 sm:mb-0">
          <a href="/" className="px-3 sm:px-4 py-1 sm:py-2 bg-white text-black border hover:bg-black/10 border-black rounded-lg text-xs sm:text-sm font-semibold">
            Learn more
          </a>
        </div>
        <div className="flex gap-2 sm:gap-4">
          <a
            href="#"
            className="text-gray-600 border border-gray-300 hover:scale-110 transform transition-ease-in-out duration-150 p-1 sm:p-2 rounded-md hover:text-blue-600"
          >
            <FaFacebookF size={14} />
          </a>
          <a
            href="#"
            className="text-gray-600 border border-gray-300 hover:scale-110 transform transition-ease-in-out duration-150 p-1 sm:p-2 rounded-md hover:text-blue-400"
          >
            <FaTwitter size={14} />
          </a>
          <a
            href="#"
            className="text-gray-600 border border-gray-300 hover:scale-110 transform transition-ease-in-out duration-150 p-1 sm:p-2 rounded-md hover:text-pink-600"
          >
            <FaInstagram size={14} />
          </a>
          <a
            href="#"
            className="text-gray-600 border border-gray-300 hover:scale-110 transform transition-ease-in-out duration-150 p-1 sm:p-2 rounded-md hover:text-red-600"
          >
            <FaYoutube size={14} />
          </a>
        </div>
      </div>
    </div>
  </div>
</div>
  );
}

export default ExhibitModal;
