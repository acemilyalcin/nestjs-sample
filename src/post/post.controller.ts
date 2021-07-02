import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import PostDto from './dto/post.dto';
import { PostService } from './post.service';

@Controller('post')
export class PostController {
  constructor(private postService: PostService) {}
  @Post()
  createPost(@Body() postDto: PostDto): Promise<PostDto> {
    return this.postService.createPost(postDto);
  }
  @Delete('/:id')
  deletePost(@Param('id') id: string): Promise<void> {
    return this.postService.deletePost(id);
  }

  @Put('/:id')
  updatePost(
    @Param('id') id: string,
    @Body() postDto: PostDto,
  ): Promise<PostDto> {
    return this.postService.updatePost(id, postDto);
  }

  @Get()
  getAllPosts(): Promise<PostDto[]> {
    return this.postService.getAllPosts();
  }

  @Get('/:id')
  getPostById(@Param('id') id: string): Promise<PostDto> {
    return this.postService.getPostById(id);
  }
}
