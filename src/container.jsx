import * as React from 'react';
import { useStore } from './store';
import { Row } from './row';
export const Container =()=>{

  const gruppo1 = useStore((state)=>state.palinsesto.gruppo1);
  const gruppo2 = useStore((state)=>state.palinsesto.gruppo2);
  const esitiGruppo1 = useStore((state)=>state.esitiGruppo1);
  const esitiGruppo2 = useStore((state)=>state.esitiGruppo2);
 console.log({esitiGruppo1},{gruppo1});

  return  (
   
  <div style={{display:'flex', flexDirection:'column',gap:'1vh',width:'500px',height:'600px'}}>
           <div style={{display:'flex',flexDirection:'column'}}>

         {gruppo1.map(el=>{
          const indiceEsito = esitiGruppo1.map(esito=>esito.id).indexOf(el.id);
          let esiti=[];
          if(indiceEsito>=0){
            esiti=esitiGruppo1[indiceEsito].esiti
            console.log({esiti},{indiceEsito})
          }

          return (
            <Row key={el.id} title={el.squadre} selected={esiti} idPartita={el.id} nomeGruppo='gruppo1'></Row>
          )
         })}
            
           </div>    
            <hr />
           <div style={{display:'flex',flexDirection:'column'}}>
           {gruppo2.map(el=>{
          const indiceEsito = esitiGruppo2.map(esito=>esito.id).indexOf(el.id);
          let esiti=[];
          if(indiceEsito>=0){
            esiti=esitiGruppo2[indiceEsito].esiti
            console.log({esiti},{indiceEsito})
          }

          return (
            <Row key={el.id} title={el.squadre} selected={esiti} idPartita={el.id} nomeGruppo='gruppo2'></Row>
          )
         })}
            
          </div>  
    </div>
)
}