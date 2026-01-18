// 0: Main Mission Start
// 1: Main Mission Updated
// 2: Main Mission Completed
// 3: Side Mission Start
// 4: Side Mission Completed
// 5: Report! (Blue)
// 6: Report! (Yellow)
// 7: Warning!

import React, {useEffect, useState, useRef} from 'react';
import { RouteChapters, Chapter } from './settings-chapters';

import {
  MaterialReactTable,
  useMaterialReactTable,
  createMRTColumnHelper,
} from 'material-react-table';

interface Row {
  route : string;
  chapter : string;
  level : number;
  mission : string;
}

interface Mission {
  general : { 
    route : number;
    chapter : number;
    name : string;
    type : number;
    level : {
      easy: number,
      normal: number,
      hard: number,
      maddening: number
    };
    deploy: number,
    territory: string,
    description: string,
    victory: any[],
    defeat: any[],
    restriction: string,
    strategy: any[],
    log: any[],
    notes: string
  };
  "s-rank" : {
    time : number,
    defeat : number,
    damage : number
  };
}

interface TableProps {
  allMissions : Mission[]
  allChapters : RouteChapters[];
  difficulty : number;
}

export default function Table( {allMissions, allChapters, difficulty} : TableProps) {

  const [ data, setData ] = useState<Row[]>([])
  
  function createData() : void {
    console.log("Starting Create Data");

    if (data.length !== 0)
      return;

    let rows : Row[] = [];

    allMissions.forEach( (entry, index) => {
      // Skip first entry
      if (index == 0)
        return;

      let row : Row = {route:"",chapter:"",level:0,mission:""};

      // Route
      try { row.route = allChapters[entry.general.route].route; }
      catch (e: unknown) { caughtError(e); row.route = "-"; }
      
      // Chapter
      try {
        let ch : Chapter = allChapters[entry.general.route].chapters[entry.general.chapter]
        row.chapter = String(ch.number).padStart(2, "0") + ": " + ch.name; 
      }
      catch (e: unknown) { caughtError(e); row.chapter = "-"; }

      // Level
      try { 
        switch (difficulty) {
          case 0: row.level = entry.general.level.easy; break;
          case 1: row.level = entry.general.level.normal; break;
          case 2: row.level = entry.general.level.hard; break;
          case 3: row.level = entry.general.level.maddening; break;
        }
      }
      catch (e: unknown) { caughtError(e); row.level = 999; }

      // Mission
      try { row.mission = entry.general.name }
      catch (e: unknown) { caughtError(e); row.mission = "-"; }

      rows.push(row);

      console.log("Mission: ")
      console.log(row)
    })

    setData(rows);
    
  }

  const columnHelper = createMRTColumnHelper<Row>();

  const columns = [
  columnHelper.accessor('route', {header: 'Route'}),
  columnHelper.accessor('chapter', {header: 'Chapter'}),
  columnHelper.accessor((row : Row) => Number(row.level), {id: "level", header: 'Level'}),
  columnHelper.accessor('mission', {header: 'Mission'}),
];

const table = useMaterialReactTable({
    columns,
    data,
    enablePagination: false,
    enableBottomToolbar: false,
    enableColumnOrdering: true,
    layoutMode: 'grid-no-grow',
  });

  // Run once
  useEffect(() => {
    createData()
  }, [])

  function caughtError( e : unknown ) : void {
    if (typeof e === "string") { 
      console.log(e.toUpperCase())
    } else if (e instanceof Error) {
      console.log(e.message)
    }
  }

  return (
    <>
      <MaterialReactTable table={table} />
    </>
  )
}
