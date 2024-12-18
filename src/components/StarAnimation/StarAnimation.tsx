import React, { useCallback, useEffect, useState } from 'react';
import Particles, { initParticlesEngine } from "@tsparticles/react";
import type { Container, ISourceOptions } from "@tsparticles/engine";
import { loadFull } from "tsparticles";
import styled from 'styled-components';
import { CentralStar } from './CentralStar';

const AnimationContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CenterStar = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;
`;

const StarAnimation: React.FC = () => {
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadFull(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const particlesLoaded = useCallback(async (container: Container | undefined) => {
    console.log(container);
  }, []);

  const options: ISourceOptions = {
    fullScreen: {
      enable: false
    },
    background: {
      color: {
        value: "transparent",
      },
    },
    interactivity: {
      events: {
        onHover: {
          enable: true,
          mode: "repulse"
        },
        resize: {
          enable: true
        }
      },
      modes: {
        repulse: {
          distance: 100,
          duration: 0.4
        }
      }
    },
    detectRetina: true,
    emitters: [
      {
        direction: "none",
        position: {
          x: 50,
          y: 50
        },
        rate: {
          delay: 0.2,
          quantity: 1
        },
        size: {
          width: 0,
          height: 0
        },
        particles: {
          shape: {
            type: "star",
            options: {
              star: {
                sides: 5,
                inset: 2
              }
            }
          },
          size: {
            value: { min: 2, max: 4 }
          },
          color: {
            value: ["#FFD700", "#FFA500", "#FFB347"]
          }
        }
      },
      {
        direction: "none",
        position: {
          x: 50,
          y: 50
        },
        rate: {
          delay: 0.2,
          quantity: 1
        },
        size: {
          width: 0,
          height: 0
        },
        particles: {
          shape: {
            type: "char",
            options: {
              char: {
                value: ["✦"],
                font: "128px arial",
                style: "bold",
                weight: "900"
              }
            }
          },
          size: {
            value: { min: 15, max: 25 },
          },
          color: {
            value: ["#FFD700", "#FFA500", "#FFB347"]
          }
        }
      }
    ],
    particles: {
      number: {
        value: 0,
      },
      opacity: {
        value: { min: 0.4, max: 0.8 }
      },
      move: {
        enable: true,
        speed: { min: 0.5, max: 1.5 },
        direction: "outside",
        random: false,
        straight: false,
        outModes: {
          default: "destroy"
        },
        attract: {
          enable: false
        }
      },
      life: {
        duration: {
          value: 4,
          sync: false
        },
        count: 1
      }
    }
  };

  return (
    <AnimationContainer>
      <CenterStar>
        <CentralStar />
      </CenterStar>
      {init && (
        <Particles
          id="tsparticles"
          options={options}
          particlesLoaded={particlesLoaded}
        />
      )}
    </AnimationContainer>
  );
};

export default StarAnimation;
