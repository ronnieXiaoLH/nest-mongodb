import {
  IsNotEmpty,
  IsString,
  Length,
  ValidationOptions,
  registerDecorator
} from 'class-validator'

// 定义自定义校验密码的规则
function isValidPassword(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'isLongerThan',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      options: validationOptions,
      validator: {
        validate(value: any) {
          console.log('value', value)
          const reg = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).+$/
          return reg.test(value)
        }
      }
    })
  }
}

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @Length(6, 20, {
    // $value：当前用户传入的值
    // $property：当前属性名
    // $target：当前类
    // $constraint1：第一个参数的值（最小长度）
    message: `用户名长度必须在$constraint1到$constraint2之间，当前传递的值为：$value`
  })
  username: string

  @IsString()
  @IsNotEmpty()
  @Length(6, 32, {
    message: `密码长度必须在$constraint1到$constraint2之间，当前传递的值为：$value`
  })
  @isValidPassword({
    message: `密码必须包含大写字母、小写字母和数字`
  })
  password: string
}
