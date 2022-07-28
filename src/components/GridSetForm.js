import React, {useEffect, useRef, useState} from 'react'

const GridSetForm = ({onGridChange, activeInput}) => {
  const inputRef = useRef();
  const [msg, setMsg] = useState('');
  useEffect(()=>{
    if(activeInput){
        inputRef.current.style.pointerEvents = ''
    } else {
        inputRef.current.style.pointerEvents = 'none';
    }
  }, [activeInput])

  const inputHandler = (e) => {
    if(e.target.value === ''|| e.target.value> 21 || e.target.value<3 ) {
      setMsg('Invalid Grid Size! Try grid size from 3 to 21')
      return
    } else {
      onGridChange(e.target.value);
      setMsg('');
    }
    onGridChange(e.target.value);
  }

  return (
    <div>
        <h3 style={{marginBottom: '15px'}}>Set Grid Size (3-21)</h3>
        <input 
            type='number' 
            min="3" 
            max="21"
            ref={inputRef}
            onChange={inputHandler}
            style={{marginBottom: '15px'}}>
            
        </input>
        <p>{msg? msg : null}</p>
    </div>
  )
}

export default GridSetForm