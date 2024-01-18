import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'

@Schema({
  versionKey: false,
  timestamps: true,
  toJSON: {
    transform(doc, ret) {
      ;(ret.id = ret._id), delete ret._id
    }
  }
})
export class Roles {
  @Prop({
    type: Number,
    required: true,
    unique: true
  })
  roleId: number

  @Prop({
    type: String,
    required: true,
    unique: true
  })
  name: string
}

export const RolesSchema = SchemaFactory.createForClass(Roles)
