// 0: Main Mission Start
// 1: Main Mission Updated
// 2: Main Mission Completed
// 3: Side Mission Start
// 4: Side Mission Completed
// 5: Report! (Blue)
// 6: Report! (Yellow)
// 7: Warning!

import React, {useEffect, useState, useRef} from 'react';
import { RouteChapters } from './settings-chapters';

interface TableProps {
  allChapters : RouteChapters[];
}

export default function Table( {allChapters} : TableProps) {


  

 



  return (
    <>
      <table>
        <thead>
            <tr>
                <th>Route</th>
                <th>Chapter</th>
            </tr>
        </thead>
        <tbody>
        {
          allChapters.map( (route) => {
            return (
              route.chapters.map( (ch, index) => {
                return (
                  <tr key={route.id+"-"+index}>
                    
                  </tr>
                )
              } )
            )
          })
        }
        </tbody>

      </table>
    </>
  )
}
