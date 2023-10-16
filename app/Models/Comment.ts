import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column, computed } from '@ioc:Adonis/Lucid/Orm'
import User from './User'
import Post from './Post'

export default class Comment extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public description: string

  @column()
  public user_id: string

  @belongsTo(() => User, {
    foreignKey: 'user_id',
    localKey: 'id',
  })
  public user: BelongsTo<typeof User>

  @column()
  public deletedBy: string

  @column()
  public post_id: string

  @belongsTo(() => Post, {
    foreignKey: 'post_id',
    localKey: 'id',
  })
  public post: BelongsTo<typeof Post>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @computed()
  public get deleted_message() {
    if (this.deletedBy) {
      if (this.deletedBy === this.user_id) {
        return 'Deletado pelo dono do comentario.'
      } else {
        return 'Deletado pelo dono da publicação.'
      }
    }
  }
}
