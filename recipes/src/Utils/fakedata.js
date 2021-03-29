const fakeRecipeData = [
    {
        id: 1,
        title: 'Swedish',
        source: 'Grandma',
        category: [{ type: 'dinner' }, { type: 'tea' }],
        ingredients: [{ name: 'Beef' }, { name: 'Noodles' }, { name: 'Eggs' }],
        instructions: 'Mix Beef, Noodles and Eggs'
    },
    {
        id: 2,
        title: 'Meat',
        source: 'Grandma',
        category: [{ type: 'lunch' }, { type: 'dinner' }],
        ingredients: [{ name: 'Beef' }, { name: 'Noodles' }, { name: 'Eggs' }],
        instructions: 'Mix Beef, Noodles and Eggs'
    },
    {
        id: 3,
        title: 'Pie',
        source: 'Grandma',
        category: [{ type: 'snack' }],
        ingredients: [{ name: 'Beef' }, { name: 'Noodles' }, { name: 'Eggs' }],
        instructions: 'Mix Beef, Noodles and Eggs'
    }
]


/*
const Pie = fakeRecipeData.filter((recipe) => recipe.title.toLowerCase() === 'pie');

const dinnerRecipe = fakeRecipeData.filter((recipe) => {
    return (recipe.category.filter((cat) => cat.type.toLowerCase() === 'dinner')).length > 0 ? recipe : '';

});

console.log(dinnerRecipe);
*/

export default fakeRecipeData;