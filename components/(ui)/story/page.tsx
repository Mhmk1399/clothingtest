"use client";
import { useState, useEffect } from "react";
import Modal from "react-modal";
import Image from "next/image";

interface Media {
  id: string;
  image?: string;
  video?: string;
  title?: string;
  link?: string;
}

const StoryComponent = () => {
  const [headerImages, setHeaderImages] = useState<Media[]>([]);
  const [selectedMedia, setSelectedMedia] = useState<Media | null>(null);

  useEffect(() => {
    const fetchStories = async () => {
      try {
        const res = await fetch("/api/Story");
        const data = await res.json();
        setHeaderImages(data);
      } catch (error) {
        console.error("Error fetching stories:", error);
      }
    };

    fetchStories();
  }, []);

  const handleImageClick = (media: Media) => {
    setSelectedMedia(media);
  };

  const handleCloseModal = () => {
    setSelectedMedia(null);
  };

  return (
    <div className="flex justify-center items-center py-5">
      {/* Scrollable section for circles */}
      <div className="flex gap-4 overflow-x-auto w-full px-4 py-4">
        {headerImages.map((media) => (
          <div
            key={media.id}
            className="flex-none w-24 h-24 rounded-full bg-gray-50 p-1 cursor-pointer hover:scale-105 transition-transform"
            onClick={() => handleImageClick(media)}
          >
            {media.image && (
              <Image
                src={media.image}
                alt={media.title || ""}
                className="rounded-full object-cover w-full h-full"
                width={100}
                height={100}
              />
            )}
          </div>
        ))}
      </div>

      {/* Modal for displaying selected media */}
      <Modal
        isOpen={!!selectedMedia}
        onRequestClose={handleCloseModal}
        contentLabel="Selected Media"
        style={{
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.8)",
            zIndex: 1000,
          },
          content: {
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "transparent",
            border: "none",
            maxWidth: "80vw",
            maxHeight: "80vh",
            zIndex: 1001,
          },
        }}
      >
        {selectedMedia && selectedMedia.video && (
          <video
            src={selectedMedia.video}
            controls
            autoPlay
            className="max-w-full max-h-full"
          />
        )}
        {selectedMedia && selectedMedia.image && (
          <Image
            src={selectedMedia.image}
            alt={selectedMedia.title || ""}
            width={500}
            height={500}
            className="max-w-full max-h-full"
          />
        )}
        {selectedMedia && selectedMedia.link && (
          <a
            href={selectedMedia.link}
            className="mt-3 py-2 px-4 bg-white text-black rounded-md"
          >
            خرید
          </a>
        )}
        <button
          onClick={handleCloseModal}
          className="absolute top-2 right-2 text-white text-3xl cursor-pointer"
        >
          ×
        </button>
      </Modal>
    </div>
  );
};

export default StoryComponent;
