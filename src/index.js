 import React ,{useState}from 'react';
  import ReactDOM from 'react-dom';
import './index.css';
// import App from './App';
// import reportWebVitals from './reportWebVitals';

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );

// // If you want to start measuring performance in your app, pass a function
// // to log results (for example: reportWebVitals(console.log))
// // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();



// const gameStyles={
//   backgroundColor:'salmon',
//   margin:10,
//   padding:20,
// };

const Square=(props)=>{

  
  return(
       <button  className='square'
       
       onClick={props.onClickEvent}
       
       >

      { props.value}
      </button>
  )
};

const Board=() => {
  // const initialSquares =[
  //   null,null,null,
  //   null,null,null,
  //   null,null,null,
  // ];

  const initialSquares= Array(9).fill(null);
  const [square,setSquares] =useState(initialSquares)
const[xIsNext,setXIsNext]= useState(true)

  const handleClickEvent =(i)=>{
     const newSquares=[...square];

     const winnerDeclared= Boolean(calculateWinner(newSquares));
     const squareFilled = Boolean(newSquares[i]);
     if(winnerDeclared||squareFilled){
      return;
     }
     
     newSquares[i]=xIsNext ?'X':'O';
     setSquares(newSquares);
     setXIsNext(!xIsNext);

  };


  const renderSquare=(i) => {
    return(
      <Square value={square[i]}
      onClickEvent={()=>handleClickEvent(i)}
      
      
      />
    );
  };
 const winner =calculateWinner(square);
  const status= winner ?
  `Winner: ${winner}`:
  `Next player:${xIsNext ? 'X': 'O'}`;
  return(
    <div style={{
      backgroundColor: 'skyblue',
      margin:10,
      padding:20,
      
    }}>
    <div className='status'>{status}</div>
    <div className='board-row' >
    {renderSquare(0)}{renderSquare(1)}{renderSquare(2)}
    </div>
    <div className='board-row' >
    {renderSquare(3)}{renderSquare(4)}{renderSquare(5)}
    </div>
    <div className='board-row' >
    {renderSquare(6)}{renderSquare(7)}{renderSquare(8)}
    </div>
    </div>
  );
};


const  Game =() => {
  return(
    <div  className='game' >
    Tic-Tac-Toe
   < Board/>
    </div>
  );
};

ReactDOM.render(
  <Game />,

  document.getElementById('root')
);

function calculateWinner(square) {
  const lines=[
[0,1,2],[3,4,5 ],[6,7,8 ],
[0,3,6],[1,4,7],[2,5,8],
[0,4,8],[2,4,6],
  ];

  for (let line of lines){
    const[a,b,c]= line

    if(square[a]&& square[a]===square[b]&&square[a]===square[c]){
      return square[a];
    }
  }
  return null;
}