import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
  OnInit,
  OnChanges,
  SimpleChanges
} from '@angular/core';
import { TodoInterface } from '../../types/todo.interface';
import { TodosService } from '../../services/todos.service';
import { faTrashCan, faEdit } from '@fortawesome/free-solid-svg-icons'

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})

export class TodoComponent implements OnInit, OnChanges {

  faTrashCan = faTrashCan;
  faEdit = faEdit;
  @Input('todo') todoProps!: TodoInterface;
  @Input('isEditing') isEditingProps!: boolean;
  @Output('setEditingId') setEditingIdEvent: EventEmitter<string | null> = new EventEmitter();
  @Output('checkSelected') checkSelectedEvent: EventEmitter<string | null> = new EventEmitter();
  @ViewChild('editingInput') editingInput!: ElementRef;
  editingText: string =''
  isOpen: boolean = false; // for the tool tip if is clicked only once



  constructor(
    private service: TodosService
  ) {}



  ngOnInit(): void{
    this.editingText = this.todoProps.value
  }


  openToolTip() {
    this.isOpen = !this.isOpen
    setTimeout(()=>{
      this.isOpen = false
    }, 1000)
  }

  ngOnChanges(changes: SimpleChanges): void{
    if(changes.isEditingProps.currentValue){
      setTimeout(()=>{
        this.editingInput.nativeElement.focus();
      })
    }
  }

  setEditMode(): void{
    this.setEditingIdEvent.emit(this.todoProps.id)
  }

  toDoOutOfFocus(){
    this.setEditingIdEvent.emit(null)
  }


  toggleTodo(){
    this.service.toggleTodo(this.todoProps.id)
  }

  removeTodo(){
    this.service.removeTodo(this.todoProps.id)
  }

  changeText(event: Event): void{
    const val = (event.target as HTMLInputElement).value
    this.editingText = val;

  }

  changeTodo(): void{
    this.service.modifyTodo(this.todoProps.id, this.editingText)
    this.setEditingIdEvent.emit(null)
  }
}
