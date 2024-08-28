import { Request, Response } from "express";
import { plainToClass } from "class-transformer";

import HttpStatusCodes from "@src/common/constants/HttpStatusCodes";
import CommentsService from "@src/services/CommentsService";
import { PageOptionsDto } from "@src/common/dtos/page-options.dto";
import { CreateCommentDto } from "@src/common/dtos/create-comment.dto";

async function create(req: Request, res: Response) {
  const dto = plainToClass(CreateCommentDto, req.body);
  const comment = await CommentsService.create(dto.user, dto.text);
  return res.status(HttpStatusCodes.CREATED).json(comment);
}

async function getAll(req: Request, res: Response) {
  const pageOptionsDto = plainToClass(PageOptionsDto, req.query);

  const comments = await CommentsService.getAll(
    pageOptionsDto.skip,
    pageOptionsDto.take,
    pageOptionsDto.order
  );
  return res.status(HttpStatusCodes.OK).json(comments);
}

export default {
  create,
  getAll,
} as const;
