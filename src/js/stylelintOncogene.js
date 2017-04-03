import {Oncogene} from './oncogene.js';
export class StyleLintOncogene extends Oncogene {
    makeStep(stepSize) {
        super.makeStep(stepSize);
        this.checkBackBtn(this.stepInx);
    }

    checkBackBtn(stepSize) {
        const styleDisplay = (stepSize === 0 ? 'none' : '');
        const backBtn = document.querySelector('.js-back-btn');
        backBtn.style.display = styleDisplay;
    }

    nextStep() {
        const result = document.querySelector('.result > .config');

        result.textContent = JSON.stringify(this.config, null, 4);
        super.nextStep();
    }

    createCodeNode(config) {
        const parent = document.createElement('pre');
        const codeContainer = document.createElement('code');

        parent.className = config.className;
        codeContainer.innerHTML = config.code || '';
        parent.appendChild(codeContainer);

        return parent;
    }

    getVariantNode(variant, inx) {
        const item = this.createNode(this.classes.variants.item);
        const hint = this.createNode(this.classes.variants.hint);
        const codeBlock = this.createCodeNode({
            className: this.classes.variants.code,
            code: variant.code
        });

        hint.innerHTML = variant.hint || '';

        item.dataset.inx = inx;
        item.appendChild(hint);

        item.addEventListener('click', this.variantClickHandler.bind(this));
        
        if (variant.code !== undefined) {
            item.appendChild(codeBlock);
            this.highlightCode(codeBlock);
        }

        return item;
    }

    getProgressNode() {
        const progress = this.createNode(this.classes.common.progress);

        progress.innerHTML = `Option ${this.stepInx + 1} of ${this.steps.length}`;

        return progress;
    }

    variantClickHandler(e) {
        const step = this.getStep();
        const inx = e.currentTarget.dataset.inx;
        const variant = step.variants[inx];
        const value = variant.value;

        if (variant.dismiss === true) {
            this.nextStep();
            return;
        }

        if (step.key) {
            this.setVal(step.key, value);
        }

        if (step.callback) {
            this.config = step.callback(this.config, value);
        }

        this.nextStep();
    }

    getResult() {
        document.querySelector('.generator').remove();
    }

    setVal(key, value) {
        const path = key.split('.');
        let cur = this.config;

        while (path.length > 1) {
            const subKey = path.shift();

            if (!cur.hasOwnProperty(subKey)) cur[subKey] = {};

            if (!this.constructor.isObject(cur[subKey])) {
                throw new Error(`Part of path ${key} is not an object`);
            }

            cur = cur[subKey];
        }

        cur.rules[path.shift()] = value;
    }

    highlightCode(target) {
        hljs.highlightBlock(target)
    }
}