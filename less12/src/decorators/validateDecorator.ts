export function ValidateArgs(requiredFields: string[]) {
    return function (
        target: any,
        propertyKey: string,
        descriptor: PropertyDescriptor
    ) {
        const originalMethod = descriptor.value;

        descriptor.value = function (...args: any[]) {
            const body = args.find(arg => typeof arg === "object" && "user" in arg);

            if (!body) {
                throw new Error("Request body is missing");
            }

            const missingFields = requiredFields.filter(field => !(field in body));
            if (missingFields.length > 0) {
                throw new Error(`Missing required fields: ${missingFields.join(", ")}`);
            }

            return originalMethod.apply(this, args);
        };

        return descriptor;
    };
}
