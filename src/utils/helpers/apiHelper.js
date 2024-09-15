export function validateItemData(data) {
    let errors = {};

    if (!data.name || typeof data.name !== "string" || data.name.trim() === "") {
        errors.name = "Name is required and must be a non-empty string.";
    }

    if (!data.description || typeof data.description !== "string" || data.description.trim() === "") {
        errors.description = "Description is required and must be a non-empty string.";
    }

    if (typeof data.quantity !== "number" || data.quantity < 0) {
        errors.quantity = "Quantity is required and must be a non-negative number.";
    }

    if (!data.category || typeof data.category !== "string" || data.category.trim() === "") {
        errors.category = "Category is required and must be a non-empty string.";
    }

    const hasErrors = Object.keys(errors).length > 0;
    return [hasErrors, errors];
}


export function object404Respsonse(response, model = "") {  //response：这是一个 NextResponse 对象，用于创建 HTTP 响应。
    return response.json({
        message: `${model} not found`
    }, {
        status: 404
    })
}
