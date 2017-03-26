class StyleLintOncogene extends Oncogene {
    nextStep() {
        const result = document.querySelector('.result > .config');

        result.textContent = JSON.stringify(this.config, null, 4);
        super.nextStep();
    }

    createInputNode(type) {
        const node = document.createElement('input');

        node.setAttribute("type", type);

        return node;
    }

    getVariantNode(variant, inx) {
        const item = this.createNode(this.classes.variants.item);
        const hint = this.createNode(this.classes.variants.hint);
        const code = this.createNode(this.classes.variants.code);

        hint.innerHTML = variant.hint || '';
        code.innerHTML = variant.code || '';

        item.dataset.inx = inx;
        item.appendChild(hint);
        item.appendChild(code);

        if (variant.input === true) {
            let input = this.createInputNode('text');
            input.addEventListener('click', this.variantInputClickHandler.bind(this));
            item.appendChild(input);
        }

        item.addEventListener('click', this.variantClickHandler.bind(this));

        return item;
    }

    getValueFromInput(input) {
        const initialValue = input.value;
        let formattedValue = initialValue.split(" ");
        formattedValue = formattedValue.filter(item => item !== "");
        return formattedValue;
    }

    variantInputClickHandler(e) {
        e.stopPropagation();
    }

    variantClickHandler(e) {
        const step = this.getStep();
        const inx = e.currentTarget.dataset.inx;
        const variant = step.variants[inx];
        let value = variant.value;

        if (variant.input === true) {
            let input = e.currentTarget.querySelector('input');
            let inputValue = this.getValueFromInput(input);
            value = inputValue;
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
        document.querySelector('.oncogene').remove();
    }
}

new StyleLintOncogene({
    selector: '.oncogene',
    steps: [{
        key: 'font-family-no-duplicate-names',
        hint: 'Disallow font names duplicate',
        variants: [{
            hint: 'Disallow',
            code: 'a {\n  font-family: <mark>Times</mark>, serif; \n}',
            value: true
        }, {
            hint: 'Allow',
            code: 'a {\n  font-family: <mark>"Times", Times</mark>, serif; \n}',
            value: false
        }]
    }, {
        key: 'font-family-name-quotes',
        hint: 'Font family name quotes',
        variants: [{
            hint: 'Always where required',
            value: 'always-where-required',
            code: 'a {\n  font-family: <mark>Times New Roman</mark>,\n  Times, serif; \n}\na {\n  font-family: "Hawaii 5-0"; \n}'
        }, {
            hint: 'Always where recommended',
            value: 'always-where-recommended',
            code: 'a {\n  font-family: <mark>"Times New Roman"</mark>,\n  Times, serif;\n}\na {\n  font-family: Arial, sans-serif;\n}'
        }, {
            hint: 'Always unless keyword',
            value: 'always-unless-keyword',
            code: 'a {\n  font-family: <mark>"Arial"</mark>, sans-serif;\n}'
        }, ]
    }, {
        key: 'function-blacklist',
        hint: 'Function blacklist',
        variants: [{
            input: true,
            hint: 'Write functions names in space',
            value: []
        }, {
            hint: 'Empty list(also you can dismiss this step)',
            value: []
        }]
    }, {
        key: 'color-hex-case',
        hint: 'Color case',
        variants: [{
            code: 'a {\n  color: #<mark>fff</mark>;\n}',
            value: 'lower'
        }, {
            code: 'a {\n  color: #<mark>FFF</mark>;\n}',
            value: 'upper'
        }]
    }, {
        key: 'color-hex-length',
        hint: 'Color length',
        variants: [{
            code: 'a {\n  color: #<mark>fff</mark>;\n}',
            value: 'short'
        }, {
            code: 'a {\n  color: #<mark>ffffff</mark>;\n}',
            value: 'long'
        }]
    }, {
        key: 'color-named',
        hint: 'Colors names',
        variants: [{
            hint: 'use names always where possible',
            code: 'a {\n  color: <mark>white</mark>;\n}',
            value: 'always-where-possible'
        }, {
            hint: 'Never use names',
            code: 'a {\n  color: <mark>#fff</mark>;\n}',
            value: 'never'
        }]
    }, {
        key: 'color-no-hex',
        hint: 'No hex colors',
        variants: [{
            code: 'a {\n  color: <mark>black</mark>;\n  color: <mark>rgb(0,0,0)</mark>;\n}',
            value: 'true'
        }, {
            code: 'a {\n  color: <mark>#fff</mark>;\n}',
            value: 'false'
        }]
    }, {
        key: 'color-no-invalid-hex',
        hint: 'Disallow invalid hex colors.',
        variants: [{
            hint: 'Allow',
            code: 'a {\n  color: #ff;\n}',
            value: 'false'
        }, {
            hint: 'Disallow',
            code: 'a {\n  color: #fff;\n}',
            value: 'true'
        }]
    }, {
        key: 'rules.number-leading-zero',
        hint: 'Leading zero',
        variants: [{
            code: 'a {\n  opacity: <mark>0</mark>.5;\n}',
            value: 'always'
        }, {
            code: 'a {\n  opacity: .5;\n}',
            value: 'never'
        }]
    }, {
        key: 'rules.length-zero-no-unit',
        hint: 'Units for zero lengths',
        variants: [{
            code: 'a {\n  top: 0<mark>px</mark>;\n}',
            value: false
        }, {
            code: 'a {\n  top: 0;\n}',
            value: true
        }]
    }, ]
})
