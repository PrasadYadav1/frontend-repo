import React from 'react'
import WurkspaceIcons from './WurkspaceIcons';
import { Outlet } from 'react-router-dom';

function WurkSpace() {
  return (
    <>
     <div><WurkspaceIcons/></div>
     <div><Outlet/></div>
    </>
  )
}

export default WurkSpace