export default class List {

    constructor(params) {

        const defaultParameters = {
            id: uuidv4(),
            title: 'Nom de la liste', // "Nom de la tâche"
            description: 'Description de la liste', // "Description de la tâche"
            created_at: Date.now().toLocaleString('fr-FR'), // 10/05/2021
            tasks: []
        }

        params = {
            ...defaultParameters,
            params
        }

        for ( let property in params ) {
            this[property] = params[property]
        }

    }

    addTask(task) {
        this.tasks.push(task)
    }

    removeTask(task) {
        // TODO : Gérer la comparaison entre deux tâches
        this.tasks = this.tasks.filter(entry => entry !== task)
    }

    getTasks() {
        return this.tasks
    }
}