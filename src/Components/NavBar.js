import { Link } from 'react-router-dom'

import React from 'react'

export default function NavBar() {
  return (
    <nav>
      <h1>
        <Link to="/transactions"> Transactions </Link>
      </h1>
      <button>
        <Link to='/transactions/new'> New Entry </Link>
      </button>
    </nav>
  )
}
