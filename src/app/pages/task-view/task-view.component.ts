import { Component, OnInit } from '@angular/core';
import {TaskService}from 'src/app/task.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import{ Task} from 'src/app/models/task.model';
import { List} from 'src/app/models/list.model'; 

@Component({
  selector: 'app-task-view',
  templateUrl: './task-view.component.html',
  styleUrls: ['./task-view.component.css']
})
export class TaskViewComponent implements OnInit {

  lists:List[];
  tasks:Task[];

  constructor(private taskService: TaskService, private route: ActivatedRoute) { }

  ngOnInit() {
  
  this.route.params.subscribe(
    (params: Params) => {
      console.log(params);
      if(params.listId){
        this.taskService.getTasks(params.listId).subscribe((tasks:Task[])=>{
          this.tasks=tasks;
      })
      
      }else{
        this.tasks=undefined;
      }
    }
  )
  this.taskService.getLists().subscribe((lists:List[]) => {
    this.lists = lists;
    // console.log(lists);
  })

}
onTaskClick(task:Task){
  this.taskService.complete(task).subscribe(()=>{
    console.log("completedtask show success");
    task.completed=!task.completed;
  })
}


}