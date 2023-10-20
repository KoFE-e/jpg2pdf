import hamburger from "./modules/hamburger";
import drag from "./modules/drag";
import modal from "./modules/modals";
import theme from "./modules/theme";
import jpgtopdf from "./modules/converters/jpgtopdf";
import pdftojpg from "./modules/converters/pdftojpg";
import login from "./modules/login";
import backend from "./modules/backend";

window.addEventListener('DOMContentLoaded', () => {
    'use strict';

    hamburger();
    drag();
    modal();
    theme();
    jpgtopdf();
    pdftojpg();
    login();
    backend();
});