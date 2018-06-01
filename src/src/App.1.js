// import React, { Component } from 'react';
// import logo from './logo.svg';
// import './App.css';

// class UserRow extends React.Component {
//   render() {
//     return (
//       <tr className="userRow">
//         <td> {this.props.name} </td>
//         <td> {this.props.email} </td>
//         <td> {this.props.phone} </td>
//       </tr>
//     );
//   }
// }

// class Board extends React.Component {
//   constructor() {
//     super();
//     this.state = {
//       name: "Gabriel",
//     };
//   }
//   componentDidMount() {
//     fetch('https://toquinha.herokuapp.com/').then(results => {return results.json();}).then(data => {
//       console.log(data);
//       this.setState((prevState, props) => {
//         return { name: data[0].name }
//       });
//     });
//   }
//   renderSquare(name) {
//     return <UserRow name={name} email="gabrielbm06@gmail.com" phone="199"/>;
//   }

//   updateStatus() {
//     this.setState((prevState, props) => {
//       return { name: prevState.name + "show" }
//     });
//   }

//   render() {
//     const status = 'Next player: X';

//     return (
//       <div>
//       <table>
//         <tbody>
//        {this.renderSquare(this.state.name)}
//        </tbody>
//        </table>
//        <button onClick = {() => this.updateStatus()}> Teste </button>
//        </div>
//     );
//   }
// }

// class Game extends React.Component {
//   render() {
//     return (
//       <div className="game">
//         <div className="game-board">
//           <Board />
//         </div>
//         <div className="game-info">
//           <div>{/* status */}</div>
//           <ol>{/* TODO */}</ol>
//         </div>
//       </div>
//     );
//   }
// }

// // ========================================


// export default Game;
