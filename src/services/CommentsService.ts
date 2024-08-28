import CommentsRepo from "@src/repos/CommentsRepo";
import { Comment } from "@src/entities/comments.entity";
import { Order } from "@src/common/constants/order.enum";

// **** Functions **** //

function create(user: string, text: string) {
  return CommentsRepo.save(user, text);
}

function getAll(skip: number, take: number, order: Order): Promise<Comment[]> {
  return CommentsRepo.getAll(skip, take, order);
}

export default {
  create,
  getAll,
} as const;
