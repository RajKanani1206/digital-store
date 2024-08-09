import { mongooseConnect } from "@/lib/mongoose";

export default async function handle(req, res) {
    await mongooseConnect();
    const {categories, sort, ...filters} = req.query;
    const [sortField, sortOrder] = sort.split('-');
    const productsQuary = {
            category:categories.split(','),
    };
    if (Object.keys(filters).length>0 ){
        Object.keys(filters).forEach(filterName =>{
            productsQuary['properties.'+filterName] = filters[filterName];
        })

    }
    res.json( await Product.find(
        productsQuary, 
        null, 
        {
            sort:{[sortField]:sortOrder==='asc' ? 1 : -1}
        }
        ))
}