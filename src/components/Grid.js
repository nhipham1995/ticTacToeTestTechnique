import React, {useEffect, useRef} from 'react'
import './Grid.css';
import Element from './Element';
const Grille = ({grid, position, player, autoSelectedGrid, successPlay, desactiveGrid}) => { 
    const gridRef = useRef();
    useEffect(()=>{
        if(desactiveGrid){
            gridRef.current.style.pointerEvents = 'none'
        } else {
            gridRef.current.style.pointerEvents = ''
        }
    }, [desactiveGrid])

    const clickHandler = (e) => {
        position(e.target.id.split('-'));
    }
    
    let rows = [];
    for (var i = 1; i < parseInt(grid)+1; i++){
      let rowID = `row${i}`
      let cell = []
      for (var idx = 1; idx < parseInt(grid)+1; idx++){
        let cellID = `${i}-${idx}`
        cell.push(<td 
                        className= 'grid-element'
                        key={cellID} 
                    >
                            <Element position={position}
                                     autoSelectedGrid={autoSelectedGrid}
                                     successPlay={successPlay}
                                     player={player}
                                     clickHandler={clickHandler}
                                     id={cellID} 
                            />
                        
                  </td>)
      }
      rows.push(<tr key={i} id={rowID} >{cell}</tr>)
    }

    return (
        <div>
            <h4 style={{marginBottom: '20px'}}>
                Number Grille: {grid}
            </h4>
            <div className="container">
                <div className="row">
                    <table id="simple-board" ref={gridRef}>
                        <tbody>
                            {rows}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default Grille;

