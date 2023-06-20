import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { TodoInterface } from "../types/todo.interface";
import { FilterEnum } from "../types/filterenum.interface";
import { SmileyEnum } from "../types/smileyenum.interface";


export class TodosService {
  todos$ = new BehaviorSubject<TodoInterface[]>([]);              //  stream creation with empty array of todos
  filter$ = new BehaviorSubject<FilterEnum>(FilterEnum.all);      //  stream creation for filters as active, completed or all
  smiley$ = new BehaviorSubject<SmileyEnum>(SmileyEnum.default);  //  stream creation for smiley in base of input

  storeToLocal() {
    localStorage.setItem('todos', JSON.stringify(this.todos$.getValue()));
  }

  checkStore() {
    if (localStorage.getItem('todos') == '') return;
    this.todos$.next(JSON.parse(localStorage.getItem('todos') || '[]'))
  }


  //emitting value to stream todos$
  addTodo(text: string): void{
    const newTodo: TodoInterface = {
      id: Math.random().toString(16),
      value: text,
      isDone: false,
    };
    const updatedTodos = [...this.todos$.getValue(), newTodo]


    this.todos$.next(updatedTodos);
    this.storeToLocal()
  }

  // Toggle all tasks to DONE and emit to stream todos$
  selectAll(isDone: boolean): void {
    const updateTodos = this.todos$.getValue().map((todo) => {
      return {
        ...todo,
        isDone
      };
    });
    this.todos$.next(updateTodos);
    this.storeToLocal()
  }

  changeFilter(filterName: FilterEnum): void{
    this.filter$.next(filterName);
  }


  modifyTodo(id: string, value: string): void{
    const updateTodos = this.todos$.getValue().map((todo) => {
        if(todo.id === id) {
          return {
            ...todo,
            value
          };
        }
        return todo;
      }
    )
    this.todos$.next(updateTodos);
    this.storeToLocal()
  }

  toggleTodo(id: string){
    const updateTodos = this.todos$.getValue().map((todo) => {
      if(todo.id === id){
        return {
          ...todo,
          isDone: !todo.isDone
        };
      }
      return todo
    });
    this.todos$.next(updateTodos);
    this.storeToLocal()
  }

  removeTodo(id: string){
    const updatedTodos = this.todos$.getValue().filter(todo => todo.id !== id);
    this.todos$.next(updatedTodos)
    this.storeToLocal()
  }
}
