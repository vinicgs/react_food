import axios from 'axios';
import React, { useState } from 'react';
import './Food.css';
import logo1 from './images/logo1.png';
import bg1 from './images/bg1.jpg';
import './App.css';


const Food = () => {//food component

	const [query, setQuery] = useState('');//query state
	const [rcp, setRcp] = useState([]);//recipe state
	const [list, setList] = useState('alcohol-free');//list state

	const YOUR_APP_ID = 'f6914e4f';//api key
	const YOUR_APP_KEY = '7301acb3dbfc2677701637d2b7a04d24';//api key

	const url = `https://api.edamam.com/search?q=${query}&app_id=${YOUR_APP_ID}&app_key=${YOUR_APP_KEY}&health=${list}`;//url

	async function getRecipe() {//async function to get the data from the api
		const result = await axios.get(url)//.then(res => res.data.hits);
		setRcp(result.data.hits)//.map(item => item.recipe))
		console.log(result.data)//.hits[0].recipe.label)
	}

	const submitForm = e => {
		e.preventDefault();//prevent the default action of the form 
		getRecipe();//call the function
	}

	return (//return the food component
		<div className='App'>
			<div className='header'>
				<nav className='nav'>
					<div className='logo'>
						<img src={logo1} alg="" className='img1' />
					</div>
					<ul className='ul'>
						<li><a href='#'>Home</a></li>
						<li><a href='#'>Customers</a></li>
						<li><a href='#'>Meals</a></li>
						<li><a href='#'>Contact</a></li>
					</ul>

					<form className='form_1' onSubmit={submitForm}>
						{/*  // onSubmit event handler to call the function getRecipe when the form is submitted  */}
						<input type="text" placeholder='enter the name of the product' value={query} onChange={e => setQuery(e.target.value)} />{/* input field to enter the name of the product */}
						<button type='submit' className='button-1'>Search</button>
					</form>
				</nav>


				<div className='content'>

					<div className='text'>
						<h1><span className='span-h1'>Fastest Delivery</span> On Earth</h1>
						<p> Order now  and get <span> free shipping </span> </p>
					
					</div>

					<div className='total'>
						<p>{rcp.length} recipes found </p>
					</div>
					
					
					<div className='print'>
						
						
						{rcp.map((item, index) => {//map the data from the api to the recipe component 
							return (
								<div key={index} className='product'>						
 									<img src={item['recipe']['image']} alt='food' /> {/* //image */}
									<p> <span>Name: </span>{item['recipe']['label']}</p> {/* //display the name of the recipe  */}
									<p><span> Calories: </span>{item['recipe']['calories'].toFixed(2)}</p> {/* display the calories of the recipe  */}
									<div className='buttons'>
									<p><a className='a-2' href={item['recipe']['url']} target={'blank'}> read </a></p> {/* //link to the recipe  */}
									<button className='button-2'>Order</button>
									</div>								
								</div>
							)
						})}
					</div>
				</div>
			</div>
		</div>
	)
}

export default Food;