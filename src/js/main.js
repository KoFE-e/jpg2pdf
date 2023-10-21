import hamburger from "./modules/hamburger";
import drag from "./modules/drag";
import modal from "./modules/modals";
import theme from "./modules/theme";
import jpgtopdf from "./modules/converters/jpgtopdf";
import pdftojpg from "./modules/converters/pdftojpg";
import backend from "./modules/backend";
import load from "./modules/load";

load();

window.addEventListener('DOMContentLoaded', () => {
    'use strict';

    theme();
    hamburger();
    drag();
    modal();
    jpgtopdf();
    pdftojpg();
    backend();
});