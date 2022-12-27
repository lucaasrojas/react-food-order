import { useEffect, useState } from "react";
import { getMeals } from "../../api";
import Card from "../UI/Card";
import classes from "./AvailableMeals.module.css";
import MealItem from "./MealItem/MealItem";

const AvailableMeals = () => {
    const [availableMeals, setAvailableMeals] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();
    useEffect(() => {
        setIsLoading(true);
        setError();
        getMeals()
            .then((res) => {
                setAvailableMeals(res);
                setIsLoading(false);
            })
            .catch((err) => {
                setIsLoading(false);
                setError(err.message);
            });
    }, []);
    const mealsList = availableMeals.map((meal) => (
        <MealItem key={meal.id} {...meal} />
    ));
    return (
        <section className={classes.meals}>
            <Card>
                {isLoading ? (
                    <p>Loading...</p>
                ) : error ? (
                    <p>{error}</p>
                ) : (
                    <ul>{mealsList}</ul>
                )}
            </Card>
        </section>
    );
};

export default AvailableMeals;
