import { Component, DoCheck } from '@angular/core';

// Model
import { TaskList } from '../../model/task-list';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
})
export class TodoListComponent implements DoCheck {
  public taskList: TaskList[] = JSON.parse(
    localStorage.getItem('taskList') || '[]'
  );

  public ngDoCheck(): void {
    this.setLocalStorage();
  }

  public setEmitTaskList(task: string): void {
    this.taskList.push({
      task: task,
      checked: false,
    });
  }

  public deleteItemTaskList(index: number): void {
    this.taskList.splice(index, 1);
  }

  public deleteAllTaskList(): void {
    const confirm = window.confirm('Você deseja realmente deletar tudo?');

    if (confirm) {
      this.taskList = [];
    }
  }

  public validationInput(event: string, index: number): void {
    if (!event.length) {
      const confirm = window.confirm('Tarefa esta vazia, deseja deletar?');

      if (confirm) this.deleteItemTaskList(index);
    }
  }

  public setLocalStorage(): void {
    if (this.taskList) {
      this.taskList.sort(
        (first, last) => Number(first.checked) - Number(last.checked)
      );

      localStorage.setItem('taskList', JSON.stringify(this.taskList));
    }
  }
}
