class StyleLintOncogene extends Oncogene {
	nextStep() {
		const result = document.querySelector('.result > .config')

		result.textContent = JSON.stringify(this.config, null, 4)
		super.nextStep()
	}

	getResult() {
		document.querySelector('.oncogene').remove()
	}
}

new StyleLintOncogene({
	selector: '.oncogene',
	steps: [{
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