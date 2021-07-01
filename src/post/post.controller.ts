import { Body, Controller, Delete, Param, Post } from '@nestjs/common';
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
}
