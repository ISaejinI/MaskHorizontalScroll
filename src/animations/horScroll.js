import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

export default class HorScroll {
    constructor() {
        this.horizontalContainer = document.getElementById('horContainer');
        this.images = document.querySelectorAll('.stained');
        this.descriptions = document.querySelectorAll('.textToReveal');

        this._init();
    }

    _init() {
        gsap.registerPlugin(ScrollTrigger);

        this._setupElements();
        this._initHorizontalPin();
        // this._initElementsAnimation();
    }

    _setupElements() {
        this.images.forEach((image) => {
            gsap.set(image, {scale: 0.9});
        });

        this.descriptions.forEach((desc) => {
            gsap.set(desc, {opacity: 0});
        });
    }

    _initHorizontalPin() {
        const trigger = ScrollTrigger.create({
            trigger: this.horizontalContainer,
            start: "top top",
            end: () => `+=${window.innerHeight * 8}`,
            pin: true,
            scrub: 1,
            onUpdate: (self) => this._updateHorizontalScroll(self.progress),

        })
    }


    _updateHorizontalScroll(progress) {
        if(progress > 0.1 && progress <= 0.95) {
            const currentProgress = (progress - 0.1) / (0.95 - 0.1);

            const translateX = currentProgress * (((this.horizontalContainer.scrollWidth - window.innerWidth)*100)/this.horizontalContainer.scrollWidth);
            gsap.set(this.horizontalContainer, {
                x: `-${translateX}%`,
            });

            // this._initElementsAnimation(currentProgress);

            //Peut-être la solution pour d"clencher les imaes au bon moment ???
            this.images.forEach((img) =>{
                const rect = img.getBoundingClientRect();
                const left = rect.left;
                const right = rect.right;

                if(left < window.innerWidth && right > 0) {
                    gsap.set(img, {
                        scale: 0.9 + 0.3 * ((window.innerWidth - left) / (window.innerWidth + rect.width)), // Je ne comprends pas le calcul mais en rajoutant des chiffres un peu au hasard ça fonctionne
                    })
                }
            })


        } else if (progress > 0.95) {
            gsap.set(this.horizontalContainer, {
                x: `-${((this.horizontalContainer.scrollWidth - window.innerWidth)*100)/this.horizontalContainer.scrollWidth}%`,
            });
        } else if (progress <= 0.1) {
            gsap.set(this.horizontalContainer, {
                x: `0%`,
            });
        }
    }

    // Ne sert pas
    _zoomAnimation(element) {
        gsap.to(element, {
            scale: 1.1,
        })
    }

    //Comment déclencher l'animation au bon moment ????
    _revealText(element) {
        const lines = [];
        const split = new SplitText(el, {
            type: "lines",
            mask: "lines",
            linesClass: "line++",
        });
        const computedStyle = window.getComputedStyle(el);
        const textIndent = computedStyle.textIndent;
        if (textIndent && textIndent !== "0px") {
            if (split.lines.length > 0) {
                split.lines[0].style.paddingLeft = textIndent;
            }
            el.style.textIndent = "0";
        }
        lines.push(...split.lines);
        lines.forEach((line) => {
            const clone = line.cloneNode(true);
            line.parentNode.appendChild(clone);
            gsap.set(clone, { position: "absolute", top: 0, left: 0 });

            gsap.set(line, {
                opacity: 0.4,
            });
            gsap.fromTo(
                clone,
                { clipPath: "inset(0 100% 0 0)" },
                {
                    clipPath: "inset(0 0% 0 0)",
                    scrollTrigger: {
                        trigger: line,
                        start: "top 80%",
                        end: "top 60%",
                        scrub: 1,
                        ease: "none",
                    },
                }
            );
        });
    }

    // Ne focntionne pas du tout, à supprimer
    _initElementsAnimation(progress) {
        this.images.forEach((image) => {
            const rect = image.getBoundingClientRect();
            const left = rect.left;
            const right = rect.right;


            ScrollTrigger.create({
                trigger: image,
                start: `${left-window.innerWidth*progress} bottom`,
                end: `${right-window.innerWidth*progress} top`,
                scrub: 1,
                markers: true,
                onUpdate: (self) => {
                    gsap.to(image, {
                        scale: 0.9 + (0.2 * self.progress),
                        ease: "power3.out",
                    })
                }
            })
        })
    }
}