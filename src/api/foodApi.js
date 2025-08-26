export const foodApi = async (foodName) => {
    const params = new URLSearchParams();
    params.append("foodItem" , foodName)
    try{
        const response = await fetch(`http://ec2-13-203-177-142.ap-south-1.compute.amazonaws.com:8080/food/v1/getFoods?${params}`)
        if(!response.ok){
            console.log(`Error Occured: ${response.status}`);
        }
        const result = await response.json();
        console.log(result);
    } catch(error){
        console.log("hitting Catch Block");
        console.log(error);
    }
}
