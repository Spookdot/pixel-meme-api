import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Query,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { MemeService } from './meme.service';

@Controller('api/v1')
export class MemeController {
  constructor(private memeService: MemeService) {}

  @Get('meme')
  async meme(@Query('id') idString?: string, @Query('name') name?: string) {
    return this.memeService.fetchMeme({
      where: {
        id: Number.parseInt(idString) || undefined,
        name: {
          contains: name,
        },
      },
      include: {
        parameter: {
          include: {
            position: true,
          },
        },
      },
    });
  }

  @Get('memes')
  async memes(
    @Query('name') name?: string,
    @Query('creator') creator?: string,
    @Query('server') server?: string,
    @Query('imageurl') imageUrl?: string,
    @Query('limit') limitString: string = '50',
    @Query('page') pageString: string = '1',
    @Query('sortby') sortBy: string = '',
  ) {
    let limit = Number.parseInt(limitString);
    let page = Number.parseInt(pageString);
    if (limit === NaN || page === NaN) {
      throw new HttpException(
        'Limit needs to be a number',
        HttpStatus.BAD_REQUEST,
      );
    }

    if (limit > 50) {
      limit = 50;
    }

    const sorting: Prisma.memeOrderByWithRelationInput = {};
    if (
      sortBy !== '' &&
      ['creator_id', 'id', 'image_url', 'name', 'server_id'].includes(
        sortBy.replace(/[\+\-]/, ''),
      )
    ) {
      if (sortBy.includes('-')) {
        sorting[sortBy.replace(/[\+\-]/, '')] = 'desc';
      } else {
        sorting[sortBy.replace(/[\+\-]/, '')] = 'asc';
      }
    } else if (sortBy !== '') {
      throw new HttpException(
        `Cannot sort by ${sortBy}`,
        HttpStatus.BAD_REQUEST,
      );
    }
    return this.memeService.fetchMemes({
      where: {
        name: { contains: name },
        creator_id: creator,
        server_id: server,
        image_url: { contains: imageUrl },
      },
      take: limit,
      skip: (page - 1) * limit,
      orderBy: sorting,
    });
  }
}
