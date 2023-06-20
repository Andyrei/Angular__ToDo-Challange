import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import {Observable, combineLatest, forkJoin, map} from 'rxjs';
import { TodosService } from 'src/app/todos/services/todos.service';
import { TodoInterface } from 'src/app/todos/types/todo.interface';
import { FilterEnum } from 'src/app/todos/types/filterenum.interface';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})

export class MainComponent implements OnInit {
  visibleTodos$: Observable<TodoInterface[]>;
  areSelectedTodos$: Observable<boolean>;
  anyTodos$: Observable<boolean>;
  editingId: string | null = null

  constructor(private service: TodosService){
    //checks if all tasks as completed
    this.areSelectedTodos$ = this.service.todos$.pipe(
      map((todos) => todos.every((todo)=>{ todo.isDone }))
    )

    //check if there are any tasks so it can hidden the main section
    this.anyTodos$ = this.service.todos$.pipe(
      map((todos) => todos.length === 0)
    )

    //  mannage visible todos in base of a filter
    this.visibleTodos$ = combineLatest(
      this.service.filter$,
      this.service.todos$
    ).pipe(
      map(
        ([filter, todos]: [FilterEnum, TodoInterface[]]) => {
          if(filter === FilterEnum.active) {
            return todos.filter(todo => !todo.isDone)
          }else if(filter === FilterEnum.completed){
            return todos.filter(todo => todo.isDone)
          }
          return todos;
        }
      )
    )
  }

  ngOnInit(): void {
    this.service.checkStore();
  }
  selectAllTodos(event: Event): void{
    const target = event.target as HTMLInputElement
    this.service.selectAll(target.checked)
  }

  setEditingId(editingId: string | null): void{
    this.editingId = editingId;
  }
}
