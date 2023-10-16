import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class PostLike extends BaseModel {
  public static table = 'posts'
  @column({ isPrimary: true })
  public id: string

  @column()
  public user_likes: JSON

  @column()
  public user_id: string
}
