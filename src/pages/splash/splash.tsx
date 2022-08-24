import React from "react";
import "./splash.css";
import background from "../../assets/images/bg-splash.png";
import lottie from "lottie-web";
import animationData from "../../assets/animations/home-animation.json";
import { useNavigate } from "react-router-dom";

const Splash = () => {
    const lottieRef = React.useRef<HTMLDivElement>(null);
    const navigate = useNavigate();

    React.useEffect(() => {
        var animDuration = 1000;
        const anim = lottie.loadAnimation({
          container: lottieRef.current!,
          renderer: "svg",
          loop: false,
          autoplay: false,
          animationData
        });
        
        function animatebodymovin(duration: number) {
            const scrollPosition = window.scrollY;
            const scrollMax = window.innerHeight + 1;
            console.log(scrollMax - scrollPosition);
            const maxFrames = anim.totalFrames;
            let elem = document.getElementById("splash");
    
          const frame = (maxFrames / ( scrollMax - scrollPosition - 1 )) * (scrollPosition / (duration / ( scrollMax - scrollPosition  )));
    
          anim.goToAndStop(frame, true);

          if (scrollMax - scrollPosition === 1 && elem) {
            elem.classList.add("animated")
            elem.classList.add("fadeOut")
            navigate("/home")
          }
        }
        const onScroll = () => {
          animatebodymovin(animDuration);
        };
    
        document.addEventListener("scroll", onScroll);
    
        return () => {
          anim.destroy();
          document.removeEventListener("scroll", onScroll);
        };
      }, []);

    return (
        <div className="splash-container" id="splash">
            <img src={ background } alt="background" className="splash-background" />
            <div className="animation-container">
                <div className="animation" ref={lottieRef}></div>
            </div>
        </div>
    )
}

export default Splash