class StyleLintOncogene extends Oncogene {
    nextStep() {
        const result = document.querySelector('.result > .config');

        result.textContent = JSON.stringify(this.config, null, 4);
        super.nextStep();
    }

    createInputNode(config) {
        const node = document.createElement('input');

        node.setAttribute("type", config.type);
        node.setAttribute("placeholder", config.placeholder || "");
        node.setAttribute("data-value-type", config.valueType || "");

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
            let input = this.createInputNode({ type: 'text', placeholder: variant.placeholder, valueType: variant.valueType });
            input.addEventListener('click', this.variantInputClickHandler.bind(this));
            input.addEventListener('keyup', this.variantInputKeyUpHandler.bind(this));
            item.appendChild(input);
        }

        item.addEventListener('click', this.variantClickHandler.bind(this));

        return item;
    }

    getInputValue(input) {
        const initialValue = input.value;
        const valueType = input.dataset.valueType;
        let formattedValue = initialValue;

        if (valueType === 'int') {
            formattedValue = Number(initialValue) || 0;
        }

        if (valueType === 'array') {
            formattedValue = initialValue.split(" ");
            formattedValue = formattedValue.filter(item => item !== "");
        }

        return formattedValue;
    }

    variantInputClickHandler(e) {
        e.stopPropagation();
    }

    variantInputKeyUpHandler(e) {
        if (e.code === "Enter") {
            e.target.parentElement.click();
        }
    }

    variantClickHandler(e) {
        const step = this.getStep();
        const inx = e.currentTarget.dataset.inx;
        const variant = step.variants[inx];
        let value = variant.value;

        if (variant.input === true) {
            let input = e.currentTarget.querySelector('input');
            let inputValue = this.getInputValue(input);
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