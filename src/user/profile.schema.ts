import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'

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
export class Profile {
  @Prop({
    type: Number,
    enum: [0 | 1] // 男的 0，女的 1
  })
  gender: number

  @Prop({
    type: String
  })
  photo: string

  @Prop({
    type: String
  })
  address: string
}

export const ProfileSchema = SchemaFactory.createForClass(Profile)
