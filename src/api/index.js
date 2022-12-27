const db = process.env.REACT_APP_DB_URL;

export const getMeals = async () => {
    try {
        const response = await fetch(db + "meals.json");

        const meals = await response.json();
        return Object.entries(meals).map(([key, value]) => {
            return { id: key, ...value };
        });
    } catch (error) {
        throw new Error("Something went wrong");
    }
};

export const submitOrder = async (order) => {
    try {
        const response = await fetch(db + "orders.json", {
            method: "POST",
            body: JSON.stringify(order),
        });
        return response;
    } catch (err) {
        throw new Error("Error submiting order");
    }
};
