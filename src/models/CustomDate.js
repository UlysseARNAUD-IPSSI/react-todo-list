export default class CustomDate extends Date {

    constructor(...parameters) {
        super(parameters)
    }

    toString() {
        return this.toLocaleDateString('fr-FR', this.options)
    }

    static now() {
        return this(Date.now())
    }


}