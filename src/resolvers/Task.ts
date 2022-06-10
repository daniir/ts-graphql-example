import {Resolver, Query, Mutation, Arg } from 'type-graphql';
import {TaskInputs} from "./types/task-input";
import {Task} from "../entities/Task";

const tasks = [
    {
        id: 1,
        name: 'task1',
        description: 'description1',
        state: false
    },
    {
        id: 2,
        name: 'task2',
        description: 'description2',
        state: false
    }
]


@Resolver()
export class TaskResolver{
    @Query(() => [Task])
    getTasks(){
        return tasks;
    };

    @Query(() => Task)
    getTask(
        @Arg("id") id: number
    ){
        return tasks.find(t => t.id === id);
    }

    @Mutation(() => Task)
    createTask(
        @Arg("task") task: TaskInputs
    ){
        const newTask = {
            id: tasks.length + 1,
            name: task.name,
            description: task.description,
            state: task.state
        };
        tasks.push(newTask);
        return newTask;
    };

    @Mutation(() => Task || null)
    updateTask(
        @Arg("id") id: number,
        @Arg('task') task: TaskInputs
    ){
        const {name, description, state} = task;
        const findTask = tasks.find(t => t.id === id);
        if(findTask){
            const taskIndex = tasks.findIndex(t => t.id === id);
            tasks[taskIndex] = {
                id,
                name,
                description,
                state
            };

            return tasks[taskIndex];
        } else  {
            return null;
        }
    };

    @Mutation(() => [Task])
    deleteTask(
        @Arg('id') id: number
    ){
        const indexTask = tasks.findIndex(t => t.id !== id);
        tasks.splice(indexTask, 1);
        return tasks;
    }
}