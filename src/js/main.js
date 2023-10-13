import hamburger from "./modules/hamburger";
import drag from "./modules/drag";
import modal from "./modules/modals";
import theme from "./modules/theme";

window.addEventListener('DOMContentLoaded', () => {
    'use strict';

    hamburger();
    drag();
    modal();
    theme();
});