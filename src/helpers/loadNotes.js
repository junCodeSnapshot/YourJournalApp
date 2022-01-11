import { collection, getDocs, orderBy, query} from "firebase/firestore"
import { db } from "../firebase/firebase-config"

export const loadNotes = async(uid)=> {
    
    const ref = collection(db, `${uid}/journal/notes`)
    const q = query(ref,orderBy('date', "desc"))
    const esperanza = []
    const qSnapshot = await getDocs(q)
    qSnapshot.forEach(doc => {
        esperanza.push({
            id:doc.id,
            ...doc.data()
        })
    })

    return esperanza
}
