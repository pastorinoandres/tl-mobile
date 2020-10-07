  
  import * as firebase from 'firebase/app';
  import 'firebase/firestore'
  import 'firebase/auth'
  import 'firebase/storage'



  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyC7XNgKm8LNnDRpM2PQOxoG6Ad1aRQyfYA",
    authDomain: "tulaburo-e237c.firebaseapp.com",
    databaseURL: "https://tulaburo-e237c.firebaseio.com",
    projectId: "tulaburo-e237c",
    storageBucket: "tulaburo-e237c.appspot.com",
    messagingSenderId: "300204761579",
    appId: "1:300204761579:web:e69bce8528161f96de39ae",
    measurementId: "G-VLDVVXV36G"
  };

  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  export default firebase;

  //auth
  export var auth = firebase.auth();
             auth.languageCode = 'es-AR';
  export var FacebookAuthProvider = firebase.auth.FacebookAuthProvider;
  export var GoogleAuthProvider = firebase.auth.GoogleAuthProvider;
  export var EmailAuthProvider = firebase.auth.EmailAuthProvider
  export var PhoneAuthProvider =  firebase.auth.PhoneAuthProvider;

  //Database & Storage
  export var db = firebase.firestore()
  export var storage = firebase.storage(); 


  /*
// Cosas agregadas por Ivan a modo TEST.
// LLamo al servicio Firebase, y agarro el DB para utilizar la conexión con FireStore.
import { db } from '../../../../services/firebase';



// Consulto Documento en particular 
const laburantes = db.collection('testLaburantes').doc('0GzOCbubenDiXtUJYTJI');
let nombre = "";
let nombreCategoria = "";
let todaLaData = "";
let documento;


// Los muestro y lo almaceno en una variable
laburantes.get().then(doc => {
todaLaData = doc.data();
documento = doc.id;
nombre = doc.data().name;
console.log(nombre);
console.log(todaLaData);
}
);

// Consulta todos los trabajadores 
const getLaburantes = db.collection('testLaburantes');
let query = getLaburantes.get()
  .then(snapshot => {
    snapshot.forEach(doc => {
      console.log('ID trabajador ', doc.id);
      console.log(doc.data().name);
      console.log(doc.data().surname);
      console.log(doc.data().phone);
      console.log('Todos los datos juntos ', 'IDTrabajador',doc.id, '=>', doc.data());
    });
  });



// Consulto Trabajador por Categoria  
const getLaburantesXCategoria = db.collection('testLaburantesXCategoria');
let query2 = getLaburantesXCategoria.get()
  .then(snapshot => {

    snapshot.forEach(doc => {
      console.log(doc.id, '=>', doc.data());
    });
  });
  

// Traigo el nombre por Categoria Especifica.

const testCategorias = db.collection('testCategorias').doc('1');

// Los muestro y lo almaceno en una variable
testCategorias.get().then(doc => {
nombreCategoria = doc.data().nombre;
console.log(nombreCategoria);
}
);



// Consulta todos las categorias
const testCategoriasTodas = db.collection('testCategorias');
let query3 = testCategoriasTodas.get()
  .then(snapshot => {
    snapshot.forEach(doc => {      
      console.log(doc.data().nombre);
    });
  });



 // Por Trabajador, Muestro el nombre de las categorias que tiene asignado  // ANDA MAL __ SOLO MUESTRA EL DETALLE DEL ULTIMO LABURANTE
const getLaburantes = db.collection('testLaburantes');
let getLaburantesQuery = getLaburantes.get()
  .then(snapshot => {
    snapshot.forEach(doc => {
      console.log('Mostrando los datos del Laburante');
      console.log(doc.data().name);
      console.log(doc.data().surname);
      console.log(doc.data().phone);
      let docLaburante = doc.id;  

      // Consulto las Categorias que realiza el trabajador
      const LaburantesXCategoria = db.collection('testLaburantesXCategoria');
      let getLaburantesXCategoriaQuery = LaburantesXCategoria.where('docLaburante', '==', docLaburante).get()      
        .then(snapshot => {
        snapshot.forEach(doc => {
        let docCategoriaLaburante = doc.data().docCategoria; 
        // tengo el Documento Categorias que realiza el Laburante
        // Hago la consulta para obtener el nombre de la categoria
                
        
        const testCategoriasFiltrada = db.collection('testCategorias').doc(docCategoriaLaburante);
        let getCategeoriasQueryFiltrada = testCategoriasFiltrada
        .get().then(doc => {
      
              console.log(doc.data().nombre); 
                    
            }
            
           
          
        ); 
      });
    });
  });
});



 
  // Por Categorias, Muestro el nombre de los laburantes  // Tampoco anda el Anidado

  const testCategorias = db.collection('testCategorias');
  let getCategeoriasQuery = testCategorias.get()
  .then(snapshot => {
      snapshot.forEach(doc => {

        let docCategoria = doc.id;

        
        const LaburantesXCategoria = db.collection('testLaburantesXCategoria');
        let getLaburantesXCategoriaQuery = LaburantesXCategoria.where('docCategoria', '==', docCategoria).get()      
          .then(snapshot => {
          snapshot.forEach(doc => {
            let docLaburante = doc.data().docLaburante;
            
            const laburantes = db.collection('testLaburantes').doc(docLaburante);
            laburantes.get().then(doc => {
              
              console.log(doc.data().name);      
              console.log(doc.data().surname);
                }
              );
          

          });
        });


        console.log(doc.data().nombre); 
      }) ;       
      });


      // Por Categorias FILTRADA  Muestro el nombre de los laburantes En este caso Plomeros
    
      const testCategorias = db.collection('testCategorias').doc('1');
      let getCategeoriasQuery = testCategorias.get()
      .then(doc => {
    
            let docCategoria = doc.id;
    
          
            const LaburantesXCategoria = db.collection('testLaburantesXCategoria');
            let getLaburantesXCategoriaQuery = LaburantesXCategoria.where('docCategoria', '==', docCategoria).get()      
              .then(snapshot => {
              snapshot.forEach(doc => {
                let docLaburante = doc.data().docLaburante;
                
                const laburantes = db.collection('testLaburantes').doc(docLaburante);
                laburantes.get().then(doc => {
                  
                  console.log(doc.data().name);      
                  console.log(doc.data().surname);
                  console.log(doc.data().phone);
                  
              
    
              });
            });
  
    
            console.log(doc.data().nombre); 
          });       
        });
      
         
        */


// FIN cosas agregadas por Ivan a modo Test