import StyleLintOncogene from './stylelintOncogene';
import options from './options';
import '../css/style.css';
import '../css/github-gist.css';

(() => {
    const generator = new StyleLintOncogene(options);
    const backBtn = document.querySelector('.js-back-btn');
    const copyBtn = document.querySelector('.js-copy-btn');
    const popupWrapper = document.querySelector('.js-popup-wrapper');
    const popup = document.querySelector('.js-popup');
    const popupShowingTime = 700;

    backBtn.addEventListener('click', () => {
        generator.prevStep();
    });
})();
