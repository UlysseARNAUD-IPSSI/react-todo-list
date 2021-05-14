export default class Task {

    constructor(params) {

        const defaultParameters = {
            name: 'Tâche', // "Nom de la tâche"
            completed: false
        }

        params = {
            ...defaultParameters,
            ...params
        }

        for ( let property in params ) {
            this[property] = params[property]
        }

    }

    get() {
        return {
            name: this.name,
            completed : this.completed
        }
    }

}