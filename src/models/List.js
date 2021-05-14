export default class List {

    constructor(params) {

        const defaultParameters = {
            name: 'Liste',
            color: '#000',
            tasks: []
        }

        params = {
            ...defaultParameters,
            ...params
        }

        for ( let property in params ) {
            this[property] = params[property]
        }

    }

    addTask(task) {
        this.tasks.push(task)
    }

    removeTask(task) {
        this.tasks = this.tasks.filter(entry => entry !== task)
    }

    getTasks() {
        return this.tasks
    }

    get() {
        return {
            name: this.name,
            tasks: this.tasks.map(entry => entry.get())
        }
    }
}