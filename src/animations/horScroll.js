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
        this._initElementsAnimation();
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

            this._initElementsAnimation(currentProgress);


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

    _zoomAnimation(element) {
        gsap.to(element, {
            scale: 1.1,
        })
    }

    _revealText(element) {
        gsap.to(element, {
            opacity: 1,
        })
    }

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