import { Repository } from "typeorm";
import { User } from "./entities/user.entity";
import { AppDataSource } from "../../config/data-source.config";
import { RegisterDto } from "../auth/dto/register.dto";

export class UserRepository {
  public repository: Repository<User>;

  constructor() {
    this.repository = AppDataSource.getRepository(User);
  }

  async findAll(): Promise<User[]> {
    return await this.repository.find();
  }

  async findById(id: number): Promise<User | null> {
    return await this.repository.findOne({ where: { id } });
  }

  async findByEmail(email: string): Promise<User | null> {
    return await this.repository.findOne({ where: { email } });
  }

  async create(userData: RegisterDto): Promise<User> {
    const user = await this.repository.create(userData);
    return await this.repository.save(user);
  }

  async delete(id: number): Promise<boolean> {
    const result = await this.repository.delete(id);
    return result.affected !== 0;
  }
}
