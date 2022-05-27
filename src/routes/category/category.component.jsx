import {useContext, useState, useEffect, Fragment} from 'react';
import {useParams} from 'react-router-dom';

import {CategoriesContext} from '../../contexts/categories.context';
import ProductCard from '../../components/product-card/product-card.component';

import './category.styles.scss'

const Category = () => {
  const {category} = useParams();
  const {categoriesMap} = useContext(CategoriesContext);
  const [products, setProducts] = useState(categoriesMap[category]);

  useEffect(() => {
    setProducts(categoriesMap[category]);
  }, [categoriesMap, category]); 
  
  return(
    <Fragment>
      <h2 className='category-title'>{category.toUpperCase()}</h2>
      <div className='category-container'>
        {
          //need to perform a check to avoid issue with the async request of data from Firestore

          //Here checking if "products" contains the data. If not, not rendering (ideally a spinner/loader)
          products && products.map(product => <ProductCard key={product.id} product={product} />)
        }
      </div>
    </Fragment>
  )
}

export default Category;