const options = {
    selector: '.oncogene',
    config: { extends: 'stylelint-config-standard', rules: {} },
    skipValidation: true,
    steps: [{
        key: 'indentation',
        variants: [{
            hint: 'Use 2 spaces',
            code: '.a {\n<mark>  </mark>color: tomato;\n<mark>  </mark>.b {\n<mark>    </mark>color: salmon;\n<mark>  </mark>}\n}\n',
            value: 2
        }, {
            hint: 'Use 4 spaces',
            code: '.a {\n<mark>    </mark>color: tomato;\n<mark>    </mark>.b {\n<mark>        </mark>color: salmon;\n<mark>    </mark>}\n}\n',
            value: 4
        }, {
            hint: 'Use tabs',
            code: '.a {\n<mark>&#9;</mark>color: tomato;\n<mark>&#9;</mark>.b {\n<mark>&#9;&#9;</mark>color: salmon;\n<mark>&#9;</mark>}\n}\n',
            value: 'tab'
        }, {
            hint: 'Skip (inherit from standard config)',
            dismiss: true
        }]
    }, {
        key: 'string-quotes',
        variants: [{
            hint: 'Use single quotes',
            code: 'a {\n  content: <mark>\'</mark>x<mark>\'</mark>; \n}',
            value: 'single'
        }, {
            hint: 'Use double quotes',
            code: 'a {\n  content: <mark>"</mark>x<mark>"</mark>; \n}',
            value: 'double'
        }, {
            hint: 'Skip (allow any type of quotes)',
            dismiss: true
        }]
    }, {
        key: 'no-duplicate-selectors',
        variants: [{
            hint: 'Disallow duplicate selectors within a stylesheet',
            code: '<mark>.foo</mark> {}\n.bar {}\n',
            value: true
        }, {
            hint: 'Allow duplicate selectors',
            dismiss: true,
            code: '<mark>.foo</mark> {}\n.bar {}\n<mark>.foo</mark> {}'
        }]
    }, {
        key: 'color-hex-case',
        variants: [{
            hint: 'Use lowercase in colors',
            code: 'a {\n  color: #<mark>fff</mark>;\n}',
            value: 'lower'
        }, {
            hint: 'Use uppercase in colors',
            code: 'a {\n  color: #<mark>FFF</mark>;\n}',
            value: 'upper'
        }, {
            hint: 'Skip (inherit from standard config)',
            dismiss: true
        }]
    }, {
        key: 'color-hex-length',
        variants: [{
            hint: 'Expand hexadecimal colors',
            code: 'a {\n  color: #<mark>ffffff</mark>;\n}',
            value: 'long'
        }, {
            hint: 'Use shorthands for hexadecimal colors',
            code: 'a {\n  color: #<mark>fff</mark>;\n}',
            value: 'short'
        }, {
            hint: 'Skip (inherit from standard config)',
            dismiss: true
        }]
    }, {
        key: 'color-named',
        variants: [{
            hint: 'Use color names always where possible',
            code: 'a {\n  color: <mark>white</mark>;\n}',
            value: 'always-where-possible'
        }, {
            hint: 'Never use color names',
            code: 'a {\n  color: <mark>#fff</mark>;\n}',
            value: 'never'
        }, {
            hint: 'Skip (use code or name)',
            code: 'a {\n  color: <mark>#fff</mark>;\n  background: <mark>gray</mark>\n}',
            dismiss: true
        }]
    }, {
        key: 'color-no-hex',
        variants: [{
            hint: 'Allow hex colors',
            dismiss: true,
            code: 'a {\n  color: <mark>#fff</mark>;\n}'
        }, {
            hint: 'Disallow hex colors',
            code: 'a {\n  color: <mark>black</mark>;\n  color: <mark>rgb(0,0,0)</mark>;\n}',
            value: true
        }]
    }, {
        key: 'selector-no-qualifying-type',
        variants: [{
            hint: 'Disallow qualifying a selector by type',
            code: '.foo {\n  margin: 0\n}',
            value: true
        }, {
            hint: 'Allow qualifying a selector by type',
            dismiss: true,
            code: '<mark>a</mark>.foo {\n  margin: 0\n}'
        }]
    }, {
        key: 'selector-no-id',
        variants: [{
            hint: 'Disallow id selectors',
            code: '.foo {}',
            value: true
        }, {
            hint: 'Allow id selector',
            dismiss: true,
            code: '<mark>#</mark>foo {}'
        }]
    }, {
        key: 'selector-no-combinator',
        variants: [{
            hint: 'Disallow combinators in selectors',
            code: '.foo {}',
            value: true
        }, {
            hint: 'Allow combinators',
            dismiss: true,
            code: '  a > b + c ~ d e { color: pink; }\n/** ↑   ↑   ↑  ↑\n * These are combinators */'
        }]
    }, {
        key: 'selector-no-attribute',
        variants: [{
            hint: 'Disallow attribute selectors',
            code: '.foo {}',
            value: true
        }, {
            hint: 'Allow attribute selectors',
            dismiss: true,
            code: '[foo] {}'
        }]
    }, {
        key: 'selector-combinator-space-after',
        variants: [{
            hint: 'Require a single space after the combinators of selectors',
            code: 'a +<mark> </mark>b { color: pink; }',
            value: 'always'
        }, {
            hint: 'Disallow whitespace after the combinators of selectors',
            code: 'a +b { color: pink; }',
            value: 'never'
        }, {
            hint: 'Skip (inherit from standard config)',
            dismiss: true
        }]
    }, {
        key: 'selector-attribute-quotes',
        variants: [{
            hint: 'Require quotes for attribute values',
            code: '[target=<mark>"</mark>_blank<mark>"</mark>] {}',
            value: 'always'
        }, {
            hint: 'Disallow quotes for attribute values',
            code: '[target=_blank] {}',
            value: 'never'
        }, {
            hint: 'Skip (allow any type of syntax)',
            code: '[target=_blank] {}\n\n[title=<mark>"</mark>flower<mark>"</mark>] {}',
            dismiss: true
        }]
    }, {
        key: 'selector-attribute-operator-space-before',
        variants: [{
            hint: 'Require a single space before operators within attribute selectors',
            code: '[target<mark> </mark>= "_blank"] {}',
            value: 'always'
        }, {
            hint: 'Disallow whitespace before operators within attribute selectors',
            code: '[target= "_blank"] {}',
            value: 'never'
        }, {
            hint: 'Skip (inherit from standard config)',
            dismiss: true
        }]
    }, {
        key: 'selector-attribute-operator-space-after',
        variants: [{
            hint: 'Require a single space after operators within attribute selectors',
            code: '[target =<mark> </mark>"_blank"] {}',
            value: 'always'
        }, {
            hint: 'Disallow whitespace after operators within attribute selectors',
            code: '[target ="_blank"] {}',
            value: 'never'
        }, {
            hint: 'Skip (inherit from standard config)',
            dismiss: true
        }]
    }, {
        key: 'selector-attribute-brackets-space-inside',
        variants: [{
            hint: 'Require a single space on the inside of the brackets within attribute selectors',
            code: '[<mark> </mark>target=_blank<mark> </mark>] {}',
            value: 'always'
        }, {
            hint: 'Disallow whitespace on the inside of the brackets within attribute selectors',
            code: '[target=_blank] {}',
            value: 'never'
        }, {
            hint: 'Skip (inherit from standard config)',
            dismiss: true
        }]
    }, {
        key: 'declaration-block-trailing-semicolon',
        variants: [{
            hint: 'Require trailing semicolon within declaration blocks',
            code: 'a { color: pink<mark>;</mark> }\na { background: orange; color: pink<mark>;</mark> }',
            value: 'always'
        }, {
            hint: 'Disallow trailing semicolon within declaration blocks',
            code: 'a { color: pink }\na { background: orange; color: pink }',
            value: 'never'
        }, {
            hint: 'Skip (inherit from standard config)',
            dismiss: true
        }]
    }, {
        key: 'declaration-no-important',
        variants: [{
            hint: 'Disallow !important within declarations',
            code: 'a {\n color: pink; \n}',
            value: true
        }, {
            hint: 'Allow important',
            dismiss: true,
            code: 'a {\n color: pink <mark>!important</mark>; \n}'
        }]
    }, {
        key: 'declaration-colon-space-before',
        variants: [{
            hint: 'Require a single space before the colon of declarations',
            code: 'a {\n color<mark> </mark>: pink; \n}',
            value: 'always'
        }, {
            hint: 'Disallow whitespace before the colon of declarations',
            code: 'a {\n color: pink; \n}',
            value: 'never'
        }, {
            hint: 'Skip (inherit from standard config)',
            dismiss: true
        }]
    }, {
        key: 'declaration-colon-space-after',
        variants: [{
            hint: 'Require a single space after the colon of declarations',
            code: 'a { color:<mark> </mark>pink }',
            value: 'always'
        }, {
            hint: 'Disallow whitespace after the colon of declarations',
            code: 'a { color:pink }',
            value: 'never'
        }, {
            hint: 'Require only in single lines',
            code: 'a {\n color:<mark> </mark>pink;\n box-shadow:0 0 0 1px #5b9dd9, \n  0 0 2px 1px rgba(30, 140, 190, 0.8); \n}',
            value: 'always-single-line'
        }, {
            hint: 'Skip (inherit from standard config)',
            dismiss: true
        }]
    }, {
        key: 'property-no-vendor-prefix',
        variants: [{
            hint: 'Disallow vendor prefixes for properties',
            code: 'a { \n   transform: scale(1); \n}',
            value: true
        }, {
            hint: 'Allow prefixes',
            dismiss: true,
            code: 'a { \n   <mark>-webkit-</mark>transform: scale(1); \n}'
        }]
    }, {
        key: 'value-no-vendor-prefix',
        hint: '',
        variants: [{
            code: 'a {\n  display: flex; \n}',
            hint: 'Disallow vendor prefixes for values',
            value: true
        }, {
            hint: 'Allow prefixes',
            code: 'a {\n  display: <mark>-webkit</mark>-flex; \n}',
            dismiss: true
        }]
    }, {
        key: 'number-leading-zero',
        variants: [{
            hint: 'Require  leading zero for fractional numbers',
            code: 'a {\n line-height: <mark>0</mark>.5; \n}',
            value: 'always'
        }, {
            hint: 'Disallow leading zero for fractional numbers',
            code: 'a {\n line-height: .5; \n}',
            value: 'never'
        }, {
            hint: 'Skip (inherit from standard config)',
            dismiss: true
        }]
    }, {
        key: 'function-url-quotes',
        variants: [{
            hint: 'Use url quotes',
            code: 'a {\n   background: url(<mark>"</mark>x.jpg<mark>"</mark>); \n}',
            value: 'always'
        }, {
            hint: 'Don\' use url quotes',
            code: 'a {\n   background: url(x.jpg); \n}',
            value: 'never'
        }, {
            hint: 'Skip (allow any syntax)',
            code: 'p {\n   background: url(<mark>"</mark>x.jpg<mark>"</mark>); \n}\n\na {\n   background: url(x.jpg); \n}',
            dismiss: true
        }]
    }, {
        key: 'function-url-data-uris',
        variants: [{
            hint: 'Require data URIs for urls',
            code: 'a {\n  background-image:\n    url("<mark>data:</mark>image/gif;base64,R0lGODlh="); \n}',
            value: 'always'
        }, {
            hint: 'Disallow data URIs for urls',
            code: 'a {\n  background-image: url(image.gif); \n}',
            value: 'never'
        }, {
            hint: 'Skip (allow any type of urls)',
            code: 'a {\n  background-image:\n    url("<mark>data:</mark>image/gif;base64,R0lGODlh="); \n}\n\na {\n  background-image: url(image.gif); \n}',
            dismiss: true
        }]
    }, {
        key: 'font-weight-notation',
        variants: [{
            hint: 'Numeric font weight notation',
            code: 'a {\n  font-weight: <mark>700</mark>; \n}',
            value: 'numeric'
        }, {
            hint: 'Named font weight notation',
            code: 'a {\n  font-weight: <mark>bold</mark>; \n}',
            value: 'named-where-possible'
        }, {
            hint: 'Skip(allow any type of notation)',
            code: 'a {\n  font-weight: <mark>700</mark>; \n}\n\nspan {\n  font-weight: <mark>normal</mark>; \n}',
            dismiss: true
        }]
    }, {
        key: 'font-family-name-quotes',
        variants: [{
            hint: 'Use font family name quotes always where required',
            value: 'always-where-required',
            code: 'a {\n  font-family: <mark>Times New Roman</mark>,\n  Times, serif; \n}\na {\n  font-family: "Hawaii 5-0"; \n}'
        }, {
            hint: 'Use font family name quotes always where recommended',
            value: 'always-where-recommended',
            code: 'a {\n  font-family: <mark>"Times New Roman"</mark>,\n  Times, serif;\n}\na {\n  font-family: Arial, sans-serif;\n}'
        }, {
            hint: 'Use font family name quotes always unless keyword',
            value: 'always-unless-keyword',
            code: 'a {\n  font-family: <mark>"Arial"</mark>, sans-serif;\n}'
        }, {
            hint: 'Skip (allow any type of syntax)',
            dismiss: true
        }]
    }, {
        key: 'comment-whitespace-inside',
        variants: [{
            hint: 'Require  whitespace on the inside of comment markers',
            code: '/*<mark> </mark>comment<mark> </mark>*/',
            value: 'always'
        }, {
            hint: 'Disallow whitespace on the inside of comment markers',
            code: '/*comment*/',
            value: 'never'
        }, {
            hint: 'Skip (inherit from standard config)',
            dismiss: true
        }]
    }, {
        key: 'comment-empty-line-before',
        variants: [{
            hint: 'Require an empty line before comments',
            code: 'a {}\n\n/* comment */',
            value: 'always'
        }, {
            hint: 'Disallow an empty line before comments',
            code: 'a {}\n/* comment */',
            value: 'never'
        }, {
            hint: 'Skip (inherit from standard config)',
            dismiss: true
        }]
    }, {
        key: 'at-rule-no-vendor-prefix',
        variants: [{
            hint: 'Disallow vendor prefixes for at-rules',
            code: '@keyframes { 0% { top: 0; } }',
            value: true
        }, {
            hint: 'Allow prefixes',
            dismiss: true,
            code: '@<mark>-webkit-</mark>keyframes { 0% { top: 0; } }'
        }]
    }, {
        key: 'rule-empty-line-before',
        variants: [{
            hint: 'Require an empty line before rules',
            code: 'a {}\n\nb {}',
            value: 'always'
        }, {
            hint: 'Disallow an empty line before rules',
            code: 'a {}\nb {}',
            value: 'never'
        }, {
            hint: 'Require in multi-line',
            code: 'a {\n  color: red;\n}\n\nb {\n  color: blue;\n}',
            value: 'always-multi-line'
        }, {
            hint: 'Disallow in multi-line',
            code: 'a {\n  color: red;\n}\nb {\n  color: blue;\n}',
            value: 'never-multi-line'
        }, {
            hint: 'Skip (inherit from standard config)',
            dismiss: true
        }]
    }, {
        key: 'selector-pseudo-element-colon-notation',
        variants: [{
            hint: 'Specify single colon notation for applicable pseudo-elements',
            code: 'a<mark>:</mark>before { color: pink; }',
            value: 'single'
        }, {
            hint: 'Specify double colon notation for applicable pseudo-elements',
            code: 'a<mark>::</mark>before { color: pink; }',
            value: 'double'
        }, {
            hint: 'Skip (inherit from standard config)',
            dismiss: true
        }]
    }, {
        key: 'selector-pseudo-class-parentheses-space-inside',
        variants: [{
            hint: 'Require a single space inside of the parentheses within pseudo-class selectors',
            code: 'input:not(<mark> </mark>[type="submit"]<mark> </mark>) {}',
            value: 'always'
        }, {
            hint: 'Disallow whitespace on the inside of the parentheses within pseudo-class selectors',
            code: 'input:not([type="submit"]) {}',
            value: 'never'
        }, {
            hint: 'Skip (inherit from standard config)',
            dismiss: true
        }]
    }, {
        key: 'selector-no-vendor-prefix',
        variants: [{
            hint: 'Disallow vendor prefixes for selectors',
            code: 'input::placeholder {}',
            value: true
        }, {
            hint: 'Allow prefixes',
            dismiss: true,
            code: 'input::<mark>-moz-</mark>placeholder {}'
        }]
    }, {
        key: 'selector-no-universal',
        variants: [{
            hint: 'Disallow the universal selector',
            code: '.foo {}',
            value: true
        }, {
            hint: 'Allow universal selector',
            dismiss: true,
            code: '<mark>*</mark> {}'
        }]
    }, {
        key: 'selector-no-type',
        variants: [{
            hint: 'Disallow type selectors',
            code: '.foo {}',
            value: true
        }, {
            hint: 'Allow type selectors',
            dismiss: true,
            code: '<mark>a</mark> {}'
        }]
    }, {
        key: 'media-feature-range-operator-space-before',
        variants: [{
            hint: 'Require a single space before the range operator in media features',
            code: '@media (max-width<mark> </mark>>=600px) {}',
            value: 'always'
        }, {
            hint: 'Disallow whitespace before the range operator in media features',
            code: '@media (max-width>=600px) {}',
            value: 'never'
        }, {
            hint: 'Skip (inherit from standard config)',
            dismiss: true
        }]
    }, {
        key: 'media-feature-range-operator-space-after',
        variants: [{
            hint: 'Require a single space after the range operator in media features',
            code: '@media (max-width>=<mark> </mark>600px) {}',
            value: 'always'
        }, {
            hint: 'Disallow whitespace after the range operator in media features',
            code: '@media (max-width>=600px) {}',
            value: 'never'
        }, {
            hint: 'Skip (inherit from standard config)',
            dismiss: true
        }]
    }, {
        key: 'media-feature-parentheses-space-inside',
        variants: [{
            hint: 'Require a single space on the inside of the parentheses within media features',
            code: '@media (<mark> </mark>max-width: 300px<mark> </mark>) {}',
            value: 'always'
        }, {
            hint: 'Disallow whitespace on the inside of the parentheses within media features',
            code: '@media (max-width: 300px) {}',
            value: 'never'
        }, {
            hint: 'Skip (inherit from standard config)',
            dismiss: true
        }]
    }, {
        key: 'media-feature-name-no-vendor-prefix',
        variants: [{
            hint: 'Disallow vendor prefixes for media feature names',
            code: '@media (min-device-pixel-ratio: 1) {}',
            value: true
        }, {
            hint: 'Allow prefixes',
            dismiss: true,
            code: '@media (<mark>-webkit-</mark>min-device-pixel-ratio: 1) {}',
            value: false
        }]
    }, {
        key: 'media-feature-colon-space-before',
        variants: [{
            hint: 'Require a single space before the colon in media features',
            code: '@media (max-width<mark> </mark>:600px) {}',
            value: 'always'
        }, {
            hint: 'Disallow whitespace before the colon in media features',
            code: '@media (max-width:600px) {}',
            value: 'never'
        }, {
            hint: 'Skip (inherit from standard config)',
            dismiss: true
        }]
    }, {
        key: 'media-feature-colon-space-after',
        variants: [{
            hint: 'Require a single space after the colon in media features',
            code: '@media (max-width:<mark> </mark>600px) {}',
            value: 'always'
        }, {
            hint: 'Disallow whitespace after the colon in media features',
            code: '@media (max-width:600px) {}',
            value: 'never'
        }, {
            hint: 'Skip (inherit from standard config)',
            dismiss: true
        }]
    }]
};
export { options as default };
