class Oncogene {
    constructor(options) {
        if (!options.skipValidation) {
            this.constructor.checkOptions(options)
        }

        this.handleOptions(options)

        this.root.classList.add(this.classes.common.root)

        this.makeStep(0)
    }

    nextStep() {
        this.makeStep(1)
    }

    prevStep() {
        this.makeStep(-1)
    }

    makeStep(stepSize) {
        this.stepInx = Math.max(0, this.stepInx + stepSize)

        if (this.stepInx >= this.steps.length) return this.renderResult()

        this.renderStep()
    }

    renderStep() {
        this.render(this.getStepNode())
    }

    renderResult() {
        this.render(this.getResultNode())
    }

    render(node) {
        this.clearRoot()
        this.root.appendChild(node)
    }

    createNode(className) {
        const node = document.createElement('div')

        node.className = className

        return node
    }

    clearRoot() {
        while (this.root.firstChild) {
            this.root.removeChild(this.root.firstChild)
        }
    }

    setVal(key, value) {
        const path = key.split('.')
        let cur = this.config

        while (path.length > 1) {
            const subKey = path.shift()

            if (!cur.hasOwnProperty(subKey)) cur[subKey] = {}

            if (!this.constructor.isObject(cur[subKey])) {
                throw new Error(`Part of path ${key} is not an object`)
            }

            cur = cur[subKey]
        }

        cur[path.shift()] = value
    }


    getStepNode() {
        const root = document.createDocumentFragment()
        const hint = this.createNode(this.classes.common.hint)
        const variants = this.createNode(this.classes.variants.root)
        const progress = this.getProgressNode()

        this.getStep().variants.forEach((variant, inx) => {
            const variantNode = this.getVariantNode(variant, inx)

            variants.appendChild(variantNode)
        })

        hint.innerHTML = this.getStep().hint || ''

        root.appendChild(hint)
        root.appendChild(variants)
        root.appendChild(progress)

        return root
    }

    getVariantNode(variant, inx) {
        const item = this.createNode(this.classes.variants.item)
        const hint = this.createNode(this.classes.variants.hint)
        const code = this.createNode(this.classes.variants.code)

        hint.innerHTML = variant.hint || ''
        code.innerHTML = variant.code || ''

        item.dataset.inx = inx
        item.appendChild(hint)
        item.appendChild(code)
        item.addEventListener('click', this.variantClickHandler.bind(this))

        return item
    }

    getProgressNode() {
        const progress = this.createNode(this.classes.common.progress)

        progress.innerHTML = `${this.stepInx + 1} / ${this.steps.length}`

        return progress
    }

    getResultNode() {
        const resultNode = this.createNode(this.classes.result.root)
        const hintNode = this.createNode(this.classes.result.hint)
        const configNode = this.createNode(this.classes.result.config)

        resultNode.appendChild(hintNode)
        resultNode.appendChild(configNode)

        hintNode.innerHTML = this.result.hint
        configNode.textContent = this.getResult()

        return resultNode
    }


    variantClickHandler(e) {
        const step = this.getStep()
        const inx = e.currentTarget.dataset.inx
        const value = step.variants[inx].value

        if (step.key) {
            this.setVal(step.key, value)
        }

        if (step.callback) {
            this.config = step.callback(this.config, value)
        }

        this.nextStep()
    }

    getStep() {
        return this.steps[this.stepInx]
    }

    getResult() {
        return JSON.stringify(this.config, null, 4)
    }

    handleOptions(options) {
        this.root = document.querySelector(options.selector)
        this.steps = options.steps
        this.config = options.config || {}
        this.result = Object.assign({
            hint: ''
        }, options.result)
        this.classes = this.getClasses()
        this.stepInx = 0

        if (!this.root) throw new Error('Can\'t find element by selector')
    }

    getClasses() {
        return {
            common: {
                root: 'oncogene',
                hint: 'oncogene__hint',
                progress: 'oncogene__progress'
            },
            variants: {
                root: 'oncogene-variants',
                hint: 'oncogene-variants__hint',
                item: 'oncogene-variants__item',
                code: 'oncogene-variants__code'
            },
            result: {
                root: 'oncogene-result',
                hint: 'oncogene-result__hint',
                config: 'oncogene-result__config'
            }
        }
    }


    static checkOptions(options) {
        const required = ['selector', 'steps']
        const objects = ['result', 'classes']

        if (!options) throw new Error('You should specify options')

        required.forEach(field => {
            if (!options.hasOwnProperty(field)) {
                throw new Error(`You should specify ${field}`)
            }
        })

        objects.forEach(field => {
            if (true
                && !this.isUndefined(options[field])
                && !this.isObject(options[field])) {
                throw new Error(`options.${field} should be an object`)
            }
        })

        if (!(this.isArray(options.steps))) {
            throw new Error('Steps should be an array')
        }

        options.steps.forEach((step, stepIndex) => {
            const stepNum = stepIndex + 1

            if (true
                && this.isUndefined(step.key)
                && this.isUndefined(step.callback)) {
                throw new Error(`Step ${stepNum} should have key or callback`)
            }

            if (true
                && !this.isUndefined(step.callback)
                && !this.isFunction(step.callback)) {
                throw new Error(`Callback of ${stepNum} step should be a function`)
            }

            if (!this.isArray(step.variants)) {
                throw new Error(`Step ${stepNum} should have array of variants`)
            }

            if (step.variants.length < 2) {
                throw new Error(`Step ${stepNum} should have at least two variants`)
            }

            step.variants.forEach((variant, variantIndex) => {
                const variantNum = variantIndex + 1

                if (true
                    && this.isUndefined(variant.hint)
                    && this.isUndefined(variant.code)) {
                    throw new Error(`Variant ${variantNum} of step ${stepNum} should have hint or code`)
                }

                if (this.isUndefined(variant.value)) {
                    throw new Error(`Variant ${variantNum} of step ${stepNum} should have a value`)
                }
            })
        })
    }

    static isObject(val) {
        return (val === Object(val)) && !this.isFunction(val)
    }

    static isUndefined(val) {
        return typeof val === 'undefined'
    }

    static isFunction(val) {
        return typeof val === 'function'
    }

    static isString(val) {
        return typeof val === 'string'
    }

    static isArray(val) {
        return Array.isArray(val)
    }
}
