import React, {useEffect, useRef, useState} from 'react'
import './Grid.css';

const Element = ({position, autoSelectedGrid, player, successPlay, clickHandler, id}) => {
    const getId = useRef();
    const [clicked, setClicked] = useState(false);

    useEffect(()=>{
        if(autoSelectedGrid) {
            const idElement = autoSelectedGrid?.map(e=>e+1).toString()
                                               .replace(',', '-');
            if(getId.current.id === idElement){
                getId.current.className = 'space-grid player2';
            }
        }
    }, [autoSelectedGrid])
 
    useEffect(()=>{
        if(player && successPlay && getId.current && clicked){
            if(getId.current.className === 'space-grid player2'){
                return
            }
            getId.current.className = 'space-grid player1';
        } 
    }, [position])
    
  return (
    <div 
        className='space-grid'
        onClick={((e)=>{
            clickHandler(e);
            setClicked(true);
        })}
        ref={getId}
        id={id}
    >   
    </div>
  )
}

export default Element