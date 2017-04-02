import exec from './highlight.pack.exec.js';
import {StyleLintOncogene} from './stylelintOncogene.js';
import {options} from './options.js';
import '../css/style.css';
import '../css/github-gist.css';

(() => {
    const generator = new StyleLintOncogene(options);
    const backBtn = document.querySelector('.js-back-btn');

    backBtn.addEventListener('click', () => {
        generator.prevStep();
    });
})();
