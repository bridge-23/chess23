// src/chessGame.ts
import { Piece, PieceType, Color, Position } from "./types";

class Board {
  private squares: (Piece | null)[][];

  constructor() {
    this.squares = Array(8)
      .fill(null)
      .map(() => Array(8).fill(null));
    this.setupInitialPosition();
  }

  private setupInitialPosition() {
    for (let i = 0; i < 8; i++) {
      this.squares[1][i] = { type: PieceType.Pawn, color: Color.White };
      this.squares[6][i] = { type: PieceType.Pawn, color: Color.Black };
    }

    const setupRow = (row: number, color: Color) => {
      const pieces = [
        PieceType.Rook,
        PieceType.Knight,
        PieceType.Bishop,
        PieceType.Queen,
        PieceType.King,
        PieceType.Bishop,
        PieceType.Knight,
        PieceType.Rook,
      ];
      for (let i = 0; i < 8; i++) {
        this.squares[row][i] = { type: pieces[i], color: color };
      }
    };

    setupRow(0, Color.White);
    setupRow(7, Color.Black);
  }

  getPiece(pos: Position): Piece | null {
    return this.squares[pos.row][pos.col];
  }

  movePiece(from: Position, to: Position) {
    const piece = this.getPiece(from);
    if (!piece) return false;

    this.squares[to.row][to.col] = piece;
    this.squares[from.row][from.col] = null;
    return true;
  }

  // Basic move validation
  // src/board.ts
  isValidMove(from: Position, to: Position): boolean {
    const piece = this.getPiece(from);
    if (!piece) return false;

    // Check if the destination is within the board
    if (to.row < 0 || to.row > 7 || to.col < 0 || to.col > 7) return false;

    // Check if the destination is not occupied by a piece of the same color
    const destPiece = this.getPiece(to);
    if (destPiece && destPiece.color === piece.color) return false;

    // Validate moves for each piece type
    switch (piece.type) {
      case PieceType.Pawn:
        return this.isValidPawnMove(from, to, piece.color);
      case PieceType.Rook:
        return this.isValidRookMove(from, to);
      case PieceType.Knight:
        return this.isValidKnightMove(from, to);
      case PieceType.Bishop:
        return this.isValidBishopMove(from, to);
      case PieceType.Queen:
        return this.isValidQueenMove(from, to);
      case PieceType.King:
        return this.isValidKingMove(from, to);
      default:
        return false;
    }
  }

  // Implement rules for each piece
  isValidPawnMove(from: Position, to: Position, color: Color): boolean {
    // Basic pawn move validation logic
    // Add more specific rules here
    return true;
  }

  isValidRookMove(from: Position, to: Position): boolean {
    // Basic rook move validation logic
    // Add more specific rules here
    return true;
  }

  isValidKnightMove(from: Position, to: Position): boolean {
    // Basic knight move validation logic
    // Add more specific rules here
    return true;
  }

  isValidBishopMove(from: Position, to: Position): boolean {
    // Basic bishop move validation logic
    // Add more specific rules here
    return true;
  }

  isValidQueenMove(from: Position, to: Position): boolean {
    // Basic queen move validation logic
    // Add more specific rules here
    return true;
  }

  isValidKingMove(from: Position, to: Position): boolean {
    // Basic king move validation logic
    // Add more specific rules here
    return true;
  }

  toFEN(): string {
    const ranks = this.squares.map((rank) => {
      let empty = 0;
      return (
        rank
          .map((piece) => {
            if (piece === null) {
              empty++;
              return "";
            } else {
              const symbol = piece.type.toLowerCase();
              const result =
                piece.color === Color.White ? symbol.toUpperCase() : symbol;
              const emptyStr = empty > 0 ? empty.toString() : "";
              empty = 0;
              return `${emptyStr}${result}`;
            }
          })
          .join("") + (empty > 0 ? empty.toString() : "")
      );
    });

    // Add additional FEN details like active color, castling availability, etc.
    return ranks.join("/");
  }
}

export default Board;
