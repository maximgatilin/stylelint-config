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

new StyleLintOncogene({
    selector: '.oncogene',
    steps: [{
        key: 'custom-property-pattern',
        hint: 'Specify a pattern for custom properties(string|regexp)',
        variants: [{
            input: true,
            valueType: "string",
            placeholder: 'Write pattern here',
            code: 'Example "foo-.+" \n\n:root { --<mark>foo-</mark>bar: 0; }',
            value: ''
        }, {
            hint: 'No pattern(""). You can also dismiss this step.',
            code: 'a {\n  transform: translate(\n    1,\n    1);\n}',
            value: ''
        }]
    }, {
        key: 'custom-property-empty-line-before',
        hint: 'Require or disallow an empty line before custom properties',
        variants: [{
            hint: 'Always',
            code: 'a {\n  top: 10px;\n   <mark>/* this line */</mark> \n   --foo: pink;\n   <mark>/* this line */</mark> \n   --bar: red;\n}',
            value: "always"
        }, {
            hint: 'Never',
            code: 'a {\n  top: 10px;\n  --foo: pink;\n  --bar: red;\n}',
            value: "never"
        }]
    }, {
        key: 'value-list-max-empty-lines',
        hint: 'Max empty lines in value list(int)',
        variants: [{
            input: true,
            valueType: "int",
            placeholder: 'Amount of lines',
            code: 'a {\n  box-shadow:\n   inset 0 2px 0 #dcffa6 \n    <mark>/*these lines*/</mark>\n    0 2px 5px #000;\n}',
            value: '0'
        }, {
            hint: 'No empty lines(0). You can also dismiss this step.',
            code: 'a {\n  transform: translate(\n    1,\n    1);\n}',
            value: 0
        }]
    }, {
        key: 'value-list-comma-space-before',
        hint: 'Require a single space or disallow whitespace before the commas of value lists',
        variants: [{
            hint: 'Always',
            code: 'a {\n  background-size: 0<mark> </mark>,0; \n}',
            value: "always"
        }, {
            hint: 'Never',
            code: 'a {\n  background-size: <mark>0,</mark>0; \n}',
            value: "never"
        }, {
            hint: 'Always in single-line',
            code: 'a {\n  background-size: 0<mark> </mark>,0; \n}\na {\n  background-size: 0 ,\n   0; \n}',
            value: "always-single-line"
        }, {
            hint: 'Never in single-line',
            code: 'a {\n  background-size: <mark>0,</mark>0; \n}\na {\n  background-size: 0 ,\n    0; \n}',
            value: "never-single-line"
        }]
    }, {
        key: 'value-list-comma-space-after',
        hint: 'Require a single space or disallow whitespace after the commas of value lists',
        variants: [{
            hint: 'Always',
            code: 'a {\n  background-size: 0,<mark> </mark>0; \n}',
            value: "always"
        }, {
            hint: 'Never',
            code: 'a {\n  background-size: 0<mark>,0</mark>; \n}',
            value: "never"
        }, {
            hint: 'Always in single-line',
            code: 'a {\n  background-size: 0,<mark> </mark>0; \n}\na {\n  background-size: 0\n   ,0; \n}',
            value: "always-single-line"
        }, {
            hint: 'Never in single-line',
            code: 'a {\n  background-size: 0<mark>,0</mark>; \n}\na {\n  background-size: 0\n   , 0; \n}',
            value: "never-single-line"
        }]
    }, {
        key: 'value-list-comma-newline-before',
        hint: 'Require a newline or disallow whitespace before the commas of value lists',
        variants: [{
            hint: 'Always',
            code: 'a {\n  background-size: 0,\n<mark>      </mark>0; \n}',
            value: "always"
        }, {
            hint: 'Always in multi-line',
            code: 'a {\n  background-size: 0, 0;\n} \na {\n  background-size: 0\n<mark>     </mark>,0; \n}',
            value: "always-multi-line"
        }, {
            hint: 'Never in multi-line',
            code: 'a {\n  background-size: 0,0;\n} \na {\n  background-size: 0,\n     0; \n}',
            value: "never-multi-line"
        }, ]
    }, {
        key: 'value-list-comma-newline-after',
        hint: 'Require a newline or disallow whitespace after the commas of value lists',
        variants: [{
            hint: 'Always',
            code: 'a {\n  background-size: 0,\n<mark>     </mark>0; \n}',
            value: "always"
        }, {
            hint: 'Always in multi-line',
            code: 'a {\n  background-size: 0, 0;\n} \na {\n  background-size: 0,\n<mark>     </mark>0; \n}',
            value: "always-multi-line"
        }, {
            hint: 'Never in multi-line',
            code: 'a {\n  background-size: 0,0;\n} \na {\n  background-size: 0\n     ,0; \n}',
            value: "never-multi-line"
        }, ]
    }, {
        key: 'value-no-vendor-prefix',
        hint: 'Disallow vendor prefixes for values',
        variants: [{
            code: 'a {\n  display: flex; \n}',
            value: true
        }, {
            code: 'a {\n  display: <mark>-webkit</mark>-flex; \n}',
            value: false
        }]
    }, {
        key: 'value-keyword-case',
        hint: 'Specify lowercase or uppercase for keywords values',
        variants: [{
            code: 'a {\n  display: <mark>block</mark>; \n}',
            value: "lower"
        }, {
            code: 'a {\n  display: <mark>BLOCK</mark>; \n}',
            value: "upper"
        }]
    }, {
        key: 'unit-whitelist',
        hint: 'Specify a whitelist of allowed units(e.g. deg, rem)',
        variants: [{
            input: true,
            valueType: 'array',
            hint: 'Write units names in space',
            value: []
        }, {
            hint: 'Empty list(also you can dismiss this step)',
            value: []
        }]
    }, {
        key: 'unit-no-unknown',
        hint: 'Unknown units',
        variants: [{
            hint: 'Disallow',
            code: 'a {\n  top: 0<mark>px</mark>; \n}',
            value: true
        }, {
            hint: 'Allow',
            code: 'a {\n  top: 0<mark>pixels</mark>; \n}',
            value: false
        }]
    }, {
        key: 'unit-case',
        hint: 'Specify lowercase or uppercase for units',
        variants: [{
            code: 'a {\n  top: 0<mark>px</mark>; \n}',
            value: "lower"
        }, {
            code: 'a {\n  top: 0<mark>PX</mark>; \n}',
            value: "upper"
        }]
    }, {
        key: 'unit-blacklist',
        hint: 'Specify a blacklist of disallowed units(e.g. deg, rem)',
        variants: [{
            input: true,
            valueType: 'array',
            hint: 'Write units names in space',
            value: []
        }, {
            hint: 'Empty list(also you can dismiss this step)',
            value: []
        }]
    }, {
        key: 'time-min-milliseconds',
        hint: 'Specify the minimum number of <mark>milliseconds</mark> for time values',
        variants: [{
            input: true,
            valueType: "int",
            placeholder: 'Amount of milliseconds',
            code: 'a { animation: slip-n-slide 150ms linear; }\n/**                          ↑\n*                          This time */',
            value: 0
        }, {
            hint: 'Disallow milliseconds(0), you can also dismiss this step',
            value: 0
        }]
    }, {
        key: 'length-zero-no-unit',
        hint: 'Units for zero lengths',
        variants: [{
            hint: 'Disallow',
            code: 'a {\n  top: 0; \n}',
            value: true
        }, {
            hint: 'Allow',
            code: 'a {\n  top: 0<mark>px</mark>; \n}',
            value: false
        }]
    }, {
        key: 'string-quotes',
        hint: 'Specify single or double quotes around strings',
        variants: [{
            hint: 'Single',
            code: 'a {\n  content: <mark>\'</mark>x<mark>\'</mark>; \n}',
            value: 'single'
        }, {
            hint: 'Double',
            code: 'a {\n  content: <mark>"</mark>x<mark>"</mark>; \n}',
            value: 'double'
        }]
    }, {
        key: 'string-no-newline',
        hint: 'Disallow (unescaped) newlines in strings',
        variants: [{
            hint: 'Disallow',
            code: 'a {\n  content: "first\\Asecond"; \n}',
            value: true
        }, {
            hint: 'Allow',
            code: 'a {\n  content: "first\n<mark>      </mark>second"; \n}',
            value: false
        }]
    }, {
        key: 'number-no-trailing-zeros',
        hint: 'Disallow trailing zeros in numbers',
        variants: [{
            hint: 'Disallow',
            code: 'a {\n  top: 1px; \n}',
            value: true
        }, {
            hint: 'Allow',
            code: 'a {\n  top: 1.<mark>0</mark>px; \n}',
            value: false
        }]
    }, {
        key: 'number-max-precision',
        hint: 'Limit the number of decimal places allowed in numbers',
        variants: [{
            input: true,
            valueType: "int",
            placeholder: 'Amount of numbers',
            code: 'a { top: 3.245634px; }\n/**            ↑\n* These decimal places */',
            value: 0
        }, {
            hint: 'Disallow decimal(0)',
            value: 0
        }]
    }, {
        key: 'number-leading-zero',
        hint: 'Require or disallow a leading zero for fractional numbers',
        variants: [{
            code: 'a {\n line-height: <mark>0</mark>.5; \n}',
            value: "always"
        }, {
            code: 'a {\n line-height: .5; \n}',
            value: "never"
        }]
    }, {
        key: 'function-whitespace-after',
        hint: 'Require or disallow whitespace after functions',
        variants: [{
            code: 'a {\n translate(1, 1)<mark> </mark>scale(3); \n}',
            value: "always"
        }, {
            code: 'a {\n translate(1, 1)scale(3); \n}',
            value: "never"
        }]
    }, {
        key: 'function-whitelist',
        hint: 'Functions whitelist(e.g. rgba, scale)',
        variants: [{
            input: true,
            valueType: 'array',
            hint: 'Write functions names in space',
            value: []
        }, {
            hint: 'Empty list(also you can dismiss this step)',
            value: []
        }]
    }, {
        key: 'function-url-scheme-whitelist',
        hint: 'Function scheme whitelist(e.g. https, ftp)',
        variants: [{
            input: true,
            valueType: "array",
            hint: 'Write functions names in space',
            value: []
        }, {
            hint: 'Empty list(also you can dismiss this step)',
            value: []
        }]
    }, {
        key: 'function-url-quotes',
        hint: 'Function url quotes',
        variants: [{
            hint: 'Disallow',
            code: 'a {\n   background: url(<mark>"</mark>x.jpg<mark>"</mark>); \n}',
            value: 'always'
        }, {
            hint: 'Allow',
            code: 'a {\n   background: url(x.jpg); \n}',
            value: 'never'
        }]
    }, {
        key: 'function-url-data-uris',
        hint: 'Require or disallow data URIs for urls.',
        variants: [{
            hint: 'Always',
            code: 'a {\n  background-image:\n    url("<mark>data:</mark>image/gif;base64,R0lGODlh="); \n}',
            value: 'always'
        }, {
            hint: 'Never',
            code: 'a {\n  background-image: url(image.gif); \n}',
            value: 'never'
        }]
    }, {
        key: 'function-parentheses-space-inside',
        hint: 'Space after parentheses in functions',
        variants: [{
            hint: 'Always',
            code: 'a { transform: translate(<mark> </mark>1, 1<mark> </mark>);}',
            value: 'always'
        }, {
            hint: 'Newer',
            code: 'a { transform: translate(1, 1);}',
            value: 'never'
        }, {
            hint: 'Always in single-line',
            code: 'a { transform: translate(<mark> </mark>1, 1<mark> </mark>);}\na {\n transform: translate(1,\n 1);\n}',
            value: 'always-single-line'
        }, {
            hint: 'Never in single-line',
            code: 'a { transform: translate(1, 1);}\na {\n transform: translate( 1,\n 1);\n}',
            value: 'never-single-line'
        }]
    }, {
        key: 'function-parentheses-newline-inside',
        hint: 'Newline after parentheses in functions',
        variants: [{
            hint: 'Always',
            code: 'a {\n  transform: translate(\n<mark>     </mark>1 ,1);\n}',
            value: 'always'
        }, {
            hint: 'Always in multi-line',
            code: 'a {\n  transform: translate<mark>(1</mark>, 1)\n}\na {\n  transform: translate(\n<mark>     </mark>1 ,1);\n}',
            value: 'always-multi-line'
        }, {
            hint: 'Never in multi-line',
            code: 'a {\n  transform: translate<mark>(1</mark>, 1);\n}\na {\n  transform: translate<mark>(1</mark>,\n1);\n}',
            value: 'never-multi-line'
        }]
    }, {
        key: 'function-max-empty-lines',
        hint: 'Max empty lines in function(int)',
        variants: [{
            input: true,
            valueType: "int",
            placeholder: 'Amount of lines',
            code: 'a {\n  transform: translate(\n    1,\n  <mark>/*these lines*/</mark>\n    1);\n}',
            value: '0'
        }, {
            hint: 'No empty lines(0)',
            code: 'a {\n  transform: translate(\n    1,\n    1);\n}',
            value: 0
        }]
    }, {
        key: 'function-name-case',
        hint: 'Function name case',
        variants: [{
            code: 'a {\n  width: <mark>calc</mark>(5% - 10em); \n}',
            value: 'lower'
        }, {
            code: 'a {\n  width: <mark>CALC</mark>(5% - 10em); \n}',
            value: 'upper'
        }]
    }, {
        key: 'function-linear-gradient-no-nonstandard-direction',
        hint: 'Gradient direction "to" keyword',
        variants: [{
            code: 'a {\n  background: linear-gradient(\n <mark>to</mark> top, #fff, #000); \n}',
            value: true
        }, {
            code: 'a {\n  background: linear-gradient(\n top, #fff, #000); \n}',
            value: false
        }]
    }, {
        key: 'function-comma-space-before',
        hint: 'Space before function comma',
        variants: [{
            hint: 'Always',
            code: 'a {\n  transform: translate(1<mark> ,</mark>1)\n}',
            value: 'always'
        }, {
            hint: 'Never',
            code: 'a {\n  transform: translate(<mark>1,</mark>1)\n}',
            value: 'never'
        }, {
            hint: 'Always in single line',
            code: 'a {\n  transform: translate(<mark>1 ,</mark>1)\n}\n a {\n  transform: translate(<mark>1,</mark>\n   ,1)\n}',
            value: 'always-single-line'
        }, {
            hint: 'Never in single line',
            code: 'a {\n  transform: translate(<mark>1,</mark>1)\n}\n a {\n  transform: translate(<mark>1 ,</mark>\n   1)\n}',
            value: 'never-single-line'
        }]
    }, {
        key: 'function-comma-space-after',
        hint: 'Space after function comma',
        variants: [{
            hint: 'Always',
            code: 'a {\n  transform: translate(1,<mark> </mark>1)\n}',
            value: 'always'
        }, {
            hint: 'Never',
            code: 'a {\n  transform: translate(1<mark>,1</mark>)\n}',
            value: 'never'
        }, {
            hint: 'Always in single line',
            code: 'a {\n  transform: translate(1<mark>, 1</mark>)\n}\n a {\n  transform: translate(1\n   <mark>,1</mark>)\n}',
            value: 'always-single-line'
        }, {
            hint: 'Never in single line',
            code: 'a {\n  transform: translate(1<mark>,1</mark>)\n}\n a {\n  transform: translate(1\n   <mark>, 1</mark>)\n}',
            value: 'never-single-line'
        }]
    }, {
        key: 'function-comma-newline-before',
        hint: 'New line before comma in function',
        variants: [{
            hint: 'Always',
            code: 'a {\n  transform: translate(1\n<mark>     </mark>,1)\n}',
            value: 'always'
        }, {
            hint: 'Always multi line',
            code: 'a {\n  transform: translate(1 ,1)\n}\na {\n  transform: translate(1 \n<mark>    </mark>,1)\n}',
            value: 'always-multi-line'
        }, {
            hint: 'Never multi line',
            code: 'a {\n  transform: translate(1<mark> , 1</mark>)\n}\n a {\n  transform: translate(<mark>1,</mark> \n  1)\n}',
            value: 'never-multi-line'
        }]
    }, {
        key: 'function-comma-newline-after',
        hint: 'New line after comma in function',
        variants: [{
            hint: 'Always',
            code: 'a {\n  transform: translate(1,<mark> </mark>\n  1)\n}',
            value: 'always'
        }, {
            hint: 'Always multi line',
            code: 'a {\n  transform: translate(1 <mark>,1</mark>)\n}\na {\n  transform: translate(1,<mark> </mark> \n   1)\n}',
            value: 'always-multi-line'
        }, {
            hint: 'Never multi line',
            code: 'a {\n  transform: translate(1,<mark> 1</mark>)\n}\n a {\n  transform: translate(1 \n  <mark>,1</mark>)\n}',
            value: 'never-multi-line'
        }]
    }, {
        key: 'function-calc-no-unspaced-operator',
        hint: 'Spaces in calc function',
        variants: [{
            code: 'a {\n  top: calc(1px<mark> </mark>+<mark> </mark>2px); \n}',
            value: true
        }, {
            code: 'a {\n  top: calc(1px+2px); \n}',
            value: false
        }]
    }, {
        key: 'function-blacklist',
        hint: 'Function blacklist',
        variants: [{
            input: true,
            valueType: "array",
            hint: 'Write functions names in space',
            value: []
        }, {
            hint: 'Empty list(also you can dismiss this step)',
            value: []
        }]
    }, {
        key: 'font-weight-notation',
        hint: 'Font weight notation',
        variants: [{
            hint: 'Numeric',
            code: 'a {\n  font-weight: <mark>700</mark>; \n}',
            value: "numeric"
        }, {
            hint: 'Named where possible',
            code: 'a {\n  font-weight: <mark>bold</mark>; \n}',
            value: "named-where-possible"
        }]
    }, {
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
