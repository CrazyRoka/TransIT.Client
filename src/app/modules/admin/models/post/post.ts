import { TEntity } from 'src/app/modules/core/models/entity/entity';

export class Post extends TEntity<Post> {
  name: string;
  createDate: Date;
  modDate: Date;

  constructor(post: Partial<Post>) {
    super(post);
  }
}
