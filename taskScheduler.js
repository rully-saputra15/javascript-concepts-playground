/*
Exercise: Implement a Task Scheduler

Create a function called `createTaskScheduler` that returns an object with methods to schedule, execute, and manage tasks. The task scheduler should have the following features:

1. scheduleTask(task, delay): Schedule a task to be executed after a specified delay (in milliseconds).
2. executeNextTask(): Execute the next scheduled task immediately.
3. cancelTask(taskId): Cancel a scheduled task by its ID.
4. clearAllTasks(): Cancel all scheduled tasks.
5. getTaskCount(): Return the number of tasks currently scheduled.
6. getNextExecutionTime(): Return the time until the next task execution (in milliseconds).

Additional requirements:
- Each scheduled task should return a unique taskId.
- Tasks should be executed in the order they are scheduled to run.
- If executeNextTask() is called and there are no tasks, it should do nothing.
- The scheduler should use setTimeout for task execution.
- Task functions can be asynchronous (returning a Promise).

The usage of the task scheduler should look like this:

const scheduler = createTaskScheduler();

const task1 = () => console.log("Task 1 executed");
const task2 = () => new Promise(resolve => {
  setTimeout(() => {
    console.log("Task 2 executed");
    resolve();
  }, 1000);
});

const taskId1 = scheduler.scheduleTask(task1, 2000);
const taskId2 = scheduler.scheduleTask(task2, 1000);

console.log(scheduler.getTaskCount()); // Should print 2
console.log(scheduler.getNextExecutionTime()); // Should print a number close to 1000

scheduler.executeNextTask(); // Should execute task2 immediately

setTimeout(() => {
  console.log(scheduler.getTaskCount()); // Should print 0 after all tasks are executed
}, 3000);

scheduler.cancelTask(taskId1);

Implement the `createTaskScheduler` function to make this work.
*/

const createTaskScheduler = () => {
    let tasks = [];
    return {
        scheduleTask: (task, delay) => {
            const taskId = new Date().getTime().toString();
            const scheduledTime = Date.now() + delay
            tasks.push({
                id:taskId,
                action: task,
                delay,
                scheduledTime
            })
            tasks.sort((a,b) => a.scheduledTime - b.scheduledTime)
            return taskId
        },
        executeNextTask: () => {
            const task = tasks.shift()
            if(!task) return this
            try {
                setTimeout(async () => {
                    await task.action()
                },task.delay)
            } catch(err){
                console.error(`Error: ${err}`)
            }
            return this
        },
        cancelTask: (taskId) => {
            const taskLoc = tasks.findIndex((task) => task.id === taskId)
            if(taskLoc < 0) return this
            const updatedTasks = [
                ...tasks.slice(0, taskLoc),
                ...tasks.slice(taskLoc+1)
            ]
            tasks = updatedTasks
            return this
        },
        clearAllTasks: () => {
            tasks = []
            return this
        },
        getTaskCount: () => {
            return tasks.length
        },
        getNextExecutionTime:() => {
            if(tasks.length === 0) return 0
            const currentTime = Date.now()
            return Math.max(0, tasks[0].scheduledTime - currentTime)
        }
    }
}

const task1 = () => console.log("Task 1 executed");
const task2 = () => new Promise(resolve => {
    setTimeout(() => {
        console.log("Task 2 executed"),
        resolve();
    },1000)
})
const scheduler = createTaskScheduler();
const task1Id = scheduler.scheduleTask(task1,2000)
console.log(task1Id)
console.log(scheduler.scheduleTask(task2,1000))
// scheduler.executeNextTask()
// scheduler.executeNextTask()
// scheduler.executeNextTask()
console.log(scheduler.getTaskCount())
console.log(scheduler.getNextExecutionTime())