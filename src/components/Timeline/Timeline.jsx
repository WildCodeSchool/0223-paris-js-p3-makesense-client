import React, { useEffect, useRef } from "react";
import Timeimg from "../../assets/Timeline.png"

const Timeline = ({ percentage }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    // Charger l'image
    const img = new Image();
    img.src = {Timeimg}

    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;

      // Dessiner l'image du sablier gris sur le canvas
      ctx.drawImage(img, 0, 0, img.width, img.height);

      // Déterminer la hauteur de remplissage en fonction du pourcentage donné
      const fillHeight = (img.height * percentage) / 100;

      // Remplacer les pixels du sablier par des pixels verts jusqu'à la hauteur de remplissage
      const imageData = ctx.getImageData(0, 0, img.width, img.height);
      const data = imageData.data;

      for (let y = 0; y < fillHeight; y++) {
        for (let x = 0; x < img.width; x++) {
          const index = (y * img.width + x) * 4;
          // Remplacer les pixels gris par des pixels verts
          data[index] = 0; // Rouge
          data[index + 1] = 255; // Vert
          data[index + 2] = 0; // Bleu
        }
      }

      // Mettre à jour les données des pixels sur le canvas
      ctx.putImageData(imageData, 0, 0);
    };
  }, [percentage]);

  return <canvas ref={canvasRef} />;
};

export default Timeline;
