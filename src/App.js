import './App.css';
import {useState, useEffect} from 'react';
import Grille from './components/Grid';
import GridSetForm from './components/GridSetForm';
import Checkboard from './components/algorithm';
import Message from './components/Message';
import './components/Grid.css';

var BeginGame;

const resetGrid=(num)=>{
    BeginGame = new Checkboard(num);
}

function App() {
  const [gridNum, setGridNum] = useState(3);
  const [selectedSpace, setSelectedSpace] = useState([]);
  const [playerID, setPlayerID] = useState(true);
  const [autoSelectedGrid, setAutoSelectedGrid] = useState();
  const [successPlay, setSuccessPlay] = useState(true);
  const [msg, setMsg] = useState('');
  const [time, setTime] = useState(5000);
  const [timeOut, setTimeOut] = useState(0);
  const [desactiveGrid, setDesactiveGrid] = useState(false);
  const [activeChangeGridSize, setActiveChangeGridSize] = useState(true);

  useEffect(()=>{
    resetGrid(gridNum);
  }, [gridNum]);

  useEffect(()=>{
    if(selectedSpace.length !== 0){
      //playerID: true is the player and false is AI player
      if(playerID){
        //if this element is invalid => fill, if not => alert 
        if(!(BeginGame.fillGrid(1,selectedSpace[0]-1, selectedSpace[1]-1))) {
          setSuccessPlay(false);
          return
        }
        if(checkWinnerApp(BeginGame)) return;
        setPlayerID(!playerID);
        setActiveChangeGridSize(false);

      } else {
        alert('Not your turn')
      }
    } 
    return
  }, [selectedSpace])

  const coundown = () => {
    setInterval(()=>{
      setTimeOut(timeOut=>timeOut-1);
    }, 1000);
  }
  const checkWinnerApp = (BeginGame)=> {
    const winner = BeginGame.checkWinner();
    if(winner===1){ 
      setTimeOut(time/1000);
      setMsg('You won!');
      coundown();
      setDesactiveGrid(true)
      setTimeout(()=>{
        resetGrid();
        window.location.reload(true);
        setDesactiveGrid(false)
      }, time);
      return true
    } else if(winner===2){
      setMsg('You lose! Try again!');
      setTimeOut(time/1000);
      coundown();
      setDesactiveGrid(true)
      setTimeout(()=>{
        resetGrid();
        setDesactiveGrid(false)
        window.location.reload(true);
      }, time);
      return
    } else {
      if(checkEndGrid(BeginGame)) return true
    }
    return false
  }

  const checkEndGrid = (BeginGame)=> {
    if(BeginGame.checkNonZero() === 0) {
      setMsg('Match Draw');
      setTimeOut(time/1000);
      coundown();
      setTimeout(()=>{
        resetGrid();
        window.location.reload(true);
      }, time);
      return true
    }
    return false
  }
  
  if(playerID === false){
    const selectedElement = BeginGame.autofillPlayer();
    if(checkWinnerApp(BeginGame)) return
    setAutoSelectedGrid(selectedElement);
    setPlayerID(!playerID);
  }

  const onGridChange = (num)=>{
    setGridNum(num);
  }

  const seletedSpaceHandler = (value) =>{
    setSelectedSpace(value)
  }

  const resetGame = () => {
    resetGrid(gridNum);
    window.location.reload(true);
  }

  return (
    <div className="App">
        <h1 style={{}}>Tic-toc-toe Game </h1>
        <GridSetForm  
                onGridChange={onGridChange}
                activeInput={activeChangeGridSize}/>
        <button onClick={resetGame}     
                className='grid-size-input'>
          Reset Game
        </button>
        <Message
                 msg={msg} 
                 timeOut={timeOut}/>
        <Grille  grid={gridNum} 
                 position={seletedSpaceHandler} 
                 player={playerID} 
                 autoSelectedGrid = {autoSelectedGrid}
                 successPlay= {successPlay}
                 desactiveGrid={desactiveGrid}/>

    </div>
  );
}

export default App;
