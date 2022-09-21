import { initializeApp } from "firebase/app";
import {addDoc, deleteDoc, getFirestore, setDoc,getDoc,getDocs,collection,doc} from 'firebase/firestore'
import config from '../config.js'

const app = initializeApp(config.firebaseConfig)
const db = getFirestore(app)

class ContenedorFirebase {

    constructor(nombreColeccion) {
        this.nombre = nombreColeccion
    }

    async listar(id) {
        try{
            const docRef=await doc(db,this.nombre,id)
            const document = await getDoc(docRef)
            return {id : document.id , ...document.data()}
        }
        catch(e){
            console.log(e)
            return false
        }
    }

    async listarAll() {
        try{
            const collRef=collection(db,this.nombre)
            const response =await getDocs(collRef)
            return response.docs.map(doc=>{
                console.log(doc)
                return {id: doc.id, ...doc.data()}
            })
        }
        catch(e){
            console.log(e)
            return false
        }
    }

    async guardar(nuevoElem) {
        try{
            const collRef=collection(db,this.nombre)
            return await addDoc(collRef,nuevoElem)
        }
        catch(e){
            console.log(e)
            return false
        }
    }

    async actualizar(nuevoElem,id) {
        try{
            let docRef= doc(db,this.nombre,id)
            await setDoc(docRef,nuevoElem)
            return true

        }
        catch(e){
            console.log(e)
            return false
        }
    }

    async borrar(id) {
        try{
            let docRef= doc(db,this.nombre,id)
            await deleteDoc(docRef)
            return true

        }
        catch(e){
            console.log(e)
            return false
        }
    }

}

export default ContenedorFirebase