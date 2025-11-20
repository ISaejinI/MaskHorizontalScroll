import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

export default class HorScroll {
    constructor() {
        this.horizontalContainer = document.getElementById('horContainer');

        this._init();
    }

    _init() {
        gsap.registerPlugin(ScrollTrigger);

        this._initHorizontalPin();
        // this._initHorizontalScroll();
    }

    _initHorizontalPin() {
        const trigger = ScrollTrigger.create({
            trigger: this.horizontalContainer,
            start: "top top",
            end: () => `+=${window.innerHeight * 8}`, //ICI pour ralonger la durée du scroll
            pin: true,
            onUpdate: (self) => this._updateHorizontalScroll(self.progress),

        })
    }

    _initHorizontalScroll() {
        const trigger = ScrollTrigger.create({
            trigger: this.horizontalContainer,
            start: "top top",
            end: () => `+=${window.innerHeight * 8}`, //ICI pour ralonger la durée du scroll
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
}