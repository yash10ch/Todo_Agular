import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Master1Service } from './Service/master1.service';
import { ApiResponseModel, ITask, Task } from './model/task';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,DatePipe,FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent  implements OnInit{

  taskObj : Task = new Task();
  taskList : ITask[]=[];
  
  masterService = inject(Master1Service);

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    //pagload ngOninit trigger 
    this.loadAllTask();
  }

  loadAllTask(){
    this.masterService.getAllTaskList().subscribe((res:ApiResponseModel)=>{
     this.taskList=res.data;
    })
  }

  addTask(){
    this.masterService.addNewTask(this.taskObj).subscribe((res:ApiResponseModel)=>{
      if(res.result){
        alert('Task add Success');
        this.loadAllTask();
        this.taskObj = new Task();
      }
    },error =>{
      alert('API call error')
    });
   
  }

  onEdit(item:Task){
    this.taskObj=item;
    setTimeout(()=>{
      const date = new Date(this.taskObj.dueDate);
      const day = ('0' + date.getDate()).slice(-2);
      const month = ('0'+ date.getMonth()).slice(-2);
      const today = date.getFullYear()+ '-' + (month) + '-' + (day);
      
      (<HTMLInputElement>document.getElementById('textDate')).value= today
    }, 1000);

  }

  updateTask(){
    this.masterService.updateTask(this.taskObj).subscribe((res:ApiResponseModel)=>{
      if(res.result){
        alert('Task Updated Success');
        this.loadAllTask();
        this.taskObj = new Task();
      }
    },error =>{
      alert('API call error')
    });

}

onDelete(id:number){
  const isConfirm = confirm("Are you sure want to delete");
  if(isConfirm){
  this.masterService.deleteNewTask(id).subscribe((res:ApiResponseModel)=>{
    if(res.result){
      alert('Task Deleted Success');
      this.loadAllTask();
      
    }
  },error =>{
    alert('API call error')
  });
}
}
}
