import firebase from 'firebase'
import '@firebase/auth'
import '@firebase/firestore'
import firebaseConfig from "./firebase.config";

/**
 * Firebase helper class
 */
export default class Fire {

    defaultRefName = 'lists'


    /**
     * @constructor
     * @returns {Fire}
     */
    constructor(callback = null) {
        this.refName = this.defaultRefName
        this.initialize(callback)
    }

    /**
     * Initializes Firebase
     * @param callback
     */
    initialize(callback = () => {}) {

        if (!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig);
        }

        if ('function' !== typeof callback) {
            callback = console.error
        }

        callback = callback.bind(this)

        firebase
            .auth()
            .onAuthStateChanged(user => {
                if (user) callback(null)
                else firebase.auth().signInAnonymously().catch(callback)
            })

    }

    /**
     * Gets reference name (could be 'lists')
     * @returns {*}
     */
    get refName() {
        return this._refName
    }

    /**
     * Sets reference name.
     * Parameter 'name' could be 'lists'.
     * @param name
     */
    set refName(name) {
        this._refName = name
    }

    /**
     * Gets Reference
     * @returns {firebase.firestore.CollectionReference<firebase.firestore.DocumentData>}
     */
    get ref() {
        return firebase.firestore().collection(this.refName);
    }

    /**
     * Get Collection from firestore
     * @param callback {function}
     * @param parameters {{
     *  orderBy: string|null,
     *  selector: string|null,
     *  onNext: function(snapshot),
     *  onError: function(error)
     * }}}
     */
    get(callback, parameters = {}) {
        const defaultParameters = {
            orderBy: 'name',
            selector: null,
            onNext(snapshot) {
                let collection = []

                snapshot.forEach(doc => {
                    collection.push({
                        id: doc.id,
                        ...doc.data()
                    })
                })

                callback(collection)
            },
            onError(error) {
                console.error(error)
            }
        }

        parameters = {
            ...defaultParameters,
            ...parameters
        }

        const {orderBy, selector, onNext, onError} = parameters

        let unsubscribe = this.ref
        if (selector) unsubscribe = unsubscribe.doc(selector)
        if (orderBy) unsubscribe = unsubscribe.orderBy(orderBy)
        if (onNext && onError) unsubscribe = unsubscribe.onSnapshot(onNext, onError)

        this.unsubscribe = unsubscribe
    }

    /**
     * Add Document Reference
     * @param doc
     * @param parameters
     */
    add(doc, parameters = {}) {
        const defaultParameters = {
            docConfig: null,
            onAdd(response) {
                console.debug(`onAdd: Response ${response.toString()}`)
            }
        }

        parameters = {
            ...defaultParameters,
            ...parameters
        }

        const {docConfig, onAdd} = parameters

        this.getDocumentReference(doc, docConfig).then(onAdd)
    }

    /**
     * Update document reference
     * @param doc
     * @param parameters {{ selector: string }}
     */
    update(doc, parameters = {}) {
        const defaultParameters = {
            docConfig: null
        }

        parameters = {
            ...defaultParameters,
            ...parameters
        }

        const {docConfig} = parameters

        this.getDocumentReference(doc, docConfig).update(doc)
    }

    /**
     * Delete document reference
     * @param doc
     * @param parameters
     */
    delete(doc, parameters = {}) {
        const defaultParameters = {
            docConfig: null
        }

        parameters = {
            ...defaultParameters,
            ...parameters
        }

        const {docConfig} = parameters

        this.getDocumentReference(doc, docConfig).delete()
    }

    /**
     * Detach instance
     */
    detach() {
        if (this.hasOwnProperty('unsubscribe')) {
            this.unsubscribe()
        }
    }


    /**
     * Get Document reference
     * @param documentReference
     * @param parameters
     * @returns {firebase.firestore.DocumentReference<firebase.firestore.DocumentData>}
     */
    getDocumentReference(documentReference, parameters) {
        const defaultParameters = {
            selector: 'id'
        }

        parameters = {
            ...defaultParameters,
            ...parameters
        }

        const {selector} = parameters

        return this.ref.doc(documentReference[selector])
    }
}