fn main(){
    let v1 = vec![2, 3, 4];

    let iter = v1.iter();

    // let total: i32 = iter.sum();  // ---> iter is consumed  
    // println!("{}", total);

    // for i in iter {                 -----> iter is not usable anymore
    //     println!("{}", i)
    // }                           

    let iter2 = iter.clone().map(|x| x+1);

    for i in iter2 {
        println!("{}", i);
    }

    let iter3 = iter.clone().filter(|x| *x%2==0);

    for i in iter3 {
        println!("{}", i);
    }

    let vv: Vec<i32> = iter.cloned().collect();


}