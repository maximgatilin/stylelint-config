var options = {
    selector: '.oncogene',
    dismissBtn: '.js-dismiss-btn',
    config: { rules: {} },
    skipValidation: true,
    steps: [{
        key: 'no-missing-end-of-source-newline',
        hint: 'Disallow missing end-of-source newlines',
        variants: [{
            hint: 'Disallow',
            code: 'a { color: pink; }\n\\n',
            value: true
        }, {
            hint: 'Allow',
            dismiss: true,
            code: 'a { color: pink; }',
            value: false,
        }]
    }, {
        key: 'no-unknown-animations',
        hint: 'Disallow unknown animations',
        variants: [{
            hint: 'Disallow',
            code: 'a { animation-name: fancy-slide; }\n@keyframes fancy-slide {}',
            value: true
        }, {
            hint: 'Allow',
            code: 'a { animation-name: <mark>fancccy-slide</mark>; }\n@keyframes <mark>fancy-slide</mark> {}',
            value: false,
            dismiss: true
        }]
    }, {
        key: 'indentation',
        hint: 'Specify indentation',
        variants: [{
            input: true,
            hint: 'Spaces(specify number of spaces)',
            valueType: "int",
            placeholder: '',
            value: 0
        }, {
            hint: 'Tabs',
            value: 'tab'
        }]
    }, {
        key: 'max-empty-lines',
        hint: 'Limit the number of adjacent empty lines(int)',
        variants: [{
            input: true,
            valueType: "int",
            placeholder: 'Amount of lines',
            code: 'a {}\n     /* ← */\n     /* ← */\na {} /* ↑ */\n/**     ↑\n * These lines */',
            value: 0
        }]
    }, {
        key: 'no-invalid-double-slash-comments',
        hint: 'Disallow double-slash comments (//...) which are not supported by CSS',
        variants: [{
            hint: 'Disallow',
            code: 'a { /* color: pink; */ }',
            value: true
        }, {
            hint: 'Allow',
            dismiss: true,
            code: 'a { // color: pink; }',
            value: false
        }]
    }, {
        key: 'no-extra-semicolons',
        hint: 'Disallow extra semicolons',
        variants: [{
            code: '@import "x.css";',
            value: true
        }, {
            hint: 'Allow',
            dismiss: true,
            code: '@import "x.css";;',
            value: false
        }]
    }, {
        key: 'no-eol-whitespace',
        hint: 'Disallow end-of-line whitespace',
        variants: [{
            hint: 'Disallow',
            value: true
        }, {
            dismiss: true,
            hint: 'Allow',
            code: 'a { color: pink; }···\n/**               ↑\n *  This whitespace */',
            value: false
        }]
    }, {
        key: 'no-empty-source',
        hint: 'Disallow empty sources',
        variants: [{
            hint: 'Disallow',
            value: true
        }, {
            hint: 'Allow',
            dismiss: true,
            code: '  ···\\n\\t\n/**     ↑\n *  This empty source */',
            value: false
        }]
    }, {
        key: 'no-duplicate-selectors',
        hint: 'Disallow duplicate selectors within a stylesheet',
        variants: [{
            hint: 'Disallow',
            value: true
        }, {
            hint: 'Allow',
            dismiss: true,
            code: '<mark>.foo</mark> {}\n.bar {}\n<mark>.foo</mark> {}',
            value: false
        }]
    }, {
        key: 'no-descending-specificity',
        hint: 'Disallow selectors of lower specificity from coming after overriding selectors of higher specificity',
        variants: [{
            hint: 'Disallow',
            code: 'a {}\nb a {}',
            value: true
        }, {
            hint: 'Allow',
            dismiss: true,
            code: 'b a {}\na {}',
            value: false
        }]
    }, {
        key: 'max-nesting-depth',
        hint: 'Limit the allowed nesting depth(int)',
        variants: [{
            input: true,
            valueType: "int",
            code: 'a { & > b { top: 0; }\n/** ↑\n * This nesting */',
            value: 0
        }]
    }, {
        key: 'max-line-length',
        hint: 'Limit the length of a line(int)',
        variants: [{
            input: true,
            valueType: "int",
            code: 'a { color: red }\n/**            ↑\n *       The end */',
            value: 0
        }]
    }, {
        key: 'comment-word-blacklist',
        hint: 'Specify a blacklist of disallowed words within comments(e.g. TODO)',
        variants: [{
            input: true,
            valueType: "array",
            hint: 'Write words in space',
            value: []
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
        key: 'comment-no-empty',
        hint: 'Disallow empty comments',
        variants: [{
            hint: 'Disallow',
            code: '/* comment */',
            value: true
        }, {
            hint: 'Allow',
            code: '/* */',
            dismiss: true,
            value: false
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
        key: 'at-rule-whitelist',
        hint: 'Specify a whitelist of disallowed at-rules(e.g. extend)',
        variants: [{
            input: true,
            valueType: "array",
            hint: 'Write at-rules names in space',
            value: []
        }]
    }, {
        key: 'at-rule-semicolon-newline-after',
        hint: 'Require a newline after the semicolon of at-rules',
        variants: [{
            hint: 'Always',
            value: 'always',
            code: '@import url("x.css");\n@import url("y.css");'
        }, {
            hint: 'Not specified',
            dismiss: true,
            code: '@import url("x.css"); @import url("y.css");',
            value: false
        }]
    }, {
        key: 'at-rule-no-vendor-prefix',
        hint: 'Disallow vendor prefixes for at-rules',
        variants: [{
            hint: 'Disallow',
            value: true
        }, {
            hint: 'Allow',
            dismiss: true,
            code: '@<mark>-webkit-</mark>keyframes { 0% { top: 0; } }',
            value: false
        }]
    }, {
        key: 'at-rule-no-unknown',
        hint: 'Disallow unknown at-rules',
        variants: [{
            hint: 'Disallow',
            value: true
        }, {
            hint: 'Allow',
            dismiss: true,
            code: '<mark>@unknown</mark> {}',
            value: false
        }]
    }, {
        key: 'at-rule-name-space-after',
        hint: 'Require a single space after at-rule names',
        variants: [{
            hint: 'Always',
            code: '@charset<mark> </mark>"UTF-8";',
            value: 'always'
        }, {
            hint: 'Always single-line',
            code: '@charset<mark> </mark>"UTF-8";\n\n@media(min-width: 700px) and\n  (orientation: portrait) {}',
            value: 'always-single-line'
        }]
    }, {
        key: 'at-rule-name-newline-after',
        hint: 'Require a newline after at-rule names',
        variants: [{
            hint: 'Always',
            code: '@charset\n  "UTF-8";',
            value: 'always'
        }, {
            hint: 'Always multi-line',
            code: '@charset "UTF-8";\n\n@media\n  (min-width: 700px) and\n  (orientation: landscape) {}',
            value: 'always-multi-line'
        }]
    }, {
        key: 'at-rule-name-case',
        hint: 'Specify lowercase or uppercase for at-rules names',
        variants: [{
            code: '@charset "UTF-8";',
            value: 'lower'
        }, {
            code: '@CHARSET "UTF-8"',
            value: 'upper'
        }]
    }, {
        key: 'at-rule-empty-line-before',
        hint: 'Require or disallow an empty line before at-rules',
        variants: [{
            code: 'a {}\n\n@media {}',
            value: 'always'
        }, {
            code: 'a {}\n@media {}',
            value: 'never'
        }]
    }, {
        key: 'at-rule-blacklist',
        hint: 'Specify a blacklist of disallowed at-rules(e.g. extend)',
        variants: [{
            input: true,
            valueType: "array",
            hint: 'Write at-rules names in space',
            value: []
        }]
    }, {
        key: 'media-query-list-comma-space-before',
        hint: 'Require a single space or disallow whitespace before the commas of media query lists',
        variants: [{
            hint: 'Always',
            code: '@media screen and (color)<mark> </mark>,projection and (color) {}',
            value: 'always'
        }, {
            hint: 'Never',
            code: '@media screen and (color),projection and (color) {}',
            value: 'never'
        }, {
            hint: 'Always in single-line',
            code: '@media screen and (color)<mark> </mark>,projection and (color) {}\n\n@media screen and (color)\n, projection and (color) {}',
            value: 'always-single-line'
        }, {
            hint: 'Never in single-line',
            code: '@media screen and (color),projection and (color) {}\n\n@media screen and (color)\n,projection and (color) {}',
            value: 'never-single-line'
        }]
    }, {
        key: 'media-query-list-comma-space-after',
        hint: 'Require a single space or disallow whitespace after the commas of media query lists',
        variants: [{
            hint: 'Always',
            code: '@media screen and (color),<mark> </mark>projection and (color) {}',
            value: 'always'
        }, {
            hint: 'Never',
            code: '@media screen and (color),projection and (color) {}',
            value: 'never'
        }, {
            hint: 'Always in single-line',
            code: '@media screen and (color),<mark> </mark>projection and (color) {}\n\n@media screen and (color)\n,projection and (color) {}',
            value: 'always-single-line'
        }, {
            hint: 'Never in single-line',
            code: '@media screen and (color),projection and (color) {}\n\n@media screen and (color)\n, projection and (color) {}',
            value: 'never-single-line'
        }]
    }, {
        key: 'media-query-list-comma-newline-before',
        hint: 'Require a newline or disallow whitespace before the commas of media query lists',
        variants: [{
            hint: 'Always',
            code: '@media screen and (color)\n,projection and (color) {}',
            value: 'always'
        }, {
            hint: 'Always in multi-line',
            code: '@media screen and (color), projection and (color) {}\n\n@media screen and (color)\n,projection and (color) {}',
            value: 'always-multi-line'
        }, {
            hint: 'Never in multi-line',
            code: '@media screen and (color), projection and (color) {}\n\n@media screen and (color),\nprojection and (color) {}',
            value: 'never-multi-line'
        }]
    }, {
        key: 'media-query-list-comma-newline-after',
        hint: 'Require a newline or disallow whitespace after the commas of media query lists',
        variants: [{
            hint: 'Always',
            code: '@media screen and (color),\nprojection and (color) {}',
            value: 'always'
        }, {
            hint: 'Always in multi-line',
            code: '@media screen and (color), projection and (color) {}\n\n@media screen and (color),\nprojection and (color) {}',
            value: 'always-multi-line'
        }, {
            hint: 'Never in multi-line',
            code: '@media screen and (color), projection and (color) {}\n\n@media screen and (color)\n,projection and (color) {}',
            value: 'never-multi-line'
        }]
    }, {
        key: 'custom-media-pattern',
        hint: 'Specify a pattern for custom media query names',
        variants: [{
            input: true,
            valueType: "string",
            placeholder: 'Write pattern here',
            code: '@custom-media --foo (max-width: 30em);\n/**             ↑\n * The pattern of this */',
            value: ""
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
        }]
    }, {
        key: 'media-feature-name-whitelist',
        hint: 'Specify a whitelist of allowed media feature names(e.g. min-width)',
        variants: [{
            input: true,
            valueType: "array",
            hint: 'Write features names in space',
            value: []
        }]
    }, {
        key: 'media-feature-name-no-vendor-prefix',
        hint: 'Disallow vendor prefixes for media feature names',
        variants: [{
            hint: 'Disallow',
            code: '@media (min-device-pixel-ratio: 1) {}',
            value: true
        }, {
            hint: 'Allow',
            dismiss: true,
            code: '@media (<mark>-webkit-</mark>min-device-pixel-ratio: 1) {}',
            value: false
        }]
    }, {
        key: 'media-feature-name-no-unknown',
        hint: 'Disallow unknown media feature names',
        variants: [{
            hint: 'Disallow',
            value: true
        }, {
            hint: 'Allow',
            dismiss: true,
            code: '@media screen and (<mark>unknown</mark>) {}',
            value: false
        }]
    }, {
        key: 'media-feature-name-case',
        hint: 'Specify lowercase or uppercase for media feature names',
        variants: [{
            code: '@media (min-width: 700px) {}',
            value: 'lower'
        }, {
            code: '@media (MIN-WIDTH: 700px) {}',
            value: 'upper'
        }]
    }, {
        key: 'media-feature-name-blacklist',
        hint: 'Specify a blacklist of disallowed media feature names(e.g. min-width)',
        variants: [{
            input: true,
            valueType: "array",
            hint: 'Write features names in space',
            value: []
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
        }]
    }, {
        key: 'selector-list-comma-space-before',
        hint: 'Require a single space or disallow whitespace before the commas of selector lists',
        variants: [{
            hint: 'Always',
            code: 'a<mark> </mark>,b { color: pink; }',
            value: 'always'
        }, {
            hint: 'Never',
            code: 'a,b { color: pink; }',
            value: 'never'
        }, {
            hint: 'Always in single-line',
            code: 'a<mark> </mark>,b { color: pink; }\n\na,\nb { color: pink; }',
            value: ''
        }, {
            hint: 'Never in single-line',
            code: 'a,b { color: pink; }\n\na ,\nb { color: pink; }',
            value: 'never-single-line'
        }]
    }, {
        key: 'selector-list-comma-space-after',
        hint: 'Require a single space or disallow whitespace after the commas of selector lists',
        variants: [{
            hint: 'Always',
            code: 'a,<mark> </mark>b { color: pink; }',
            value: 'always'
        }, {
            hint: 'Never',
            code: 'a,b { color: pink; }',
            value: 'never'
        }, {
            hint: 'Always in single-line',
            code: 'a,<mark> </mark>b { color: pink; }\n\na\n,b { color: pink; }',
            value: 'always-single-line'
        }, {
            hint: 'Never in single-line',
            code: 'a,b { color: pink; }\n\na\n, b { color: pink; }',
            value: 'never-single-line'
        }]
    }, {
        key: 'selector-list-comma-newline-before',
        hint: 'Require a newline or disallow whitespace before the commas of selector lists',
        variants: [{
            hint: 'Always',
            code: 'a\n, b { color: pink; }\n\na\n,b { color: pink; }',
            value: 'always'
        }, {
            hint: 'Always in multi-line',
            code: 'a, b { color: pink; }\n\na\n,b { color: pink; }',
            value: 'always-multi-line'
        }, {
            hint: 'Never in multi-line',
            code: 'a,b { color: pink; }\n\na,\nb { color: pink; }',
            value: 'never-multi-line'
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
        }]
    }, {
        key: 'selector-max-empty-lines',
        hint: 'Limit the number of adjacent empty lines within selectors(int)',
        variants: [{
            input: true,
            valueType: "int",
            placeholder: 'Amount of lines',
            code: 'a,\n              /* ← */\nb {        /* ↑ */\n  color: red; /* ↑ */\n}             /* ↑ */\n/**              ↑\n *        This empty line */',
            value: 0
        }]
    }, {
        key: 'selector-type-no-unknown',
        hint: 'Disallow unknown pseudo-element selectors',
        variants: [{
            hint: 'Disallow',
            value: true
        }, {
            hint: 'Allow',
            dismiss: true,
            code: 'unknown {}',
            value: false
        }]
    }, {
        key: 'selector-type-case',
        hint: 'Specify lowercase or uppercase for type selectors',
        variants: [{
            hint: 'Lower',
            code: 'li {}',
            value: 'lower'
        }, {
            hint: 'Upper',
            code: 'LI {}',
            value: 'upper'
        }]
    }, {
        key: 'selector-pseudo-element-no-unknown',
        hint: 'Disallow unknown pseudo-element selectors',
        variants: [{
            hint: 'Disallow',
            value: true
        }, {
            hint: 'Allow',
            dismiss: true,
            code: 'a::unknown {}',
            value: false
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
        }]
    }, {
        key: 'selector-pseudo-element-case',
        hint: 'Specify lowercase or uppercase for pseudo-element selectors',
        variants: [{
            hint: 'Lower',
            code: 'a:before {}',
            value: 'lower'
        }, {
            hint: 'Upper',
            code: 'a:BEFORE {}',
            value: 'upper'
        }]
    }, {
        key: 'selector-pseudo-class-whitelist',
        hint: 'Specify a whitelist of allowed pseudo-class selectors',
        variants: [{
            input: true,
            valueType: "array",
            hint: 'Write classes names in space',
            value: []
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
        }]
    }, {
        key: 'selector-pseudo-class-no-unknown',
        hint: 'Disallow unknown pseudo-class selectors',
        variants: [{
            hint: 'Disallow',
            value: true
        }, {
            hint: 'Allow',
            dismiss: true,
            code: 'a:<mark>unknown</mark> {}',
            value: false
        }]
    }, {
        key: 'selector-pseudo-class-case',
        hint: 'Specify lowercase or uppercase for pseudo-class selectors',
        variants: [{
            hint: 'Lower',
            code: 'a:hover {}',
            value: 'lower'
        }, {
            hint: 'Upper',
            code: 'a:HOVER {}',
            value: 'upper'
        }]
    }, {
        key: 'selector-pseudo-class-blacklist',
        hint: 'Specify a blacklist of disallowed pseudo-class selectors.',
        variants: [{
            input: true,
            valueType: "array",
            hint: 'Write classes names in space',
            value: []
        }]
    }, {
        key: 'selector-no-vendor-prefix',
        hint: 'Disallow vendor prefixes for selectors',
        variants: [{
            hint: 'Disallow',
            code: 'input::placeholder {}',
            value: true
        }, {
            hint: 'Allow',
            dismiss: true,
            code: 'input::<mark>-moz-</mark>placeholder {}',
            value: false
        }]
    }, {
        key: 'selector-no-universal',
        hint: 'Disallow the universal selector',
        variants: [{
            hint: 'Disallow',
            value: true
        }, {
            hint: 'Allow',
            dismiss: true,
            code: '<mark>*</mark> {}',
            value: false
        }]
    }, {
        key: 'selector-no-type',
        hint: 'Disallow type selectors',
        variants: [{
            hint: 'Disallow',
            code: '.foo {}',
            value: true
        }, {
            hint: 'Allow',
            dismiss: true,
            code: '<mark>a</mark> {}',
            value: false
        }]
    }, {
        key: 'selector-no-qualifying-type',
        hint: 'Disallow qualifying a selector by type',
        variants: [{
            hint: 'Disallow',
            code: '.foo {\n  margin: 0\n}',
            value: true
        }, {
            hint: 'Allow',
            dismiss: true,
            code: '<mark>a</mark>.foo {\n  margin: 0\n}',
            value: false
        }]
    }, {
        key: 'selector-no-id',
        hint: 'Disallow id selectors',
        variants: [{
            hint: 'Disallow',
            value: true
        }, {
            hint: 'Allow',
            dismiss: true,
            code: '    #foo {}\n/** ↑\n * This type of selector */',
            value: false
        }]
    }, {
        key: 'selector-no-combinator',
        hint: 'Disallow combinators in selectors',
        variants: [{
            hint: 'Disallow',
            value: true
        }, {
            hint: 'Allow',
            dismiss: true,
            code: '  a > b + c ~ d e { color: pink; }\n/** ↑   ↑   ↑  ↑\n * These are combinators */',
            value: false
        }]
    }, {
        key: 'selector-no-attribute',
        hint: 'Disallow attribute selectors',
        variants: [{
            hint: 'Disallow',
            value: true
        }, {
            hint: 'Allow',
            dismiss: true,
            code: '[foo] {}',
            value: false
        }]
    }, {
        key: 'selector-nested-pattern',
        hint: 'Specify a pattern for the selectors of rules nested within rules',
        variants: [{
            input: true,
            valueType: "string",
            placeholder: 'Write pattern here',
            code: '    a {\n      color: orange;\n      &:hover { color: pink; }\n    } ↑\n/**   ↑\n * These nested selectors */',
            value: ""
        }]
    }, {
        key: 'selector-max-specificity',
        hint: 'Limit the specificity of selectors',
        variants: [{
            input: true,
            valueType: "string",
            placeholder: 'Specificity amount',
            code: '    .foo, #bar.baz span, #hoo { color: pink; }\n/** ↑     ↑              ↑\n * Each of these selectors */',
            value: ""
        }]
    }, {
        key: 'selector-max-compound-selectors',
        hint: 'Limit the number of compound selectors in a selector(int)',
        variants: [{
            input: true,
            valueType: "int",
            placeholder: 'Amount of levels',
            code: '   div .bar[data-val] > a.baz + .boom > #lorem {}\n/* ↑   ↑                ↑       ↑       ↑\n   |   |                |       |       |\n  Lv1 Lv2              Lv3     Lv4     Lv5\n these are compound selectors */',
            value: 0
        }]
    }, {
        key: 'selector-id-pattern',
        hint: 'Specify a pattern for id selectors(string|regexp)',
        variants: [{
            input: true,
            valueType: "string",
            placeholder: 'Write pattern here',
            code: 'Example "foo-[a-z]+" \n#<mark>foo-bar</mark> {}\n',
            value: ''
        }]
    }, {
        key: 'selector-descendant-combinator-no-non-space',
        hint: 'Disallow non-space characters for descendant combinators of selectors',
        variants: [{
            code: '.foo .bar {}',
            value: true
        }, {
            dismiss: true,
            code: '.foo <mark> </mark>.bar {}',
            value: false
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
        }]
    }, {
        key: 'selector-class-pattern',
        hint: 'Specify a pattern for class selectors(string|regexp)',
        variants: [{
            input: true,
            valueType: "string",
            placeholder: 'Write pattern here',
            code: 'Example "foo-[a-z]+" \n\n.<mark>foo-bar</mark> {}',
            value: ''
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
        }]
    }, {
        key: 'selector-attribute-operator-whitelist',
        hint: 'Specify a whitelist of allowed attribute operators(e.g. "*=")',
        variants: [{
            input: true,
            valueType: "array",
            hint: 'Write operators names in space',
            value: []
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
        }]
    }, {
        key: 'selector-attribute-operator-blacklist',
        hint: 'Specify a blacklist of disallowed attribute operators(e.g. "*=")',
        variants: [{
            input: true,
            valueType: "array",
            hint: 'Write operators names in space',
            value: []
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
        }]
    }, {
        key: 'block-opening-brace-space-after',
        hint: 'Require a single space or disallow whitespace before the opening brace of blocks',
        variants: [{
            hint: 'Always',
            code: 'a { color: pink; }\n\na {\ncolor: pink; }',
            value: 'always'
        }, {
            hint: 'Never',
            code: 'a{ color: pink; }\n\na{\ncolor: pink; }',
            value: 'never'
        }, {
            hint: 'Always in single-line',
            code: 'a { color: pink; }\n\na{\ncolor: pink; }',
            value: 'always-single-line'
        }, {
            hint: 'Never in single-line',
            code: 'a{ color: pink; }\n\na {\ncolor: pink; }',
            value: 'never-single-line'
        }, {
            hint: 'Always in multi-line',
            code: 'a{ color: pink; }\n\na {\ncolor: pink; }',
            value: 'always-multi-line'
        }, {
            hint: 'Never in multi-line',
            code: 'a { color: pink; }\n\na{\ncolor: pink;}',
            value: 'never-multi-line'
        }]
    }, {
        key: 'block-opening-brace-space-after',
        hint: 'Require a single space or disallow whitespace after the opening brace of blocks',
        variants: [{
            hint: 'Always',
            code: 'a { color: pink; }\n\na { color: pink;\n}',
            value: 'always'
        }, {
            hint: 'Never',
            code: 'a {color: pink; }\n\na\n{color: pink; }',
            value: 'never'
        }, {
            hint: 'Always in single-line',
            code: 'a { color: pink; }\n\na {color: pink;\n}',
            value: 'always-single-line'
        }, {
            hint: 'Never in single-line',
            code: 'a {color: pink; }\n\na { color: pink;\n}',
            value: 'never-single-line'
        }, {
            hint: 'Always in multi-line',
            code: 'a {color: pink; }\n\na { color: pink;\n}',
            value: 'always-multi-line'
        }, {
            hint: 'Never in multi-line',
            code: 'a { color: pink; }\n\na {color: pink;\n}',
            value: 'never-multi-line'
        }]
    }, {
        key: 'block-opening-brace-newline-before',
        hint: 'Require a newline or disallow whitespace before the opening brace of blocks',
        variants: [{
            hint: 'Always',
            code: 'a\n{ color: pink; }\n\na\n{\ncolor: pink; }',
            value: 'always'
        }, {
            hint: 'Always in single-line',
            code: 'a\n{ color: pink; }\n\na{\ncolor: pink; }',
            value: 'always-single-line'
        }, {
            hint: 'Never in single-line',
            code: 'a{ color: pink; }\n\na {\ncolor: pink; }',
            value: 'never-single-line'
        }, {
            hint: 'Always in multi-line',
            code: 'a { color: pink; }\n\na\n{ color: pink; }',
            value: 'always-multi-line'
        }, {
            hint: 'Never in multi-line',
            code: 'a { color: pink; }\n\na{\ncolor: pink;}',
            value: 'never-multi-line'
        }]
    }, {
        key: 'block-opening-brace-newline-after',
        hint: 'Require a newline after the opening brace of blocks',
        variants: [{
            hint: 'Always',
            code: 'a {\ncolor: pink; }\n\na\n{\ncolor: pink; }',
            value: 'always'
        }, {
            hint: 'Always in multi-line',
            code: 'a { color: pink; }\n\na {\ncolor: pink; }',
            value: 'always-multi-line'
        }, {
            hint: 'Never in multi-line',
            code: 'a { color: pink; }\n\na {color: pink;\n}',
            value: 'never-multi-line'
        }]
    }, {
        key: 'block-no-empty',
        hint: 'Disallow empty blocks',
        variants: [{
            hint: 'Disallow',
            code: 'a { color: pink; }',
            value: true
        }, {
            hint: 'Allow',
            dismiss: true,
            code: 'a { }',
            value: false
        }]
    }, {
        key: 'block-closing-brace-space-before',
        hint: 'Require a single space or disallow whitespace before the closing brace of blocks',
        variants: [{
            hint: 'Always',
            code: 'a { color: pink; }',
            value: 'always'
        }, {
            hint: 'Never',
            code: 'a{ color: pink;}',
            value: 'never'
        }, {
            hint: 'Always in single-line',
            code: 'a { color: pink; }\n\na {\ncolor: pink;}',
            value: 'always-single-line'
        }, {
            hint: 'Never in single-line',
            code: 'a { color: pink;}\n\na {\ncolor: pink; }',
            value: 'never-single-line'
        }, {
            hint: 'Always in multi-line',
            code: 'a { color: pink;}\n\na {\ncolor: pink; }',
            value: 'always-multi-line'
        }, {
            hint: 'Never in multi-line',
            code: 'a { color: pink; }\n\na {\ncolor: pink;}',
            value: 'never-multi-line'
        }]
    }, {
        key: 'block-closing-brace-space-after',
        hint: 'Require a single space or disallow whitespace after the closing brace of blocks',
        variants: [{
            hint: 'Always',
            code: 'a { color: pink; } b { color: red; }',
            value: 'always'
        }, {
            hint: 'Never',
            code: 'a { color: pink; }b { color: red; }\n\na { color: pink;\n}b { color: red; }',
            value: 'never'
        }, {
            hint: 'Always in single-line',
            code: 'a { color: pink; } b { color: red; }\n\na { color: pink;\n}b { color: red; }',
            value: 'always-single-line'
        }, {
            hint: 'Never in single-line',
            code: 'a { color: pink; }b { color: red; }\n\na { color: pink;\n} b { color: red; }',
            value: 'never-single-line'
        }, {
            hint: 'Always in multi-line',
            code: 'a { color: pink; }b { color: red; }\n\na { color: pink;\n} b { color: red; }',
            value: 'always-multi-line'
        }, {
            hint: 'Never in multi-line',
            code: 'a { color: pink; } b { color: red; }\n\na { color: pink;\n}b { color: red; }',
            value: 'never-multi-line'
        }]
    }, {
        key: 'block-closing-brace-newline-before',
        hint: 'Require a newline or disallow whitespace before the closing brace of blocks',
        variants: [{
            hint: 'Always',
            code: 'a { color: pink;\n}\n\na {\ncolor: pink;\n}',
            value: 'always'
        }, {
            hint: 'Always in multi-line',
            code: 'a { color: pink; }\n\na { color: pink;\n}',
            value: 'always-multi-line'
        }, {
            hint: 'Never in multi-line',
            code: 'a { color: pink; }\n\na {\ncolor: pink;}',
            value: 'never-multi-line'
        }]
    }, {
        key: 'block-closing-brace-newline-after',
        hint: 'Require a newline or disallow whitespace after the closing brace of blocks.',
        variants: [{
            hint: 'Always',
            code: 'a { color: pink; }\nb { color: red; }',
            value: 'always'
        }, {
            hint: 'Always in single-line',
            code: 'a { color: pink;\n} b { color: red; }\n\na { color: pink; }\nb { color: red; }',
            value: 'always-single-line'
        }, {
            hint: 'Never in single-line',
            code: 'a { color: pink; }b { color: red; }\n\na { color: pink;\n} b { color: red; }',
            value: 'never-single-line'
        }, {
            hint: 'Always in multi-line',
            code: 'a { color: pink; }b { color: red; }\n\na { color: pink;\n}\nb { color: red; }',
            value: 'always-multi-line'
        }, {
            hint: 'Never in multi-line',
            code: 'a { color: pink; } b { color: red; }\n\na { color: pink;\n}b { color: red; }',
            value: 'never-multi-line'
        }]
    }, {
        key: 'block-closing-brace-empty-line-before',
        hint: 'Require or disallow an empty line before the closing brace of blocks.',
        variants: [{
            hint: 'Always in multi-line',
            code: 'a {\n color: pink;\n<mark> * This line */</mark>\n}\na { color: pink; }',
            value: "always-multi-line"
        }, {
            hint: 'Never',
            code: 'a {\n color: pink;\n}\na { color: pink; }',
            value: "never"
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
        }]
    }, {
        key: 'declaration-block-single-line-max-declarations',
        hint: 'Limit the number of declaration within a single line declaration block(int)',
        variants: [{
            input: true,
            valueType: "int",
            placeholder: 'Amount of declarations',
            code: 'a { color: pink; top: 0; }\n/** ↑            ↑\n * The number of these declarations */',
            value: '0'
        }]
    }, {
        key: 'declaration-block-semicolon-space-before',
        hint: 'Require a single space or disallow whitespace before the semicolons of declaration blocks',
        variants: [{
            hint: 'Always',
            code: 'a { color: pink<mark> </mark>; }',
            value: "always"
        }, {
            hint: 'Never',
            code: 'a { color: pink; }',
            value: "never"
        }, {
            hint: 'Always in single-line',
            code: 'a { color: pink<mark> </mark>; }\na { color: pink; top: 0; }',
            value: "always-single-line"
        }, {
            hint: 'Never in single-line',
            code: 'a { color: pink; }\na { color: pink; top: 0; }',
            value: "never-single-line"
        }]
    }, {
        key: 'declaration-block-semicolon-space-after',
        hint: 'Require a single space or disallow whitespace after the semicolons of declaration blocks',
        variants: [{
            hint: 'Always',
            code: 'a { color: pink;}\na { color: pink;<mark> </mark>top: 0; }',
            value: "always"
        }, {
            hint: 'Never',
            code: 'a { color: pink;}\na { color: pink;top: 0; }',
            value: "never"
        }, {
            hint: 'Always in single-line',
            code: 'a { color: pink;<mark> </mark>top: 0; }\n\na {\n  color: pink;\n  top: 0;\n}',
            value: "always-single-line"
        }, {
            hint: 'Never in single-line',
            code: 'a { color: pink;top: 0; }\n\na {\n  color: pink;\n  top: 0;\n}',
            value: "never-single-line"
        }]
    }, {
        key: 'declaration-block-semicolon-newline-before',
        hint: 'Require a newline or disallow whitespace before the semicolons of declaration blocks',
        variants: [{
            hint: 'Always',
            code: 'a {\n color: pink\n;}',
            value: "always"
        }, {
            hint: 'Always in multi-line',
            code: 'a { color: pink; }\n\na {\n color: pink\n ; top: 0;\n}',
            value: "always-multi-line"
        }, {
            hint: 'Never in multi-line',
            code: 'a { color: pink; top: 0; }\n\na {\n color: pink;\n top:0;\n}',
            value: "never-multi-line"
        }]
    }, {
        key: 'declaration-block-semicolon-newline-after',
        hint: 'Require a newline or disallow whitespace after the semicolons of declaration blocks',
        variants: [{
            hint: 'Always',
            code: 'a {\n color: pink;\n top: 0;\n}',
            value: "always"
        }, {
            hint: 'Always in multi-line',
            code: 'a { color: pink; }\n\na {\n color: pink;\n top: 0;\n}',
            value: "always-multi-line"
        }, {
            hint: 'Never in multi-line',
            code: 'a { color: pink; top: 0; }\n\na {\n color: pink\n ; top:0;\n}',
            value: "never-multi-line"
        }]
    }, {
        key: 'declaration-block-no-redundant-longhand-properties',
        hint: 'Disallow longhand properties that can be combined into one shorthand property',
        variants: [{
            hint: 'Disallow',
            code: 'a {\n margin: 1px 2px 3px 4px; \n}',
            value: true
        }, {
            hint: 'Allow',
            dismiss: true,
            code: 'a {\n margin-top: 1px;\n margin-right: 2px;\n margin-bottom: 3px;\n margin-left: 4px; \n}',
            value: false
        }]
    }, {
        key: 'declaration-block-no-duplicate-properties',
        hint: 'Disallow duplicate properties within declaration blocks',
        variants: [{
            hint: 'Disallow',
            code: 'a {\n color: pink; \n}',
            value: true
        }, {
            hint: 'Allow',
            dismiss: true,
            code: 'a {\n color: pink;\n color: orange; \n}',
            value: false
        }]
    }, {
        key: 'declaration-property-value-whitelist',
        hint: 'Specify a whitelist of allowed property and value pairs within declarations(e.g. uppercase)',
        variants: [{
            input: true,
            valueType: "array",
            hint: 'Write properties names in space',
            value: []
        }]
    }, {
        key: 'declaration-property-value-blacklist',
        hint: 'Specify a blacklist of disallowed property and value pairs within declarations(e.g. uppercase)',
        variants: [{
            input: true,
            valueType: "array",
            hint: 'Write properties names in space',
            value: []
        }]
    }, {
        key: 'declaration-property-unit-whitelist',
        hint: 'Specify a whitelist of allowed property and unit pairs within declarations(e.g. rem, s)',
        variants: [{
            input: true,
            valueType: "array",
            hint: 'Write units names in space',
            value: []
        }]
    }, {
        key: 'declaration-property-unit-blacklist',
        hint: 'Specify a blacklist of disallowed property and unit pairs within declarations(e.g. rem, s)',
        variants: [{
            input: true,
            valueType: "array",
            hint: 'Write units names in space',
            value: []
        }]
    }, {
        key: 'declaration-no-important',
        hint: 'Disallow !important within declarations.',
        variants: [{
            hint: 'Disallow',
            code: 'a {\n color: pink; \n}',
            value: true
        }, {
            hint: 'Allow',
            dismiss: true,
            code: 'a {\n color: pink <mark>!important</mark>; \n}',
            value: false
        }]
    }, {
        key: 'declaration-empty-line-before',
        hint: 'Require or disallow an empty line before declarations',
        variants: [{
            hint: 'Always',
            code: 'a {\n   bottom: 15px;\n<mark>    </mark>\n   top: 5px; \n}',
            value: 'always'
        }, {
            hint: 'Never',
            code: 'a {\n   bottom: 15px;\n   top: 5px; \n}',
            value: 'never'
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
        }]
    }, {
        key: 'declaration-colon-newline-after',
        hint: 'Require a newline or disallow whitespace after the colon of declarations',
        variants: [{
            hint: 'Always',
            code: 'a {\n color:<mark> </mark>\n  pink; \n}',
            value: 'always'
        }, {
            hint: 'Always in multi-line',
            code: 'a {\n color: pink;\n box-shadow:<mark> </mark>\n  0 0 0 1px #5b9dd9, \n  0 0 2px 1px rgba(30, 140, 190, 0.8); \n}',
            value: 'always-multi-line'
        }]
    }, {
        key: 'declaration-bang-space-before',
        hint: 'Require a single space or disallow whitespace before the bang of declarations',
        variants: [{
            hint: 'Always',
            code: 'a {\n color: pink<mark> </mark>!important; \n}',
            value: 'always'
        }, {
            hint: 'Never',
            code: 'a {\n color: pink!important; \n}',
            value: 'never'
        }]
    }, {
        key: 'declaration-bang-space-after',
        hint: 'Require a single space or disallow whitespace after the bang of declarations',
        variants: [{
            hint: 'Always',
            code: 'a {\n color: pink !<mark> </mark>important; \n}',
            value: 'always'
        }, {
            hint: 'Never',
            code: 'a {\n color: pink !important; \n}',
            value: 'never'
        }]
    }, {
        key: 'keyframe-declaration-no-important',
        hint: 'Disallow !important within keyframe declarations',
        variants: [{
            hint: 'Disallow',
            code: '@keyframes important1 {\n   from { margin: 10px }\n   to { margin: 20px }\n}',
            value: true
        }, {
            hint: 'Allow',
            dismiss: true,
            code: '@keyframes important1 {\n   from { margin: 10px }\n   to { margin: 20px <mark>!important</mark> }\n}',
            value: false
        }]
    }, {
        key: 'property-whitelist',
        hint: 'Specify a whitelist of allowed properties.',
        variants: [{
            input: true,
            valueType: "array",
            hint: 'Write properties names in space',
            value: []
        }, {
            hint: 'Empty list(also you can dismiss this step)',
            value: []
        }]
    }, {
        key: 'property-no-vendor-prefix',
        hint: 'Disallow vendor prefixes for properties',
        variants: [{
            hint: 'Disallow',
            code: 'a { \n   transform: scale(1); \n}',
            value: true
        }, {
            hint: 'Allow',
            dismiss: true,
            code: 'a { \n   <mark>-webkit-</mark>transform: scale(1); \n}',
            value: false
        }]
    }, {
        key: 'property-no-unknown',
        hint: 'Disallow unknown properties',
        variants: [{
            hint: 'Disallow',
            value: true
        }, {
            hint: 'Allow',
            dismiss: true,
            code: 'a {\n  <mark>my-property</mark>: block; \n}',
            value: false
        }]
    }, {
        key: 'property-case',
        hint: 'Specify lowercase or uppercase for properties',
        variants: [{
            code: 'a {\n  <mark>display</mark>: block; \n}',
            value: "lower"
        }, {
            code: 'a {\n  <mark>DISPLAY</mark>: block; \n}',
            value: "upper"
        }]
    }, {
        key: 'property-blacklist',
        hint: 'Specify a blacklist of disallowed properties(e.g. animation, text-rendering)',
        variants: [{
            input: true,
            valueType: "array",
            hint: 'Write properties names in space',
            value: []
        }]
    }, {
        key: 'shorthand-property-no-redundant-values',
        hint: 'Disallow redundant values in shorthand properties',
        variants: [{
            code: 'a {\n  margin: 1px; \n}',
            value: true
        }, {
            code: 'a {\n  margin: 1px 1px 1px 1px; \n}',
            dismiss: true,
            value: false
        }]
    }, {
        key: 'custom-property-pattern',
        hint: 'Specify a pattern for custom properties(string|regexp)',
        variants: [{
            input: true,
            valueType: "string",
            placeholder: 'Write pattern here',
            code: 'Example "foo-.+" \n\n:root { --<mark>foo-</mark>bar: 0; }',
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
            dismiss: true,
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
            dismiss: true,
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
            dismiss: true,
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
            dismiss: true,
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
            dismiss: true,
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
        }]
    }, {
        key: 'function-url-scheme-whitelist',
        hint: 'Function scheme whitelist(e.g. https, ftp)',
        variants: [{
            input: true,
            valueType: "array",
            hint: 'Write functions names in space',
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
            dismiss: true,
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
            dismiss: true,
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
            dismiss: true,
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
    }]
};
