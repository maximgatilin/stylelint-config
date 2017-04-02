import exec from './highlight.pack.exec.js';
import {StyleLintOncogene} from './stylelintOncogene.js';
import {options} from './options.js';
import '../css/style.css';
import '../css/github-gist.css';

(() => {
    const generator = new StyleLintOncogene(options);
    const dismissBtn = document.querySelector('.js-dismiss-btn');
    const resetBtn = document.querySelector('.js-reset-btn');
    const backBtn = document.querySelector('.js-back-btn');

    dismissBtn.addEventListener('click', () => {
        generator.nextStep();
    });

    backBtn.addEventListener('click', () => {
        generator.prevStep();
    });
})();
