import { Component, ElementRef, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { faSmileBeam, faGrinHearts, faLaughBeam} from '@fortawesome/free-solid-svg-icons'
import { SmileyEnum } from './../../types/smileyenum.interface';
import { TodosService } from './../../services/todos.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent{
  text: string = '';


  faSmileBeam = faSmileBeam
  faGrinHearts = faGrinHearts
  faLaughBeam = faLaughBeam

  smiley$: Observable<SmileyEnum>;
  smileyEnum = SmileyEnum;

  constructor(private service: TodosService){
    this.smiley$ = this.service.smiley$
  }

  changeText(event: Event): void{
    const target = event.target as HTMLInputElement
    this.text = target.value;

    // on change if htere is a text inside this.text will change the input smiley to writing
    if(this.text){
      this.service.smiley$.next(this.smileyEnum.writing)
    }else{
      this.service.smiley$.next(this.smileyEnum.onFocus)
    }
  }

  onFocusSmiley(){
    this.text
      ? this.service.smiley$.next(this.smileyEnum.writing)
      : this.service.smiley$.next(this.smileyEnum.onFocus)
  }

  onBlurSmiley(){
    this.service.smiley$.next(this.smileyEnum.default)
  }



  addTodo(): void {
    if (!this.text) return;
    this.service.addTodo(this.text)
    this.text = ''
    this.service.smiley$.next(this.smileyEnum.default)
  }
}
