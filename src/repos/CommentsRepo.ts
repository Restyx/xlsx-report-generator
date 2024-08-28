import { Comment } from "@src/entities/comments.entity";
import { AppDataSource } from "./DataSource";
import { Order } from "@src/common/constants/order.enum";

// **** Functions **** //

/**
 * Get all records.
 */

async function save(user: string, text: string) {
  const comment = AppDataSource.manager.create(Comment, { user, text });
  return await AppDataSource.manager.save(comment);
}

async function getAll(
  skip: number,
  take: number,
  order: Order
): Promise<Comment[]> {
  const comments = await AppDataSource.manager.find(Comment, {
    skip,
    take,
    order: { createdAt: order },
  });
  return comments;
}

// **** Export default **** //

export default {
  save,
  getAll,
} as const;
