import React, { FC, useEffect, useState } from 'react';
import { Board } from './../models/Board';
import CellComponent from './CellComponent';
import { Cell } from './../models/Cell';
import { Player } from './../models/Player';
import { Colors } from '../models/Colors';

interface BoardProps {
    board: Board;
    setBoard: (board: Board) => void;
    currentPlayer: Player | null;
    swapPlayers: () => void;
}

const BoardComponent: FC<BoardProps> = ({board, setBoard, currentPlayer, swapPlayers}) => {
    const [selectedCell, setSelectedCell] = useState<Cell | null>(null);

    function click(cell: Cell) {
        if(selectedCell && selectedCell !== cell && selectedCell.figure?.canMove(cell)) {
            selectedCell.moveFigure(cell);
            swapPlayers();
            setSelectedCell(null);
        } else {
            if(cell.figure?.color === currentPlayer?.color) {
                setSelectedCell(cell);
            }
        }
    }

    function hightlightCells() {
        board.hightlightCells(selectedCell);
        updateBoard();
    }

    function updateBoard() {
        const newBoard = board.getCopyBoard();
        setBoard(newBoard)
    }

    useEffect(() => {
        hightlightCells();
    }, [selectedCell])

    return (
        <div>
            <div className='turn'> Ход <span>{currentPlayer?.color === Colors.WHITE ? "белых" : "чёрных"}</span></div>
            <div className="board">
                {board.cells.map((row, index) => 
                    <React.Fragment key={index}>
                        {row.map(cell => 
                            <CellComponent
                                click={click}
                                cell={cell}
                                key={cell.id}
                                selected={cell.x === selectedCell?.x && cell.y === selectedCell?.y}
                            />    
                        )}
                    </React.Fragment>
                )}
            </div>
            <div className='letters'>
                <div>A</div>
                <div>B</div>
                <div>C</div>
                <div>D</div>
                <div>E</div>
                <div>F</div>
                <div>G</div>
                <div>H</div>
            </div>

        </div>

    );
};

export default BoardComponent;