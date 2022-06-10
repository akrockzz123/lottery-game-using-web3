import React, { useState } from 'react'

import web3 from './web3';

import lottery from './lottery'

import { useEffect } from 'react';
import { render } from '@testing-library/react';



const App = () => {

  const [mngr,setMngr] = useState('')

  const [players,setPlayers] = useState([])

  const [balance,setBalance] = useState('')

  const [value,setValue] = useState('')

  const [message,setMessage] = useState('')

  console.log(value)

  const submitHandler = async (e) => {

    e.preventDefault()

    // get list of all accounts

    const accounts = await web3.eth.getAccounts();

    console.log(typeof(value))
    setMessage('waiting for transaction to over')


    await lottery.methods.enter().send({   // entering to lottery
      from:  accounts[0],
      value: web3.utils.toWei(value,'ether')
    });

    setMessage('You have entered the lottery')



  };


  const pickWin = async() => {

    const accounts = await web3.eth.getAccounts(); // get all accounts

    setMessage('Hold on a second waiting')
    const winner = await lottery.methods.pickWinner().send({
      from: accounts[0]
    });

    setMessage('winner has been picked',winner)

  }

  useEffect(() => {

    const fun = async () => {

      const manager = await lottery.methods.manager().call();

      const players = await lottery.methods.getPlayers().call();

      const balance = await web3.eth.getBalance(lottery.options.address)

      setMngr(manager)

      setPlayers(players)

      setBalance(balance)

    }

    fun();

    
  },)

  return (
    <div>
      <h2>LOTTERY CONTRACT</h2>
      <p>
        This contract is managed by {mngr} manager
        This account holds {web3.utils.fromWei(balance, 'ether')} Balance and there are {players.length} people to win the lottery
      </p>
      <hr/>

      <form onSubmit = {submitHandler}>
        <h4>want to try your luck</h4>

        <div>
          <label>Amount of ether to enter</label>

          <input  value = {value} onChange = {(event) => setValue(event.target.value)}/>
        </div>

        <button>Enter</button>

        <hr/>
        <hr/>

        <h4>Ready to pick a winner</h4>

        <buuton onClick = {pickWin}>Pick a winner</buuton>

        <h1>{message}</h1>
      </form>
    </div>
  )
}

export default App