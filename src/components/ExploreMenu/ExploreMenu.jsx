import React from 'react'
import { categories } from '../../assets/assets'
import './ExploreMenu.css'

const ExploreMenu = ({category, setCategory}) => {
  return (
    <div className="explore-menu position-relative">
    <h1 className='d-flex align-items-center justify-content-between'>
    Explore Our Menu
    <div className='d-flex'>
    <i className="bi bi-arrow-left-circle scroll-icon"></i>
      <i className='bi bi-arrow-right-circle scroll-icon'></i>
    </div>
    </h1>
    <p>Explore curated lists of dishes from top categories</p>
    <div className='d-flex justify-content-between gap-4 overflow-auto explore-menu-list'>
    {
        categories.map((item,index)=>{
            return(
                <div key={index} className='text-center explore-menu-list-item' onClick={()=> setCategory(prev => prev === item.category ? 'All' : item.category)}>
                    <img src={item.icon} alt="" className={item.category === category ? 'rounded-circle active' : 'rounded-circle'} height={128} width={128} />
                    <p className='mt-2 fw-bold'>{item.category}</p>
                </div>
            )
        }

        )
    }
    </div>
    <hr/>
   </div>
  )
}

export default ExploreMenu;