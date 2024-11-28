import {
    registerDecorator,
    ValidationArguments,
    ValidationOptions,
    ValidatorConstraint,
    ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ async: false })
export class IsFileConstraint implements ValidatorConstraintInterface {
    validate(file: any, args: ValidationArguments) {
        if (!file) return false;
        const allowedMimeTypes = ['image/jpeg', 'image/png'];
        return allowedMimeTypes.includes(file.mimetype);
    }

    defaultMessage(args: ValidationArguments) {
        return 'Недопустимий тип файлу. Тільки .jpeg або .png дозволені.';
    }
}

export function IsFile(validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
        registerDecorator({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [],
            validator: IsFileConstraint,
        });
    };
}
