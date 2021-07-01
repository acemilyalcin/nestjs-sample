import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import PostDto from './dto/post.dto';
import { PostRepository } from './post.repository';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(PostRepository) private postRepository: PostRepository,
  ) {}

  async createPost(postDto: PostDto): Promise<PostDto> {
    const post = this.postRepository.create(postDto);

    if (!post) {
      throw new BadRequestException('The post could not been created');
    }

    await this.postRepository.save(post);

    return post;
  }

  async deletePost(id: string): Promise<void> {
    const result = await this.postRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`'${id}' not found`);
    }
  }
}
