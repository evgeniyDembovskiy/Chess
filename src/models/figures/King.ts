import { Figure, FigureNames } from "./Figure";
import { Cell } from './../Cell';
import { Colors } from "../Colors";
import blackLogo from "../../assets/black-king.png"
import whiteLogo from "../../assets/white-king.png"

export class King extends Figure {
    
    isFirstStep: boolean = true;

    constructor(color: Colors, cell: Cell) {
        super(color, cell);
        this.logo = color === Colors.BLACK ? blackLogo : whiteLogo;
        this.name = FigureNames.KING;
    }

    private castling(color: Colors, target: Cell) {
        if(Math.abs(target.x - this.cell.x) === 2 && target.y === this.cell.y) { // Рокировка 

            const direction = (target.x - this.cell.x) > 0 ? 1 : -1;

            if(this.isFirstStep) {
                if (direction === -1) {
                    const leftCell = color === Colors.BLACK ? this.cell.board.getCell(0,0) : this.cell.board.getCell(0,7);

                    if(this.cell.isEmptyHorizontal(leftCell) 
                    && leftCell.figure?.isFirstStep) {
                        return true
                    }
                } else {
                    const rightCell = color === Colors.BLACK ? this.cell.board.getCell(7,0) : this.cell.board.getCell(7,7);

                    if(this.cell.isEmptyHorizontal(rightCell) 
                    && rightCell.figure?.isFirstStep) {
                        return true
                    }
                }
            } 
        }
    }

    canMove(target: Cell): boolean {
        if(!super.canMove(target)) {
            return false
        }

        const dx = Math.abs(this.cell.x - target.x);
        const dy = Math.abs(this.cell.y - target.y);
        if((dx === 0 || dx === 1) && (dy === 0 || dy === 1)) {
            return true;
        }

        if(this.cell.figure?.color === Colors.BLACK) {
            if(this.castling(Colors.BLACK, target)) return true
        } else {
            if(this.castling(Colors.WHITE, target)) return true
        }


        return false;
    }

    moveFigure(target: Cell): void {

        if (Math.abs(target.x - this.cell.x) === 2) {
            const direction = (target.x - this.cell.x) > 0 ? 1 : -1;

            if (direction === 1) {
                if(this.cell.figure?.color === Colors.BLACK) {
                    this.cell.board.getCell(7,0).moveFigure(this.cell.board.getCell(5,0));
                } else {
                    this.cell.board.getCell(7,7).moveFigure(this.cell.board.getCell(5,7));
                }
            } else if (direction === -1) {
                if(this.cell.figure?.color === Colors.BLACK) {
                    this.cell.board.getCell(0,0).moveFigure(this.cell.board.getCell(3,0));
                } else {
                    this.cell.board.getCell(0,7).moveFigure(this.cell.board.getCell(3,7));
                }
            }
        }

        super.moveFigure(target);
        this.isFirstStep = false;
    }
}