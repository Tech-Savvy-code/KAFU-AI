import { useEffect, useState } from "react";
import Particles from "@tsparticles/react";
import { loadSlim } from "tsparticles-slim";

export default function ParticlesBackground() {
  const [init, setInit] = useState(false);

  useEffect(() => {
    const initParticles = async (engine) => {
      try {
        await loadSlim(engine);
        setInit(true);
      } catch (err) {
        console.error("Particles failed to load:", err);
      }
    };

    initParticles();
  }, []);

  if (!init) return null;

  return (
    <Particles
      id="tsparticles"
      options={{
        fullScreen: { enable: false },
        background: { color: "transparent" },
        particles: {
          number: { value: 60 },
          color: { 
            value: ["#10b981", "#06b6d4", "#8b5cf6", "#ec4899", "#f59e0b"]
          },
          links: {
            enable: true,
            distance: 180,
            color: "#10b981",
            opacity: 0.25,
            width: 1.2,
          },
          move: { 
            enable: true, 
            speed: 0.8,
            direction: "none",
            random: true,
            straight: false,
            outModes: {
              default: "bounce",
            },
          },
          size: { 
            value: { min: 2, max: 5 },
            animation: {
              enable: true,
              speed: 1,
              minimumValue: 1,
              sync: false,
            }
          },
          opacity: { 
            value: { min: 0.3, max: 0.6 },
            animation: {
              enable: true,
              speed: 1,
              minimumValue: 0.1,
              sync: false,
            }
          },
          shape: {
            type: "circle",
          },
        },
        interactivity: {
          events: {
            onHover: {
              enable: true,
              mode: "grab",
            },
            onClick: {
              enable: true,
              mode: "push",
            },
            resize: true,
          },
          modes: {
            grab: {
              distance: 140,
              links: {
                opacity: 0.5,
                color: "#10b981",
              },
            },
            push: {
              quantity: 4,
            },
          },
        },
        detectRetina: true,
      }}
    />
  );
}
