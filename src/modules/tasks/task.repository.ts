import { Repository } from "typeorm";
import { Task } from "./entities/task.entity";
import { AppDataSource } from "../../config/data-source.config";
import { UpdateTaskDto } from "./dto/update-task.dto";
import { CreateTaskDto } from "./dto/create-task.dto";

export class TaskRepository {
  public repository: Repository<Task>;

  constructor() {
    this.repository = AppDataSource.getRepository(Task);
  }

  async findAllByUser(userId: number): Promise<Task[]> {
    return await this.repository.find({
      where: { user: { id: userId } },
      relations: ["user"],
    });
  }

  async findByIdAndUser(taskId: number, userId: number): Promise<Task | null> {
    return await this.repository.findOne({
      where: {
        id: taskId,
        user: { id: userId },
      },
      relations: ["user"],
    });
  }

  async create(taskData: CreateTaskDto, userId: number): Promise<Task> {
    const task = this.repository.create({
      ...taskData,
      user: { id: userId },
    });
    return await this.repository.save(task);
  }

  async updateUserTask(
    taskId: number,
    userId: number,
    taskData: UpdateTaskDto
  ): Promise<boolean> {
    const result = await this.repository.update(
      {
        id: taskId,
        user: { id: userId },
      },
      taskData
    );

    return result.affected !== 0;
  }

  async deleteUserTask(taskId: number, userId: number): Promise<boolean> {
    const result = await this.repository.delete({
      id: taskId,
      user: { id: userId },
    });

    return result.affected !== 0;
  }
}
