import { DateTime } from 'luxon'
import {
  BaseModel,
  BelongsTo,
  afterFetch,
  afterFind,
  beforeFetch,
  beforeFind,
  beforeUpdate,
  belongsTo,
  column,
  computed,
} from '@ioc:Adonis/Lucid/Orm'
import User from './User'
import Mail from '@ioc:Adonis/Addons/Mail'
import Env from '@ioc:Adonis/Core/Env'

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
        ? JSON.stringify([...post.history, previousVersion])
        : JSON.stringify([previousVersion])
    }
  }

  @afterFind()
  public static async incrementCountViews(post: Post) {
    post.views = Number(post.views) + 1
    await post.save()

    await Mail.send((message) => {
      message
        .from(Env.get('SMTP_USERNAME'))
        .to(Env.get('SMTP_USERNAME'))
        .subject('Nova visualização')
        .html('<h1>Alguem viu sua publicação<h1>')
    })
  }

  @computed()
  public get updates() {
    return this.history
  }
}
