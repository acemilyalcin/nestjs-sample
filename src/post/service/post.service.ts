import {
  BadRequestException,
  Injectable,
  NotFoundException,
  Logger,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import PostDto from '../dto/post.dto';
import { PostRepository } from '../repository/post.repository';

@Injectable()
export class PostService {
  private logger = new Logger('PostController');
  constructor(
    @InjectRepository(PostRepository) private postRepository: PostRepository,
  ) {}

  async createPost(postDto: PostDto): Promise<PostDto> {
    const post = this.postRepository.create(postDto);

    if (!post) {
      this.logger.error('An error was encountered while creating the record');
      throw new BadRequestException('The post could not been created');
    }

    await this.postRepository.save(post);
    this.logger.verbose('Post has been successfully created');
    return post;
  }

  async deletePost(id: string): Promise<void> {
    const result = await this.postRepository.delete(id);

    if (result.affected === 0) {
      this.logger.error(
        `An error was encountered while deleting the record ${id} not found`,
      );
      throw new NotFoundException(`'${id}' not found`);
    }

    this.logger.verbose(`${result.affected} post(s) have been deleted`);
  }

  async updatePost(id: string, postDto: PostDto): Promise<any> {
    const result = await this.postRepository.update({ id: id }, postDto);

    if (result.affected === 0) {
      this.logger.error(
        `An error was encountered while updating the record ${id} not found`,
      );
      throw new NotFoundException(`'${id}' not found`);
    }

    this.logger.verbose(`${id} post have been updated`);
    return result;
  }

  async getAllPosts(): Promise<PostDto[]> {
    const result = await this.postRepository.find({});
    this.logger.verbose(`${result.length} post(s) have been retreived`);
    return result;
  }

  async getPostById(id: string): Promise<PostDto> {
    const result = await this.postRepository.findOne({ id: id });
    this.logger.verbose(`${id} post have been retreived`);
    return result;
  }
}
