import { Component, OnInit } from '@angular/core';
import { Observable, map } from 'rxjs';
import { FilterEnum } from './../../types/filterenum.interface';
import { TodosService } from '../../services/todos.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})

export class FooterComponent{

  allTodos$: Observable<number>;
  activeTodos$: Observable<number>;
  inactiveTodos$: Observable<number>;
  anyTodos$: Observable<boolean>;
  itemsText$: Observable<string>;
  areSelectedTodos$: Observable<boolean>;
  filter$ : Observable<FilterEnum>;
  filterEnum = FilterEnum

  constructor(private service: TodosService){
    //checks if all tasks as completed
    this.areSelectedTodos$ = this.service.todos$.pipe(
      map((todos) => todos.every((todo)=>{ todo.isDone }))
    )

    // Is counting all the todos
    this.inactiveTodos$ = this.service.todos$.pipe(
      map((todos)=>(todos.filter(todo =>todo.isDone).length))
    )
    this.activeTodos$ = this.service.todos$.pipe(
      map((todos)=>(todos.filter(todo =>!todo.isDone).length))
    )
    this.allTodos$ = this.service.todos$.pipe(
      map((todos)=>(todos.length))
    )


    // it adds the plural in the counter text
    this.itemsText$ = this.activeTodos$.pipe(
      map(activeTodos => `${activeTodos !== 1 ? 'items' : 'item'} left` )
    )

  //check if there are any tasks so it can hidden the main section
    this.anyTodos$ = this.service.todos$.pipe(
      map((todos) => todos.length === 0)
    )

    this.filter$ = this.service.filter$
  }

    changeFilter(event: Event, filter: FilterEnum): void{
      event.preventDefault();
      this.service.changeFilter(filter)
    }


    clearDoneTodos(){
      const upadatedTodos = this.service.todos$.getValue().filter(todo => !todo.isDone)
      this.service.todos$.next(upadatedTodos);
      this.service.storeToLocal()
    }

}
