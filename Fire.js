/*
 * Code source provenance de https://github.com/bellifa96/toDoList/blob/main/Fire.js
 * dans le but de résoudre l'intégration de Firebase (erreur app/no-app)
 */

import firebase from "firebase"
import '@firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyC56I-vmPGWK0XIC7QgxP35jnzChYiq-ls",
    authDomain: "todo-leviosa.firebaseapp.com",
    projectId: "todo-leviosa",
    storageBucket: "todo-leviosa.appspot.com",
    messagingSenderId: "973875357327",
    appId: "1:973875357327:web:b04403a3e736a66b0a32fa"
}

export default class Fire {

    app = undefined

    constructor(callback) {
        this.init(callback)
    }

    init(callback) {
        if (!firebase.apps.length) {
            this.app = firebase.initializeApp(firebaseConfig)
        }

        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                callback(null)
            } else {
                firebase.auth().signInAnonymously().catch(error => {
                    callback(error)
                })
            }
        })
    }

    get ref() {
        return firebase.firestore(this.app).collection('lists');
    }

    getLists(callback) {
        let ref = this.ref.orderBy('name')
        this.unsubscribe = ref.onSnapshot(snapshot => {
            let lists = []
            snapshot.forEach(doc => {
                lists.push({id: doc.id, ...doc.data()})
            })
            callback(lists)
        }, error => {
            console.error(error)
        })
    }

    async addList(list) {
        const ref = this.ref
        await ref.add(list)

    }

    async deleteList(list) {
        const ref = this.ref
        await ref.doc(list.id).delete()
    }

    async updateList(list) {
        const ref = this.ref
        await ref.doc(list.id).update(list)
    }

    detach() {
        this.unsubscribe()
    }

    getOneList(id,callback) {
        const ref = this.ref.doc(id).onSnapshot(list => {
            callback(list.data())
        })
    }
}