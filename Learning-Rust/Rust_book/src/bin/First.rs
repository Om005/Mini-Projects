fn main(){
    let x = 5;
    println!("{}", x);
    // x = 6; ---> no sit x in immutable

    let mut y = 3;
    y = 12; // ---> Now ok

    
    {
        let x = 1212;
        // this local x shadows x outside this {}
    }

    let z = 2.2;

    let tup: (i32, f32, u32) = (500, 3.0, 1);

    let (a, b, c) = tup;
    println!("the valu of b is {b}");


    let arr = [1, 2, 3, 4];

    // let first = arr[0];
    println!("{}", arr[5]);

    
}