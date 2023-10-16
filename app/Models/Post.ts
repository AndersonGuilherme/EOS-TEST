import { DateTime } from 'luxon'
import {
  BaseModel,
  BelongsTo,
  beforeUpdate,
  belongsTo,
  column,
  computed,
} from '@ioc:Adonis/Lucid/Orm'
import User from './User'

export default class Post extends BaseModel {
  @column({ isPrimary: true })
  public id: string

  @column()
  public title: string

  @column()
  public description: string

  @column()
  public user_id: string

  @belongsTo(() => User, {
    foreignKey: 'user_id',
    localKey: 'id',
  })
  public user: BelongsTo<typeof User>

  @column({ serializeAs: null })
  public history: JSON

  @column()
  public user_likes: JSON

  @column({ serializeAs: null })
  public views: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeUpdate()
  public static async saveHistory(post: Post) {
    const previousVersion = {
      title: post.title,
      description: post.description,
      updatedAt: post.updatedAt,
    }

    if (post.title !== previousVersion.title || post.description !== previousVersion.description) {
      // @ts-ignore
      post.history = post.history
        ? // @ts-ignore
          JSON.stringify([...post.history, previousVersion])
        : JSON.stringify([previousVersion])
    }
  }

  @computed()
  public get updates() {
    return this.history
  }
}
