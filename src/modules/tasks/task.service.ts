import { NotFoundException } from "../../shared/exceptions/app.exceptions";
import { CreateTaskDto } from "./dto/create-task.dto";
import { UpdateTaskDto } from "./dto/update-task.dto";
import { Task } from "./entities/task.entity";
import { TaskRepository } from "./task.repository";

export class TaskService {
  public taskRepository: TaskRepository;

  constructor() {
    this.taskRepository = new TaskRepository();
  }

  public async findAllByUser(userId: number): Promise<Task[]> {
    return await this.taskRepository.findAllByUser(userId);
  }

  public async create(taskData: CreateTaskDto, userId: number): Promise<Task> {
    try {
      return await this.taskRepository.create(taskData, userId);
    } catch (error) {
      throw new Error((error as any)?.message || "Error creating task");
    }
  }

  public async update(
    id: number,
    taskData: UpdateTaskDto,
    userId: number
  ): Promise<Task> {
    const updated = await this.taskRepository.updateUserTask(
      id,
      userId,
      taskData
    );

    if (!updated) {
      throw new NotFoundException(
        "Task not found or you don't have permission"
      );
    }

    const task = await this.taskRepository.findByIdAndUser(id, userId);
    return task!;
  }

  public async delete(id: number, userId: number): Promise<void> {
    const deleted = await this.taskRepository.deleteUserTask(id, userId);

    if (!deleted) {
      throw new NotFoundException(
        "Task not found or you don't have permission"
      );
    }
  }
}
