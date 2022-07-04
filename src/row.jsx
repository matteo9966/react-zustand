import * as React from 'react';
import { isEqual } from 'lodash';
import { useStore } from './store';
const Button = (props) => {
  return (
    <button onClick={props.onClick} style={{ backgroundColor: props.selected ? "yellow" : "white" }}>
      {props.id}
    </button>
  );
};


function areEqual(prevProps, nextProps) {
  if(isEqual(prevProps,nextProps)){
    return true
  }
  return false
}




export const MyRow = (props) => {
  const idPartite = props.idPartita;
  const gruppo=props.nomeGruppo //gruppo1 o gruppo2;
  const modificaScommessa = useStore((store)=>store.modificaScommessa);


  const selectedButtonsId = props.selected || []; // da questo array so quali sono stati selezionati
  
  // se clicco su un bottone, passo il nuovo array selected a modificaScommessa con id e selected

  const onClickBottone=(id,lista)=>{
    return ()=>{
      console.log({id,lista});
      const listaAggiornata = modificaListaDiEsitiSelezionati(lista,id);
      modificaScommessa(gruppo,{id:idPartite,esiti:listaAggiornata});
    }
  }

 return( <div style={{display:'flex',justifyContent:'flex-end',margin:'10px 0'}}>
    <span style={{margin:'0 15px'}}>{props.title}</span>
    {[0, 1, 2].map((id) => {
      const selected = selectedButtonsId.includes(id);
      const button = <Button key={id} selected={selected} id={id} onClick={onClickBottone(id,selectedButtonsId)}></Button>;
      return button;
    })}
  </div>);
};

export const Row = React.memo(MyRow, areEqual);
// export const Row = MyRow



/**
 * @description prende la lista, prende id, se id è gia presente lo rimuove, se id non c'è lo aggiunge
 * @param {*} lista 
 * @param {*} id 
 * @returns 
 */
const modificaListaDiEsitiSelezionati=(lista,id)=>{
  console.log({lista,id})
  const indexOfId = lista.indexOf(id);
  if(indexOfId>=0){
   //c'è già allora toglilo
    return lista.filter(el=>el!==id);
  }
  return [...lista,id];  
}