import React, { useState } from "react";
import {
  FaFacebook,
  FaTwitter,
  FaWhatsapp,
  FaTelegramPlane,
  FaCopy,
  FaCheck,
} from "react-icons/fa";

const ShareModal = ({ isOpen, onClose, movieTitle, movieId }) => {
  console.log("isOpen in ShareModal:", isOpen);

  const [copied, setCopied] = useState(false);
  const shareUrl = `${window.location.origin}/movie/${movieId}`;

  const handleCopy = async () => {
    await navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      shareUrl
    )}`,
    twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      `Check out ${movieTitle}`
    )}&url=${encodeURIComponent(shareUrl)}`,
    whatsapp: `https://wa.me/?text=${encodeURIComponent(
      `Check out ${movieTitle}: ${shareUrl}`
    )}`,
    telegram: `https://t.me/share/url?url=${encodeURIComponent(
      shareUrl
    )}&text=${encodeURIComponent(`Check out ${movieTitle}`)}`,
  };

  if (!isOpen) return null;

  return (
    <div className="modal modal-open">
      <div className="modal-box bg-base-200">
        {/* Header */}
        <h3 className="font-montserrat text-xl mb-6">Share {movieTitle}</h3>

        <button
          className="btn btn-sm btn-circle absolute right-2 top-2"
          onClick={onClose}>
          ✕
        </button>

        {/* Social Share Buttons */}
        <div className="flex flex-row flex-1 gap-x-16 justify-center items-center max-w-md  mb-8">
          <a
            href={shareLinks.facebook}
            target="_blank"
            rel="noopener noreferrer">
            <button className="btn btn-circle font-montserrat hover:bg-transparent hover:border-none hover:text-blue-400">
              <FaFacebook className="w-8 h-8" />
              Facebook
            </button>
          </a>

          <a
            href={shareLinks.twitter}
            target="_blank"
            rel="noopener noreferrer">
            <button className="btn btn-circle font-montserrat hover:bg-transparent hover:border-none hover:text-sky-400">
              <FaTwitter className="w-8 h-8" />
              Twitter
            </button>
          </a>

          <a
            href={shareLinks.whatsapp}
            target="_blank"
            rel="noopener noreferrer">
            <button className="btn btn-circle font-montserrat hover:bg-transparent hover:border-none hover:text-green-400">
              <FaWhatsapp className="w-8 h-8" />
              WhatsApp
            </button>
          </a>

          <a
            href={shareLinks.telegram}
            target="_blank"
            rel="noopener noreferrer">
            <button className="btn btn-circle font-montserrat hover:bg-transparent hover:border-none hover:text-blue-400">
              <FaTelegramPlane className="w-8 h-8" />
              Telegram
            </button>
          </a>
        </div>

        {/* Copy Link Section */}
        <div className="space-y-2">
          <label className="text-sm font-mono opacity-70">Share Link</label>
          <div className="flex gap-2">
            <input
              type="text"
              value={shareUrl}
              readOnly
              className="input input-bordered w-full bg-base-300 font-mono"
            />
            <button className="btn btn-outline" onClick={handleCopy}>
              {copied ? (
                <FaCheck className="w-4 h-4" />
              ) : (
                <FaCopy className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>
      </div>

      <div
        className="modal-backdrop bg-black opacity-50"
        onClick={onClose}></div>
    </div>
  );
};

export default ShareModal;
