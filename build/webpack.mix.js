let mix = require('laravel-mix');
const path = require("path");

mix.setResourceRoot('../');
mix.setPublicPath('../');

mix
    .js('assets/toastify-notifications.js', './js/toastify-notifications.js')
    .copy('node_modules/toastify-js/src/toastify.css', '../css/toastify-notifications.css')