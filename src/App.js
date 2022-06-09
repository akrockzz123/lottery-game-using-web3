import React from 'react'

import web3 from './web3';

const App = () => {

  console.log(web3.version)

  web3.eth.getAccounts().then(console.log) // get all acounts that metamask provided by our installed web3

  return (

    <div>App</div>
  )
}

export default App