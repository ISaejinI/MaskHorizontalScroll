import './style.scss';
import HorScroll from './animations/horScroll';
import LenisScroll from './animations/lenisScroll';

document.addEventListener('DOMContentLoaded', () => {
    new HorScroll();
    new LenisScroll();
});
