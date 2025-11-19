import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

export default class HorScroll {
    constructor() {
        this._init();
    }

    _init() {
        gsap.registerPlugin(ScrollTrigger);
    }
}