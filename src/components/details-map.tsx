import React, {useEffect, useState} from 'react';
import { MRT_RowSelectionState } from 'material-react-table';
import mapPath from '../db/map-path.json';

/* 
    Websites
    https://www.photopea.com/
    https://www.freeconvert.com/png-to-svg
*/

interface FillsType {
    base : string;
    strongholdAllied : string;
    strongholdRed : string;
    strongholdYellow : string;
    gate : string;
}

interface svg_AllType {
    transform : string;
    d : string;
}

interface svg_StrongholdType {
    name : string;
    transform : string;
    d : string;
    fill ?: string;
}

interface svg_GateType {
    transform : string;
    d : string;
    fill ?: string;
}

interface svg_PathType {
    full : svg_AllType;
    strongholds : svg_StrongholdType[];
    gates : svg_GateType[];
}

interface size_SpecificType {
    width: number;
    height: number;
}

interface size_CategoryType {
    pixels : size_SpecificType;
    squares : size_SpecificType;
}

interface SvgPropsType {
    size : size_CategoryType;
    paths : svg_PathType;
}

interface MapProps {
    selectedRow : MRT_RowSelectionState;
}

export function Map({selectedRow} : MapProps) {

    const [svgProps, setSvgProps] = useState<SvgPropsType | undefined | null>(undefined);

    
    const fills : FillsType = {
        base: "#928A7D",
        strongholdAllied: "",
        strongholdRed: "#AE7A6C",
        strongholdYellow: "",
        gate: "#d146d1"
    }

    // Run once
    useEffect(() => {
    }, [])

    useEffect(() => {
        let keys = Object.keys(selectedRow) as Array<string>
        if (keys.length == 0) { // Only happens when page just loads
            setSvgProps(null);
            return;
        }
        let key = (keys[0] as unknown) as number
        if (selectedRow[key] == false) { // Row was unselected
            setSvgProps(null);
            return;
        }
        if (mapPath.length > key) // Map data exists
            setSvgProps(mapPath[key]);
        else
            setSvgProps(undefined); // Map data does not exist
    }, [selectedRow])

    useEffect(() => {
        // console.log("SVG Props:")
        // console.log(setSvgProps)
    }, [svgProps])

    if (svgProps === undefined) {
        return <>No data for this chapter yet...</>;
    }

    if (svgProps === null) {
        return <>Select a chapter.</>;
    }

    const createGridContainer = () => {
        var rows = [];

        for (let row : number = 1 ; row <= svgProps.size.squares.height ; row++ ) {
            var cells = []
            for (let col : number = 1 ; col <= svgProps.size.squares.width ; col++) {
                cells.push(
                    <div
                        className="map-grid-cell-container"
                        data-row = {row}
                        data-col = {col}
                        key={"mapGridCell-" + row + "-" + col}
                    ></div>
                )
            }

            rows.push(
                <div 
                    className="map-grid-row-container"
                    key={"mapGridRow-" + row}
                >
                    {cells}
                </div>
            )   
        }
        return rows;
    }

    return (
        <div className="map-container">
            <svg 
                version="1.1" 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox={"0 0 " + svgProps.size.pixels.width + " " + svgProps.size.pixels.height}
            >
                {/* Full */}
                <path 
                    fill={fills.base} 
                    transform={svgProps.paths.full.transform} 
                    d={svgProps.paths.full.d} 
                />
                {
                    // Strongholds
                    svgProps.paths.strongholds.map( (path : svg_StrongholdType, index : number) => (
                        <path 
                            fill={(path.fill !== undefined) ? path.fill : fills.strongholdRed} 
                            transform={path.transform} 
                            d={path.d}
                            key={"mapStronghold-" + index}
                        />
                    ))
                }
                {
                    // Gates
                    svgProps.paths.gates.map( (path : svg_GateType, index : number) => (
                        <path 
                            fill={(path.fill !== undefined) ? path.fill : fills.gate} 
                            transform={path.transform} 
                            d={path.d}
                            key={"mapGate-" + index}
                        />
                    ))
                }
            </svg>
            <div className="map-grid-container" >
                {createGridContainer()}
            </div>
        </div>
    )
    
}