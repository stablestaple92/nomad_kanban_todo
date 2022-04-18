import { Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import DraggableCard from "./DraggableCard";


const Wrapper = styled.div`
  min-height: 200px;
  padding: 20px 10px;
  padding-top: 30px;
  background-color: ${props => props.theme.boardColor};
  border-radius: 10px;
`;

const Title = styled.h2`
  text-align: center;
  font-weight: 600;
  margin-bottom: 10px;
  font-size: 18px;
`;

interface IBoardProps {
  toDos: string[];
  boardId: string;
}

function Board ({ toDos, boardId }:IBoardProps) {
  return (
    <Wrapper>
      <Title>{boardId}</Title>
      <Droppable droppableId={boardId}>
        {(magic) => (
          <div ref={magic.innerRef} {...magic.droppableProps}>
            {toDos.map((toDo, index) => (
              <DraggableCard key={toDo} toDo={toDo} index={index} />
              ))}
            {magic.placeholder}
          </div>
        )}
      </Droppable>
    </Wrapper> 
  );
}

export default Board;