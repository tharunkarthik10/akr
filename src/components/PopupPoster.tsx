"use client";

import React, { useEffect, useState } from 'react';
import { supabase } from '@/utils/supabase/client';
import confetti from 'canvas-confetti';
import Link from 'next/link';

export default function PopupPoster() {
  const [show, setShow] = useState(false);
  const [posterUrl, setPosterUrl] = useState<string | null>(null);
  const [posterLink, setPosterLink] = useState<string | null>(null);

  useEffect(() => {
    // Only show once per session
    const hasSeen = sessionStorage.getItem('hasSeenPoster');
    if (hasSeen) return;

    const fetchPosters = async () => {
      try {
        const { data, error } = await supabase
          .from('posters')
          .select('image_url, link_url')
          .eq('is_active', true);
        
        if (error) {
          console.error("Error fetching posters:", error);
          return;
        }

        if (data && data.length > 0) {
          // Pick a random poster
          const randomIndex = Math.floor(Math.random() * data.length);
          setPosterUrl(data[randomIndex].image_url);
          setPosterLink(data[randomIndex].link_url);
          setShow(true);
        }
      } catch (err) {
        console.error("Unexpected error fetching posters:", err);
      }
    };

    fetchPosters();
  }, []);

  const handleClose = () => {
    setShow(false);
    sessionStorage.setItem('hasSeenPoster', 'true');
  };

  // Trigger confetti effect when the poster is shown
  useEffect(() => {
    if (show) {
      const duration = 2.5 * 1000;
      const end = Date.now() + duration;

      const frame = () => {
        // Left side
        confetti({
          particleCount: 4,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: ['#8b0000', '#d4af37', '#ffffff'], // Gold, Red, White theme
          zIndex: 10001
        });
        // Right side
        confetti({
          particleCount: 4,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: ['#8b0000', '#d4af37', '#ffffff'],
          zIndex: 10001
        });

        if (Date.now() < end && show) {
          requestAnimationFrame(frame);
        }
      };

      frame();
    }
  }, [show]);

  if (!show || !posterUrl) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.75)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 9999, // Ensure it's above everything
      padding: '2rem'
    }}>
      <div style={{ position: 'relative', maxWidth: '90vw', maxHeight: '90vh' }}>
        <button 
          onClick={handleClose}
          style={{
            position: 'absolute',
            top: '-15px',
            right: '-15px',
            background: 'var(--primary-red, #8b0000)',
            color: 'white',
            border: 'none',
            borderRadius: '50%',
            width: '30px',
            height: '30px',
            fontSize: '16px',
            cursor: 'pointer',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            boxShadow: '0 2px 10px rgba(0,0,0,0.3)',
            zIndex: 10000
          }}
          aria-label="Close"
        >
          &times;
        </button>
        {posterLink ? (
          <Link href={posterLink} onClick={handleClose} style={{ display: 'block', cursor: 'pointer' }}>
            <img 
              src={posterUrl} 
              alt="Promotional Poster" 
              style={{ 
                maxWidth: '100%', 
                maxHeight: '90vh', 
                objectFit: 'contain',
                borderRadius: '8px',
                boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
                display: 'block'
              }} 
            />
          </Link>
        ) : (
          <img 
            src={posterUrl} 
            alt="Promotional Poster" 
            style={{ 
              maxWidth: '100%', 
              maxHeight: '90vh', 
              objectFit: 'contain',
              borderRadius: '8px',
              boxShadow: '0 10px 30px rgba(0,0,0,0.5)'
            }} 
          />
        )}
      </div>
    </div>
  );
}
