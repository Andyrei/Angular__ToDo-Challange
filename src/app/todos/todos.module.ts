import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { TodosService } from 'src/app/todos/services/todos.service';
import { TodosComponent } from 'src/app/todos/todos.component';
import { HeaderComponent } from 'src/app/todos/components/header/header.component';
import { MainComponent } from 'src/app/todos/components/main/main.component';
import { TodoComponent } from './components/todo/todo.component';
import { FooterComponent } from './components/footer/footer.component';

const routes: Routes = [
  {
    path: '',
    component: TodosComponent,
  }
]

@NgModule({
  declarations: [
    TodosComponent,
    HeaderComponent,
    MainComponent,
    TodoComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FontAwesomeModule,
  ],
  providers: [TodosService]
})
export class TodosModule { }
