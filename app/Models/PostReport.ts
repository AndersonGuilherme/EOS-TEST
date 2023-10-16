import { DateTime } from 'luxon'
import {
  BaseModel,
  BelongsTo,
  afterFind,
  beforeUpdate,
  belongsTo,
  column,
  computed,
} from '@ioc:Adonis/Lucid/Orm'
import User from './User'

export default class PostReport extends BaseModel {
  public static table = 'posts'

  @column({ isPrimary: true })
  public id: string

  @column()
  public title: string

  @column()
  public description: string

  @column()
  public views: number

  @column()
  public user_likes: JSON

  @computed()
  public get likes() {
    // @ts-ignore
    return this.user_likes ? this.user_likes.length : 0
  }

  @computed()
  public get unlikes() {
    return Number(this.views) - Number(this.likes)
  }

  @column()
  public user_id: string

  @belongsTo(() => User, {
    foreignKey: 'user_id',
    localKey: 'id',
  })
  public user: BelongsTo<typeof User>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
