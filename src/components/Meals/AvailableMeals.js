import Card from '../UI/Card';
import styles from './AvailableMeals.module.css';
import MealItem from './MealItem/MealItem';

const DUMMY_MEALS = [
    {
        id: 'm1',
        name: 'Churrasco',
        description: 'Meet with fries.',
        price: 22.99
    },
    {
        id: 'm2',
        name: 'Rice with meat',
        description: 'A gaucho specialty!',
        price: 16.5
    },
    {
        id: 'm3',
        name: 'Barbecue Burger',
        description: 'American, raw, meaty.',
        price: 12.99
    },
    {
        id: 'm4',
        name: 'Pancakes',
        description: 'Healthy & delicious!',
        price: 18.99
    }
];

const AvailableMeals = () => {
    const mealsList = DUMMY_MEALS.map(meal => (
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
