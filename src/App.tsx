import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { toDoState } from './atoms';
import Board from "./Components/Board";

/**
 * Kanban To Do Board (Trello Clone Coding)
 * 
    코드 챌린지
    1. 스타일 꾸미기
    2. 작성한 모든 투두를 localStorage에 저장 및 로드하기
    3. 작성한 투두 삭제하기
    4. 보드 생성하기
    5. 보드끼리도 순서 바꾸기

    추가로 구현해볼 만한 기능
    1. 보드가 가진 투두 전체 삭제하기
    2. 보드 삭제하기
    3. 작성한 투두 수정하기
    4. 보드 제목 수정하기
 */


const Wrapper = styled.div`
  display: flex;
  max-width: 480px;
  width: 100%;
  margin: 0 auto;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const Boards = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
`;

function App() {
  const [toDos, setToDos] = useRecoilState(toDoState);
  const onDragEnd = (info: DropResult) => {
    const { draggableId, destination, source } = info;
    if (!destination) return;
    if (destination?.droppableId === source.droppableId) {
      // same board movement
      setToDos((allBoards) => {
        // 1) copy all the toDos
        const boardCopy = [...allBoards[source.droppableId]];
        const taskObj = boardCopy[source.index];
        // 2) Delete item on source.index
        boardCopy.splice(source.index, 1);
        // 3) put back the item on the destination index
        boardCopy.splice(destination?.index, 0, taskObj);
        
        return {
          ...allBoards,
          [source.droppableId]: boardCopy
        };
      });
    }
    if (destination.droppableId !== source.droppableId) {
      // cross board movement
      setToDos((allBoards) => {
        const sourceBoard = [...allBoards[source.droppableId]];
        const destinationBoard = [...allBoards[destination.droppableId]];
        const taskObj = sourceBoard[source.index];


        sourceBoard.splice(source.index, 1);
        destinationBoard.splice(destination.index, 0, taskObj );

        return {
          ...allBoards,
          [source.droppableId]: sourceBoard,
          [destination.droppableId]: destinationBoard,
        }
      });
    }
  };
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Wrapper>
        <Boards>
          {Object.keys(toDos).map(boardId => <Board boardId={boardId} key={boardId} toDos={toDos[boardId]} />)}
        </Boards>
      </Wrapper>
    </DragDropContext>
  );
}

export default App;
