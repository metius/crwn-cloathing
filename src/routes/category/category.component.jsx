import { useState, useEffect, Fragment} from 'react';
import {useParams} from 'react-router-dom';
import { useSelector } from 'react-redux';

import ProductCard from '../../components/product-card/product-card.component';
import { selectCategoriesMap } from '../../store/categories/category.selector';

import {CategoryContainer, CategoryTitle} from './category.styles';

const Category = () => {
  const {category} = useParams();
  const categoriesMap = useSelector(selectCategoriesMap);
  const [products, setProducts] = useState(categoriesMap[category]);

  useEffect(() => {
    setProducts(categoriesMap[category]);
  }, [categoriesMap, category]); 
  
  return(
    <Fragment>
      <CategoryTitle>{category.toUpperCase()}</CategoryTitle>
      <CategoryContainer>
        {
          //need to perform a check to avoid issue with the async request of data from Firestore

          //Here checking if "products" contains the data. If not, not rendering (ideally a spinner/loader)
          products && products.map(product => <ProductCard key={product.id} product={product} />)
        }
      </CategoryContainer>
    </Fragment>
  )
}

export default Category;