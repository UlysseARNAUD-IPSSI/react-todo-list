import firebase from 'firebase'

/**
 * Firebase helper class
 */
export default class Fire {

    /**
     * @constructor
     * @returns {Fire}
     */
    constructor() {
        // Do something ?
    }

    /**
     * Sets callback
     * @param callback {Function}
     */
    set callback (callback) {
        this._callback = callback
    }

    get callback () {
        return this._callback
    }

    /**
     * Initializes Firebase
     * @param callback
     */
    initialize(callback = null) {

        if (!callback) {
            callback = this.callback
        }

        if ('function' !== typeof callback) {
            firebase.auth().signInAnonymously().catch(console.error)
            return
        }

        firebase
            .auth()
            .onAuthStateChanged(user => {
                if (user) callback(null)
                else firebase.auth().signInAnonymously().catch(callback)
            })

        return new Proxy(this, {
            get: function (instance, field) {
                if (field in instance) return instance[field]
                console.debug(`Tentative d'accèes à la propriété "${field}" n'est pas définie dans la classe Fire`)

                instance.refName = field

                return instance
            }
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
        return firebase.firestore().collection(this._refName);
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
        this.unsubscribe()
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

    setCallback(callback) {
        this.callback = callback
        return this
    }

    setRefName(refName) {
        this.refName = refName
        return this
    }
}