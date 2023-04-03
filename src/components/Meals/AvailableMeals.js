import { useEffect, useState } from 'react';
import Card from '../UI/Card';
import styles from './AvailableMeals.module.css';
import MealItem from './MealItem/MealItem';

// const DUMMY_MEALS = [
//     {
//         id: 'm1',
//         name: 'Churrasco',
//         description: 'Meet with fries.',
//         price: 22.99
//     },
//     {
//         id: 'm2',
//         name: 'Rice with meat',
//         description: 'A gaucho specialty!',
//         price: 19.47
//     },
//     {
//         id: 'm3',
//         name: 'Barbecue Burger',
//         description: 'American, raw, meaty.',
//         price: 12.99
//     },
//     {
//         id: 'm4',
//         name: 'Pancakes',
//         description: 'Healthy & delicious!',
//         price: 18.99
//     }
// ];

const AvailableMeals = () => {
    const [meals, setMeals] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchMeals = async () => {
            const response = await fetch('https://react-http-f7e2d-default-rtdb.firebaseio.com/meals.json');
            const responseData = await response.json();

            const loadedMeals = [];

            for (const key in responseData) {
                loadedMeals.push({
                    id: key,
                    name: responseData[key].name,
                    description: responseData[key].description,
                    price: responseData[key].price
                });
            }

            console.log(responseData);
            setMeals(loadedMeals);
            setIsLoading(false);
        };
        fetchMeals();
    }, []); // no dependencies so it runs only once when the component is rendered for the first time.

    if (isLoading) {
        return (
            <section className={styles.mealsLoading}>
                <p>Loading...</p>
            </section>
        );
    }

    const mealsList = meals.map(meal => (
        <MealItem key={meal.id} id={meal.id} name={meal.name} description={meal.description} price={meal.price} />
    ));

    return (
        <section className={styles.meals}>
            <Card>
                <ul>{mealsList}</ul>
            </Card>
        </section>
    );
};

export default AvailableMeals;
