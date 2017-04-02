var options = {
    selector: '.oncogene',
    config: { "extends": "stylelint-config-standard", rules: {} },
    skipValidation: true,
    steps: [{
        key: 'indentation',
        hint: 'Specify indentation',
        variants: [{
            hint: '2 spaces',
            value: 2
        }, {
            hint: '4 spaces',
            value: 4
        }, {
            hint: 'Tabs',
            value: 'tab'
        }, {
            hint: 'Skip',
            dismiss: true
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
        }, {
            hint: 'Skip(inherit from standart config)',
            dismiss: true
        }]
    }, {
        key: 'no-duplicate-selectors',
        hint: 'Disallow duplicate selectors within a stylesheet',
        variants: [{
            hint: 'Disallow',
            value: true
        }, {
            hint: 'Skip(allow duplicate selectors)',
            dismiss: true,
            code: '<mark>.foo</mark> {}\n.bar {}\n<mark>.foo</mark> {}'
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
        }, {
            hint: 'Skip(allow any type of case)',
            dismiss: true,
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
        }, {
            hint: 'Skip(inherit from standart config)',
            dismiss: true,
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
        }, {
            hint: 'Skip(use code or name)',
            dismiss: true,
        }]
    }, {
        key: 'color-no-hex',
        hint: 'No hex colors',
        variants: [{
            code: 'a {\n  color: <mark>black</mark>;\n  color: <mark>rgb(0,0,0)</mark>;\n}',
            value: true
        }, {
            hint: 'Skip(allow hex colors)',
            dismiss: true,
            code: 'a {\n  color: <mark>#fff</mark>;\n}'
        }]
    }, {
        key: 'selector-no-qualifying-type',
        hint: 'Disallow qualifying a selector by type',
        variants: [{
            hint: 'Disallow',
            code: '.foo {\n  margin: 0\n}',
            value: true
        }, {
            hint: 'Skip(allow types)',
            dismiss: true,
            code: '<mark>a</mark>.foo {\n  margin: 0\n}',
        }]
    }, {
        key: 'selector-no-id',
        hint: 'Disallow id selectors',
        variants: [{
            hint: 'Disallow',
            value: true
        }, {
            hint: 'Skip(allow id selector)',
            dismiss: true,
            code: '    #foo {}\n/** ↑\n * This type of selector */',
        }]
    }, {
        key: 'selector-no-combinator',
        hint: 'Disallow combinators in selectors',
        variants: [{
            hint: 'Disallow',
            value: true
        }, {
            hint: 'Skip(allow combinators)',
            dismiss: true,
            code: '  a > b + c ~ d e { color: pink; }\n/** ↑   ↑   ↑  ↑\n * These are combinators */'
        }]
    }, {
        key: 'selector-no-attribute',
        hint: 'Disallow attribute selectors',
        variants: [{
            hint: 'Disallow',
            value: true
        }, {
            hint: 'Skip(allow attribute selectors)',
            dismiss: true,
            code: '[foo] {}'
        }]
    }, {
        key: 'selector-combinator-space-after',
        hint: 'Require a single space or disallow whitespace after the combinators of selectors',
        variants: [{
            hint: 'Always',
            code: 'a +<mark> </mark>b { color: pink; }',
            value: "always"
        }, {
            hint: 'Never',
            code: 'a +b { color: pink; }',
            value: "never"
        }, {
            hint: 'Skip(inherit from standart config)',
            dismiss: true
        }]
    }, {
        key: 'selector-attribute-quotes',
        hint: 'Require or disallow quotes for attribute values',
        variants: [{
            hint: 'Always',
            code: '[target=<mark>"</mark>_blank<mark>"</mark>] {}',
            value: "always"
        }, {
            hint: 'Never',
            code: '[target=_blank] {}',
            value: "never"
        }, {
            hint: 'Skip(allow any type of syntax)',
            dismiss: true
        }]
    }, {
        key: 'selector-attribute-operator-space-before',
        hint: 'Require a single space or disallow whitespace before operators within attribute selectors',
        variants: [{
            hint: 'Always',
            code: '[target<mark> </mark>= "_blank"] {}',
            value: "always"
        }, {
            hint: 'Never',
            code: '[target= "_blank"] {}',
            value: "never"
        }]
    }, {
        key: 'selector-attribute-operator-space-after',
        hint: 'Require a single space or disallow whitespace after operators within attribute selectors',
        variants: [{
            hint: 'Always',
            code: '[target =<mark> </mark>"_blank"] {}',
            value: "always"
        }, {
            hint: 'Never',
            code: '[target ="_blank"] {}',
            value: "never"
        }, {
            hint: 'Skip(inherit from standart config)',
            dismiss: true
        }]
    }, {
        key: 'selector-attribute-brackets-space-inside',
        hint: 'Require a single space or disallow whitespace on the inside of the brackets within attribute selectors',
        variants: [{
            hint: 'Always',
            code: '[ target=_blank ] {}',
            value: "always"
        }, {
            hint: 'Never',
            code: '[target=_blank] {}',
            value: "never"
        }, {
            hint: 'Skip(inherit from standart config)',
            dismiss: true
        }]
    }, {
        key: 'declaration-block-trailing-semicolon',
        hint: 'Require or disallow a trailing semicolon within declaration blocks',
        variants: [{
            hint: 'Always',
            code: 'a { color: pink<mark>;</mark> }\na { background: orange; color: pink<mark>;</mark> }',
            value: "always"
        }, {
            hint: 'Never',
            code: 'a { color: pink }\na { background: orange; color: pink }',
            value: "never"
        }, {
            hint: 'Skip(inherit from standart config)',
            dismiss: true
        }]
    }, {
        key: 'declaration-no-important',
        hint: 'Disallow !important within declarations.',
        variants: [{
            hint: 'Disallow',
            code: 'a {\n color: pink; \n}',
            value: true
        }, {
            hint: 'Skip(allow important)',
            dismiss: true,
            code: 'a {\n color: pink <mark>!important</mark>; \n}'
        }]
    }, {
        key: 'declaration-colon-space-before',
        hint: 'Require a single space or disallow whitespace before the colon of declarations',
        variants: [{
            hint: 'Always',
            code: 'a {\n color<mark> </mark>: pink; \n}',
            value: 'always'
        }, {
            hint: 'Never',
            code: 'a {\n color: pink; \n}',
            value: 'never'
        }, {
            hint: 'Skip(inherit from standart config)',
            dismiss: true
        }]
    }, {
        key: 'declaration-colon-space-after',
        hint: 'Require a single space or disallow whitespace after the colon of declarations.',
        variants: [{
            hint: 'Always',
            code: 'a { color:<mark> </mark>pink }',
            value: 'always'
        }, {
            hint: 'Never',
            code: 'a { color:pink }',
            value: 'never'
        }, {
            hint: 'Always in single-line',
            code: 'a {\n color:<mark> </mark>pink;\n box-shadow:0 0 0 1px #5b9dd9, \n  0 0 2px 1px rgba(30, 140, 190, 0.8); \n}',
            value: 'always-single-line'
        }, {
            hint: 'Skip(inherit from standart config)',
            dismiss: true
        }]
    }, {
        key: 'property-no-vendor-prefix',
        hint: 'Disallow vendor prefixes for properties',
        variants: [{
            hint: 'Disallow',
            code: 'a { \n   transform: scale(1); \n}',
            value: true
        }, {
            hint: 'Skip(allow prefixes)',
            dismiss: true,
            code: 'a { \n   <mark>-webkit-</mark>transform: scale(1); \n}'
        }]
    }, {
        key: 'property-blacklist',
        hint: 'Specify a blacklist of disallowed properties(e.g. animation, text-rendering)',
        variants: [{
            input: true,
            valueType: "array",
            hint: 'Write properties names in space',
            value: []
        }, {
            hint: 'Skip(Allow all properties)',
            dismiss: true
        }]
    }, {
        key: 'value-no-vendor-prefix',
        hint: 'Disallow vendor prefixes for values',
        variants: [{
            code: 'a {\n  display: flex; \n}',
            value: true
        }, {
            hint: 'Skip(allow prefixes)',
            code: 'a {\n  display: <mark>-webkit</mark>-flex; \n}',
            dismiss: true
        }]
    }, {
        key: 'unit-blacklist',
        hint: 'Specify a blacklist of disallowed units(e.g. deg, rem)',
        variants: [{
            input: true,
            valueType: 'array',
            hint: 'Write units names in space'
        }, {
            hint: 'Skip(allow all units)',
            dismiss: true
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
        }, {
            hint: 'Skip(inherit from standart config)',
            dismiss: true
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
        }, {
            hint: 'Skip(allow any syntax)',
            dismiss: true
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
        }, {
            hint: 'Skip(allow any type of urls)',
            dismiss: true,
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
        }, {
            hint: 'Skip(allow any type of notation)',
            dismiss: true,
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
        }, {
            hint: 'Skip(allow any type of syntax)',
            dismiss: true,
        }]
    }, {
        key: 'max-nesting-depth',
        hint: 'Limit the allowed nesting depth(int)',
        variants: [{
            hint: 'Enter your value',
            input: true,
            valueType: "int",
            code: 'a { & > b { top: 0; }\n/** ↑\n * This nesting */',
            value: 0
        }, {
            hint: 'Skip(allow any nesting)',
            dismiss: true,
            value: false
        }]
    }, {
        key: 'comment-whitespace-inside',
        hint: 'Require or disallow whitespace on the inside of comment markers',
        variants: [{
            code: '/*<mark> </mark>comment<mark> </mark>*/',
            value: 'always'
        }, {
            code: '/*comment*/',
            value: 'never'
        }]
    }, {
        key: 'comment-empty-line-before',
        hint: 'Require or disallow an empty line before comments',
        variants: [{
            code: 'a {}\n\n/* comment */',
            value: 'always'
        }, {
            code: 'a {}\n/* comment */',
            value: 'never'
        }]
    }, {
        key: 'at-rule-no-vendor-prefix',
        hint: 'Disallow vendor prefixes for at-rules',
        variants: [{
            hint: 'Disallow',
            value: true
        }, {
            hint: 'Skip(allow prefixes)',
            dismiss: true,
            code: '@<mark>-webkit-</mark>keyframes { 0% { top: 0; } }',
            value: false
        }]
    }, {
        key: 'rule-empty-line-before',
        hint: 'Require or disallow an empty line before rules',
        variants: [{
            hint: 'Always',
            code: 'a {}\n\nb {}',
            value: 'always'
        }, {
            hint: 'Never',
            code: 'a {}\nb {}',
            value: 'never'
        }, {
            hint: 'Always in multi-line',
            code: 'a {\n  color: red;\n}\n\nb {\n  color: blue;\n}',
            value: 'always-multi-line'
        }, {
            hint: 'Never in multi-line',
            code: 'a {\n  color: red;\n}\nb {\n  color: blue;\n}',
            value: 'never-multi-line'
        }, {
            hint: 'Skip(inherit from standart config)',
            dismiss: true,
        }]
    }, {
        key: 'selector-list-comma-newline-after',
        hint: 'Require a newline or disallow whitespace after the commas of selector lists',
        variants: [{
            hint: 'Always',
            code: 'a,\nb { color: pink; }',
            value: 'always'
        }, {
            hint: 'Always in multi-line',
            code: 'a, b { color: pink; }\n\na,\nb { color: pink; }',
            value: 'always-multi-line'
        }, {
            hint: 'Never in multi-line',
            code: 'a,b { color: pink; }\n\na\n,b { color: pink; }',
            value: 'never-multi-line'
        }, {
            hint: 'Skip(inherit from standart config)',
            dismiss: true
        }]
    }, {
        key: 'selector-pseudo-element-colon-notation',
        hint: 'Specify single or double colon notation for applicable pseudo-elements',
        variants: [{
            code: 'a<mark>:</mark>before { color: pink; }',
            value: 'single'
        }, {
            code: 'a<mark>::</mark>before { color: pink; }',
            value: 'double'
        }, {
            hint: 'Skip(inherit from standart config)',
            dismiss: true
        }]
    }, {
        key: 'selector-pseudo-class-parentheses-space-inside',
        hint: 'Require a single space or disallow whitespace on the inside of the parentheses within pseudo-class selectors',
        variants: [{
            hint: 'Always',
            code: 'input:not(<mark> </mark>[type="submit"]<mark> </mark>) {}',
            value: 'always'
        }, {
            hint: 'Never',
            code: 'input:not([type="submit"]) {}',
            value: 'never'
        }, {
            hint: 'Skip(inherit from standart config)',
            dismiss: true
        }]
    }, {
        key: 'selector-no-vendor-prefix',
        hint: 'Disallow vendor prefixes for selectors',
        variants: [{
            hint: 'Disallow',
            code: 'input::placeholder {}',
            value: true
        }, {
            hint: 'Skip(allow prefixes)',
            dismiss: true,
            code: 'input::<mark>-moz-</mark>placeholder {}'
        }]
    }, {
        key: 'selector-no-universal',
        hint: 'Disallow the universal selector',
        variants: [{
            hint: 'Disallow',
            value: true
        }, {
            hint: 'Skip(allow universal selector)',
            dismiss: true,
            code: '<mark>*</mark> {}'
        }]
    }, {
        key: 'selector-no-type',
        hint: 'Disallow type selectors',
        variants: [{
            hint: 'Disallow',
            code: '.foo {}',
            value: true
        }, {
            hint: 'Skip(allow type selectors)',
            dismiss: true,
            code: '<mark>a</mark> {}'
        }]
    }, {
        key: 'media-feature-range-operator-space-before',
        hint: 'Require a single space or disallow whitespace before the range operator in media features',
        variants: [{
            code: '@media (max-width<mark> </mark>>=600px) {}',
            value: 'always'
        }, {
            code: '@media (max-width>=600px) {}',
            value: 'never'
        }, {
            hint: 'Skip(inherit from standart config)',
            dismiss: true,
        }]
    }, {
        key: 'media-feature-range-operator-space-after',
        hint: 'Require a single space or disallow whitespace after the range operator in media features',
        variants: [{
            code: '@media (max-width>=<mark> </mark>600px) {}',
            value: 'always'
        }, {
            code: '@media (max-width>=600px) {}',
            value: 'never'
        }, {
            hint: 'Skip(inherit from standart config)',
            dismiss: true,
        }]
    }, {
        key: 'media-feature-parentheses-space-inside',
        hint: 'Require a single space or disallow whitespace on the inside of the parentheses within media features',
        variants: [{
            code: '@media (<mark> </mark>max-width: 300px<mark> </mark>) {}',
            value: 'always'
        }, {
            code: '@media (max-width: 300px) {}',
            value: 'never'
        }, {
            hint: 'Skip(inherit from standart config)',
            dismiss: true,
        }]
    }, {
        key: 'media-feature-name-no-vendor-prefix',
        hint: 'Disallow vendor prefixes for media feature names',
        variants: [{
            hint: 'Disallow',
            code: '@media (min-device-pixel-ratio: 1) {}',
            value: true
        }, {
            hint: 'Skip(allow prefixes)',
            dismiss: true,
            code: '@media (<mark>-webkit-</mark>min-device-pixel-ratio: 1) {}',
            value: false
        }]
    }, {
        key: 'media-feature-colon-space-before',
        hint: 'Require a single space or disallow whitespace before the colon in media features',
        variants: [{
            code: '@media (max-width<mark> </mark>:600px) {}',
            value: 'always'
        }, {
            code: '@media (max-width:600px) {}',
            value: 'never'
        }, {
            hint: 'Skip(inherit from standart config)',
            dismiss: true,
        }]
    }, {
        key: 'media-feature-colon-space-after',
        hint: 'Require a single space or disallow whitespace after the colon in media features',
        variants: [{
            code: '@media (max-width:<mark> </mark>600px) {}',
            value: 'always'
        }, {
            code: '@media (max-width:600px) {}',
            value: 'never'
        }, {
            hint: 'Skip(inherit from standart config)',
            dismiss: true,
        }]
    }]
};
export { options };
