import exec from './highlight.pack.exec.js';
import { StyleLintOncogene } from './stylelintOncogene.js';
import { options } from './options.js';
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

    copyBtn.addEventListener('click', () => {
        copyToClipboard('.config');
    });

    function copyToClipboard(containerid) {
    	try {
    		window.getSelection().removeAllRanges();
        const range = document.createRange();
        range.selectNode(document.querySelector(containerid));
        window.getSelection().addRange(range);
        document.execCommand("Copy");
        window.getSelection().removeAllRanges();
        showQuickPopup('Copied');
    	} catch(e) {
    		showQuickPopup('Error. Please try again');
    		throw new Error(e);
    	}
        
    }

    function showQuickPopup(text) {
        popup.textContent = text;
        popupWrapper.classList.remove('hidden');

        setTimeout(() => {
            popupWrapper.classList.add('hidden');
        }, popupShowingTime);
    }
})();
