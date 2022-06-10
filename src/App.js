import React, { useState } from 'react'

import web3 from './web3';

import lottery from './lottery'

import { useEffect } from 'react';
import { render } from '@testing-library/react';



const App = () => {

  const [mngr,setMngr] = useState('')

  const [players,setPlayers] = useState([])

  const [balance,setBalance] = useState(0)

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

    
  },[])

  return (
    <div>
      <h2>LOTTERY CONTRACT</h2>
      <p>
        This contract is managed by {mngr} manager
        This account holds {web3.utils.toWei(balance, 'ether')} Balance and there are {players.length} people to win the lottery
      </p>
     
    </div>
  )
}

export default App