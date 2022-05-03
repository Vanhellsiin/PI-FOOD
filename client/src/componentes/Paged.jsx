import React from 'react';
//import './Paged.css'

export default function Paged ({recipesPerPage,allRecipe,pagin}){
    const pageNumbers = [];

    for(let i =1; i <= Math.ceil(allRecipe/recipesPerPage); i++ ){
        pageNumbers.push(i);
    }

    return(
        <nav>
            <ul className='pagin'>
                    {pageNumbers && pageNumbers.map(number =>(
                        <li className='number' key={number}>
                        <a onClick={() => Paged(number)}>{number}</a>
                        </li>
                    ))}
           </ul>
       </nav>


    )
}