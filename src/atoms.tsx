import { atom, selector } from "recoil";

// 투두 기본 형태 : object내에 id:number, text:string
export interface IToDo {
  id: number;
  text: string;
}

// todo atom을 만들기 위한 state type 정의
// key : To Do, Doing, Done ...
// ITodo[] : 각각 key에 할당되는 array
interface IToDoState {
  [key: string]: IToDo[];
}

export const toDoState = atom<IToDoState>({
  key: "toDo",
  default: {
    "To Do": [],
    "Doing": [],
    "Done": [],
  },
});