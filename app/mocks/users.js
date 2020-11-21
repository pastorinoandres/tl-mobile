import { images } from "../utils/images";

const users = [
    {
        name: "Juan",
        skill: "Albañil",
        image: images.trabajadores_a,
        state:true,
        isWorker:true,
        aboutMe: "Soy albañil y me dedico a la construcción pesada.",
        city: "La Plata",
        reputation: 4.4,
        workerOfMonth: true,
      },
      {
        name: "Maria",
        skill: "Electricista",
        image: images.trabajadores_b,
        state:true,
        isWorker:true,
        aboutMe: "Me dedico a realizar instalaciones domiciliarias como comerciales.",
        city: "La Plata",
        reputation: 5,
        workerOfMonth: true,
      },
      {
        name: "Sebastian",
        skill: "Herrero",
        image: images.trabajadores_c,
        state:true,
        isWorker:true,
        aboutMe: "Realizo cualquier estructura de metálica usted necesite.",
        city: "La Plata",
        reputation: 3.6,
        workerOfMonth: true,
      },
    {
        name:"Andres Pastorino",
        skill:"Electricista",
        image:images.user_andres,
        state:true,
        isWorker:true,
        aboutMe:"Tengo basta experiencia tanto en electricidad domiciliaria, comercial y del automovil.",
        city: "Gonnet",
        reputation: 5,
    },
    {
        name:"Andres Pastorino",
        skill:"Cerrajero",
        image:images.user_andres,
        state:false,
        isWorker:true,
        aboutMe:"Realizo servicios de emergencia domicialiaria, inclusive fines de semana.",
        city: "Gonnet",
        reputation: 2.3,
    },

    {
        name:"Mariano Busti",
        skill:"Electricista",
        image:images.user_mariano,
        state:false,
        isWorker:true,
        aboutMe:"Cuento con varios años de experiencia en electricidad profesional en Edelap.",
        city: "La Plata",
        reputation: 5,
    },
    {
        name:"Mariano Busti",
        skill:"Fumigación",
        image:images.user_mariano,
        state:true,
        isWorker:true,
        aboutMe:"Basta experiencia en control de plagas y prevencion, tanto domiciliaria como comercial.",
        city: "La Plata",
        reputation: 4.1,
    },
    {
        name:"Marcelo Ponti",
        skill:"Herreria",
        image:images.user_marce,
        state:true,
        isWorker:true,
        aboutMe:"Realizo trabajos profesionales de reparacion, elaboracion de cualquier tipo de estructura.",
        city: "Los Hornos",
        reputation: 3.7,
    },
    {
        name:"Marcelo Ponti",
        skill:"Agrimensor",
        image:images.user_marce,
        state:false,
        isWorker:true,
        aboutMe:"Determinación y control de sistemas parcelarios, evaluacion de propiedades inmueble pública o privada, urbana y rural.",
        city: "Los Hornos",
        reputation: 1.2,
    },
    {
        name:"Alejandro DiLuca",
        skill:"Herreria",
        image:images.user_alejandro,
        state:false,
        isWorker:true,
        aboutMe:"Servicios de metalurgia en general, herreria, forjado, elaboracion y reparaciones de emergencia domiciliaria - comercial.",
        city: "La Plata",
        reputation: 5,
    },
    {
        name:"Alejandro DiLuca",
        skill:"Cerrajero",
        image:images.user_alejandro,
        state:true,
        isWorker:true,
        aboutMe:"Servicios de emergencia domicialiaria, comercial y del automovil.",
        city: "La Plata",
        reputation: 4.8,
    },
    {
        name:"Nicolas Perazzo",
        skill:"Plomeria",
        image:images.user_nico,
        state:true,
        isWorker:true,
        aboutMe:"Construcciones domiciliarias y comerciales en general, servicio de destape y desagote.",
        city: "Ensenada",
        reputation: 5,
    },
    {
        name:"Nicolas Perazzo",
        skill:"Jardineria",
        image:images.user_nico,
        state:false,
        isWorker:true,
        aboutMe:"Experto en paisajismo, jardineria natural y semi natural domiciliaria.",
        city: "Ensenada",
        reputation: 3.2,
    },
    {
        name:"Damian Grimberg",
        skill:"Plomeria",
        image:images.user_dami,
        state:false,
        isWorker:true,
        aboutMe:"Servicio de destape, desagote, elaboracion y arreglos en general.",
        city: "Punta Lara",
        reputation: 5,
    },
    {
        name:"Damian Grimberg",
        skill:"Limpieza",
        image:images.user_dami,
        state:true,
        isWorker:true,
        aboutMe:"Amplia experiencia en limpieza domiciliaria y comercial.",
        city: "Punta Lara",
        reputation: 4.4,
    },
    
   
];
export default users;
