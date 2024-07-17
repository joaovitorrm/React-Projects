import { useState, useEffect, useRef } from "react";
import Piece from "./Piece";

interface Props {
    actualImage: string;
    showNumbers : boolean;
    gridSize : number;
    setIsWinner : (value : boolean) => void;
    increaseMoves : () => void;
}

const Slide : React.FC<Props> = (props) => {

    const [tiles, setTiles] = useState<JSX.Element[][]>([]);
    const [emptyTile, setEmptyTile] = useState<{ x: number | null, y: number | null }>({ x: null, y: null });
    const [clickedId, setClickedId] = useState<string>("");

    const shuffleTiles = () => {
        setTiles(prev => prev.flat().sort(() => Math.random() - 0.5).reduce((acc : JSX.Element[][], value, index) => {
            if (!acc[index % props.gridSize]) acc[index % props.gridSize] = [];
            acc[index % props.gridSize].push(value);
            return acc;
        }, []));
    }

    const createTiles = () => {
        const createdTiles : JSX.Element[][] = [];
        for (let y = 0; y < props.gridSize; y++) {
            createdTiles.push([]);
            for (let x = 0; x < props.gridSize; x++) {
                if (x+y*props.gridSize+1 === props.gridSize*props.gridSize) break;
                createdTiles[y].push(
                    <Piece
                        key={x+y*props.gridSize+1}
                        value={x+y*props.gridSize+1}
                        backgroundPosition={`${x * (100 / (props.gridSize - 1))}% ${y * (100 / (props.gridSize - 1))}%`}
                        backgroundSize={`${props.gridSize * 100}%`}
                        backgroundImage={`url(${props.actualImage})`}
                        handleClick={() => setClickedId((x+y*props.gridSize+1).toString())}
                        showNumbers={props.showNumbers}
                        empty={false}
                    />
                )
            }
        }
        setTiles(createdTiles);
    }

    // Hide numbers
    useEffect(() => {
        if (tiles.length === 0) return;
        setTiles(prev => prev.map(row => row.map(tile => <Piece
            key={tile.key}
            value={tile.props.value}
            backgroundPosition={tile.props.backgroundPosition}
            backgroundImage={tile.props.backgroundImage}
            backgroundSize={tile.props.backgroundSize}
            handleClick={tile.props.handleClick}
            showNumbers={props.showNumbers}
            empty={tile.props.empty}/>
        )))
    }, [props.showNumbers])
    
    // Run on mount creates the tiles then shuffle
    useEffect(() => {
        createTiles();
        shuffleTiles();

        // Add empty tile at the end
        setTiles(prev => {
            prev[prev.length - 1].push(
            <Piece key={props.gridSize*props.gridSize}
                   value={0}
                   empty={true}
                   backgroundPosition=""
                   backgroundSize=""
                   backgroundImage=""
                   handleClick={() => {}}
                   showNumbers={props.showNumbers}/>);
            return [...prev];
        })

        // Save position of empty tile
        setEmptyTile({ x: props.gridSize - 1, y: props.gridSize - 1 });
    }, [props.actualImage, props.gridSize])


    // Run at every click
    useEffect(() => {

        if (clickedId === "") return;

        if (emptyTile.x === null || emptyTile.y === null) return;

        // Get the positions of the clicked tile by its id
        const y = tiles.findIndex(row => row.findIndex(tile => tile.key === clickedId) !== -1);
        const x = tiles[y].findIndex(tile => tile.key === clickedId);

        setClickedId("");

        // Check if the clicked tile is adjacent to the empty tile
        if ((x === emptyTile.x && (y === emptyTile.y - 1 || y === emptyTile.y + 1)) ||
            (y === emptyTile.y && (x === emptyTile.x - 1 || x === emptyTile.x + 1))) {

            props.increaseMoves();
            // Swap tiles
            setTiles(prev => {
                const changingTile = {...prev[y][x]};
                return prev.map((row, rowY) => 
                    row.map((tile, tileX) => {
                        if (tileX === x && rowY === y) {
                            setEmptyTile({ x, y });                            
                            return {...prev[emptyTile.y!][emptyTile.x!]};
                        } else if (tileX === emptyTile.x && rowY === emptyTile.y) {
                            return changingTile;
                        }
                        return tile;
                    })
                )
            });
        }
    }, [clickedId])

    // Check if the game is won
    useEffect(() => {
        if (emptyTile.x === null) return;

        let c = 0;
        let win = tiles.every(row => {
            if (row.every(tile => tile.key === (++c).toString())) return true;
            return false;
        })

        if (win) setTimeout(() => props.setIsWinner(true), 500);
    }, [tiles])

    return (
        <div className="slide" style={{gridTemplateColumns: `repeat(${props.gridSize}, 1fr)`, gridTemplateRows: `repeat(${props.gridSize}, 1fr)`}}>
            {tiles.map(tile => tile)}
        </div>  
        
    )
}

export default Slide;