import Product from '../components/Product';
function Productfeeds({products}) {

    return (
        <div className="grid grid-flow-row-dense md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:-mt-52"> 
            
            {products.slice(0,4).map(({ id,title,image,price,category,description})=>(
               <Product 
                key={id}
                id={id}
                title={title}
                image={image}
                price={price}
                category={category}
                description={description}
               />
            ))}
            
            <img className="md:col-span-full" src="https://links.papareact.com/dyz" alt=""  />
            <div className="md:col-span-2  ">
            {products.slice(4,5).map(({ id,title,image,price,category,description})=>(
               <Product 
                key={id}
                id={id}
                title={title}
                image={image}
                price={price}
                category={category}
                description={description}
               />
            ))}
            </div>
            {products.slice(5,products.length).map(({ id,title,image,price,category,description})=>(
               <Product 
                key={id}
                id={id}
                title={title}
                image={image}
                price={price}
                category={category}
                description={description}
               />
            ))} 
        </div>
    )
}

export default Productfeeds
