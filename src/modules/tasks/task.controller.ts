import {
  Body,
  Delete,
  Get,
  Path,
  Post,
  Put,
  Inject,
  Response,
  Route,
  Security,
  Tags,
} from "tsoa";
import { Request } from "express";
import { BaseController } from "../../shared/controllers/base.controller";
import { IApiResponse } from "../../shared/types/api.types";
import { Task } from "./entities/task.entity";
import { CreateTaskDto } from "./dto/create-task.dto";
import { UpdateTaskDto } from "./dto/update-task.dto";
import { TaskService } from "./task.service";

@Route("tasks")
@Tags("Tasks")
@Security("jwt")
export class TaskController extends BaseController {
  constructor(public taskService: TaskService = new TaskService()) {
    super();
  }

  @Get("/")
  @Response(200, "Tasks retrieved successfully")
  public async index(
    @Inject() request: Request
  ): Promise<IApiResponse<Task[]>> {
    const userId = request.user!.id;
    const result = await this.taskService.findAllByUser(userId);
    return this.success(result);
  }

  @Post("/")
  @Response(201, "Task created successfully")
  public async create(
    @Body() requestBody: CreateTaskDto,
    @Inject() request: Request
  ): Promise<IApiResponse<Task>> {
    await this.validateDto(CreateTaskDto, requestBody);
    const userId = request.user!.id;
    const result = await this.taskService.create(requestBody, userId);
    return this.success(result, "Task created successfully");
  }

  @Put("/{id}")
  @Response(200, "Task updated successfully")
  public async update(
    @Body() requestBody: UpdateTaskDto,
    @Path() id: number,
    @Inject() request: Request
  ): Promise<IApiResponse<Task>> {
    await this.validateDto(UpdateTaskDto, requestBody);
    const userId = request.user!.id;
    const result = await this.taskService.update(id, requestBody, userId);
    return this.success(result, "Task updated successfully");
  }

  @Delete("/{id}")
  @Response(204, "Task deleted successfully")
  public async delete(
    @Path() id: number,
    @Inject() request: Request
  ): Promise<void> {
    const userId = request.user!.id;
    await this.taskService.delete(id, userId);
    this.setStatus(204);
  }
}
