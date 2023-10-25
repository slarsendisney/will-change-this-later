import { useAnimation,m  } from "framer-motion";
import { useEffect } from "react";

export const AnimatedText = ({ className, text, active = true, delay=0} :{
    className: string,
    text: string,
    active?: boolean,
    delay?: number
}) => {

    const ctrls = useAnimation();
  
    useEffect(() => {
      if (!active) {
        return;
      }
      setTimeout(() => {
        ctrls.start("visible");
      }, delay);
      return () => {
        ctrls.stop();
      };
    }, [ctrls, text, active, delay]);
  
    const wordAnimation = {
      hidden: {},
      visible: {},
      colorVisibleStyles: {},
    };
  
    const characterAnimation = {
      hidden: {
        opacity: 0,
        y: `0.25em`,
      },
      visible: {
        opacity: 1,
        scale: [1, 1.5, 1],
        y: `0em`,
        transition: {
          duration: 0.1,
          ease: [0.2, 0.65, 0.3, 0.9],
        },
      },
    };
  
    if (!active) {
      return <p className={className}>{text}</p>;
    }

  
    return (
      <m.p aria-label={text} className={className}>
        {text.split(" ").map((word, index) => {
          return (
            <m.span
              aria-hidden="true"
              key={index + word}
              initial="hidden"
              animate={ctrls}
              variants={{ ...wordAnimation }}
              transition={{
                delayChildren: 0.05,
                staggerChildren: 0.05,
              }}
              className="mr-1 inline-block"
            >
              {word.split("").map((character, index) => {
                return (
                  <m.span
                    aria-hidden="true"
                    key={index + character}
                    variants={{ ...characterAnimation }}
                    className="inline-block"
                  >
                    {character}
                  </m.span>
                );
              })}
            </m.span>
          );
        })}
      </m.p>
    );
  };