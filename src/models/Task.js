
export default class Task {

    constructor(params) {

        const defaultParameters = {
            id: uuidv4(),
            title: 'Nom de la tâche', // "Nom de la tâche"
            description: 'Description de la tâche', // "Description de la tâche"
            created_at: Date.now().toLocaleString('fr-FR'), // 10/05/2021
            time_estimated: undefined, // "20" (valeur en minutes)
            list: undefined, // ID de la liste, sinon créer une liste
            ends_at: undefined
        }

        params = {
            ...defaultParameters,
            params
        }

        for ( let property in params ) {
            this[property] = params[property]
        }

    }

}