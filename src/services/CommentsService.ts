import CommentsRepo from "@src/repos/CommentsRepo";
import { Comment } from "@src/entities/comments.entity";
import { Order } from "@src/common/constants/order.enum";

// **** Functions **** //

/**
 * Get all records.
 */
function getAll(skip: number, take: number, order: Order): Promise<Comment[]> {
  return CommentsRepo.getAll(skip, take, order);
}

// **** Export default **** //

export default {
  getAll,
} as const;
