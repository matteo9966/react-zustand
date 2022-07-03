import create from "zustand";
import {cloneDeep} from 'lodash';
export const useStore = create((set) => ({
  palinsesto: {
    gruppo1: [
      { squadre: "roma lazio", id: 1 },
      { squadre: "lecce milan", id: 2 },
      { squadre: "cremona sampdoria", id: 3 },
      { squadre: "vercelli bari", id: 4 },
      { squadre: "vercelli2 bari", id: 5 },
      { squadre: "vercelli3 bari", id: 6 },
      { squadre: "vercelli4 bari", id: 7 },
      { squadre: "vercelli5 bari", id: 8 },
      { squadre: "vercelli6 bari", id: 9 },
      { squadre: "vercelli7 bari", id: 10 },
      { squadre: "vercelli8 bari", id: 11},
      { squadre: "vercelli9 bari", id: 12 },
      { squadre: "vercelli10 bari", id: 13 },
      { squadre: "vercelli11 bari", id: 14 },
      { squadre: "vercelli12 bari", id: 15 },
      { squadre: "vercelli13 bari", id: 16 },
    ],
    gruppo2:[
        { squadre: "roma2 lazio2", id: 1 },
        { squadre: "lecce2 milan2", id: 2 },
        { squadre: "cremona2 sampdoria2", id: 3 },
        { squadre: "vercelli2 bari2", id: 4 },
    ]
  },
  esitiGruppo1: [{id:1,esiti:[1,2]}], //FIXME: è più comodo se questo è una mappa con id come chiave e l'array di esiti come valore;
  esitiGruppo2: [],
  //gruppo è un enum che può essere o gruppo1 o gruppo2
  modificaScommessa: (gruppo,scommessa) =>
    set((state) => {
      if (gruppo === "gruppo1") {
        //logica per aggiornare il gruppo 1  
        const gruppoAggiornato=aggiornaGruppo(state.esitiGruppo1,scommessa);
        return {esitiGruppo1:gruppoAggiornato} //aggiorno solo questo slice
    } else {
        const gruppoAggiornato=aggiornaGruppo(state.esitiGruppo2,scommessa);
        console.log({gruppoAggiornato})
        return {esitiGruppo2:gruppoAggiornato}
      }
    }), // passa id della squadra e l'array di esiti aggiornato
}));

/**
 * @param gruppo il riferimento del gruppo nello store
 * @param  scommessa {{id:number,esiti:number[]}}  la scommessa con id del palinsesto, array di bottoni
 */
const aggiornaGruppo=(gruppo,scommessa)=>{
    //cerca nel array se c'è
    //se c'è modifica,
    //se non c'è aggiungi 
    //se ricevo un array vuoto rimuovi dalla lista // TODO: puoi usare la funzione omit di lodash
     // devo andare a modificare il contenuto dell'array
     //creo una copia del gruppo
     const copiaGruppo = cloneDeep(gruppo);
     const indiceDellaGiocata = copiaGruppo.map(scommessa=>scommessa.id).indexOf(scommessa.id)
     if(indiceDellaGiocata>=0){
       copiaGruppo[indiceDellaGiocata].esiti=scommessa.esiti;
    }else{
        //non c'è quel id, lo aggiungo
        copiaGruppo.push(scommessa);
    }
    return copiaGruppo
}