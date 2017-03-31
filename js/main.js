(() => {
    const generator = new StyleLintOncogene(options);
    const dismissBtn = document.querySelector('.js-dismiss-btn');
    const resetBtn = document.querySelector('.js-reset-btn');

    dismissBtn.addEventListener('click', () => {
        generator.nextStep();
    });
})();
