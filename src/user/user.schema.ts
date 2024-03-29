import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { ProfileSchema } from './profile.schema'
import { RolesSchema } from 'src/roles/roles.schema'

@Schema({
  timestamps: true, // 自动添加 createdAt 和 updatedAt 字段
  toJSON: {
    versionKey: false, // 不要 __v 字段
    // 查询数据的时候，将 _id 字段转换为 id 字段
    transform(doc, ret) {
      ret.id = ret._id
      delete ret._id
    }
  }
})
export class User {
  @Prop({
    type: String,
    unique: true,
    required: true
  })
  username: string

  @Prop({ type: String, required: true })
  password: string

  @Prop({
    type: ProfileSchema
  })
  profile

  @Prop({
    type: [RolesSchema]
  })
  roles
}

export const UserSchema = SchemaFactory.createForClass(User)
